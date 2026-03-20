# AGENTS.md

Curso amigável para iniciantes ensinando o GitHub Copilot CLI. Conteúdo educacional, não de software.

## Estrutura

| Caminho | Propósito |
|------|---------|
| `00-07/` | Capítulos: analogia → conceitos → prática → tarefa → próximo |
| `samples/book-app-project/` | **Exemplo principal**: App CLI em Python de coleção de livros, usado em todos os capítulos |
| `samples/book-app-project-cs/` | Versão em C# do app de coleção de livros |
| `samples/book-app-project-js/` | Versão em JavaScript do app de coleção de livros |
| `samples/book-app-buggy/` | **Bugs intencionais** para exercícios de depuração (Capítulo 03) |
| `samples/agents/` | Exemplos de templates de agentes (python-reviewer, pytest-helper, hello-world) |
| `samples/skills/` | Exemplos de templates de skills (code-checklist, pytest-gen, commit-message, hello-world) |
| `samples/mcp-configs/` | Exemplos de configuração de servidor MCP |
| `samples/buggy-code/` | **Extra opcional**: Código bugado com foco em segurança (JS e Python) |
| `samples/src/` | **Extra opcional**: Aplicações legadas em JS/React de uma versão anterior do curso |
| `appendices/` | Material de referência complementar |

## O que Fazer (Do)

- Mantenha as explicações amigáveis para iniciantes; explique o jargão de IA/ML quando utilizado
- Garanta que os exemplos em bash estejam prontos para copiar e colar
- Tom: amigável, encorajador, prático
- Use os caminhos `samples/book-app-project/` em todos os exemplos principais
- Use o contexto de Python/pytest para os exemplos de código

## O que Não Fazer (Don't)

- Consertar bugs em `samples/book-app-buggy/` ou `samples/buggy-code/` — eles são intencionais
- Adicionar capítulos sem atualizar a tabela do curso no README.md
- Assumir que os leitores conhecem a terminologia de IA/ML

## Build

```bash
npm install && npm run release
```
