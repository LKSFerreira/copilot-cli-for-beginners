#!/usr/bin/env node
/**
 * Verifica se os GIFs de demonstracao foram concluidos com sucesso avaliando o ultimo quadro.
 *
 * Extrai o ultimo frame de cada GIF, roda OCR via tesseract e checa
 * os padroes de falha/sucesso conhecidos para determinar se a demonstracao foi concluida.
 *
 * Uso:
 *   npm run verify:gifs              # checa todos os GIFs
 *   npm run verify:gifs -- --save    # tambem salva os PNGs dos ultimos frames em /tmp/gif-last-frames/
 */

const { execFileSync } = require('child_process');
const { readdirSync, statSync, existsSync, mkdirSync, rmSync } = require('fs');
const { join, basename, dirname } = require('path');
const os = require('os');

const diretorioRaiz = join(__dirname, '..', '..');
const diretorioTmp = join(os.tmpdir(), 'gif-last-frames');
const salvarFrames = process.argv.includes('--save');
const BARRA = '─'.repeat(72);

const PADROES_DE_FALHA = [
  'operation cancelled by user',
  'ctrl+c again to exit',
  'thinking (esc to cancel',
  'operacao cancelada pelo usuario',
  'ctrl+c novamente para sair',
  'pensando (esc para cancelar'
];

const PADROES_DE_SUCESSO = [
  'type @ to mention files',
  'remaining requests',
  'digite @ para referenciar arquivos',
  'requisicoes restantes'
];

function logCabecalho(emoji, texto) {
  console.log(`${emoji} ${texto}`);
}

function logLinha(emoji, texto = '') {
  console.log(`${emoji} ${texto}`);
}

function localizarExecutavel(nome) {
  const comando = process.platform === 'win32' ? 'where.exe' : 'which';

  try {
    const saida = execFileSync(comando, [nome], {
      encoding: 'utf8',
      stdio: ['ignore', 'pipe', 'ignore']
    });

    return saida
      .split(/\r?\n/)
      .map(linha => linha.trim())
      .find(Boolean) || null;
  } catch {
    return null;
  }
}

function verificarDependencias() {
  const dependencias = [
    {
      nome: 'tesseract',
      comando: 'tesseract',
      dicaWindows: 'winget install -e --id UB-Mannheim.TesseractOCR',
      dicaUnix: 'brew install tesseract'
    },
    {
      nome: 'ffprobe',
      comando: 'ffprobe',
      dicaWindows: 'winget install -e --id Gyan.FFmpeg',
      dicaUnix: 'brew install ffmpeg'
    },
    {
      nome: 'ffmpeg',
      comando: 'ffmpeg',
      dicaWindows: 'winget install -e --id Gyan.FFmpeg',
      dicaUnix: 'brew install ffmpeg'
    }
  ];

  const faltando = dependencias
    .map(dependencia => ({ ...dependencia, caminho: localizarExecutavel(dependencia.comando) }))
    .filter(dependencia => !dependencia.caminho);

  if (faltando.length === 0) {
    return;
  }

  logCabecalho('❌', 'Dependencias ausentes para verificar os GIFs');
  console.log(BARRA);

  for (const dependencia of faltando) {
    logLinha('🔴', dependencia.nome);
    if (process.platform === 'win32') {
      logLinha('  ↳', `Windows: ${dependencia.dicaWindows}`);
    } else {
      logLinha('  ↳', `macOS/Linux: ${dependencia.dicaUnix}`);
    }
  }

  console.log('');
  logLinha('👉', 'Instale as dependencias acima e rode novamente: npm run verify:gifs');
  process.exit(1);
}

function encontrarGifs(dir) {
  const gifs = [];

  for (const entrada of readdirSync(dir)) {
    const caminhoCompleto = join(dir, entrada);
    const estato = statSync(caminhoCompleto);

    if (!estato.isDirectory() || !/^\d{2}-/.test(entrada)) {
      continue;
    }

    const diretorioImagens = join(caminhoCompleto, 'images');
    if (!existsSync(diretorioImagens)) {
      continue;
    }

    for (const arquivo of readdirSync(diretorioImagens)) {
      if (arquivo.endsWith('-demo.gif')) {
        gifs.push(join(diretorioImagens, arquivo));
      }
    }
  }

  return gifs.sort();
}

function obterContagemDeQuadros(caminhoGif) {
  try {
    const resultado = execFileSync('ffprobe', [
      '-v', 'error',
      '-count_frames',
      '-select_streams', 'v:0',
      '-show_entries', 'stream=nb_read_frames',
      '-of', 'csv=p=0',
      caminhoGif
    ], {
      encoding: 'utf8',
      timeout: 30000,
      stdio: ['ignore', 'pipe', 'ignore']
    });

    return parseInt(resultado.trim(), 10);
  } catch {
    return -1;
  }
}

