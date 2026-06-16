# AGENTS.md

(Tradução pt-BR aplicada apenas ao conteúdo explicativo — títulos e instruções; nomes técnicos e paths preservados)

Curso voltado para iniciantes que ensina o GitHub Copilot CLI. Conteúdo educacional, não um produto de software.

## Estrutura

| Path | Purpose |
|------|---------|
| `00-07/` | Chapters: analogy → concepts → hands-on → assignment → next |
| `samples/book-app-project/` | **Primary sample**: Python CLI book collection app used throughout all chapters |
| `samples/book-app-project-cs/` | C# version of the book collection app |
| `samples/book-app-project-js/` | JavaScript version of the book collection app |
| `samples/book-app-buggy/` | **Intentional bugs** for debugging exercises (Ch 03) |
| `samples/agents/` | Agent template examples (python-reviewer, pytest-helper, hello-world) |
| `samples/skills/` | Skill template examples (code-checklist, pytest-gen, commit-message, hello-world) |
| `samples/mcp-configs/` | MCP server configuration examples |
| `samples/buggy-code/` | **Optional extra**: Security-focused buggy code (JS and Python) |
| `samples/src/` | **Optional extra**: Legacy JS/React samples from earlier course version |
| `appendices/` | Supplementary reference material |

## Fazer (Boas práticas)

- Mantenha explicações amigáveis para iniciantes; explique jargões de AI/ML quando usados
- Garanta que exemplos em bash sejam prontos para copiar e colar
- Tom: amigável, encorajador e prático
- Use caminhos em `samples/book-app-project/` em todos os exemplos principais
- Use contexto Python/pytest para exemplos de código

## Não Fazer

- Corrigir bugs em `samples/book-app-buggy/` ou `samples/buggy-code/` — são intencionais
- Adicionar capítulos sem atualizar a tabela do curso em README.md
- Assumir que os leitores conhecem a terminologia de AI/ML

## Build

```bash
npm install && npm run release
```
