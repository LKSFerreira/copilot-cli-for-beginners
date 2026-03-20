#!/usr/bin/env node
/**
 * Gera demonstrações (GIFs) do curso a partir de arquivos .tape
 *
 * Este script encontra todos os arquivos .tape em pastas [capítulo]/images/ e executa o VHS
 * para gerar os GIFs. O VHS é executado a partir da raiz do projeto para que referências com @arquivo
 * nos prompts sejam resolvidas corretamente.
 *
 * Uso:
 *   npm run generate:vhs                          # todos os capítulos, concorrência de 5
 *   npm run generate:vhs -- --chapter 03          # somente o capítulo 03
 *   npm run generate:vhs -- --chapter 03 --chapter 05
 *   npm run generate:vhs -- --file caminho/para/demo.tape  # arquivo tape específico
 *   npm run generate:vhs -- --concurrency 3       # limite de 3 ao mesmo tempo
 *
 * Requisitos:
 *   - VHS: brew install vhs
 */

const { exec, execSync } = require('child_process');
const { readdirSync, statSync, existsSync, readFileSync, renameSync, writeFileSync, chmodSync, mkdirSync, rmSync } = require('fs');
const { join, relative, dirname } = require('path');

const diretorioRaiz = join(__dirname, '..', '..');
const diretorioHome = require('os').homedir();
const caminhoConfiguracaoCopilot = join(diretorioHome, '.copilot', 'config.json');
// Agentes pessoais ficam tanto em ~/.copilot/agents quanto ~/.claude/agents
const diretoriosAgentesPessoais = [
  { dir: join(diretorioHome, '.copilot', 'agents'), backup: join(diretorioHome, '.copilot', 'agents.recording-bak') },
  { dir: join(diretorioHome, '.claude', 'agents'), backup: join(diretorioHome, '.claude', 'agents.recording-bak') }
];

// Assegura que o modo streamer (streamer mode) esteja ativo para que não mostre nomes de modelos ou quotas nas gravações
function ativarModoStreamer() {
  try {
    const configuracao = JSON.parse(readFileSync(caminhoConfiguracaoCopilot, 'utf8'));
    const estavaAtivo = configuracao.streamer_mode || false;
    configuracao.streamer_mode = true;
    delete configuracao.on_air_mode;
    writeFileSync(caminhoConfiguracaoCopilot, JSON.stringify(configuracao, null, 2) + '\\n');
    console.log(`🔴 Modo streamer: ${estavaAtivo ? 'já estava ativo' : 'foi ativado'}`);
    return { estavaAtivo };
  } catch (e) {
    console.warn('⚠ Não foi possível ler as configurações do copilot, modo streamer não verificado');
    return null;
  }
}

// Retorna o modo streamer para o seu estado original
function restaurarModoStreamer(estado) {
  if (estado && !estado.estavaAtivo) {
    try {
      const configuracao = JSON.parse(readFileSync(caminhoConfiguracaoCopilot, 'utf8'));
      configuracao.streamer_mode = false;
      writeFileSync(caminhoConfiguracaoCopilot, JSON.stringify(configuracao, null, 2) + '\\n');
      console.log('🔴 Modo streamer: restaurado para desligado');
    } catch (e) { /* ignorar */ }
  }
}

// Oculta os agentes pessoais para que só os do curso apareçam no seletor /agent
function ocultarAgentesPessoais() {
  const escondidos = [];
  for (const { dir, backup } of diretoriosAgentesPessoais) {
    try {
      // Retomar backup velho de execuções anteriores interrompidas
      if (!existsSync(dir) && existsSync(backup)) {
        renameSync(backup, dir);
        console.log(`👤 Backup antigo restaurado: ${backup}`);
      }
      if (existsSync(dir)) {
        renameSync(dir, backup);
        escondidos.push({ dir, backup });
      }
    } catch (e) {
      console.warn(`⚠ Não foi possível esconder ${dir}:`, e.message);
    }
  }
  if (escondidos.length > 0) {
    console.log(`👤 Agentes pessoais: ocultados (${escondidos.length} locais)`);
  }
  return escondidos;
}

// Restaura os agentes pessoais nos seus locais originais
function restaurarAgentesPessoais(escondidos) {
  if (!escondidos || escondidos.length === 0) return;
  for (const { dir, backup } of escondidos) {
    try {
      if (existsSync(backup)) {
        // O Copilot pode recriar pasta de agente durante a gravação - deletá-la primeiro
        if (existsSync(dir)) {
          rmSync(dir, { recursive: true });
        }
        renameSync(backup, dir);
      }
    } catch (e) {
      console.warn(`⚠ Não foi possível restaurar ${dir}:`, e.message);
      console.warn(`  Corrija Manualmente: mv "${backup}" "${dir}"`);
    }
  }
  console.log(`👤 Agentes pessoais: restaurados (${escondidos.length} locais)`);
}

