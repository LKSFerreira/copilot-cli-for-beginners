<!--
---
id: CopilotCLI-03
title: !translate Fluxos de Desenvolvimento
description: !translate Aplique o GitHub Copilot CLI aos fluxos diários de desenvolvimento, incluindo revisão de código, refatoração, depuração, geração de testes e Git.
audience: Desenvolvedores / Estudantes / Usuários de terminal
slug: development-workflows
weight: 4
---
-->

![Capítulo 03: Fluxos de Desenvolvimento](assets/chapter-header.png)

> **E se a IA pudesse encontrar bugs que você nem sabia que deveria procurar?**

Neste capítulo, o GitHub Copilot CLI se tornará sua ferramenta diária. Você o usará nos fluxos de trabalho que já utiliza: testes, refatoração, depuração e Git.

## 🎯 Objetivos de Aprendizagem

Ao final deste capítulo, você será capaz de:

- Executar revisões de código abrangentes com o Copilot CLI
- Refatorar código legado com segurança
- Depurar problemas com assistência da IA
- Gerar testes automaticamente
- Integrar o Copilot CLI ao seu fluxo de trabalho com git

> ⏱️ **Tempo estimado**: ~60 minutos (15 min leitura + 45 min prático)

---

## 🧩 Analogia do mundo real: Fluxo de trabalho de um marceneiro

Um marceneiro não sabe apenas usar ferramentas; ele tem *fluxos de trabalho* para trabalhos diferentes:

<img src="assets/carpenter-workflow-steps.png" alt="Oficina de artesão mostrando três faixas de fluxo de trabalho: construir móveis (medir, cortar, montar, finalizar), reparar danos (avaliar, remover, reparar, combinar) e controle de qualidade (inspecionar, testar juntas, verificar alinhamento)" width="800"/>

Da mesma forma, desenvolvedores têm fluxos de trabalho para diferentes tarefas. O GitHub Copilot CLI aprimora cada um deles, tornando você mais eficiente e eficaz nas tarefas diárias de codificação.

---

# Os cinco fluxos de trabalho

<img src="assets/five-workflows.png" alt="Cinco ícones neon brilhantes representando fluxos de revisão de código, testes, depuração, refatoração e integração com git" width="800"/>

Cada fluxo abaixo é autocontido. Escolha os que correspondem às suas necessidades atuais ou percorra todos.

---

## Escolha seu próprio percurso

Este capítulo aborda cinco fluxos de trabalho típicos de desenvolvedores. **No entanto, você não precisa ler todos de uma vez!** Cada fluxo está em uma seção recolhível abaixo. Escolha os que correspondem às suas necessidades e ao seu projeto. Você sempre pode voltar e explorar os outros depois.

<img src="assets/five-workflows-swimlane.png" alt="Cinco fluxos de desenvolvimento: revisão de código, refatoração, depuração, geração de testes e integração com Git mostrados como faixas horizontais" width="800"/>

