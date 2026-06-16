<!--
---
id: CopilotCLI-ROOT
title: !translate GitHub Copilot CLI para Iniciantes
description: !translate Aprenda a potencializar seu fluxo de desenvolvimento com assistência de linha de comando baseada em IA diretamente do terminal.
audience: Desenvolvedores / Estudantes / Usuários de terminal
slug: copilot-cli-for-beginners
weight: 0
---
-->

![GitHub Copilot CLI para Iniciantes](./assets/copilot-banner.png)

[![Licença: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](./LICENSE)&ensp;
[![Abrir projeto no GitHub Codespaces](https://img.shields.io/badge/Codespaces-Open-blue?style=flat-square&logo=github)](https://codespaces.new/github/copilot-cli-for-beginners?hide_repo_select=true&ref=main&quickstart=true)&ensp;
[![Documentação oficial do Copilot CLI](https://img.shields.io/badge/GitHub-CLI_Documentation-00a3ee?style=flat-square&logo=github)](https://docs.github.com/en/copilot/how-tos/copilot-cli)&ensp;
[![Entrar no Discord da AI Foundry](https://img.shields.io/badge/Discord-AI_Community-blue?style=flat-square&logo=discord&color=5865f2&logoColor=fff)](https://aka.ms/foundry/discord)

🎯 [O que você vai aprender](#what-youll-learn) &ensp; ✅ [Pré-requisitos](#prerequisites) &ensp; 🤖 [Família Copilot](#understanding-the-github-copilot-family) &ensp; 📚 [Estrutura do curso](#course-structure) &ensp; 📋 [Referência de comandos](#-github-copilot-cli-command-reference)

# GitHub Copilot CLI para Iniciantes

> **✨ Aprenda a potencializar seu fluxo de desenvolvimento com assistência por IA diretamente no terminal.**

O GitHub Copilot CLI traz assistência por IA diretamente ao seu terminal. Em vez de alternar para um navegador ou editor de código, você pode fazer perguntas, gerar aplicações completas, revisar código, gerar testes e depurar problemas sem sair da linha de comando.

Pense nele como um colega experiente disponível 24/7 que pode ler seu código, explicar padrões confusos e ajudar você a trabalhar mais rápido!

> 📘 **Prefere a experiência web?** Você pode acompanhar este curso aqui mesmo no GitHub ou vê-lo em [Awesome Copilot](https://awesome-copilot.github.com/learning-hub/cli-for-beginners/) para uma experiência de navegação mais tradicional.

Este curso foi criado para:

- **Desenvolvedores de software** que querem usar IA pela linha de comando
- **Usuários de terminal** que preferem fluxos orientados por teclado a integrações com IDE
- **Equipes que buscam padronizar** práticas de revisão de código e desenvolvimento assistidas por IA

<a name="what-youll-learn"></a>
## 🎯 O que você vai aprender

Este curso prático leva você do zero à produtividade com o GitHub Copilot CLI. Você trabalhará com um único app Python de coleção de livros ao longo de todos os capítulos, melhorando-o progressivamente com fluxos de trabalho assistidos por IA. Ao final, você usará com confiança a IA para revisar código, gerar testes, depurar problemas e automatizar fluxos — tudo a partir do terminal.

**Não é necessária experiência com IA.** Se você sabe usar um terminal, consegue aprender.

**Perfeito para:** desenvolvedores, estudantes e qualquer pessoa com experiência em desenvolvimento de software.

<a name="prerequisites"></a>
## ✅ Pré-requisitos

Antes de começar, garanta que você tem:

- **Conta GitHub**: [Crie uma gratuitamente](https://github.com/signup)<br>
- **Acesso ao GitHub Copilot**: [Oferta gratuita](https://github.com/features/copilot/plans), [assinatura mensal](https://github.com/features/copilot/plans) ou [gratuito para estudantes/professores](https://education.github.com/pack)<br>
- **Noções básicas de terminal**: familiaridade com `cd`, `ls` e execução de comandos

<a name="understanding-the-github-copilot-family"></a>
## 🤖 Entendendo a família GitHub Copilot

O GitHub Copilot evoluiu para uma família de ferramentas com IA. Veja onde cada uma atua:

| Produto | Onde é executado | Descrição |
|---------|---------------|----------|
| [**GitHub Copilot CLI**](https://docs.github.com/copilot/how-tos/copilot-cli/cli-getting-started)<br>(este curso) | Seu terminal | Assistente de codificação com IA nativo do terminal |
| [**GitHub Copilot**](https://docs.github.com/copilot) | VS Code, Visual Studio, JetBrains etc. | Modo agent, chat e sugestões inline |
| [**Copilot on GitHub.com**](https://github.com/copilot) | GitHub | Chat imersivo sobre seus repositórios, criação de agents e mais |
| [**GitHub Copilot cloud agent**](https://docs.github.com/copilot/using-github-copilot/using-copilot-coding-agent-to-work-on-tasks) | GitHub | Atribua issues a agents e receba PRs de volta |

Este curso foca no **GitHub Copilot CLI**, trazendo assistência por IA diretamente para o seu terminal.

<a name="course-structure"></a>
## 📚 Estrutura do curso

![Caminho de aprendizado do GitHub Copilot CLI](assets/learning-path.png)

| Capítulo | Título | O que você vai construir |
|:-------:|-------|-------------------|
| 00 | 🚀 [Início Rápido](./00-quick-start/README.md) | Instalação e verificação |
| 01 | 👋 [Primeiros Passos](./01-setup-and-first-steps/README.md) | Demos ao vivo + três modos de interação |
| 02 | 🔍 [Contexto e Conversas](./02-context-conversations/README.md) | Análise de projetos com múltiplos arquivos |
| 03 | ⚡ [Fluxos de Desenvolvimento](./03-development-workflows/README.md) | Revisão de código, depuração, geração de testes |
| 04 | 🤖 [Criar Assistentes de IA Especializados](./04-agents-custom-instructions/README.md) | Agents personalizados para seu fluxo de trabalho |
| 05 | 🛠️ [Automatize Tarefas Repetitivas](./05-skills/README.md) | Skills que carregam automaticamente |
| 06 | 🔌 [Conectar ao GitHub, Bancos de Dados & APIs](./06-mcp-servers/README.md) | Integração com servidores MCP |
| 07 | 🎯 [Colocando Tudo em Prática](./07-putting-it-together/README.md) | Fluxos de trabalho completos |

<a name="how-this-course-works"></a>
## 📖 Como este curso funciona

Cada capítulo segue o mesmo padrão:

1. **Analogia do mundo real**: Entenda o conceito por comparações familiares
2. **Conceitos principais**: Aprenda o conhecimento essencial
3. **Exemplos práticos**: Execute comandos reais e veja os resultados
4. **Exercício**: Pratique o que aprendeu
5. **O que vem a seguir**: Prévia do próximo capítulo

**Os exemplos de código são executáveis.** Todo bloco de texto do Copilot neste curso pode ser copiado e executado no seu terminal.

<a id="-github-copilot-cli-command-reference"></a>
## 📋 Referência de comandos do GitHub Copilot CLI

A **[referência de comandos do GitHub Copilot CLI](https://docs.github.com/en/copilot/reference/cli-command-reference)** ajuda você a encontrar comandos e atalhos de teclado para usar o Copilot CLI de forma eficaz.

<a name="getting-help"></a>
## 🙋 Obter ajuda

- 🐛 **Encontrou um bug?** [Abra uma issue](https://github.com/github/copilot-cli-for-beginners/issues)
- 📚 **Documentação oficial:** [Documentação do GitHub Copilot CLI](https://docs.github.com/copilot/concepts/agents/about-copilot-cli)

<a name="contributing"></a>
## Como contribuir

> **Observação**: O código usado no curso foi projetado para gerar tipos específicos de saída durante revisões, explicações e depuração, portanto não podemos aceitar PRs que alterem o código existente.

**Como contribuir:**

1. Faça um fork deste repositório e clone-o na sua máquina
2. Crie uma branch de funcionalidade (`git checkout -b minha-melhoria`)
3. Faça suas alterações
4. Envie um pull request

## Licença

Este projeto é licenciado sob os termos da licença de código aberto MIT. Consulte o arquivo [LICENSE](./LICENSE) para os termos completos.