// Analisa argumentos da linha de comando
const argumentosCLI = process.argv.slice(2);
const capitulos = [];
const arquivos = [];
let concurrencia = 5;

for (let i = 0; i < argumentosCLI.length; i++) {
  if (argumentosCLI[i] === '--chapter' && argumentosCLI[i + 1]) {
    capitulos.push(argumentosCLI[++i]);
  } else if (argumentosCLI[i] === '--file' && argumentosCLI[i + 1]) {
    arquivos.push(argumentosCLI[++i]);
  } else if (argumentosCLI[i] === '--concurrency' && argumentosCLI[i + 1]) {
    concurrencia = parseInt(argumentosCLI[++i], 10);
  }
}

// Cria um script de embalagem que injeta --yolo e --allow-all-paths para que o copilot
// rode interativamente. O arquivo tape só digita "copilot" para parecer legal na
// gravação, mas esse wrapper traz as flags por baixo dos panos.
const pastaWrapper = join(diretorioRaiz, '.vhs-wrapper');
function configurarWrapperCopilot() {
  let copilotReal;
  try {
    const isWin = process.platform === 'win32' && !process.env.BASH;
    try {
      copilotReal = execSync(isWin ? 'where copilot' : 'which copilot', { encoding: 'utf8', stdio: ['pipe', 'pipe', 'ignore'] }).split('\\n')[0].trim();
    } catch (e1) {
      copilotReal = execSync(isWin ? 'where github-copilot-cli' : 'which github-copilot-cli', { encoding: 'utf8', stdio: ['pipe', 'pipe', 'ignore'] }).split('\\n')[0].trim();
    }
    if (!copilotReal) throw new Error('Comando não encontrado');
  } catch (error) {
    console.error('\\n❌ Erro: O comando "copilot" (ou "github-copilot-cli") não foi encontrado no seu sistema.\\n');
    console.error('Por favor, certifique-se de que o GitHub Copilot CLI está instalado e acessível no PATH.');
    console.error('Documentação: https://docs.github.com/en/copilot/github-copilot-in-the-cli');
    process.exit(1);
  }

  mkdirSync(pastaWrapper, { recursive: true });
  const caminhoWrapper = join(pastaWrapper, 'copilot');
  writeFileSync(caminhoWrapper, `#!/bin/bash\\nexec "${copilotReal}" --yolo --allow-all-paths "$@"\\n`);
  chmodSync(caminhoWrapper, '755');
  const caminhoWrapperCmd = join(pastaWrapper, 'copilot.cmd');
  writeFileSync(caminhoWrapperCmd, `@echo off\\r\\n"${copilotReal}" --yolo --allow-all-paths %*\\r\\n`);
  const separadorPATH = process.platform === 'win32' ? ';' : ':';
  return `${pastaWrapper}${separadorPATH}${process.env.PATH}`;
}

function limparWrapperCopilot() {
  try { rmSync(pastaWrapper, { recursive: true }); } catch (e) { /* ignorar */ }
}

// Encontra os arquivos .tape dentro de [capítulo]/images/
function encontrarArquivosTape(dir, filtroDeCapitulo) {
  const arquivosTape = [];

  const contencoes = readdirSync(dir);
  for (const entrada of contencoes) {
    const caminhoCompleto = join(dir, entrada);
    const tipo = statSync(caminhoCompleto);

    if (tipo.isDirectory() && !entrada.startsWith('.') && entrada !== 'node_modules') {
      // Aplicações do filtro de capítulo se especificado
      if (filtroDeCapitulo.length > 0) {
        const corresponde = filtroDeCapitulo.some(ch => entrada.startsWith(ch) || entrada.includes(ch));
        if (!corresponde) continue;
      }

      const imagensDasPastas = join(caminhoCompleto, 'images');
      if (existsSync(imagensDasPastas)) {
        try {
          const entradasDasImagens = readdirSync(imagensDasPastas);
          for (const arquivo of entradasDasImagens) {
            if (arquivo.endsWith('.tape')) {
              arquivosTape.push(join(imagensDasPastas, arquivo));
            }
          }
        } catch (e) {
          // não conseguiu ler isso ai, pode pular
        }
      }
    }
  }

  return arquivosTape;
}

// Pega o nome de saída do arquivo tape
function obterNomeArquivoSaida(caminhoDaTape) {
  const conteudo = readFileSync(caminhoDaTape, 'utf8');
  const encontrarComMatch = conteudo.match(/^Output\\s+(\\S+)/m);
  return encontrarComMatch ? encontrarComMatch[1] : null;
}

