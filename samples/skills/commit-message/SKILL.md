---
name: commit-message
description: Generate conventional commit messages - use when creating commits, writing commit messages, or asking for git commit help
---

# Skill de Mensagens de Commit

Gere mensagens de commit seguindo a especificação Conventional Commits.

## Formato

```
<type>(<scope>): <description>

[corpo opcional]

[rodapé opcional]
```

## Tipos

| Tipo | Quando usar |
|------|-------------|
| `feat` | Nova funcionalidade |
| `fix` | Correção de bug |
| `docs` | Somente documentação |
| `style` | Formatação (sem mudança de código) |
| `refactor` | Mudança de código que não corrige nem adiciona funcionalidade |
| `perf` | Melhoria de desempenho |
| `test` | Adição ou atualização de testes |
| `chore` | Tarefas de manutenção |

## Regras

1. Linha de assunto com no máximo 72 caracteres
2. Use o imperativo ("add" em vez de "added" ou "adds")
3. Sem ponto final na linha de assunto
4. Separe assunto e corpo com uma linha em branco
5. O corpo explica **o que** e **por que**, não como

## Exemplos

Simples:
```
fix(auth): prevent redirect loop on expired sessions
```

Com corpo:
```
feat(api): add rate limiting to public endpoints

- Limits requests to 100/minute per IP
- Returns 429 status with retry-after header
- Configurable via RATE_LIMIT_MAX env variable

Closes #234
```
