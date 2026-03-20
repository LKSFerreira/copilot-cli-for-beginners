#!/usr/bin/env node
/**
 * Verifica se os GIFs de demonstração foram concluídos com sucesso avaliando o último quadro.
 *
 * Extrai o último frame de cada GIF, roda o OCR via tesseract e checa
 * os padrões de falha/sucesso conhecidos para determinar se a demonstração foi concluída.
 *
 * Uso:
 *   npm run verify:gifs              # checa todos os GIFs
 *   npm run verify:gifs -- --save    # também salva os PNGs dos últimos frames em /tmp/gif-last-frames/
 *
 * Requisitos:
 *   - ffmpeg + ffprobe: brew install ffmpeg
 *   - tesseract: brew install tesseract
 */

const { execSync } = require('child_process');
const { readdirSync, statSync, existsSync, mkdirSync, rmSync } = require('fs');
const { join, basename, dirname } = require('path');
const os = require('os');

const diretorioRaiz = join(__dirname, '..', '..');
const diretorioTmp = join(os.tmpdir(), 'gif-last-frames');
const salvarFrames = process.argv.includes('--save');

// Padrões que indicam que a resposta foi cortada ou ficou incompleta
const PADROES_DE_FALHA = [
  'operation cancelled by user',
  'ctrl+c again to exit',
  'thinking (esc to cancel',
  'operação cancelada pelo usuário',
  'ctrl+c novamente para sair',
  'pensando (esc para cancelar'
];

// Padrões que indicam uma resposta concluída (sinais positivos)
const PADROES_DE_SUCESSO = [
  'type @ to mention files',
  'remaining requests',
  'digite @ para referenciar arquivos',
  'requisições restantes'
];

function encontrarGifs(dir) {
  const gifs = [];
  for (const entrada of readdirSync(dir)) {
    const caminhoCompleto = join(dir, entrada);
    const estato = statSync(caminhoCompleto);
    if (estato.isDirectory() && !entrada.startsWith('.') && entrada !== 'node_modules') {
      const diretorioImagens = join(caminhoCompleto, 'images');
      if (existsSync(diretorioImagens)) {
        for (const arquivo of readdirSync(diretorioImagens)) {
          if (arquivo.endsWith('-demo.gif')) {
             gifs.push(join(diretorioImagens, arquivo));
          }
        }
      }
    }
  }
  return gifs.sort();
}

function obterContagemDeQuadros(caminhoGif) {
  try {
    const resultado = execSync(
      `ffprobe -v error -count_frames -select_streams v:0 -show_entries stream=nb_read_frames -of csv=p=0 "${caminhoGif}"`,
      { encoding: 'utf8', timeout: 30000 }
    );
    return parseInt(resultado.trim(), 10);
  } catch {
    return -1;
  }
}

function extrairUltimoQuadro(caminhoGif, caminhoSaida) {
  const frames = obterContagemDeQuadros(caminhoGif);
  if (frames <= 0) return false;
  const ultimoQuadro = frames - 1;
  try {
    execSync(
      `ffmpeg -y -i "${caminhoGif}" -vf "select=eq(n\\\\,${ultimoQuadro})" -frames:v 1 "${caminhoSaida}" 2>/dev/null`,
      { timeout: 30000 }
    );
    return existsSync(caminhoSaida);
  } catch {
    return false;
  }
}

function extrairTextoDoQuadro(caminhoPng) {
  const dir = dirname(caminhoPng);
  const arquivo = basename(caminhoPng);
  try {
    // tesseract precisa rodar a partir do diretório do arquivo (problema de path no macOS)
    const texto = execSync(`tesseract "${arquivo}" stdout 2>/dev/null`, {
      encoding: 'utf8', timeout: 15000, cwd: dir
    });
    return texto.toLowerCase();
  } catch {
    return '';
  }
}