| Quero... | Ir para |
|---|---|
| Revisar código antes de mesclar | [Fluxo 1: Revisão de Código](#workflow-1-code-review) |
| Limpar código confuso ou legado | [Fluxo 2: Refatoração](#workflow-2-refactoring) |
| Localizar e corrigir um bug | [Fluxo 3: Depuração](#workflow-3-debugging) |
| Gerar testes para meu código | [Fluxo 4: Geração de Testes](#workflow-4-test-generation) |
| Escrever commits e PRs melhores | [Fluxo 5: Integração com Git](#workflow-5-git-integration) |
| Pesquisar antes de codar | [Dica rápida: Pesquisar antes de planejar ou codar](#quick-tip-research-before-you-plan-or-code) |
| Ver um fluxo completo de correção de bug | [Colocando tudo junto](#putting-it-all-together-bug-fix-workflow) |

**Selecione um fluxo abaixo para expandi-lo** e veja como o GitHub Copilot CLI pode aprimorar seu processo de desenvolvimento nessa área.

---

<a id="workflow-1-code-review"></a>
<details>
<summary><strong>Fluxo 1: Revisão de Código</strong> - Revisar arquivos, usar o agent /review e criar checklists por severidade</summary>

<img src="assets/code-review-swimlane-single.png" alt="Fluxo de revisão de código: revisar, identificar problemas, priorizar e gerar checklist." width="800"/>

### Revisão básica

Este exemplo usa o símbolo `@` para referenciar um arquivo, dando ao Copilot CLI acesso direto ao seu conteúdo para revisão.

```bash
copilot

> Revise @samples/book-app-project/book_app.py para qualidade de código
```

---

<details>
<summary>🎬 Veja em ação!</summary>

![Demo de revisão de código](assets/code-review-demo.gif)

*A saída da demo varia. Seu modelo, ferramentas e respostas podem diferir do que é mostrado aqui.*

</details>

---

### Revisão de validação de entrada

Peça ao Copilot CLI que foque a revisão em uma preocupação específica (aqui, validação de entrada), listando as categorias que você quer que sejam verificadas no prompt.

```text
copilot

> Revise @samples/book-app-project/utils.py para problemas de validação de entrada. Verifique: validação ausente, lacunas no tratamento de erros e casos extremos
```


### Revisão de projeto entre arquivos

Referencie um diretório inteiro com `@` para permitir que o Copilot CLI analise todos os arquivos do projeto de uma vez.

```bash
copilot

> @samples/book-app-project/ Review this entire project. Create a markdown checklist of issues found, categorized by severity
```

### Revisão de código interativa

Use uma conversa multitorno para aprofundar a análise. Comece com uma revisão ampla e faça perguntas de acompanhamento sem reiniciar.

```bash
copilot

> @samples/book-app-project/book_app.py Review this file for:
> - Input validation
> - Error handling
> - Code style and best practices

# Copilot CLI provides detailed review

> O tratamento de entrada do usuário - há algum caso extremo que estou perdendo?

# Copilot CLI shows potential issues with empty strings, special characters

> Crie uma lista de verificação de todos os problemas encontrados, priorizada por gravidade

# Copilot CLI generates prioritized action items
```

### Modelo de checklist de revisão

Peça ao Copilot CLI para estruturar a saída em um formato específico (aqui, uma checklist Markdown categorizada por severidade que você pode colar em uma issue).

```bash
copilot

> Revise @samples/book-app-project/ e crie uma lista de verificação em markdown dos problemas encontrados, categorizada por:
> - Critical (data loss risks, crashes)
> - High (bugs, incorrect behavior)
> - Medium (performance, maintainability)
> - Low (style, minor improvements)
```

### Entendendo mudanças no Git (importante para /review)

Antes de usar o comando `/review`, você precisa entender dois tipos de alterações no git:

| Tipo de alteração | O que significa | Como ver |
|-------------|---------------|------------|
| **Staged changes** | Arquivos marcados para o próximo commit com `git add` | `git diff --staged` |
| **Unstaged changes** | Arquivos modificados que ainda não foram adicionados | `git diff` |

```bash
# Quick reference
git status           # Shows both staged and unstaged
git add file.py      # Stage a file for commit
git diff             # Shows unstaged changes
git diff --staged    # Shows staged changes
```

### Usando o comando /review

O comando `/review` invoca o **agent code-review** interno, otimizado para analisar alterações staged e unstaged com saída de alto sinal e baixo ruído. Use um comando com barra para acionar um agent especializado em vez de escrever um prompt livre.

```bash
copilot

> /review
# Invokes the code-review agent on staged/unstaged changes
# Provides focused, actionable feedback

> /review Check for security issues in authentication
# Run review with specific focus area
```

> 💡 **Dica**: O agent de revisão de código funciona melhor quando há mudanças pendentes. Adicione seus arquivos com `git add` para revisões mais focadas.

</details>

---

<a id="workflow-2-refactoring"></a>
<details>
<summary><strong>Fluxo 2: Refatoração</strong> - Reestruturar código, separar responsabilidades e melhorar o tratamento de erros</summary>

<img src="assets/refactoring-swimlane-single.png" alt="Fluxo de refatoração: avaliar código, planejar mudanças, implementar e verificar comportamento." width="800"/>

### Refatoração simples

> **Experimente isto primeiro:** `@samples/book-app-project/book_app.py The command handling uses if/elif chains. Refactor it to use a dictionary dispatch pattern.`

Comece com melhorias diretas. Experimente estas no app de livros. Cada prompt usa uma referência de arquivo `@` combinada com uma instrução específica de refatoração para que o Copilot CLI saiba exatamente o que mudar.

```bash
copilot

> @samples/book-app-project/book_app.py The command handling uses if/elif chains. Refactor it to use a dictionary dispatch pattern.

> @samples/book-app-project/utils.py Add type hints to all functions

> @samples/book-app-project/book_app.py Extract the book display logic into utils.py for better separation of concerns
```

> 💡 **Novo em refatoração?** Comece com solicitações simples, como adicionar type hints ou melhorar nomes de variáveis, antes de enfrentar transformações complexas.

---

<details>
<summary>🎬 Veja em ação!</summary>

![Demo de refatoração](assets/refactor-demo.gif)

*A saída da demo varia. Seu modelo, ferramentas e respostas podem diferir do que é mostrado aqui.*

</details>

---

### Separar responsabilidades

Referencie vários arquivos com `@` em um único prompt para que o Copilot CLI possa mover código entre eles como parte da refatoração.

```bash
copilot

> @samples/book-app-project/utils.py @samples/book-app-project/book_app.py
> O arquivo utils.py tem instruções print misturadas com lógica. Refatore para separar funções de exibição do processamento de dados.
```

### Melhorar o tratamento de erros

Forneça dois arquivos relacionados e descreva a preocupação transversal para que o Copilot CLI possa sugerir uma correção consistente em ambos.

```bash
copilot

> @samples/book-app-project/utils.py @samples/book-app-project/books.py
> Esses arquivos têm tratamento de erro inconsistente. Sugira uma abordagem unificada usando exceções customizadas.
```

### Adicionar documentação

Use uma lista detalhada de marcadores para especificar exatamente o que cada docstring deve conter.

```bash
copilot

> @samples/book-app-project/books.py Add comprehensive docstrings to all methods:
> - Include parameter types and descriptions
> - Document return values
> - Note any exceptions raised
> - Adicionar exemplos de uso
```

### Refatoração segura com testes

Encadeie duas solicitações relacionadas em uma conversa multitorno. Primeiro gere testes; depois refatore com esses testes como rede de segurança.

```bash
copilot

> @samples/book-app-project/books.py Before refactoring, generate tests for current behavior

# Get tests first

> Agora refatore a classe BookCollection para usar um context manager para operações de arquivo

# Refactor with confidence - tests verify behavior is preserved
```

</details>

---

<a id="workflow-3-debugging"></a>
<details>
<summary><strong>Fluxo 3: Depuração</strong> - Rastrear bugs, auditorias de segurança e problemas entre arquivos</summary>

<img src="assets/debugging-swimlane-single.png" alt="Fluxo de depuração: entender erro, localizar causa raiz, corrigir e testar." width="800"/>

### Depuração simples

> **Experimente isto primeiro:** `@samples/book-app-buggy/books_buggy.py Users report that searching for "The Hobbit" returns no results even though it's in the data. Debug why.`

Comece descrevendo o que está errado. Aqui estão padrões comuns de depuração que você pode tentar com o app de livros buggy. Cada prompt combina uma referência de arquivo `@` com uma descrição clara do sintoma para que o Copilot CLI possa localizar e diagnosticar o bug.

```bash
copilot

# Pattern: "Expected X but got Y"
> @samples/book-app-buggy/books_buggy.py Users report that searching for "The Hobbit" returns no results even though it's in the data. Debug why.

# Pattern: "Unexpected behavior"
> @samples/book-app-buggy/book_app_buggy.py When I remove a book that doesn't exist, the app says it was removed. Help me find why.

# Pattern: "Wrong results"
> @samples/book-app-buggy/books_buggy.py When I mark one book as read, ALL books get marked. What's the bug?
```

> 💡 **Dica de depuração**: descreva o *sintoma* (o que você vê) e a *expectativa* (o que deveria acontecer). O Copilot CLI descobre o restante.

---

<details>
<summary>🎬 Veja em ação!</summary>

![Demo de correção de bug](assets/fix-bug-demo.gif)

*A saída da demo varia. Seu modelo, ferramentas e respostas podem diferir do que é mostrado aqui.*

</details>

---

### O "detetive de bugs" — a IA encontra bugs RELACIONADOS

É aqui que a depuração consciente de contexto brilha. Experimente este cenário com o app de livros buggy. Forneça o arquivo inteiro via `@` e descreva apenas o sintoma relatado pelo usuário. O Copilot CLI rastreará a causa raiz e talvez encontre bugs adicionais próximos.

```bash
copilot

> @samples/book-app-buggy/books_buggy.py
>
> Usuários relatam: "Encontrar livros por nome de autor não funciona para nomes parciais"
> Depure por que isso acontece
```

**O que o Copilot CLI faz**:
```
Root Cause: Line 80 uses exact match (==) instead of partial match (in).

Line 80: return [b for b in self.books if b.author == author]

The find_by_author function requires an exact match. Searching for "Tolkien"
won't find books by "J.R.R. Tolkien".

Fix: Change to case-insensitive partial match:
return [b for b in self.books if author.lower() in b.author.lower()]
```

**Por que isso importa**: o Copilot CLI lê o arquivo inteiro, entende o contexto do seu relatório de bug e oferece uma correção específica com explicação clara.

> 💡 **Bônus**: como o Copilot CLI analisa o arquivo inteiro, ele frequentemente descobre *outros* problemas que você não pediu. Por exemplo, ao corrigir a busca por autor, o Copilot CLI também pode notar o bug de sensibilidade a maiúsculas/minúsculas em `find_book_by_title`!

### Nota lateral de segurança do mundo real

Embora depurar seu próprio código seja importante, entender vulnerabilidades de segurança em aplicações de produção é crítico. Experimente este exemplo: aponte o Copilot CLI para um arquivo desconhecido e peça uma auditoria de segurança.

```bash
copilot

> @samples/buggy-code/python/user_service.py Find all security vulnerabilities in this Python user service
```

Este arquivo demonstra padrões de segurança do mundo real que você encontrará em aplicações de produção.

> 💡 **Termos comuns de segurança que você encontrará:**
> - **SQL Injection**: quando a entrada do usuário é colocada diretamente em uma consulta de banco de dados, permitindo que atacantes executem comandos maliciosos
> - **Parameterized queries**: a alternativa segura — placeholders (`?`) separam dados do usuário de comandos SQL
> - **Race condition**: quando duas operações acontecem ao mesmo tempo e interferem uma na outra
> - **XSS (Cross-Site Scripting)**: quando atacantes injetam scripts maliciosos em páginas web

---

### Entendendo um erro

Cole um stack trace diretamente no seu prompt junto com uma referência de arquivo `@` para que o Copilot CLI possa mapear o erro ao código-fonte.

```bash
copilot

> Estou recebendo este erro:
> AttributeError: 'NoneType' object has no attribute 'title'
>     at show_books (book_app.py:19)
>
> @samples/book-app-project/book_app.py Explain why and how to fix it
```

### Depuração com caso de teste

Descreva a entrada exata e a saída observada para dar ao Copilot CLI um caso de teste concreto e reproduzível para raciocinar.

```bash
copilot

> @samples/book-app-buggy/books_buggy.py The remove_book function has a bug. When I try to remove "Dune",
> it also removes "Dune Messiah". Debug this: explain the root cause and provide a fix.
```

### Rastrear um problema pelo código

Referencie vários arquivos e peça ao Copilot CLI que siga o fluxo de dados entre eles para localizar onde o problema se origina.

```bash
copilot

> Usuários relatam que a numeração da lista de livros começa em 0 em vez de 1.
> @samples/book-app-buggy/book_app_buggy.py @samples/book-app-buggy/books_buggy.py
> Trace pelo fluxo de exibição da lista e identifique onde o problema ocorre
```

### Entendendo problemas de dados

Inclua um arquivo de dados junto com o código que o lê para que o Copilot CLI entenda o panorama completo ao sugerir melhorias de tratamento de erros.

```bash
copilot

> @samples/book-app-project/data.json @samples/book-app-project/books.py
> Às vezes o arquivo JSON fica corrompido e o app trava. Como devemos lidar com isso graciosamente?
```

</details>

---

<a id="workflow-4-test-generation"></a>
<details>
<summary><strong>Fluxo 4: Geração de Testes</strong> - Gerar testes abrangentes e casos de borda automaticamente</summary>

<img src="assets/test-gen-swimlane-single.png" alt="Fluxo de geração de testes: analisar função, gerar testes, incluir casos de borda e executar." width="800"/>

> **Experimente isto primeiro:** `@samples/book-app-project/books.py Generate pytest tests for all functions including edge cases`

### A "explosão de testes" — 2 testes vs 15+ testes

Ao escrever testes manualmente, desenvolvedores normalmente criam 2 ou 3 testes básicos:
- Testar entrada válida
- Testar entrada inválida
- Testar um caso de borda

Veja o que acontece quando você pede ao Copilot CLI para gerar testes abrangentes! Este prompt usa uma lista estruturada com uma referência de arquivo `@` para guiar o Copilot CLI em direção a uma cobertura de testes mais completa:

```bash
copilot

> @samples/book-app-project/books.py Generate comprehensive pytest tests. Include tests for:
> - Adding books
> - Removing books
> - Finding by title
> - Finding by author
> - Marking as read
> - Edge cases with empty data
```

---

<details>
<summary>🎬 Veja em ação!</summary>

![Demo de geração de testes](assets/test-gen-demo.gif)

*A saída da demo varia. Seu modelo, ferramentas e respostas podem diferir do que é mostrado aqui.*

</details>

---

**O que você obtém**: 15+ testes abrangentes, incluindo:

```python
class TestBookCollection:
    # Happy path
    def test_add_book_creates_new_book(self):
        ...
    def test_list_books_returns_all_books(self):
        ...

    # Find operations
    def test_find_book_by_title_case_insensitive(self):
        ...
    def test_find_book_by_title_returns_none_when_not_found(self):
        ...
    def test_find_by_author_partial_match(self):
        ...
    def test_find_by_author_case_insensitive(self):
        ...

    # Edge cases
    def test_add_book_with_empty_title(self):
        ...
    def test_remove_nonexistent_book(self):
        ...
    def test_mark_as_read_nonexistent_book(self):
        ...

    # Data persistence
    def test_save_books_persists_to_json(self):
        ...
    def test_load_books_handles_missing_file(self):
        ...
    def test_load_books_handles_corrupted_json(self):
        ...

    # Special characters
    def test_add_book_with_unicode_characters(self):
        ...
    def test_find_by_author_with_special_characters(self):
        ...
```

**Resultado**: em 30 segundos, você obtém testes de casos de borda que levariam uma hora para pensar e escrever.

---

### Testes unitários

Mire uma única função e enumere as categorias de entrada que você quer testar para que o Copilot CLI gere testes unitários focados e completos.

```bash
copilot

> @samples/book-app-project/utils.py Generate comprehensive pytest tests for get_book_details covering:
> - Valid input
> - Empty strings
> - Invalid year formats
> - Very long titles
> - Special characters in author names
```

### Executando os testes

Peça ao Copilot CLI uma pergunta em linguagem natural sobre sua cadeia de ferramentas. Ele pode gerar o comando de shell correto para você.

```bash
copilot

> Como executo os testes? Mostre o comando pytest.

# Copilot CLI responde:
# cd samples/book-app-project && python -m pytest tests/
# Ou para saída detalhada: python -m pytest tests/ -v
# Para ver os print(): python -m pytest tests/ -s
```

### Teste para cenários específicos

Liste cenários avançados ou difíceis que você quer cobrir para que o Copilot CLI vá além do happy path.

```bash
copilot

> @samples/book-app-project/books.py Generate tests for these scenarios:
> - Adding duplicate books (same title and author)
> - Removing a book by partial title match
> - Finding books when collection is empty
> - File permission errors during save
> - Concurrent access to the book collection
```

### Adicionar testes a um arquivo existente

Peça testes *adicionais* para uma única função para que o Copilot CLI gere novos casos que complementem o que você já tem.

```bash
copilot

> @samples/book-app-project/books.py
> Gere testes adicionais para a função find_by_author com casos extremos:
> - Author name with hyphens (e.g., "Jean-Paul Sartre")
> - Author with multiple first names
> - Empty string as author
> - Author name with accented characters
```

</details>

---

<a id="workflow-5-git-integration"></a>
<details>
<summary><strong>Fluxo 5: Integração com Git</strong> - Mensagens de commit, descrições de PR, /pr, /delegate e /diff</summary>

<img src="assets/git-integration-swimlane-single.png" alt="Fluxo de integração com Git: preparar mudanças, gerar mensagem, fazer commit e criar PR." width="800"/>

> 💡 **Este fluxo pressupõe familiaridade básica com git** (staging, commits, branches). Se git for novo para você, experimente primeiro os outros quatro fluxos.

### Gerar mensagens de commit

> **Experimente isto primeiro:** `copilot -p "Generate a conventional commit message for: $(git diff --staged)"` — prepare algumas mudanças, depois execute isto para ver o Copilot CLI escrever sua mensagem de commit.

Este exemplo usa a flag inline `-p` com substituição de comando de shell para canalizar a saída de `git diff` diretamente para o Copilot CLI em uma mensagem de commit única. A sintaxe `$(...)` executa o comando dentro dos parênteses e insere sua saída no comando externo.

```bash

# See what changed
git diff --staged

# Generate commit message using [Conventional Commit](../GLOSSARY.md#conventional-commit) format
# (structured messages like "feat(books): add search" or "fix(data): handle empty input")
copilot -p "Generate a conventional commit message for: $(git diff --staged)"

# Output: "feat(books): add partial author name search
#
# - Update find_by_author to support partial matches
# - Add case-insensitive comparison
# - Improve user experience when searching authors"
```

---

<details>
<summary>🎬 Veja em ação!</summary>

![Demo de integração com Git](assets/git-integration-demo.gif)

*A saída da demo varia. Seu modelo, ferramentas e respostas podem diferir do que é mostrado aqui.*

</details>

---

### Explicar mudanças

Canalize a saída de `git show` para um prompt `-p` para obter um resumo em linguagem simples do último commit.

```bash
# What did this commit change?
copilot -p "Explain what this commit does: $(git show HEAD --stat)"
```

### Descrição de PR

Combine a saída de `git log` com um modelo estruturado de prompt para gerar automaticamente uma descrição completa de pull request.

```bash
# Generate PR description from branch changes
copilot -p "Generate a pull request description for these changes:
$(git log main..HEAD --oneline)

Include:
- Summary of changes
- Why these changes were made
- Testing done
- Breaking changes? (yes/no)"
```

### Usando /pr no modo Interativo para o branch atual

Se você está trabalhando com um branch no modo Interativo do Copilot CLI, pode usar o comando `/pr` para trabalhar com pull requests. Use `/pr` para ver um PR, criar um novo PR, corrigir um PR existente ou deixar o Copilot CLI decidir automaticamente com base no estado do branch.

```bash
copilot

> /pr [view|create|fix|auto]
```

### Revisar antes do push

Use `git diff main..HEAD` dentro de um prompt `-p` para uma verificação rápida de sanidade antes do push em todas as mudanças do branch.

```bash
# Last check before pushing
copilot -p "Review these changes for issues before I push:
$(git diff main..HEAD)"
```

### Usando /delegate para tarefas em background

O comando `/delegate` entrega trabalho ao GitHub Copilot cloud agent. Use o comando com barra `/delegate` (ou o atalho `&`) para delegar uma tarefa bem definida a um agent em background.

```bash
copilot

> /delegate Add input validation to the login form

# Or use the & prefix shortcut:
> & Fix the typo in the README header

# Copilot CLI:
# 1. Commits your changes to a new branch
# 2. Opens a draft pull request
# 3. Works in the background on GitHub
# 4. Requests your review when done
```

Isso é ótimo para tarefas bem definidas que você quer concluir enquanto foca em outro trabalho.

### Usando /diff para revisar mudanças da sessão

O comando `/diff` mostra todas as mudanças feitas durante sua sessão atual. Use este comando com barra para ver um diff visual de tudo que o Copilot CLI modificou antes de fazer commit.

```bash
copilot

# After making some changes...
> /diff

# Shows a visual diff of all files modified in this session
# Great for reviewing before committing
```

</details>

---

<a id="quick-tip-research-before-you-plan-or-code"></a>
## Dica rápida: Pesquisar antes de planejar ou codar

Quando você precisa investigar uma biblioteca, entender melhores práticas ou explorar um tópico desconhecido, use `/research` para executar uma investigação profunda antes de escrever qualquer código:

```bash
copilot

> /research What are the best Python libraries for validating user input in CLI apps?
```

O Copilot pesquisa repositórios do GitHub e fontes web e retorna um resumo com referências. Isso é útil quando você está prestes a começar uma nova funcionalidade e quer tomar decisões informadas primeiro. Você pode compartilhar os resultados usando `/share`.

> 💡 **Dica**: `/research` funciona bem *antes* de `/plan`. Pesquise a abordagem e depois planeje a implementação.

---

<a id="putting-it-all-together-bug-fix-workflow"></a>
## Colocando tudo junto: fluxo de correção de bug

Aqui está um fluxo completo para corrigir um bug relatado:

```bash

# 1. Understand the bug report
copilot

> Users report: 'Finding books by author name doesn't work for partial names'
> @samples/book-app-project/books.py Analyze and identify the likely cause

# 2. Debug the issue and fix (continuing in same session)
> Com base na análise, mostre-me a função find_by_author e explique o problema

> Corrija a função find_by_author para lidar com correspondências de nomes parciais

# 3. Generate tests for the fix
> @samples/book-app-project/books.py Generate pytest tests specifically for:
> - Full author name match
> - Partial author name match
> - Case-insensitive matching
> - Author name not found

# Exit the interactive session

> /exit

# 4. Run git add

# Stage the changes so git diff --staged has something to work with
git add .

# 5. Generate commit message
copilot -p "Generate commit message for: $(git diff --staged)"

# Example Output: "fix(books): support partial author name search"

# 6. Commit changes (optional)

git commit -m "<paste generated message>"
```

### Resumo do fluxo de correção de bug

| Etapa | Ação | Comando do Copilot |
|------|--------|-----------------|
| 1 | Entender o bug | `> [describe bug] @relevant-file.py Analyze the likely cause` |
| 2 | Análise e correção | `> Show me the function and fix the issue` |
| 3 | Gerar testes | `> Generate tests for [specific scenarios]` |
| 4 | Preparar mudanças | `git add .` |
| 5 | Gerar mensagem de commit | `copilot -p "Generate commit message for: $(git diff --staged)"` |
| 6 | Fazer commit das mudanças | `git commit -m "<paste generated message>"` |

---

# Prática

<img src="../assets/practice.png" alt="Ambiente de mesa aconchegante com monitor mostrando código, luminária, xícara de café e fones de ouvido prontos para prática" width="800"/>

Agora é sua vez de aplicar estes fluxos de trabalho.

---

## ▶️ Experimente você mesmo

Depois de concluir as demos, experimente estas variações:

1. **Desafio detetive de bugs**: Peça ao Copilot CLI para depurar a função `mark_as_read` em `samples/book-app-buggy/books_buggy.py`. Ele explicou por que a função marca TODOS os livros como lidos em vez de apenas um?

2. **Desafio de testes**: Gere testes para a função `add_book` no app de livros. Conte quantos casos de borda o Copilot CLI inclui que você não teria imaginado.

3. **Desafio de mensagem de commit**: Faça qualquer pequena alteração em um arquivo do app de livros, prepare-a (`git add .`) e execute:
   ```bash
   copilot -p "Generate a conventional commit message for: $(git diff --staged)"
   ```
   A mensagem é melhor do que a que você escreveria rapidamente?

**Autoverificação**: você entende fluxos de desenvolvimento quando consegue explicar por que "debug this bug" é mais poderoso do que "find bugs" (contexto importa!).

---

## 📝 Tarefa

### Desafio principal: Refatorar, testar e entregar

Os exemplos práticos focaram em `find_book_by_title` e revisões de código. Agora pratique as mesmas habilidades de fluxo em funções diferentes em `book-app-project`:

1. **Revisar**: Peça ao Copilot CLI para revisar `remove_book()` em `books.py` procurando casos de borda e problemas potenciais:
   `@samples/book-app-project/books.py Review the remove_book() function. What happens if the title partially matches another book (e.g., "Dune" vs "Dune Messiah")? Are there any edge cases not handled?`
2. **Refatorar**: Peça ao Copilot CLI para melhorar `remove_book()` de modo a lidar com casos de borda como correspondência sem diferenciar maiúsculas/minúsculas e retornar feedback útil quando um livro não for encontrado
3. **Testar**: Gere testes pytest especificamente para a função `remove_book()` melhorada, cobrindo:
   - Remover um livro que existe
   - Correspondência de título sem diferenciar maiúsculas/minúsculas
   - Um livro que não existe retorna feedback apropriado
   - Remover de uma coleção vazia
4. **Revisar**: Prepare suas mudanças e execute `/review` para verificar problemas restantes
5. **Commit**: Gere uma mensagem de commit convencional:
   `copilot -p "Generate a conventional commit message for: $(git diff --staged)"`

<details>
<summary>💡 Dicas (clique para expandir)</summary>

**Prompts de exemplo para cada etapa:**

```bash
copilot

# Step 1: Review
> @samples/book-app-project/books.py Review the remove_book() function. What edge cases are not handled?

# Step 2: Refactor
> Melhore remove_book() para usar correspondência case-insensitive e retorne uma mensagem clara quando o livro não for encontrado. Mostre-me o código antes e depois.

# Step 3: Test
> Gere testes pytest para a função remove_book() melhorada, incluindo:
> - Removing a book that exists
> - Case-insensitive matching ("dune" should remove "Dune")
> - Book not found returns appropriate response
> - Removing from an empty collection

# Step 4: Review
> /review

# Step 5: Commit
> Gere uma mensagem de commit convencional para este refactor
```

**Dica:** Depois de melhorar `remove_book()`, tente perguntar ao Copilot CLI: "Are there any other functions in this file that could benefit from the same improvements?". Ele pode sugerir mudanças semelhantes em `find_book_by_title()` ou `find_by_author()`.

</details>

### Desafio bônus: Criar uma aplicação com o Copilot CLI

> 💡 **Observação**: Este exercício do GitHub Skills usa **Node.js** em vez de Python. As técnicas do GitHub Copilot CLI que você praticará — criar issues, gerar código e colaborar pelo terminal — se aplicam a qualquer linguagem.

O exercício mostra aos desenvolvedores como usar o GitHub Copilot CLI para criar issues, gerar código e colaborar a partir do terminal enquanto constroem um app calculadora em Node.js. Você instalará o CLI, usará templates e agents e praticará desenvolvimento iterativo orientado por linha de comando.

##### <img src="../assets/github-skills-logo.png" width="28" align="center" /> [Inicie o exercício Skills "Create applications with the Copilot CLI" (Criar aplicações com o Copilot CLI)](https://github.com/skills/create-applications-with-the-copilot-cli)

---

<details>
<summary>🔧 <strong>Erros comuns e solução de problemas</strong> (clique para expandir)</summary>

### Erros comuns

| Erro | O que acontece | Correção |
|---------|--------------|-----|
| Usar prompts vagos como "Review this code" | Feedback genérico que perde problemas específicos | Seja específico: "Review for SQL injection, XSS, and auth issues" |
| Não usar `/review` para revisões de código | Perde o agent de revisão de código otimizado | Use `/review`, que é ajustado para saída de alto sinal e baixo ruído |
| Pedir para "find bugs" sem contexto | O Copilot CLI não sabe qual bug você está enfrentando | Descreva o sintoma: "Users report X happens when Y" |
| Gerar testes sem especificar o framework | Os testes podem usar sintaxe ou biblioteca de assertions errada | Especifique: "Generate tests using Jest" ou "using pytest" |

### Solução de problemas

**A revisão parece incompleta** - Seja mais específico sobre o que procurar:

```bash
copilot

# Instead of:
> Revise @samples/book-app-project/book_app.py

# Try:
> Revise @samples/book-app-project/book_app.py para validação de entrada, tratamento de erros e casos extremos
```

**Os testes não correspondem ao meu framework** - Especifique o framework:

```bash
copilot

> @samples/book-app-project/books.py Generate tests using pytest (not unittest)
```

**A refatoração muda o comportamento** - Peça ao Copilot CLI para preservar o comportamento:

```bash
copilot

> @samples/book-app-project/book_app.py Refactor command handling to use dictionary dispatch. IMPORTANT: Maintain identical external behavior - no breaking changes
```

</details>

---

# Resumo

## 🔑 Principais aprendizados

<img src="assets/specialized-workflows.png" alt="Fluxos de trabalho especializados para cada tarefa: revisão de código, refatoração, depuração, testes e integração com Git" width="800"/>

1. **Revisão de código** se torna abrangente com prompts específicos
2. **Refatoração** é mais segura quando você gera testes primeiro
3. **Depuração** se beneficia de mostrar ao Copilot CLI o erro E o código
4. **Geração de testes** deve incluir casos de borda e cenários de erro
5. **Integração com Git** automatiza mensagens de commit e descrições de PR

> 📋 **Referência rápida**: Veja a [referência de comandos do GitHub Copilot CLI](https://docs.github.com/en/copilot/reference/cli-command-reference) para uma lista completa de comandos e atalhos.

---

## ✅ Ponto de verificação: você dominou o essencial

**Parabéns!** Agora você tem todas as habilidades essenciais para ser produtivo com o GitHub Copilot CLI:

| Habilidade | Capítulo | Agora você consegue... |
|-------|---------|----------------|
| Comandos básicos | Cap. 01 | Usar modo Interativo, modo Plano, modo Programático (`-p`) e comandos com barra |
| Contexto | Cap. 02 | Referenciar arquivos com `@`, gerenciar sessões e entender janelas de contexto |
| Fluxos de trabalho | Cap. 03 | Revisar código, refatorar, depurar, gerar testes e integrar com git |

Os Capítulos 04-06 abordam recursos adicionais que acrescentam ainda mais poder e valem a pena aprender.

---

## 🛠️ Construindo seu fluxo pessoal

Não existe uma única forma "certa" de usar o GitHub Copilot CLI. Aqui estão algumas dicas enquanto você desenvolve seus próprios padrões:

> 📚 **Documentação oficial**: [Melhores práticas do Copilot CLI](https://docs.github.com/copilot/how-tos/copilot-cli/cli-best-practices) para fluxos de trabalho recomendados e dicas do GitHub.

- **Comece com `/plan`** para qualquer coisa não trivial. Refine o plano antes da execução — um bom plano leva a melhores resultados.
- **Salve prompts que funcionam bem.** Quando o Copilot CLI cometer um erro, anote o que deu errado. Com o tempo, isso vira seu playbook pessoal.
- **Experimente livremente.** Alguns desenvolvedores preferem prompts longos e detalhados. Outros preferem prompts curtos com acompanhamentos. Tente abordagens diferentes e observe o que parece natural.

> 💡 **A seguir**: nos Capítulos 04 e 05, você aprenderá como codificar suas melhores práticas em instruções customizadas e skills que o Copilot CLI carrega automaticamente.

---

## ➡️ O que vem a seguir

Os capítulos restantes abordam recursos adicionais que ampliam as capacidades do Copilot CLI:

| Capítulo | O que cobre | Quando você vai querer |
|---------|----------------|---------------------|
| Cap. 04: Agents | Criar personas de IA especializadas | Quando você quer especialistas de domínio (frontend, segurança) |
| Cap. 05: Skills | Carregar instruções automaticamente para tarefas | Quando você repete os mesmos prompts com frequência |
| Cap. 06: MCP | Conectar serviços externos | Quando você precisa de dados ao vivo do GitHub, bancos de dados |

**Recomendação**: experimente os fluxos principais por uma semana e depois volte aos Capítulos 04-06 quando tiver necessidades específicas.

---

## Continue para tópicos adicionais

Em **[Capítulo 04: Agents e Instruções Customizadas](../04-agents-custom-instructions/README.md)**, você aprenderá:

- Usar agents embutidos (`/plan`, `/review`)
- Criar agents especializados (especialista em frontend, auditor de segurança) com arquivos `.agent.md`
- Padrões de colaboração multi-agent
- Arquivos de instruções customizadas para padrões de projeto

---

**[← Voltar ao Capítulo 02](../02-context-conversations/README.md)** | **[Continue para o Capítulo 04 →](../04-agents-custom-instructions/README.md)**