// Executar um único VHS gerando o tempo e retornar promessa
function rodarVhs(arquivoDaTape, caminhoDoWrapper) {
  const caminhoRelativo = relative(diretorioRaiz, arquivoDaTape);
  const diretorioDaImagem = dirname(arquivoDaTape);
  const nomeDeSaidaExportar = obterNomeArquivoSaida(arquivoDaTape);

  return new Promise((resolver) => {
    const horaDeIncio = Date.now();

    exec(`vhs ${caminhoRelativo}`, {
      cwd: diretorioRaiz,
      timeout: 600000,
      env: { ...process.env, PATH: caminhoDoWrapper }
    }, (error) => {
      const tempoDecorrido = ((Date.now() - horaDeIncio) / 1000).toFixed(0);

      // Sempre irá transferir o GIF se ele foi estabelecido (até pro non-zero sair com sucesso depois do erro)
      let gifFoiGerado = false;
      if (nomeDeSaidaExportar) {
        const caminhoGerado = join(diretorioRaiz, nomeDeSaidaExportar);
        const alvo = join(diretorioDaImagem, nomeDeSaidaExportar);
        if (existsSync(caminhoGerado) && caminhoGerado !== alvo) {
          renameSync(caminhoGerado, alvo);
          gifFoiGerado = true;
        }
      }

      if (error && !gifFoiGerado) {
        console.log(`  ✗ ${caminhoRelativo} (${tempoDecorrido}s) - ${error.message}`);
        resolver({ success: false, path: caminhoRelativo });
        return;
      }

      console.log(`  ✓ ${caminhoRelativo} (${tempoDecorrido}s)`);
      resolver({ success: true, path: caminhoRelativo });
    });
  });
}

// Rodar limite com concorrência
async function executarComConcorrencia(tarefas, limite) {
  const resultados = [];
  const executando = new Set();

  for (const tarefa of tarefas) {
    const promessa = tarefa().then(resultado => {
      executando.delete(promessa);
      return resultado;
    });
    executando.add(promessa);
    resultados.push(promessa);

    if (executando.size >= limite) {
      await Promise.race(executando);
    }
  }

  return Promise.all(resultados);
}

// Principal
async function principal() {
  console.log('🎬 Gerando demonstrações do curso...\\n');

  if (arquivos.length > 0) {
    console.log(`Arquivos passados: ${arquivos.join(', ')}`);
  } else if (capitulos.length > 0) {
    console.log(`Capítulos: ${capitulos.join(', ')}`);
  }
  console.log(`Concorrência: ${concurrencia}`);
  console.log('');

  // Ativa o modo streamer e oculta configurações pessoais / agentes do copilot antes da gravação
  const estadoDoStreamer = ativarModoStreamer();
  const agentesEscondidos = ocultarAgentesPessoais();
  console.log('');

  // Resolucionar tape files: caminhos vindos explícitamente na raiz `--file` tem a chave da hierarquia no scanner de tape.
  let arquivosTape;
  if (arquivos.length > 0) {
    const { resolve } = require('path');
    arquivosTape = arquivos.map(f => resolve(diretorioRaiz, f)).filter(f => {
      if (!existsSync(f)) {
        console.log(`  ⚠ Arquivo não foi encontrado: ${f}`);
        return false;
      }
      return true;
    });
  } else {
    arquivosTape = encontrarArquivosTape(diretorioRaiz, capitulos);
  }

  if (arquivosTape.length === 0) {
    console.log('Nenhum arquivo .tape verificado.');
    process.exit(0);
  }

  console.log(`Encontrado ${arquivosTape.length} arquivo(s) tape:\\n`);
  arquivosTape.forEach(f => console.log('  - ' + relative(diretorioRaiz, f)));
  console.log('');

  // Envolve por debaixo dos bastidores com --yolo
  const caminhoDoWrapper = configurarWrapperCopilot();
  console.log('Wrapper do Copilot: --yolo injetado silenciosamente através de PATH');
  console.log(`Gravando ${arquivosTape.length} demonstrações (${concurrencia} ao mesmo tempo)...\\n`);

  const momentoZero = Date.now();

  // Constroi bloco de tarefas
  const tarefas = arquivosTape.map(arq => () => rodarVhs(arq, caminhoDoWrapper));

  // Roda com limíte assíncrono em simultâneo
  const resultados = await executarComConcorrencia(tarefas, concurrencia);

  limparWrapperCopilot();
  restaurarAgentesPessoais(agentesEscondidos);
  restaurarModoStreamer(estadoDoStreamer);

  const sucessos = resultados.filter(r => r.success).length;
  const falhas = resultados.filter(r => !r.success);
  const tempoTotal = ((Date.now() - momentoZero) / 1000).toFixed(0);

  console.log(`\\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━`);
  console.log(`✓ Falhas Zero (Sucessos): ${sucessos}`);
  if (falhas.length > 0) {
    console.log(`✗ Falhas:  ${falhas.length}`);
    falhas.forEach(r => console.log(`  - ${r.path}`));
  }
  console.log(`⏱ Total Absoluto:   ${tempoTotal}s`);
  console.log(`━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━`);
}

principal().catch(e => {
  console.error(e);
  limparWrapperCopilot();
  restaurarAgentesPessoais(diretoriosAgentesPessoais); // sempre resgata no caso de cair / erro
  restaurarModoStreamer({ estavaAtivo: false });
  process.exit(1);
});