function verificarUltimoQuadro(caminhoGif) {
  const nome = basename(caminhoGif, '.gif');
  const capitulo = basename(join(caminhoGif, '..', '..'));
  const numCapitulo = capitulo.substring(0, 2);
  const caminhoPng = join(diretorioTmp, `${numCapitulo}-${nome}.png`);

  if (!extrairUltimoQuadro(caminhoGif, caminhoPng)) {
    return { nome: `${numCapitulo}/${nome}`, status: 'ERRO', motivo: 'Não foi possível extrair o último quadro' };
  }

  const texto = extrairTextoDoQuadro(caminhoPng);

  if (!texto.trim()) {
    return { nome: `${numCapitulo}/${nome}`, status: 'DESCONHECIDO', motivo: 'O OCR não retornou nenhum texto' };
  }

  // Verificar padrões de falha
  for (const padrao of PADROES_DE_FALHA) {
    if (texto.includes(padrao)) {
      return { nome: `${numCapitulo}/${nome}`, status: 'INCOMPLETO', motivo: `Encontrado: "${padrao}"` };
    }
  }

  // Verificar o prompt do copilot (indica que retornou ao prompt = sucesso)
  const possuiPrompt = PADROES_DE_SUCESSO.some(p => texto.includes(p));
  if (possuiPrompt) {
    return { nome: `${numCapitulo}/${nome}`, status: 'OK', motivo: 'Resposta completa' };
  }

  // Tem texto mas sem padrões conhecidos - provável que esteja OK, mas incerto
  return { nome: `${numCapitulo}/${nome}`, status: 'OK?', motivo: 'Possui texto, sem padrões de falha detectados' };
}

// Principal
function principal() {
  // Verificar dependências
  const isWin = process.platform === 'win32' && !process.env.BASH;
  try {
    execSync(isWin ? 'where tesseract' : 'which tesseract', { encoding: 'utf8', stdio: 'ignore' });
  } catch {
    console.error('Erro: tesseract é necessário. Para instalar use: brew install tesseract');
    process.exit(1);
  }
  try {
    execSync(isWin ? 'where ffprobe' : 'which ffprobe', { encoding: 'utf8', stdio: 'ignore' });
  } catch {
    console.error('Erro: ffmpeg/ffprobe é obrigatório. Para instalar use: brew install ffmpeg');
    process.exit(1);
  }

  console.log('🔍 Verificando os GIFs de demonstração...\\n');

  // Configurar diretório temporário
  if (existsSync(diretorioTmp)) rmSync(diretorioTmp, { recursive: true });
  mkdirSync(diretorioTmp, { recursive: true });

  const gifs = encontrarGifs(diretorioRaiz);

  if (gifs.length === 0) {
    console.log('Nenhum arquivo GIF foi encontrado');
    process.exit(0);
  }

  console.log(`Encontrado(s) ${gifs.length} GIF(s)\\n`);

  const resultados = [];
  for (const gif of gifs) {
    const resultado = verificarUltimoQuadro(gif);
    resultados.push(resultado);
  }

  // Imprimir tabela de resultados
  const larguraNome = Math.max(32, ...resultados.map(r => r.nome.length + 2));
  const larguraStatus = 14;

  const cabecalho = 'GIF'.padEnd(larguraNome) + 'Status'.padEnd(larguraStatus) + 'Detalhes';
  const separador = '─'.repeat(cabecalho.length + 10);

  console.log(separador);
  console.log(cabecalho);
  console.log(separador);

  for (const r of resultados) {
    const icone = r.status === 'OK' ? '✓' :
                 r.status === 'OK?' ? '~' :
                 r.status === 'INCOMPLETO' ? '✗' : '?';
    const statusString = `${icone} ${r.status}`.padEnd(larguraStatus);
    console.log(`${r.nome.padEnd(larguraNome)}${statusString}${r.motivo}`);
  }

  console.log(separador);

  const ok = resultados.filter(r => r.status === 'OK' || r.status === 'OK?').length;
  const incompleto = resultados.filter(r => r.status === 'INCOMPLETO').length;
  const desconhecido = resultados.filter(r => r.status === 'DESCONHECIDO' || r.status === 'ERRO').length;

  console.log(`\\n✓ Concluído: ${ok}  ✗ Incompleto: ${incompleto}  ? Desconhecido: ${desconhecido}`);

  if (incompleto > 0) {
    console.log('\\nGIFs incompletos precisam de um "esperaDaResposta" maior no .github/scripts/demos.json');
  }

  // Limpar a não ser que tenha --save
  if (!salvarFrames) {
    rmSync(diretorioTmp, { recursive: true });
  } else {
    console.log(`\\nPNGs dos últimos frames foram salvos em: ${diretorioTmp}`);
  }

  process.exit(incompleto > 0 ? 1 : 0);
}

principal();
