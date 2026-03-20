#!/usr/bin/env node
/**
 * Faz varredura nos arquivos README dos capítulos e extrai comandos de demonstração do copilot
 * Atualiza .github/scripts/demos.json com os comandos encontrados
 *
 * Uso: npm run scan:demos
 *
 * Para marcar um comando como a demonstração principal do capítulo, adicione um comentário:
 *   <!-- demo: nome-da-demo-do-capitulo -->
 *   ```bash
 *   copilot -p "seu comando"
 *   ```
 *
 * Ou ele usará o primeiro comando 'copilot -p' encontrado em cada capítulo.
 */

const { readFileSync, writeFileSync, readdirSync, existsSync } = require('fs');
const { join } = require('path');

const diretorioRaiz = join(__dirname, '..', '..');
const caminhoDemosJson = join(__dirname, 'demos.json');

// Configurações padrão para as gravações (tapes) geradas
const configuracoesPadrao = {
  fontSize: 18,
  width: 1000,
  height: 600,
  theme: "Dracula",
  typingSpeed: "60ms",
  framerate: 15,
  startupWait: 5,
  responseWait: 25,
  exitWait: 2
};

// Encontrar todos os diretórios de capítulo (padrão XX-nome-do-capitulo)
function encontrarCapitulos() {
  return readdirSync(diretorioRaiz)
    .filter(nome => /^\\d{2}-/.test(nome))
    .filter(nome => existsSync(join(diretorioRaiz, nome, 'README.md')))
    .sort();
}

// Extrai comandos de comando do copilot a partir do conteúdo markdown
function extrairComandosCopilot(conteudo) {
  const comandos = [];

  // Procura primeiro por demos marcadas: <!-- demo: nome -->
  const regexDemoMarcadas = /<!--\\s*demo:\\s*([^\\s]+)\\s*-->\\s*```(?:bash|shell)?\\s*([\\s\\S]*?)```/gi;
  let correspondencia;
  while ((correspondencia = regexDemoMarcadas.exec(conteudo)) !== null) {
    const nome = correspondencia[1];
    const blocoDeCodigo = correspondencia[2].trim();
    const correspondenciaCopilot = blocoDeCodigo.match(/copilot(?:\\s+-p\\s+["'](.+?)["']|\\s*$)/);
    if (correspondenciaCopilot) {
      comandos.push({
        name: nome,
        prompt: correspondenciaCopilot[1] || null,
        isInteractive: !correspondenciaCopilot[1],
        marked: true
      });
    }
  }

  // Se não ouver demos marcadas, procura por todos os comandos copilot -p
  if (comandos.length === 0) {
    // Corresponde a copilot -p "..." ou copilot -p '...'
    const regexProgramatica = /copilot\\s+-p\\s+["']([^"']+)["']/g;
    while ((correspondencia = regexProgramatica.exec(conteudo)) !== null) {
      comandos.push({
        prompt: correspondencia[1],
        isInteractive: false,
        marked: false
      });
    }
  }

  return comandos;
}

// Gera nome de demo a partir do nome do capítulo
function gerarNomeDemo(capitulo) {
  // 00-quick-start -> quick-start-demo
  return capitulo.replace(/^\\d+-/, '') + '-demo';
}

// Extrai descrição do título do capítulo
function extrairDescricao(conteudo) {
  const correspondenciaDeTitulo = conteudo.match(/^#\\s+(.+)$/m);
  if (correspondenciaDeTitulo) {
    // "Capítulo 01: Primeiros Passos" -> "Primeiros Passos" (Chapter 01...)
    return correspondenciaDeTitulo[1].replace(/^(Chapter|Capítulo)\\s+\\d+:\\s*/, '').trim();
  }
  return 'Demonstração';
}

// Principal
console.log('🔍 Escaneando capítulos procurando por comandos do copilot...\\n');

const capitulos = encontrarCapitulos();
const demonstracoes = [];

for (const capitulo of capitulos) {
  const caminhoReadme = join(diretorioRaiz, capitulo, 'README.md');
  const conteudo = readFileSync(caminhoReadme, 'utf8');

  const comandos = extrairComandosCopilot(conteudo);
  const descricao = extrairDescricao(conteudo);

  if (comandos.length > 0) {
    // Usa o primeiro (ou o comando marcado)
    const cmd = comandos.find(c => c.marked) || comandos[0];
    const demoNome = cmd.name || gerarNomeDemo(capitulo);

    const demo = {
      chapter: capitulo,
      name: demoNome,
      description: descricao + ' demo'
    };

    if (cmd.prompt) {
      demo.prompt = cmd.prompt;
    } else {
      demo.prompt = "No que você pode me ajudar? Dê um breve resumo.";
      demo.note = "Modo interativo - personalize este prompt";
    }

    demonstracoes.push(demo);
    console.log(`  ✓ ${capitulo}`);
    console.log(`    └─ "${demo.prompt.substring(0, 60)}${demo.prompt.length > 60 ? '...' : ''}"`);
  } else {
    console.log(`  ⚠ ${capitulo} - Nenhum comando copilot encontrado`);
  }
}

// Escrever demos.json
// Perceba que as chaves usadas aqui correspondem às do idioma do repositório para o script.
// Se mudarmos essas chaves que são escritas para pt, então geraria o arquivo demos.json com as chaves em ingles que não funcionariam dps com o pt (chapter/name/description).
// Como alteramos no demos.json para ("capitulo", "nome", "descricao"), precisamos fazer essa alteracao também no json gerado.

const saida = {
  configuracoes: {
    tamanhoDaFonte: configuracoesPadrao.fontSize,
    largura: configuracoesPadrao.width,
    altura: configuracoesPadrao.height,
    tema: configuracoesPadrao.theme,
    velocidadeDeDigitacao: configuracoesPadrao.typingSpeed,
    taxaDeQuadros: configuracoesPadrao.framerate,
    esperaDeInicializacao: configuracoesPadrao.startupWait,
    esperaDaResposta: configuracoesPadrao.responseWait,
    esperaDeSaida: configuracoesPadrao.exitWait
  },
  demonstracoes: demonstracoes.map(d => ({
    capitulo: d.chapter,
    nome: d.name,
    descricao: d.description.replace('demo', 'demonstração'),
    prompt: d.prompt,
    ...(d.note ? { nota: d.note.replace('Interactive mode - customize this prompt', 'Modo interativo - personalize esse prompt') } : {})
  }))
};

writeFileSync(caminhoDemosJson, JSON.stringify(saida, null, 2) + '\\n');

console.log(`\\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━`);
console.log(`✓ Encontrada(s) ${demonstracoes.length} demonstrações`);
console.log(`✓ .github/scripts/demos.json atualizado`);
console.log(`━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━`);
console.log(`\\nPróximos passos:`);
console.log(`  1. Revise/edite .github/scripts/demos.json`);
console.log(`  2. npm run create:tapes`);
console.log(`  3. npm run generate:vhs`);
