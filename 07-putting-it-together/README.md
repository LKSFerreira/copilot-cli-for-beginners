<!--
---
id: CopilotCLI-07
title: !translate Unindo Tudo
description: !translate Combine contexto, fluxos de trabalho, agents, skills e MCP em fluxos completos de desenvolvimento de funcionalidades, da ideia ao pull request.
audience: Desenvolvedores / Estudantes / Usuários de terminal
slug: putting-it-all-together
weight: 8
---
-->

![Capítulo 07: Unindo Tudo](assets/chapter-header.png)

> **Tudo o que você aprendeu se combina aqui. Vá da ideia ao PR mesclado em uma única sessão.**

Neste capítulo, você reunirá tudo o que aprendeu em fluxos de trabalho completos. Você desenvolverá funcionalidades usando colaboração com múltiplos agentes, configurará hooks de pre-commit que detectam problemas de segurança antes do commit, integrará o Copilot em pipelines de CI/CD e avançará da ideia até o PR mesclado em uma única sessão de terminal. É aqui que o GitHub Copilot CLI se torna um multiplicador real de produtividade.

> 💡 **Observação**: Este capítulo mostra como combinar tudo o que você aprendeu. **Você não precisa de agents, skills ou MCP para ser produtivo (embora possam ser muito úteis).** O fluxo principal — descrever, planejar, implementar, testar, revisar, entregar — funciona apenas com os recursos básicos dos Capítulos 00-03.

## 🎯 Objetivos de Aprendizagem

Ao final deste capítulo, você será capaz de:

- Combinar agents, skills e MCP (Model Context Protocol) em fluxos unificados
- Construir funcionalidades completas usando abordagens multi-ferramenta
- Configurar automações básicas com hooks
- Aplicar as melhores práticas para desenvolvimento profissional

> ⏱️ **Tempo estimado**: ~75 minutos (15 min leitura + 60 min prático)

---

## 🧩 Analogia do mundo real: A orquestra

<img src="assets/orchestra-analogy.png" alt="Analogia da orquestra — fluxo de trabalho unificado" width="800"/>

Uma orquestra sinfônica tem muitas seções:
- **Cordas** fornecem a base (como seus fluxos principais)
- **Metais** acrescentam potência (como agents com expertise especializada)
- **Madeiras** acrescentam cor (como skills que ampliam capacidades)
- **Percussão** mantém o ritmo (como MCP conectando-se a sistemas externos)

Individualmente, cada seção parece limitada. Juntas, bem regidas, criam algo magnífico.

**É isso que este capítulo ensina!**<br>
*Como um maestro com uma orquestra, você orquestra agents, skills e MCP em fluxos unificados*

Vamos começar percorrendo um cenário que modifica código, gera testes, faz revisão e cria um PR — tudo em uma sessão.

---

<a id="idea-to-merged-pr-in-one-session"></a>
## Da ideia ao PR mesclado em uma sessão

