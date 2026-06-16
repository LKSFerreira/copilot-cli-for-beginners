<!--
---
id: CopilotCLI-Appendix-CI-CD-Integration
title: !translate Integração CI/CD
description: !translate Integre o GitHub Copilot CLI a workflows do GitHub Actions para revisões automatizadas de pull requests.
audience: Desenvolvedores / Estudantes / Usuários de terminal
slug: ci-cd-integration
weight: 91
---
-->

# Integração CI/CD

> 📖 **Pré-requisito**: Conclua o [Capítulo 07: Colocando tudo junto](../07-putting-it-together/README.md) antes de ler este apêndice.
>
> ⚠️ **Este apêndice é para equipes que já possuem pipelines de CI/CD.** Se você é novo em GitHub Actions ou em conceitos de CI/CD, comece com a abordagem mais simples de pre-commit hook na seção [Automação de revisão de código](../07-putting-it-together/README.md#workflow-2-code-review-automation-optional) do Capítulo 07.

Este apêndice mostra como integrar o GitHub Copilot CLI aos seus pipelines de CI/CD para revisão automatizada de código em pull requests.

---

## Workflow do GitHub Actions

Este workflow revisa automaticamente os arquivos alterados quando um pull request é aberto ou atualizado:

```yaml
# .github/workflows/copilot-review.yml
name: Copilot Review

on:
  pull_request:
    types: [opened, synchronize]

jobs:
  review:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
        with:
          fetch-depth: 0  # Needed to compare with main branch

      - name: Install Copilot CLI
        run: npm install -g @github/copilot

      - name: Review Changed Files
        env:
          GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
        run: |
          # Get list of changed JS/TS files
          FILES=$(git diff --name-only origin/main...HEAD | grep -E '\.(js|ts|jsx|tsx)$' || true)
          
          if [ -z "$FILES" ]; then
            echo "No JavaScript/TypeScript files changed"
            exit 0
          fi
          
          echo "# Copilot Code Review" > review.md
          echo "" >> review.md
          
          for file in $FILES; do
            echo "Reviewing $file..."
            echo "## $file" >> review.md
            echo "" >> review.md
            
            # Use --silent to suppress progress output
            copilot --allow-all -p "Quick security and quality review of @$file. List only critical issues." --silent >> review.md 2>/dev/null || echo "Review skipped" >> review.md
            echo "" >> review.md
          done

      - name: Post Review Comment
        uses: actions/github-script@v7
        with:
          script: |
            const fs = require('fs');
            const review = fs.readFileSync('review.md', 'utf8');
            
            // Only post if there's meaningful content
            if (review.includes('CRITICAL') || review.includes('HIGH')) {
              github.rest.issues.createComment({
                issue_number: context.issue.number,
                owner: context.repo.owner,
                repo: context.repo.repo,
                body: review
              });
            } else {
              console.log('No critical issues found, skipping comment');
            }
```

---

## Opções de configuração

### Limitando o escopo da revisão

Você pode concentrar a revisão em tipos específicos de problemas:

```yaml
# Security-only review
copilot --allow-all -p "Security review of @$file. Check for: SQL injection, XSS, hardcoded secrets, authentication issues." --silent

# Performance-only review
copilot --allow-all -p "Performance review of @$file. Check for: N+1 queries, memory leaks, blocking operations." --silent
```

### Lidando com PRs grandes

Para PRs com muitos arquivos, considere fazer lotes ou limitar a quantidade:

```yaml
# Limit to first 10 files
FILES=$(git diff --name-only origin/main...HEAD | grep -E '\.(js|ts)$' | head -10)

# Or set a timeout per file
timeout 60 copilot --allow-all -p "Review @$file" --silent || echo "Review timed out"
```

### Configuração da equipe

Para manter revisões consistentes em sua equipe, crie uma configuração compartilhada:

```json
// .copilot/config.json (committed to repo)
{
  "model": "claude-sonnet-4.5",
  "permissions": {
    "allowedPaths": ["src/**/*", "tests/**/*"],
    "deniedPaths": [".env*", "secrets/**/*", "*.min.js"]
  }
}
```

---

## Alternativa: bot de revisão de PR

Para workflows de revisão mais sofisticados, considere usar o GitHub Copilot cloud agent:

```yaml
# .github/workflows/copilot-agent-review.yml
name: Request Copilot Review

on:
  pull_request:
    types: [opened, ready_for_review]

jobs:
  request-review:
    runs-on: ubuntu-latest
    steps:
      - name: Request Copilot Review
        uses: actions/github-script@v7
        with:
          script: |
            await github.rest.pulls.requestReviewers({
              owner: context.repo.owner,
              repo: context.repo.repo,
              pull_number: context.issue.number,
              reviewers: ['copilot[bot]']
            });
```

---

## Boas práticas para integração CI/CD

1. **Use a flag `--silent`** - Suprime a saída de progresso para logs mais limpos
2. **Defina timeouts** - Evita que reviews travadas bloqueiem seu pipeline
3. **Filtre tipos de arquivo** - Revise apenas arquivos relevantes (ignore código gerado e dependências)
4. **Esteja ciente dos limites de taxa** - Espace reviews para PRs grandes
5. **Falhe de forma graciosa** - Não bloqueie merges por falhas na revisão; registre em log e continue

---

## Solução de problemas

### `"Authentication failed"` em CI

Garanta que seu workflow tenha as permissões corretas:

```yaml
permissions:
  contents: read
  pull-requests: write
  issues: write
```

### Reviews com timeout

Aumente o timeout ou reduza o escopo:

```bash
timeout 120 copilot --allow-all -p "Quick review of @$file - critical issues only" --silent
```

### Limites de token em arquivos grandes

Ignore arquivos muito grandes:

```bash
if [ $(wc -l < "$file") -lt 500 ]; then
  copilot --allow-all -p "Review @$file" --silent
else
  echo "Skipping $file (too large)"
fi
```

---

**[← Voltar ao Capítulo 07](../07-putting-it-together/README.md)** | **[Voltar aos Apêndices](README.md)**
