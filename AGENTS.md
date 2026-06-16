# AGENTS.md

(Tradução pt-BR aplicada apenas ao conteúdo explicativo — títulos e instruções; nomes técnicos e paths preservados)

Curso voltado para iniciantes que ensina o GitHub Copilot CLI. Conteúdo educacional, não um produto de software.

## Estrutura

| Path | Propósito |
|------|-----------|
| `00-07/` | Capítulos: analogia → conceitos → prática → tarefa → próximo passo |
| `samples/book-app-project/` | **Amostra principal**: app CLI de coleção de livros em Python usado em todos os capítulos |
| `samples/book-app-project-cs/` | Versão em C# do app de coleção de livros |
| `samples/book-app-project-js/` | Versão em JavaScript do app de coleção de livros |
| `samples/book-app-buggy/` | **Bugs intencionais** para exercícios de depuração (Cap. 03) |
| `samples/agents/` | Exemplos de modelos de agents (python-reviewer, pytest-helper, hello-world) |
| `samples/skills/` | Exemplos de modelos de skills (code-checklist, pytest-gen, commit-message, hello-world) |
| `samples/mcp-configs/` | Exemplos de configuração de servidores MCP |
| `samples/buggy-code/` | **Extra opcional**: código buggy com foco em segurança (JS e Python) |
| `samples/src/` | **Extra opcional**: amostras legadas em JS/React de versão anterior do curso |
| `appendices/` | Material de referência suplementar |

## Fazer (Boas práticas)

- Mantenha explicações amigáveis para iniciantes; explique jargões de AI/ML quando usados
- Garanta que exemplos em bash sejam prontos para copiar e colar
- Tom: amigável, encorajador e prático
- Use caminhos em `samples/book-app-project/` em todos os exemplos principais
- Use contexto Python/pytest para exemplos de código

## Regra para leitura de arquivos

Quando usar a ferramenta `read`, prefira ler arquivos inteiros sempre que possível com `offset=1` e `limit=700`. Para arquivos grandes, leia em blocos de 700 linhas e informe claramente o intervalo lido. Não use `limit` pequeno de forma conservadora quando o arquivo parece ter poucas linhas.

## Não Fazer

- Corrigir bugs em `samples/book-app-buggy/` ou `samples/buggy-code/` — são intencionais
- Adicionar capítulos sem atualizar a tabela do curso em README.md
- Assumir que os leitores conhecem a terminologia de AI/ML

## Build

```bash
npm install && npm run release
```
