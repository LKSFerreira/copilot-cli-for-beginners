#!/usr/bin/env node
/**
 * Gera demonstracoes (GIFs) do curso a partir de arquivos .tape.
 *
 * O VHS e executado a partir da raiz do projeto para que referencias com @arquivo
 * nos prompts sejam resolvidas corretamente.
 *
 * Uso:
 *   npm run generate:vhs                          # todos os capitulos, concorrencia de 5
 *   npm run generate:vhs -- --chapter 03          # somente o capitulo 03
 *   npm run generate:vhs -- --chapter 03 --chapter 05
 *   npm run generate:vhs -- --file caminho/para/demo.tape  # arquivo tape especifico
 *   npm run generate:vhs -- --concurrency 3       # limite de 3 ao mesmo tempo
 */

const { execFile, execFileSync } = require('child_process');
const {
  readdirSync,
  statSync,
  existsSync,
  readFileSync,
  renameSync,
  writeFileSync,
  chmodSync,
  mkdirSync,
  rmSync
} = require('fs');
const { join, relative, dirname, resolve } = require('path');
const os = require('os');

const diretorioRaiz = join(__dirname, '..', '..');
const diretorioHome = os.homedir();
const caminhoConfiguracaoCopilot = join(diretorioHome, '.copilot', 'config.json');
const diretoriosAgentesPessoais = [
  { dir: join(diretorioHome, '.copilot', 'agents'), backup: join(diretorioHome, '.copilot', 'agents.recording-bak') },
  { dir: join(diretorioHome, '.claude', 'agents'), backup: join(diretorioHome, '.claude', 'agents.recording-bak') }
];
const pastaWrapper = join(diretorioRaiz, '.vhs-wrapper');
const BARRA = '━'.repeat(66);

function obterExecutavelVhs() {
  return process.env.VHS_BINARY || 'vhs';
}

function logCabecalho(emoji, texto) {
  console.log(`${emoji} ${texto}`);
}

function logLinha(emoji, texto = '') {
  console.log(`${emoji} ${texto}`);
}

function logSeparador() {
  console.log(BARRA);
}

function resumirTexto(texto, maxLinhas = 3) {
  if (!texto) return '';

  const linhas = texto
    .split(/\r?\n/)
    .map(linha => linha.trim())
    .filter(Boolean);

  return linhas.slice(0, maxLinhas).join(' | ');
}

function formatarDuracao(segundos) {
  const total = Math.max(0, Math.round(segundos));
  const minutos = Math.floor(total / 60);
  const restoSegundos = total % 60;

  if (minutos === 0) {
    return `${restoSegundos}s`;
  }

  if (restoSegundos === 0) {
    return `${minutos}min`;
  }

  return `${minutos}min ${restoSegundos}s`;
}

