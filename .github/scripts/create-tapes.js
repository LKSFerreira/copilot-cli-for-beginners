#!/usr/bin/env node
/**
 * Gera arquivos .tape da configuração demos.json
 *
 * Suporta demos de prompt único e de múltiplos prompts:
 *   - "prompt": "texto"              → prompt único
 *   - "prompts": ["a", "b"]         → múltiplos prompts (esperaDaResposta como padrão em cada um)
 *   - "prompts": [{ "texto": "a", "esperaDaResposta": 10 }, "b"]  → misto com substituição (overrides)
 *
 * Uso: npm run create:tapes
 */

const { writeFileSync, mkdirSync, existsSync } = require('fs');
const { join } = require('path');

const diretorioRaiz = join(__dirname, '..', '..');
const configuracao = require('./demos.json');

function gerarBlocoDePrompt(entrada, esperaPadrao, indice) {
  const texto = typeof entrada === 'string' ? entrada : entrada.texto;
  const espera = (typeof entrada === 'object' && entrada.esperaDaResposta) || esperaPadrao;
  const selecionarAgente = typeof entrada === 'object' && entrada.selecionarAgente;
  const rotulo = indice != null ? `Prompt ${indice + 1}` : 'Executar o prompt';

  // Seleção de agente: digite /agent, espere pelo seletor, seta pra baixo até o agente, selecione
  if (selecionarAgente) {
    const setaPraBaixo = (typeof entrada === 'object' && entrada.setaPraBaixo) || 0;
    const blocoDeSeta = setaPraBaixo > 0 ? `Down ${setaPraBaixo}\nSleep 1s\n` : '';
    return `# ${rotulo} - Selecionar agente ${selecionarAgente}
Type "${texto}"
Sleep 1s
Enter

# Esperar pelo seletor de agentes
Sleep 3s
${blocoDeSeta}Enter

# Esperar o agente carregar
Sleep ${espera}s`;
  }

  // Se o prompt terminar com referência a um arquivo (@caminho), o seletor de arquivos irá abrir.
  // Precisamos de um Enter extra para selecionar o arquivo antes de submeter o prompt.
  const terminaComReferenciaDeArquivo = /@\S+$/.test(texto);
  const blocoDeEnter = terminaComReferenciaDeArquivo
    ? 'Enter\nSleep 1s\nEnter'
    : 'Enter';

  // Comando Type do VHS precisa ser em linha única; separa prompts de múltiplas linhas
  const linhas = texto.split('\n');
  let blocoDeDigitacao;
  if (linhas.length > 1) {
    blocoDeDigitacao = linhas
      .map((linha, i) => i < linhas.length - 1 ? `Type "${linha}"\nEnter` : `Type "${linha}"`)
      .join('\n');
  } else {
    blocoDeDigitacao = `Type "${texto}"`;
  }

  // Quebra a espera da resposta em partes separadas com pequenos empurrões visuais (nudges) ocultos.
  // Um espaço + backspace invisível obriga a TUI do copilot a rolar para a área do input.
  const intervaloDeImpulso = 3;
  let blocoDeEspera = '';
  let restante = espera;
  while (restante > intervaloDeImpulso) {
    blocoDeEspera += `Sleep ${intervaloDeImpulso}s\nHide\nType " "\nBackspace\nShow\n`;
    restante -= intervaloDeImpulso;
  }
  if (restante > 0) {
    blocoDeEspera += `Sleep ${restante}s`;
  }

  return `# ${rotulo}
${blocoDeDigitacao}
Sleep 2s
${blocoDeEnter}

# Esperar a resposta (com toques periódicos para manter o input visível)
${blocoDeEspera}`;
}

function gerarConteudoTape(demonstracao, configuracoes) {
  const c = { ...configuracoes, ...demonstracao }; // Permite redefinições específicas por demonstação

  // Montar os blocos de prompt tanto a partir do "prompt" (único) quanto dos "prompts" (array)
  let blocosDePrompt;
  if (demonstracao.prompts && Array.isArray(demonstracao.prompts)) {
    blocosDePrompt = demonstracao.prompts
      .map((entrada, i) => gerarBlocoDePrompt(entrada, c.esperaDaResposta, i))
      .join('\n\n');
  } else {
    blocosDePrompt = gerarBlocoDePrompt(demonstracao.prompt, c.esperaDaResposta);
  }

  return `# ${demonstracao.capitulo}: ${demonstracao.descricao}
# Gerado automaticamente a partir de demos.json - Execução real do copilot

Output ${demonstracao.nome}.gif

Set FontSize ${c.tamanhoDaFonte}
Set Width ${c.largura}
Set Height ${c.altura}
Set Theme "${c.tema}"
Set Padding 20
Set BorderRadius 8
Set Margin 10
Set MarginFill "#282a36"
Set Framerate ${c.taxaDeQuadros}

# Velocidade de digitação humana
Set TypingSpeed ${c.velocidadeDeDigitacao}

# Iniciar copilot
Type "copilot"
Enter

# Esperar o copilot iniciar
Sleep ${c.esperaDeInicializacao}s

${blocosDePrompt}

# Pequeno toque visual (Nudge) para manter a TUI na área de texto
Type " "
Backspace
Sleep ${c.esperaDeSaida}s

# Sair de maneira limpa
Ctrl+C
Sleep 1s
`;
}

// Principal
console.log('📝 Criando arquivos de gravação tape a partir do demos.json...\n');

let criados = 0;

for (const demonstracao of configuracao.demonstracoes) {
  const diretorioImagens = join(diretorioRaiz, demonstracao.capitulo, 'images');
  const caminhoTape = join(diretorioImagens, `${demonstracao.nome}.tape`);

  // Certifique-se de que a pasta de imagens exista
  if (!existsSync(diretorioImagens)) {
    mkdirSync(diretorioImagens, { recursive: true });
    console.log(`  🟢 ${demonstracao.capitulo}/images/`);
  }

  // Gere o conteúdo da gravacao (tape)
  const conteudo = gerarConteudoTape(demonstracao, configuracao.configuracoes);

  // Escrever arquivo tape
  writeFileSync(caminhoTape, conteudo);
  console.log(`  ✅ ${demonstracao.capitulo}/images/${demonstracao.nome}.tape`);
  criados++;
}

console.log(`\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━`);
console.log(`✅ Criado(s) ${criados} arquivo(s) tape`);
console.log(`━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━`);
console.log(`\nPróximo passo: npm run generate:vhs`);