Em vez de alternar entre seu editor, terminal, test runner e GitHub UI e perder contexto a cada troca, você pode combinar todas as suas ferramentas em uma sessão de terminal. Vamos detalhar esse padrão na seção [Padrão de integração](#the-integration-pattern-for-power-users) abaixo.

```bash
# Start Copilot in interactive mode
copilot

> I need to add a "list unread" command to the book app that shows only
> books where read is False. What files need to change?

# Copilot creates high-level plan...

# SWITCH TO PYTHON-REVIEWER AGENT
> /agent
# Select "python-reviewer"

> @samples/book-app-project/books.py Design a get_unread_books method.
> What is the best approach?

# Python-reviewer agent produces:
# - Method signature and return type
# - Filter implementation using list comprehension
# - Edge case handling for empty collections

# SWITCH TO PYTEST-HELPER AGENT
> /agent
# Select "pytest-helper"

> @samples/book-app-project/tests/test_books.py Design test cases for
> filtering unread books.

# Pytest-helper agent produces:
# - Test cases for empty collections
# - Test cases with mixed read/unread books
# - Test cases with all books read

# IMPLEMENT
> Add a get_unread_books method to BookCollection in books.py
> Add a "list unread" command option in book_app.py
> Update the help text in the show_help function

# TEST
> Generate comprehensive tests for the new feature

# Multiple tests are generated similar to the following:
# - Happy path (3 tests) — filters correctly, excludes read, includes unread
# - Edge cases (4 tests) — empty collection, all read, none read, single book
# - Parametrized (5 cases) — varying read/unread ratios via @pytest.mark.parametrize
# - Integration (4 tests) — interplay with mark_as_read, remove_book, add_book, and data integrity

# Review the changes
> /review

# If review passes, use /pr to operate on the pull request for the current branch
> /pr [view|create|fix|auto]

# Or ask naturally if you want Copilot to draft it from the terminal
> Create a pull request titled "Feature: Add list unread books command"
```

**Abordagem tradicional**: alternar entre editor, terminal, test runner, documentação e GitHub UI. Cada troca causa perda de contexto e atrito.

**O insight principal**: você dirigiu especialistas como um arquiteto. Eles cuidaram dos detalhes. Você cuidou da visão.

> 💡 **Indo além**: Para planos multi-etapa grandes como este, experimente `/fleet` para permitir que o Copilot execute subtarefas independentes em paralelo. Consulte a [documentação oficial](https://docs.github.com/copilot/concepts/agents/copilot-cli/fleet) para mais detalhes.

---

# Fluxos de trabalho adicionais

<img src="assets/combined-workflows.png" alt="Pessoas montando um quebra-cabeça gigante colorido com engrenagens, representando como agents, skills e MCP se combinam em fluxos unificados" width="800"/>

Para usuários avançados que concluíram os Capítulos 04-06, estes fluxos mostram como agents, skills e MCP multiplicam sua eficácia.

<a id="the-integration-pattern-for-power-users"></a>
## O padrão de integração

Este é o modelo mental para combinar tudo:

<img src="assets/integration-pattern.png" alt="O padrão de integração — um fluxo de 4 fases: reunir contexto (MCP), analisar e planejar (agents), executar (skills + manual), concluir (MCP)" width="800"/>

---

## Fluxo 1: Investigação e correção de bugs

Correção de bugs do mundo real com integração total de ferramentas:

```bash
copilot

# PHASE 1: Understand the bug from GitHub (MCP provides this)
> Get the details of issue #1

# Learn: "find_by_author doesn't work with partial names"

# PHASE 2: Research best practice (deep research with web + GitHub sources)
> /research Best practices for Python case-insensitive string matching

# PHASE 3: Find related code
> @samples/book-app-project/books.py Show me the find_by_author method

# PHASE 4: Get expert analysis
> /agent
# Select "python-reviewer"

> Analyze this method for issues with partial name matching

# Agent identifies: Method uses exact equality instead of substring matching

# PHASE 5: Fix with agent guidance
> Implement the fix using lowercase comparison and 'in' operator

# PHASE 6: Generate tests
> /agent
# Select "pytest-helper"

> Generate pytest tests for find_by_author with partial matches
> Include test cases: partial name, case variations, no matches

# PHASE 7: Commit and PR
> Generate a commit message for this fix

> Create a pull request linking to issue #1
```

---

<a id="workflow-2-code-review-automation-optional"></a>
<a id="workflow-3-code-review-automation-optional"></a>
## Fluxo 2: Automação de revisão de código (opcional)

> 💡 **Esta seção é opcional.** Hooks de pre-commit são úteis para equipes, mas não são necessários para ser produtivo. Pule esta parte se você está apenas começando.
>
> ⚠️ **Observação de desempenho**: este hook chama `copilot -p` para cada arquivo staged, o que leva alguns segundos por arquivo. Para commits grandes, considere limitar a arquivos críticos ou executar revisões manualmente com `/review`.

Um **git hook** é um script que o Git executa automaticamente em determinados momentos, por exemplo, imediatamente antes de um commit. Você pode usá-lo para executar verificações automatizadas no seu código. Veja como configurar uma revisão automatizada do Copilot em seus commits:

```bash
# Create a pre-commit hook
cat > .git/hooks/pre-commit << 'EOF'
#!/bin/bash

# Get staged files (Python files only)
STAGED=$(git diff --cached --name-only --diff-filter=ACM | grep -E '\.py$')

if [ -n "$STAGED" ]; then
  echo "Running Copilot review on staged files..."

  for file in $STAGED; do
    echo "Reviewing $file..."

    # Use timeout to prevent hanging (60 seconds per file)
    # --allow-all auto-approves file reads/writes so the hook can run unattended.
    # Only use this in automated scripts. In interactive sessions, let Copilot ask for permission.
    REVIEW=$(timeout 60 copilot --allow-all -p "Quick security review of @$file - critical issues only" 2>/dev/null)

    # Check if timeout occurred
    if [ $? -eq 124 ]; then
      echo "Warning: Review timed out for $file (skipping)"
      continue
    fi

    if echo "$REVIEW" | grep -qi "CRITICAL"; then
      echo "Critical issues found in $file:"
      echo "$REVIEW"
      exit 1
    fi
  done

  echo "Review passed"
fi
EOF

chmod +x .git/hooks/pre-commit
```

> ⚠️ **Usuários de macOS**: o comando `timeout` não vem incluído por padrão no macOS. Instale-o com `brew install coreutils` ou substitua `timeout 60` por uma invocação simples sem proteção de timeout.

> 📚 **Documentação oficial**: [Use hooks](https://docs.github.com/copilot/how-tos/copilot-cli/use-hooks) e [Referência de configuração de hooks](https://docs.github.com/copilot/reference/hooks-configuration) para a API completa de hooks.
>
> 💡 **Alternativa embutida**: o Copilot CLI também tem um sistema de hooks embutido (`copilot hooks`) que pode ser executado automaticamente em eventos como pre-commit. O git hook manual acima dá controle total, enquanto o sistema embutido é mais simples de configurar. Veja a documentação acima para decidir qual abordagem se encaixa melhor no seu fluxo.

Agora todo commit recebe uma revisão rápida de segurança:

```bash
git add samples/book-app-project/books.py
git commit -m "Update book collection methods"

# Output:
# Running Copilot review on staged files...
# Reviewing samples/book-app-project/books.py...
# Critical issues found in samples/book-app-project/books.py:
# - Line 15: File path injection vulnerability in load_from_file
#
# Fix the issue and try again.
```

---

## Fluxo 3: Integração a uma nova base de código

Ao entrar em um novo projeto, combine contexto, agents e MCP para se integrar rapidamente:

```bash
# Start Copilot in interactive mode
copilot

# PHASE 1: Get the big picture with context
> @samples/book-app-project/ Explain the high-level architecture of this codebase

# PHASE 2: Understand a specific flow
> @samples/book-app-project/book_app.py Walk me through what happens
> when a user runs "python book_app.py add"

# PHASE 3: Get expert analysis with an agent
> /agent
# Select "python-reviewer"

> @samples/book-app-project/books.py Are there any design issues,
> missing error handling, or improvements you would recommend?

# PHASE 4: Find something to work on (MCP provides GitHub access)
> List open issues labeled "good first issue"

# FASE 5: Começar a contribuir
> Pick the simplest open issue and outline a plan to fix it
```

Este fluxo combina contexto com `@`, agents e MCP em uma única sessão de integração, exatamente o padrão de integração visto anteriormente neste capítulo.

---

# Melhores práticas e automação

Padrões e hábitos que tornam seus fluxos mais eficazes.

---

## Melhores práticas

### 1. Comece pelo contexto antes da análise

Sempre reúna contexto antes de pedir análise:

```bash
# Good
> Get the details of issue #42
> /agent
# Select python-reviewer
> Analyze this issue

# Less effective
> /agent
# Select python-reviewer
> Fix login bug
# Agent doesn't have issue context
```

### 2. Conheça a diferença: agents, skills e instruções customizadas

Cada ferramenta tem seu ponto ideal:

```bash
# Agents: Specialized personas you explicitly activate
> /agent
# Select python-reviewer
> Review this authentication code for security issues

# Skills: Modular capabilities that auto-activate when your prompt
# matches the skill's description (you must create them first — see Ch 05)
> Generate comprehensive tests for this code
# If you have a testing skill configured, it activates automatically

# Custom instructions (.github/copilot-instructions.md): Always-on
# guidance that applies to every session without switching or triggering
```

> 💡 **Ponto principal**: agents e skills podem analisar E gerar código. A diferença real é **como eles são ativados** — agents são explícitos (`/agent`), skills são automáticas (correspondência de prompt) e instruções customizadas ficam sempre ativas.

### 3. Mantenha as sessões focadas

Use `/rename` para rotular sua sessão (facilita encontrá-la no histórico) e `/exit` para encerrá-la corretamente:

```bash
# Good: One feature per session
> /rename list-unread-feature
# Work on list unread
> /exit

copilot
> /rename export-csv-feature
# Work on CSV export
> /exit

# Less effective: Everything in one long session
```

### 4. Torne os fluxos reutilizáveis com o Copilot

Em vez de apenas documentar fluxos em uma wiki, codifique-os diretamente no seu repositório, onde o Copilot pode usá-los:

- **Instruções customizadas** (`.github/copilot-instructions.md`): orientação sempre ativa para padrões de código, regras de arquitetura e etapas de build/teste/deploy. Toda sessão as segue automaticamente.
- **Arquivos de prompt** (`.github/prompts/`): prompts reutilizáveis e parametrizáveis que sua equipe pode compartilhar — como templates para revisões de código, geração de componentes ou descrições de PR.
- **Agents personalizados** (`.github/agents/`): codificam personas especializadas (por exemplo, um revisor de segurança ou um redator de documentação) que qualquer pessoa da equipe pode ativar com `/agent`.
- **Skills personalizadas** (`.github/skills/`): empacotam instruções de fluxo passo a passo que são ativadas automaticamente quando relevantes.

> 💡 **A recompensa**: novos membros da equipe recebem seus fluxos automaticamente — eles estão incorporados ao repositório, não presos na cabeça de alguém.

---

## Bônus: padrões de produção

Esses padrões são opcionais, mas valiosos para ambientes profissionais.

### Gerador de descrição de PR

```bash
# Generate comprehensive PR descriptions
BRANCH=$(git branch --show-current)
COMMITS=$(git log main..$BRANCH --oneline)

copilot -p "Generate a PR description for:
Branch: $BRANCH
Commits:
$COMMITS

Include: Summary, Changes Made, Testing Done, Screenshots Needed"
```

### Integração com CI/CD

Para equipes com pipelines de CI/CD existentes, você pode automatizar revisões do Copilot em cada pull request usando GitHub Actions. Isso inclui publicar comentários de revisão automaticamente e filtrar problemas críticos.

> 📖 **Saiba mais**: veja [Integração com CI/CD](../appendices/ci-cd-integration.md) para fluxos completos do GitHub Actions, opções de configuração e dicas de solução de problemas.

---

# Prática

<img src="../assets/practice.png" alt="Ambiente de mesa aconchegante com monitor mostrando código, luminária, xícara de café e fones de ouvido prontos para prática" width="800"/>

Coloque o fluxo completo em prática.

---

## ▶️ Experimente você mesmo

Depois de concluir as demonstrações, experimente estas variações:

1. **Desafio de ponta a ponta**: escolha uma pequena funcionalidade (por exemplo, "list unread books" ou "export to CSV"). Use o fluxo completo:
   - Planeje com `/plan`
   - Projete com agents (python-reviewer, pytest-helper)
   - Implemente
   - Gere testes
   - Crie um PR

2. **Desafio de automação**: configure o hook de pre-commit do fluxo de automação de revisão de código. Faça um commit com uma vulnerabilidade intencional de file path. Ele será bloqueado?

3. **Seu fluxo de produção**: crie seu próprio fluxo para uma tarefa comum. Escreva-o como uma checklist. Quais partes poderiam ser automatizadas com skills, agents ou hooks?

**Autoavaliação**: Você concluiu o curso quando conseguir explicar a um colega como agentes, skills e MCP funcionam juntos — e quando usar cada um.

---

## 📝 Tarefa

### Desafio principal: funcionalidade de ponta a ponta

Os exemplos práticos percorreram a criação da funcionalidade "list unread books". Agora pratique o fluxo completo em uma funcionalidade diferente: **search books by year range**:

1. Inicie o Copilot e reúna contexto: `@samples/book-app-project/books.py`
2. Planeje com `/plan Add a "search by year" command that lets users find books published between two years`
3. Implemente um método `find_by_year_range(start_year, end_year)` em `BookCollection`
4. Adicione uma função `handle_search_year()` em `book_app.py` que peça ao usuário os anos inicial e final
5. Gere testes: `@samples/book-app-project/books.py @samples/book-app-project/tests/test_books.py Generate tests for find_by_year_range() including edge cases like invalid years, reversed range, and no results.`
6. Revise com `/review`
7. Atualize o README: `@samples/book-app-project/README.md Add documentation for the new "search by year" command.`
8. Gere uma mensagem de commit

Documente seu fluxo conforme avança.

**Critérios de sucesso**: você concluiu a funcionalidade da ideia ao commit usando o Copilot CLI, incluindo planejamento, implementação, testes, documentação e revisão.

> 💡 **Bônus**: se você configurou agents no Capítulo 04, experimente criar e usar agents personalizados. Por exemplo, um agent error-handler para revisar a implementação e um agent doc-writer para atualizar o README.

<details>
<summary>💡 Dicas (clique para expandir)</summary>

**Siga o padrão do exemplo ["Da ideia ao PR mesclado"](#idea-to-merged-pr-in-one-session)** no início deste capítulo. As etapas principais são:

1. Reúna contexto com `@samples/book-app-project/books.py`
2. Planeje com `/plan Add a "search by year" command`
3. Implemente o método e o handler do comando
4. Gere testes com casos de borda (entrada inválida, resultados vazios, intervalo invertido)
5. Revise com `/review`
6. Atualize o README com `@samples/book-app-project/README.md`
7. Gere uma mensagem de commit com `-p`

**Casos de borda para considerar:**
- E se o usuário digitar "2000" e "1990" (intervalo invertido)?
- E se nenhum livro corresponder ao intervalo?
- E se o usuário digitar uma entrada não numérica?

**O essencial é praticar o fluxo completo** da ideia → contexto → plano → implementação → teste → documentação → commit.

</details>

---

<details>
<summary>🔧 <strong>Erros comuns</strong> (clique para expandir)</summary>

| Erro | O que acontece | Correção |
|---------|--------------|-----|
| Ir direto para a implementação | Deixa passar problemas de design caros de corrigir depois | Use `/plan` primeiro para pensar na abordagem |
| Usar uma ferramenta quando várias ajudariam | Resultados mais lentos e menos completos | Combine: agent para análise → skill para execução → MCP para integração |
| Não revisar antes de fazer commit | Problemas de segurança ou bugs passam | Sempre execute `/review` ou use um [hook de pre-commit](#workflow-2-code-review-automation-optional) |
| Esquecer de compartilhar fluxos com a equipe | Cada pessoa reinventa a roda | Documente padrões em agents, skills e instruções compartilhados |

</details>

---

# Resumo

## 🔑 Principais aprendizados

1. **Integração > isolamento**: combine ferramentas para máximo impacto
2. **Contexto primeiro**: sempre reúna o contexto necessário antes da análise
3. **Agents analisam, skills executam**: use a ferramenta certa para a tarefa
4. **Automatize repetições**: hooks e scripts multiplicam sua eficácia
5. **Documente fluxos**: padrões compartilháveis beneficiam toda a equipe

> 📋 **Referência rápida**: veja a [referência de comandos do GitHub Copilot CLI](https://docs.github.com/en/copilot/reference/cli-command-reference) para uma lista completa de comandos e atalhos.

---

## 🎓 Curso concluído!

Parabéns! Você aprendeu:

| Capítulo | O que você aprendeu |
|---------|-------------------|
| 00 | Instalação do Copilot CLI e Início Rápido |
| 01 | Três modos de interação |
| 02 | Gerenciamento de contexto com a sintaxe @ |
| 03 | Fluxos de desenvolvimento |
| 04 | Agentes especializados |
| 05 | Skills extensíveis |
| 06 | Conexões externas com MCP |
| 07 | Fluxos de produção unificados |

Você agora está preparado para usar o GitHub Copilot CLI como um verdadeiro multiplicador de força no seu fluxo de desenvolvimento.

## ➡️ O que vem a seguir

Seu aprendizado não para aqui:

1. **Pratique diariamente**: use o Copilot CLI no trabalho real
2. **Crie ferramentas personalizadas**: crie agents e skills para suas necessidades específicas
3. **Compartilhe conhecimento**: ajude sua equipe a adotar estes fluxos
4. **Mantenha-se atualizado**: acompanhe as atualizações do GitHub Copilot para novos recursos

### Recursos

- [Documentação do GitHub Copilot CLI](https://docs.github.com/copilot/concepts/agents/about-copilot-cli)
- [Registro de servidores MCP](https://github.com/modelcontextprotocol/servers)
- [Skills da comunidade](https://github.com/topics/copilot-skill)

---

**Bom trabalho! Agora vá construir algo incrível.**

**[← Voltar ao Capítulo 06](../06-mcp-servers/README.md)** | **[Voltar ao início do curso →](../README.md)**