function obterVersaoVhs() {
  try {
    return execFileSync(obterExecutavelVhs(), ['--version'], {
      encoding: 'utf8',
      stdio: ['ignore', 'pipe', 'ignore']
    }).trim();
  } catch {
    return '';
  }
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

function localizarExecutaveis(nome) {
  const comando = process.platform === 'win32' ? 'where.exe' : 'which';

  try {
    const saida = execFileSync(comando, [nome], {
      encoding: 'utf8',
      stdio: ['ignore', 'pipe', 'ignore']
    });

    return saida
      .split(/\r?\n/)
      .map(linha => linha.trim())
      .filter(Boolean);
  } catch {
    return [];
  }
}

function localizarBinariosCopilot() {
  if (process.platform !== 'win32') {
    const copilot = localizarExecutavel('copilot') || localizarExecutavel('github-copilot-cli');
    return copilot ? { bash: copilot, cmd: copilot, display: copilot } : null;
  }

  const candidatos = [
    ...localizarExecutaveis('copilot'),
    ...localizarExecutaveis('github-copilot-cli')
  ];

  if (candidatos.length === 0) {
    return null;
  }

  const unico = [...new Set(candidatos)];
  const cmd = unico.find(caminho => /\.(cmd|bat|exe)$/i.test(caminho)) || unico[0];
  const bash = unico.find(caminho => !/\.(cmd|bat|exe|ps1)$/i.test(caminho)) || cmd;

  return { bash, cmd, display: cmd };
}

function lerArquivoTextoSeExistir(caminho) {
  try {
    if (caminho && existsSync(caminho) && statSync(caminho).isFile()) {
      return readFileSync(caminho, 'utf8');
    }
  } catch {
    // Ignorar leitura de shims/binarios nao textuais.
  }

  return '';
}

function detectarCliCopilotLegado(binariosCopilot) {
  if (!binariosCopilot) {
    return null;
  }

  const candidatos = [binariosCopilot.bash, binariosCopilot.cmd]
    .filter(Boolean)
    .filter((caminho, indice, lista) => lista.indexOf(caminho) === indice);

  for (const caminho of candidatos) {
    const conteudo = lerArquivoTextoSeExistir(caminho);
    if (conteudo.includes('@githubnext/github-copilot-cli')) {
      return caminho;
    }
  }

  return null;
}

function verificarDependenciasGeracao() {
  const dependencias = [
    {
      nome: 'VHS',
      comando: 'vhs',
      dicaWindows: process.env.VHS_BINARY
        ? `confirme que VHS_BINARY aponta para um vhs.exe valido (${process.env.VHS_BINARY})`
        : 'winget install -e --id charmbracelet.vhs',
      dicaUnix: 'brew install vhs'
    }
  ];

  if (process.platform === 'win32') {
    dependencias.push({
      nome: 'ttyd',
      comando: 'ttyd',
      dicaWindows: 'winget install -e --id tsl0922.ttyd',
      dicaUnix: null
    });
  }

  const possuiCopilot = localizarBinariosCopilot();
  const cliLegado = detectarCliCopilotLegado(possuiCopilot);
  const faltando = dependencias
    .map(dependencia => ({ ...dependencia, caminho: localizarExecutavel(dependencia.comando) }))
    .filter(dependencia => !dependencia.caminho && !(dependencia.nome === 'VHS' && process.env.VHS_BINARY));

  if (!possuiCopilot) {
    faltando.push({
      nome: 'GitHub Copilot CLI',
      dicaWindows: 'confirme se "github-copilot-cli.cmd" esta no PATH e responde a "--help"',
      dicaUnix: 'confirme se o comando "copilot" ou "github-copilot-cli" esta no PATH'
    });
  }

  if (faltando.length === 0 && !cliLegado) {
    return;
  }

  if (cliLegado) {
    logCabecalho('❌', 'CLI do Copilot incompativel detectado');
    logSeparador();
    logLinha('🔴', cliLegado);
    logLinha('↳', 'Esse executavel aponta para o pacote legado "@githubnext/github-copilot-cli", que nao suporta o modo interativo usado neste curso.');
    console.log('');
    logLinha('👉', 'Remova o pacote legado: npm uninstall -g @githubnext/github-copilot-cli');
    logLinha('👉', 'Instale o CLI oficial: npm install -g @github/copilot');
    logLinha('👉', 'Alternativa no Windows: winget install --id GitHub.Copilot -e');
    logLinha('👉', 'Teste rapido depois da instalacao: copilot --help');
    logLinha('👉', 'Docs oficiais: https://docs.github.com/en/copilot/how-tos/set-up/install-copilot-in-the-cli');
    process.exit(1);
  }

  logCabecalho('❌', 'Dependencias ausentes para gerar as demos');
  logSeparador();

  for (const dependencia of faltando) {
    logLinha('🔴', dependencia.nome);
    if (process.platform === 'win32' && dependencia.dicaWindows) {
      logLinha('  ↳', `Windows: ${dependencia.dicaWindows}`);
    }
    if (process.platform !== 'win32' && dependencia.dicaUnix) {
      logLinha('  ↳', `macOS/Linux: ${dependencia.dicaUnix}`);
    }
  }

  console.log('');
  logLinha('👉', 'Instale o item ausente e rode novamente: npm run generate:vhs');
  process.exit(1);
}

function verificarCompatibilidadeWindowsVhs() {
  if (process.platform !== 'win32') {
    return;
  }

  if (process.env.VHS_SKIP_WINDOWS_CHECK === '1') {
    return;
  }

  const versaoVhs = obterVersaoVhs();
  const caminhoVhs = process.env.VHS_BINARY || localizarExecutavel('vhs') || '';
  const ehBuildOficialWinget = /Microsoft\\WinGet\\Packages\\charmbracelet\.vhs/i.test(caminhoVhs);

  if (!versaoVhs.includes('v0.11.0') || !ehBuildOficialWinget) {
    return;
  }

  logCabecalho('❌', 'VHS com problema conhecido no Windows');
  logSeparador();
  logLinha('🔴', `Versao detectada: ${versaoVhs}`);
  logLinha('🔴', `Binario detectado: ${caminhoVhs}`);
  logLinha('↳', 'A build v0.11.0 do VHS no Windows esta com problemas upstream e pode travar ou gerar saida quebrada mesmo em tapes minimos.');
  console.log('');
  logLinha('👉', 'Issue upstream 1: https://github.com/charmbracelet/vhs/issues/721');
  logLinha('👉', 'Issue upstream 2: https://github.com/charmbracelet/vhs/issues/671');
  logLinha('👉', 'Native workaround no Windows: use um binario corrigido do VHS e aponte para ele com VHS_BINARY=C:\\caminho\\para\\vhs.exe.');
  logLinha('👉', 'Workaround mais confiavel: gerar os GIFs em macOS, Linux, WSL ou Codespaces.');
  logLinha('👉', 'Se voce instalou uma build corrigida e quer forcar mesmo assim, rode com VHS_SKIP_WINDOWS_CHECK=1.');
  process.exit(1);
}

function ativarModoStreamer() {
  try {
    const configuracao = JSON.parse(readFileSync(caminhoConfiguracaoCopilot, 'utf8'));
    const estavaAtivo = configuracao.streamer_mode || false;
    configuracao.streamer_mode = true;
    delete configuracao.on_air_mode;
    writeFileSync(caminhoConfiguracaoCopilot, `${JSON.stringify(configuracao, null, 2)}\n`);
    logLinha('🔴', `Modo streamer: ${estavaAtivo ? 'ja estava ativo' : 'ativado para a gravacao'}`);
    return { estavaAtivo };
  } catch {
    logLinha('⚠️', 'Nao foi possivel ler ~/.copilot/config.json; o modo streamer nao foi verificado.');
    return null;
  }
}

function restaurarModoStreamer(estado) {
  if (!estado || estado.estavaAtivo) return;

  try {
    const configuracao = JSON.parse(readFileSync(caminhoConfiguracaoCopilot, 'utf8'));
    configuracao.streamer_mode = false;
    writeFileSync(caminhoConfiguracaoCopilot, `${JSON.stringify(configuracao, null, 2)}\n`);
    logLinha('🔴', 'Modo streamer: restaurado para desligado');
  } catch {
    // Ignorar falhas de limpeza.
  }
}

function ocultarAgentesPessoais() {
  const escondidos = [];

  for (const { dir, backup } of diretoriosAgentesPessoais) {
    try {
      if (!existsSync(dir) && existsSync(backup)) {
        renameSync(backup, dir);
        logLinha('👤', `Backup antigo restaurado: ${backup}`);
      }

      if (existsSync(dir)) {
        renameSync(dir, backup);
        escondidos.push({ dir, backup });
      }
    } catch (error) {
      logLinha('⚠️', `Nao foi possivel ocultar ${dir}: ${error.message}`);
    }
  }

  if (escondidos.length > 0) {
    logLinha('👤', `Agentes pessoais ocultados em ${escondidos.length} local(is)`);
  }

  return escondidos;
}

function restaurarAgentesPessoais(escondidos) {
  if (!escondidos || escondidos.length === 0) return;

  for (const { dir, backup } of escondidos) {
    try {
      if (!existsSync(backup)) continue;

      if (existsSync(dir)) {
        rmSync(dir, { recursive: true, force: true });
      }

      renameSync(backup, dir);
    } catch (error) {
      logLinha('⚠️', `Nao foi possivel restaurar ${dir}: ${error.message}`);
      logLinha('👉', `Corrija manualmente: renomeie "${backup}" para "${dir}"`);
    }
  }

  logLinha('👤', `Agentes pessoais restaurados (${escondidos.length} local(is))`);
}

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

function configurarWrapperCopilot() {
  const binariosCopilot = localizarBinariosCopilot();

  if (!binariosCopilot) {
    throw new Error('GitHub Copilot CLI nao foi encontrado no PATH.');
  }

  mkdirSync(pastaWrapper, { recursive: true });

  const caminhoWrapper = join(pastaWrapper, 'copilot');
  writeFileSync(caminhoWrapper, `#!/bin/bash\nexec "${binariosCopilot.bash}" --yolo --allow-all-paths "$@"\n`);
  chmodSync(caminhoWrapper, '755');

  const caminhoWrapperCmd = join(pastaWrapper, 'copilot.cmd');
  writeFileSync(caminhoWrapperCmd, `@echo off\r\n"${binariosCopilot.cmd}" --yolo --allow-all-paths %*\r\n`);

  const separadorPATH = process.platform === 'win32' ? ';' : ':';
  return {
    caminhoDoPath: `${pastaWrapper}${separadorPATH}${process.env.PATH}`,
    binarios: binariosCopilot
  };
}

function limparWrapperCopilot() {
  try {
    rmSync(pastaWrapper, { recursive: true, force: true });
  } catch {
    // Ignorar falhas de limpeza.
  }
}

function encontrarArquivosTape(dir, filtroDeCapitulo) {
  const arquivosTape = [];

  for (const entrada of readdirSync(dir)) {
    const caminhoCompleto = join(dir, entrada);
    const tipo = statSync(caminhoCompleto);

    if (!tipo.isDirectory() || entrada.startsWith('.') || entrada === 'node_modules') {
      continue;
    }

    if (filtroDeCapitulo.length > 0) {
      const corresponde = filtroDeCapitulo.some(ch => entrada.startsWith(ch) || entrada.includes(ch));
      if (!corresponde) continue;
    }

    const imagensDasPastas = join(caminhoCompleto, 'images');
    if (!existsSync(imagensDasPastas)) continue;

    try {
      for (const arquivo of readdirSync(imagensDasPastas)) {
        if (arquivo.endsWith('.tape')) {
          arquivosTape.push(join(imagensDasPastas, arquivo));
        }
      }
    } catch {
      // Ignorar diretorios ilegiveis.
    }
  }

  return arquivosTape;
}

function obterNomeArquivoSaida(caminhoDaTape) {
  const conteudo = readFileSync(caminhoDaTape, 'utf8');
  const match = conteudo.match(/^Output\s+(\S+)/m);
  return match ? match[1] : null;
}

function estimarDuracaoTape(caminhoDaTape) {
  const conteudo = readFileSync(caminhoDaTape, 'utf8');
  const matches = conteudo.matchAll(/^Sleep\s+(\d+(?:\.\d+)?)s$/gm);

  let total = 0;
  for (const match of matches) {
    total += parseFloat(match[1]);
  }

  // Soma uma pequena folga para digitacao, inicializacao do terminal e IO do VHS.
  return total + 5;
}

function estimarJanelaDeExecucao(arquivosTape, limite) {
  const duracoes = arquivosTape.map(arquivoTape => ({
    arquivoTape,
    duracao: estimarDuracaoTape(arquivoTape)
  }));

  const primeiraLeva = duracoes.slice(0, Math.max(1, limite));
  const primeiroResultado = Math.min(...primeiraLeva.map(item => item.duracao));

  const filas = Array.from({ length: Math.max(1, limite) }, () => 0);
  const duracoesOrdenadas = [...duracoes].sort((a, b) => b.duracao - a.duracao);

  for (const item of duracoesOrdenadas) {
    let indiceMenorFila = 0;
    for (let i = 1; i < filas.length; i++) {
      if (filas[i] < filas[indiceMenorFila]) {
        indiceMenorFila = i;
      }
    }
    filas[indiceMenorFila] += item.duracao;
  }

  return {
    primeiroResultado,
    totalEstimado: Math.max(...filas, 0)
  };
}

function moverGifGerado(nomeDeSaidaExportar, diretorioDaImagem) {
  if (!nomeDeSaidaExportar) {
    return false;
  }

  const caminhoGerado = join(diretorioRaiz, nomeDeSaidaExportar);
  const alvo = join(diretorioDaImagem, nomeDeSaidaExportar);

  if (!existsSync(caminhoGerado) || caminhoGerado === alvo) {
    return false;
  }

  if (existsSync(alvo)) {
    rmSync(alvo, { force: true });
  }

  renameSync(caminhoGerado, alvo);
  return true;
}

function formatarErroGeracao(error, stdout, stderr) {
  const detalhe = resumirTexto(stderr) || resumirTexto(stdout) || resumirTexto(error && error.message);
  return detalhe || 'Falha sem detalhes adicionais.';
}

function rodarVhs(arquivoDaTape, caminhoDoWrapper, monitorDeProgresso) {
  const caminhoRelativo = relative(diretorioRaiz, arquivoDaTape);
  const diretorioDaImagem = dirname(arquivoDaTape);
  const nomeDeSaidaExportar = obterNomeArquivoSaida(arquivoDaTape);

  return new Promise((resolver) => {
    const horaDeInicio = Date.now();
    monitorDeProgresso.iniciar(caminhoRelativo);

    execFile(obterExecutavelVhs(), [caminhoRelativo], {
      cwd: diretorioRaiz,
      timeout: 600000,
      env: { ...process.env, PATH: caminhoDoWrapper },
      windowsHide: true,
      maxBuffer: 10 * 1024 * 1024
    }, (error, stdout, stderr) => {
      const tempoDecorrido = ((Date.now() - horaDeInicio) / 1000).toFixed(0);

      let gifFoiGerado = false;
      try {
        gifFoiGerado = moverGifGerado(nomeDeSaidaExportar, diretorioDaImagem);
      } catch (moverErro) {
        const detalheMover = moverErro.message || 'nao foi possivel mover o GIF gerado';
        monitorDeProgresso.finalizar(caminhoRelativo);
        logLinha('❌', `${caminhoRelativo} (${tempoDecorrido}s)`);
        logLinha('   ↳', detalheMover);
        resolver({ success: false, path: caminhoRelativo, detail: detalheMover });
        return;
      }

      if (error && !gifFoiGerado) {
        const detalhe = formatarErroGeracao(error, stdout, stderr);
        monitorDeProgresso.finalizar(caminhoRelativo);
        logLinha('❌', `${caminhoRelativo} (${tempoDecorrido}s)`);
        logLinha('   ↳', detalhe);
        resolver({ success: false, path: caminhoRelativo, detail: detalhe });
        return;
      }

      monitorDeProgresso.finalizar(caminhoRelativo);
      logLinha('✅', `${caminhoRelativo} (${tempoDecorrido}s)`);
      resolver({ success: true, path: caminhoRelativo });
    });
  });
}

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

function resolverArquivosTape() {
  if (arquivos.length > 0) {
    return arquivos
      .map(arquivo => resolve(diretorioRaiz, arquivo))
      .filter(arquivo => {
        if (existsSync(arquivo)) return true;
        logLinha('⚠️', `Arquivo .tape nao encontrado: ${arquivo}`);
        if (arquivo.endsWith('.tape')) {
          logLinha('👉', 'Rode "npm run create:tapes" antes de gerar os GIFs ou use "npm run release".');
        }
        return false;
      });
  }

  return encontrarArquivosTape(diretorioRaiz, capitulos);
}

function criarMonitorDeProgresso(total, primeiroResultadoEstimado) {
  const inicio = Date.now();
  const ativos = new Set();
  let concluidos = 0;
  let timer = null;
  let avisoSemProgressoExibido = false;

  return {
    iniciar(arquivo) {
      ativos.add(arquivo);
    },

    finalizar(arquivo) {
      ativos.delete(arquivo);
      concluidos++;
    },

    iniciarHeartbeat() {
      timer = setInterval(() => {
        const decorrido = Math.round((Date.now() - inicio) / 1000);
        logLinha(
          '⏳',
          `Gravacao em andamento: ${concluidos}/${total} concluida(s), ${ativos.size} ativa(s), ${formatarDuracao(decorrido)} decorridos`
        );

        if (!avisoSemProgressoExibido && concluidos === 0 && decorrido >= primeiroResultadoEstimado + 30) {
          avisoSemProgressoExibido = true;
          logLinha(
            '⚠️',
            'Ainda sem nenhuma demo concluida. Se isso passar de alguns minutos, teste "copilot --help" no seu shell para confirmar que o CLI responde e nao esta aguardando login/autorizacao.'
          );
        }
      }, 20000);
    },

    pararHeartbeat() {
      if (timer) {
        clearInterval(timer);
        timer = null;
      }
    }
  };
}

function imprimirContextoDeExecucao() {
  logCabecalho('🎬', 'Gerando demonstracoes do curso');
  logSeparador();

  if (arquivos.length > 0) {
    logLinha('📄', `Arquivo(s) selecionado(s): ${arquivos.join(', ')}`);
  } else if (capitulos.length > 0) {
    logLinha('📚', `Capitulo(s) selecionado(s): ${capitulos.join(', ')}`);
  } else {
    logLinha('📚', 'Capitulos selecionados: todos');
  }

  logLinha('⚙️ ', `Concorrencia: ${concurrencia}`);
  console.log('');
}

function imprimirResumo(resultados, tempoTotal) {
  const sucessos = resultados.filter(resultado => resultado.success).length;
  const falhas = resultados.filter(resultado => !resultado.success);

  console.log('');
  logSeparador();
  logLinha('📊', `Resumo final: ${sucessos} sucesso(s), ${falhas.length} falha(s), ${tempoTotal}s`);

  if (falhas.length > 0) {
    logLinha('❌', 'Demos com falha:');
    for (const falha of falhas) {
      logLinha('  🔴', falha.path);
      if (falha.detail) {
        logLinha('    ↳', falha.detail);
      }
    }
    console.log('');
    logLinha('👉', 'Corrija as falhas acima e rode novamente: npm run generate:vhs');
  } else {
    logLinha('✅', 'Todas as demonstracoes foram geradas com sucesso.');
    logLinha('👉', 'Proximo passo: npm run verify:gifs');
  }

  logSeparador();

  return falhas.length === 0 ? 0 : 1;
}

async function principal() {
  let estadoDoStreamer = null;
  let agentesEscondidos = [];
  let monitorDeProgresso = null;

  imprimirContextoDeExecucao();
  verificarDependenciasGeracao();
  verificarCompatibilidadeWindowsVhs();

  try {
    estadoDoStreamer = ativarModoStreamer();
    agentesEscondidos = ocultarAgentesPessoais();

    console.log('');

    const arquivosTape = resolverArquivosTape();
    if (arquivosTape.length === 0) {
      logLinha('⚠️', 'Nenhum arquivo .tape foi encontrado.');
      return 0;
    }

    logLinha('📼', `Tapes encontrados: ${arquivosTape.length}`);
    for (const arquivoTape of arquivosTape) {
      logLinha('  🟢', relative(diretorioRaiz, arquivoTape));
    }

    const wrapperCopilot = configurarWrapperCopilot();
    const janelaEstimativa = estimarJanelaDeExecucao(arquivosTape, concurrencia);
    monitorDeProgresso = criarMonitorDeProgresso(arquivosTape.length, janelaEstimativa.primeiroResultado);

    console.log('');
    // Troca esse emoji feio
    logLinha('✨', `Wrapper do Copilot configurado com --yolo e --allow-all-paths (${wrapperCopilot.binarios.display})`);
    logLinha('⏱️ ', `Estimativa: primeiro resultado em ~${formatarDuracao(janelaEstimativa.primeiroResultado)} e lote completo em ~${formatarDuracao(janelaEstimativa.totalEstimado)}`
    );
    logLinha('🚀', `Iniciando gravacao com ${concurrencia} processo(s) em paralelo...`);
    console.log('');

    const momentoZero = Date.now();
    const tarefas = arquivosTape.map(
      arquivoTape => () => rodarVhs(arquivoTape, wrapperCopilot.caminhoDoPath, monitorDeProgresso)
    );
    monitorDeProgresso.iniciarHeartbeat();
    const resultados = await executarComConcorrencia(tarefas, concurrencia);
    monitorDeProgresso.pararHeartbeat();
    const tempoTotal = ((Date.now() - momentoZero) / 1000).toFixed(0);

    return imprimirResumo(resultados, tempoTotal);
  } finally {
    if (monitorDeProgresso) {
      monitorDeProgresso.pararHeartbeat();
    }
    limparWrapperCopilot();
    restaurarAgentesPessoais(agentesEscondidos);
    restaurarModoStreamer(estadoDoStreamer);
  }
}

principal()
  .then(codigo => process.exit(codigo))
  .catch(error => {
    console.error('');
    logCabecalho('❌', 'Falha inesperada durante a geracao');
    logLinha('↳', resumirTexto(error && error.stack ? error.stack : String(error), 6));
    limparWrapperCopilot();
    process.exit(1);
  });
