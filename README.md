![GitHub Copilot CLI para Iniciantes](./images/copilot-banner.png)

[![Licença: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](./LICENSE)&ensp;
[![Abrir projeto no GitHub Codespaces](https://img.shields.io/badge/Codespaces-Open-blue?style=flat-square&logo=github)](https://codespaces.new/github/copilot-cli-for-beginners?hide_repo_select=true&ref=main&quickstart=true)&ensp;
[![Documentação oficial do Copilot CLI](https://img.shields.io/badge/GitHub-CLI_Documentation-00a3ee?style=flat-square&logo=github)](https://docs.github.com/en/copilot/how-tos/copilot-cli)&ensp;
[![Junte-se ao Discord da AI Foundry](https://img.shields.io/badge/Discord-AI_Community-blue?style=flat-square&logo=discord&color=5865f2&logoColor=fff)](https://aka.ms/foundry/discord)

🎯 [O Que Você Vai Aprender](#o-que-você-vai-aprender) &ensp; ✅ [Pré-requisitos](#pré-requisitos) &ensp; 🤖 [Família Copilot](#entendendo-a-família-github-copilot) &ensp; 📚 [Estrutura do Curso](#estrutura-do-curso) &ensp; 📋 [Referência de Comandos](#-referência-de-comandos-do-github-copilot-cli)

# GitHub Copilot CLI para Iniciantes

> **✨ Aprenda a turbinar o seu fluxo de trabalho de desenvolvimento com assistência por IA baseada em linha de comando.**

O GitHub Copilot CLI traz a assistência da IA diretamente para o seu terminal. Ao invés de alternar para um navegador ou editor de código, você pode fazer perguntas, gerar aplicações completas, revisar código, gerar testes e depurar problemas sem sair da sua linha de comando.

Pense nisso como ter um colega experiente disponível 24/7 que pode ler o seu código, explicar padrões confusos e ajudar você a trabalhar mais rápido!

Este curso foi criado para:

- **Desenvolvedores de Software** que desejam usar IA a partir da linha de comando
- **Usuários de terminal** que preferem fluxos baseados em teclado em vez de integrações de IDE
- **Equipes buscando padronizar** práticas de desenvolvimento e revisão de código assistidas por IA

<a href="https://aka.ms/githubcopilotdevdays" target="_blank">
  <picture>
    <img src="./images/copilot-dev-days.png" alt="GitHub Copilot Dev Days - Encontre ou hospede um evento" width="100%" />
  </picture>
</a>

## 🎯 O Que Você Vai Aprender

Este curso prático leva você do zero à produtividade com o GitHub Copilot CLI. Você trabalhará com um único aplicativo Python de coleção de livros em todos os capítulos, melhorando-o progressivamente usando fluxos de trabalho assistidos por IA. Ao final, você usará a IA com confiança para revisar código, gerar testes, depurar problemas e automatizar fluxos: tudo no seu terminal.

**Nenhuma experiência prévia com IA é necessária.** Se você consegue usar um terminal, você consegue aprender isso.

**Perfeito para:** Desenvolvedores, estudantes e qualquer pessoa que tenha experiência com desenvolvimento de software.

## ✅ Pré-requisitos

Antes de começar, certifique-se de que você tem:

- **Conta no GitHub**: [Crie a sua gratuitamente](https://github.com/signup)<br>
- **Acesso ao GitHub Copilot**: [Plano Gratuito](https://github.com/features/copilot/plans), [Assinatura Mensal](https://github.com/features/copilot/plans), ou [Gratuito para estudantes/professores](https://education.github.com/pack)<br>
- **GitHub Copilot CLI Instalado**:
  - **NPM (Global)**: `npm install -g @githubnext/github-copilot-cli`
  - **macOS / Linux**: `brew install github/gh/copilot`
  - **Windows**: `winget install --id GitHub.copilot`
  - _Ou siga a [documentação oficial de instalação](https://docs.github.com/en/copilot/github-copilot-in-the-cli) para o seu sistema._
- **Noções básicas de terminal**: Conforto com `cd`, `ls`, executar comandos

## 🤖 Entendendo a Família GitHub Copilot

O GitHub Copilot evoluiu para uma família de ferramentas alimentadas por IA. Veja onde cada uma delas atua:

| Produto | Onde Atua | Descrição |
|---------|---------------|----------|
| [**GitHub Copilot CLI**](https://docs.github.com/copilot/how-tos/copilot-cli/cli-getting-started)<br>(este curso) | Seu terminal |  Assistente nativo de codificação por IA via terminal  |
| [**GitHub Copilot**](https://docs.github.com/copilot) | VS Code, Visual Studio, JetBrains, etc. | Modo agente, chat, sugestões inline  |
| [**Copilot no GitHub.com**](https://github.com/copilot) | GitHub | Chat imersivo sobre seus repositórios, criação de agentes e mais |
| [**Agente de codificação GitHub Copilot**](https://docs.github.com/copilot/using-github-copilot/using-copilot-coding-agent-to-work-on-tasks) | GitHub  | Atribua issues a agentes e receba PRs de volta |

Este curso foca no **GitHub Copilot CLI**, trazendo a assistência da IA diretamente para o seu terminal.

## 📚 Estrutura do Curso

![Trilha de Aprendizagem do GitHub Copilot CLI](images/learning-path.png)

| Capítulo | Título | O Que Você Vai Construir |
|:-------:|-------|-------------------|
| 00 | 🚀 [Início Rápido](./00-quick-start/README.md) | Instalação e verificação |
| 01 | 👋 [Primeiros Passos](./01-setup-and-first-steps/README.md) | Demonstrações ao vivo + três modos de interação |
| 02 | 🔍 [Contexto e Conversas](./02-context-conversations/README.md) | Análise de projetos com múltiplos arquivos |
| 03 | ⚡ [Fluxos de Desenvolvimento](./03-development-workflows/README.md) | Revisão de código, debug, geração de testes |
| 04 | 🤖 [Crie Assistentes de IA Especializados](./04-agents-custom-instructions/README.md) | Agentes personalizados para o seu fluxo |
| 05 | 🛠️ [Automatize Tarefas Repetitivas](./05-skills/README.md) | Skills que são carregadas automaticamente |
| 06 | 🔌 [Conecte-se ao GitHub, Bancos de Bancos e APIs](./06-mcp-servers/README.md) | Integração com Servidores MCP |
| 07 | 🎯 [Juntando Tudo](./07-putting-it-together/README.md) | Fluxos completos de funcionalidades |

## 📖 Como Este Curso Funciona

Cada capítulo segue o mesmo padrão:

1. **Analogia do Mundo Real**: Entenda o conceito através de comparações familiares
2. **Conceitos Principais**: Aprenda o conhecimento essencial
3. **Exemplos Práticos**: Execute comandos reais e veja os resultados
4. **Tarefa**: Pratique o que você aprendeu
5. **O Que Vem a Seguir**: Uma prévia do próximo capítulo

**Estes exemplos de código são executáveis.** Cada bloco de texto de copilot neste curso pode ser copiado e executado no seu terminal.

## 📋 Referência de Comandos do GitHub Copilot CLI

A **[Referência de comandos do GitHub Copilot CLI](https://docs.github.com/en/copilot/reference/cli-command-reference)** ajuda você a encontrar comandos e atalhos de teclado para utilizar o Copilot CLI de forma eficaz.

## 🛠️ Build e Contribuição

Se você deseja contribuir para o curso e precisa gerar as demonstrações em GIF localmente (`npm run release`), precisará instalar algumas ferramentas adicionais usadas pelo script de build:

- **[VHS](https://github.com/charmbracelet/vhs)**: Usado para gravar as interações do terminal.
  - **Windows**: `winget install charmbracelet.vhs`
  - **macOS / Linux**: `brew install vhs`
- **Tesseract OCR**: Dependência necessária para o funcionamento estrutural do VHS.
  - **Windows**: `winget install -e --id UB-Mannheim.TesseractOCR`
    - *(Nota 1: Após instalar, verifique se `C:\Program Files\Tesseract-OCR` foi adicionado às Variáveis de Ambiente do sistema em `PATH`)*
    - *(Nota 2: se o `winget` retornar erro `403 Proibido`, [baixe o instalador 64-bits manualmente aqui](https://github.com/UB-Mannheim/tesseract/wiki))*
  - **macOS**: `brew install tesseract`
  - **Linux**: `sudo apt install tesseract-ocr`
- **FFmpeg**: Necessário para manipular e encapsular os arquivos de vídeo/GIF finais gerados pelo VHS.
  - **Windows**: `winget install ffmpeg`
  - **macOS**: `brew install ffmpeg`
  - **Linux**: `sudo apt install ffmpeg`

**Como fazer o Build:**
```bash
npm install
npm run release
```

## 🙋 Obtendo Ajuda

- 🐛 **Encontrou um erro?** [Abra uma Issue](https://github.com/github/copilot-cli-for-beginners/issues)
- 🤝 **Quer contribuir?** PRs são bem-vindos!
- 📚 **Documentação Oficial:** [Documentação do GitHub Copilot CLI](https://docs.github.com/copilot/concepts/agents/about-copilot-cli)

## Licença

Este projeto é licenciado sob os termos da licença de código aberto MIT. Por favor, consulte o arquivo [LICENSE](./LICENSE) para ver os termos completos.