function extrairUltimoQuadro(caminhoGif, caminhoSaida) {
  const frames = obterContagemDeQuadros(caminhoGif);
  if (frames <= 0) {
    return false;
  }

  const ultimoQuadro = frames - 1;

  try {
    execFileSync('ffmpeg', [
      '-y',
      '-i', caminhoGif,
      '-vf', `select=eq(n\\,${ultimoQuadro})`,
      '-frames:v', '1',
      caminhoSaida
    ], {
      timeout: 30000,
      stdio: ['ignore', 'ignore', 'ignore']
    });

    return existsSync(caminhoSaida);
  } catch {
    return false;
  }
}

function extrairTextoDoQuadro(caminhoPng) {
  const dir = dirname(caminhoPng);
  const arquivo = basename(caminhoPng);

  try {
    const texto = execFileSync('tesseract', [arquivo, 'stdout'], {
      encoding: 'utf8',
      timeout: 15000,
      cwd: dir,
      stdio: ['ignore', 'pipe', 'ignore']
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
    return { nome: `${numCapitulo}/${nome}`, status: 'ERRO', motivo: 'Nao foi possivel extrair o ultimo quadro' };
  }

  const texto = extrairTextoDoQuadro(caminhoPng);
  if (!texto.trim()) {
    return { nome: `${numCapitulo}/${nome}`, status: 'DESCONHECIDO', motivo: 'O OCR nao retornou nenhum texto' };
  }

  for (const padrao of PADROES_DE_FALHA) {
    if (texto.includes(padrao)) {
      return { nome: `${numCapitulo}/${nome}`, status: 'INCOMPLETO', motivo: `Encontrado: "${padrao}"` };
    }
  }

  if (PADROES_DE_SUCESSO.some(padrao => texto.includes(padrao))) {
    return { nome: `${numCapitulo}/${nome}`, status: 'OK', motivo: 'Resposta completa' };
  }

  return { nome: `${numCapitulo}/${nome}`, status: 'OK?', motivo: 'Possui texto, sem padroes de falha detectados' };
}

function iconePorStatus(status) {
  if (status === 'OK') return '✅';
  if (status === 'OK?') return '🟡';
  if (status === 'INCOMPLETO') return '❌';
  return '❓';
}

function principal() {
  verificarDependencias();

  logCabecalho('🔍', 'Verificando os GIFs de demonstracao');
  console.log(BARRA);

  if (existsSync(diretorioTmp)) {
    rmSync(diretorioTmp, { recursive: true, force: true });
  }
  mkdirSync(diretorioTmp, { recursive: true });

  const gifs = encontrarGifs(diretorioRaiz);
  if (gifs.length === 0) {
    logLinha('⚠️', 'Nenhum arquivo -demo.gif foi encontrado.');
    process.exit(0);
  }

  logLinha('🖼️', `GIFs encontrados: ${gifs.length}`);
  console.log('');

  const resultados = gifs.map(gif => verificarUltimoQuadro(gif));
  const larguraNome = Math.max(30, ...resultados.map(resultado => resultado.nome.length + 2));
  const larguraStatus = 14;
  const cabecalho = 'GIF'.padEnd(larguraNome) + 'Status'.padEnd(larguraStatus) + 'Detalhes';

  console.log(BARRA);
  console.log(cabecalho);
  console.log(BARRA);

  for (const resultado of resultados) {
    const status = `${iconePorStatus(resultado.status)} ${resultado.status}`.padEnd(larguraStatus);
    console.log(`${resultado.nome.padEnd(larguraNome)}${status}${resultado.motivo}`);
  }

  console.log(BARRA);

  const ok = resultados.filter(resultado => resultado.status === 'OK' || resultado.status === 'OK?').length;
  const incompleto = resultados.filter(resultado => resultado.status === 'INCOMPLETO').length;
  const desconhecido = resultados.filter(
    resultado => resultado.status === 'DESCONHECIDO' || resultado.status === 'ERRO'
  ).length;

  console.log('');
  logLinha('📊', `Resumo final: ${ok} concluido(s), ${incompleto} incompleto(s), ${desconhecido} desconhecido(s)`);

  if (incompleto > 0) {
    logLinha('👉', 'GIFs incompletos normalmente precisam de um "esperaDaResposta" maior no .github/scripts/demos.json');
  }

  if (!salvarFrames) {
    rmSync(diretorioTmp, { recursive: true, force: true });
  } else {
    logLinha('💾', `PNGs dos ultimos frames salvos em: ${diretorioTmp}`);
  }

  process.exit(incompleto > 0 ? 1 : 0);
}

principal();
