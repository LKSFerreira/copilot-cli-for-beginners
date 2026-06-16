<!--
---
id: CopilotCLI-02
title: !translate Context and Conversations
description: !translate Use file and directory context, resume previous sessions, and write effective multi-turn conversations with GitHub Copilot CLI.
audience: Developers / Students / Terminal users
slug: context-and-conversations
weight: 3
---
-->

![Chapter 02: Context and Conversations](assets/chapter-header.png)

> **E se a IA pudesse ver todo o seu código, e não apenas um arquivo por vez?**

Neste capítulo, você desbloqueará o verdadeiro poder do GitHub Copilot CLI: contexto. Você aprenderá a usar a sintaxe `@` para referenciar arquivos e diretórios, dando ao Copilot CLI uma compreensão profunda do seu código. Descobrirá como manter conversas entre sessões, retomar o trabalho dias depois exatamente de onde parou, e verá como a análise entre arquivos identifica bugs que a revisão por arquivo único não detecta.

## 🎯 Objetivos de Aprendizagem

Ao final deste capítulo, você será capaz de:

- Usar a sintaxe `@` para referenciar arquivos, diretórios e imagens
- Retomar sessões anteriores com `--resume` e `--continue`
- Entender como funcionam as [janelas de contexto](../GLOSSARY.md#context-window)
- Escrever conversas multitorno (multi-turn) eficazes
- Gerenciar permissões de diretório para fluxos de trabalho com múltiplos projetos

> ⏱️ **Tempo estimado**: ~50 minutos (20 min leitura + 30 min prático)

---

## 🧩 Analogia do mundo real: Trabalhando com um colega

<img src="assets/colleague-context-analogy.png" alt="Context Makes the Difference - Without vs With Context" width="800"/>

*Assim como seus colegas, o Copilot CLI não é um leitor de mentes. Fornecer mais informações ajuda tanto humanos quanto o Copilot a oferecer suporte mais direcionado!*

Imagine explaining a bug to a colleague:

> **Sem contexto**: "O app de livros não funciona."

> **Com contexto**: "Veja `books.py`, especialmente a função `find_book_by_title`. Ela não faz correspondência sem distinguir maiúsculas/minúsculas."

Para fornecer contexto ao Copilot CLI, use *a sintaxe `@`* para apontar o Copilot CLI para arquivos específicos.

---

# Essencial: Contexto Básico

<img src="assets/essential-basic-context.png" alt="Glowing code blocks connected by light trails representing how context flows through Copilot CLI conversations" width="800"/>

This section covers everything you need to work effectively with context. Master these basics first.

---

## A sintaxe @

O símbolo `@` referencia arquivos e diretórios em seus prompts. É assim que você diz ao Copilot CLI "olhe este arquivo."

> 💡 **Observação**: Todos os exemplos deste curso usam a pasta `samples/` incluída neste repositório, então você pode testar todos os comandos diretamente.

### Teste agora (sem configuração necessária)

Você pode testar isso com qualquer arquivo em seu computador:

```bash
copilot

# Aponte para qualquer arquivo que você tenha
> Explain what @package.json does
> Summarize @README.md
> What's in @.gitignore and why?
```

> 💡 **Não tem um projeto à mão?** Crie um arquivo de teste rápido:
> ```bash
> echo "def greet(name): return 'Hello ' + name" > test.py
> copilot
> > What does @test.py do?
> ```

### Padrões básicos com @

| Padrão | O que faz | Exemplo de uso |
|---------|--------------|-------------|
| `@file.py` | Reference a single file | `Review @samples/book-app-project/books.py` |
| `@folder/` | Reference all files in a directory | `Review @samples/book-app-project/` |
| `@file1.py @file2.py` | Reference multiple files | `Compare @samples/book-app-project/book_app.py @samples/book-app-project/books.py` |

### Reference a Single File

```bash
copilot

> Explain what @samples/book-app-project/utils.py does
```

---

<details>
<summary>🎬 Veja em ação!</summary>

![File Context Demo](assets/file-context-demo.gif)

*A saída da demo varia. Seu modelo, ferramentas e respostas podem diferir do que é mostrado aqui.*

</details>

---

### Reference Multiple Files

```bash
copilot

> Compare @samples/book-app-project/book_app.py and @samples/book-app-project/books.py for consistency
```

### Reference an Entire Directory

```bash
copilot

> Review all files in @samples/book-app-project/ for error handling
```

---

## Cross-File Intelligence

This is where context becomes a superpower. Single-file analysis is useful. Cross-file analysis is transformative.

<img src="assets/cross-file-intelligence.png" alt="Cross-File Intelligence - comparing single-file vs cross-file analysis showing how analyzing files together reveals bugs, data flow, and patterns invisible in isolation" width="800"/>

### Demo: Find Bugs That Span Multiple Files

```bash
copilot

> @samples/book-app-project/book_app.py @samples/book-app-project/books.py
>
> How do these files work together? What's the data flow?
```

> 💡 **Advanced Option**: For security-focused cross-file analysis, try the Python security examples:
> ```bash
> > @samples/buggy-code/python/user_service.py @samples/buggy-code/python/payment_processor.py
> > Find security vulnerabilities that span BOTH files
> ```

---

<details>
<summary>🎬 Veja em ação!</summary>

![Multi-File Demo](assets/multi-file-demo.gif)

*A saída da demo varia. Seu modelo, ferramentas e respostas podem diferir do que é mostrado aqui.*

</details>

---

**O que o Copilot CLI descobre**:

```
Cross-Module Analysis
=====================

1. DATA FLOW PATTERN
   book_app.py creates BookCollection instance and calls methods
   books.py defines BookCollection class and manages data persistence

   Flow: book_app.py (UI) → books.py (business logic) → data.json (storage)

2. DUPLICATE DISPLAY FUNCTIONS
   book_app.py:9-21    show_books() function
   utils.py:28-36      print_books() function

   Impact: Two nearly identical functions doing the same thing. If you update
   one (like changing the format), you must remember to update the other.

3. INCONSISTENT ERROR HANDLING
   book_app.py handles ValueError from year conversion
   books.py silently returns None/False on errors

   Pattern: No unified approach to error handling across modules
```

**Why this matters**: A single-file review would miss the bigger picture. Only cross-file analysis reveals:
- **Duplicate code** that should be consolidated
- **Data flow patterns** showing how components interact
- **Architectural issues** that affect maintainability

---

### Demo: Understand a Codebase in 60 Seconds

<img src="assets/codebase-understanding.png" alt="Comparação em tela dividida mostrando revisão manual levando 1 hora versus análise assistida por IA levando 10 segundos" width="800" />

Novo em um projeto? Conheça-o rapidamente usando o Copilot CLI.

```bash
copilot

> @samples/book-app-project/
>
> In one paragraph, what does this app do and what are its biggest quality issues?
```

**O que você obtém**:
```
This is a CLI book collection manager that lets users add, list, remove, and
search books stored in a JSON file. The biggest quality issues are:

1. Duplicate display logic - show_books() and print_books() do the same thing
2. Inconsistent error handling - some errors raise exceptions, others return False
3. No input validation - year can be 0, empty strings accepted for title/author
4. Missing tests - no test coverage for critical functions like find_book_by_title

Priority fix: Consolidate duplicate display functions and add input validation.
```

**Resultado**: O que levaria uma hora de leitura de código é comprimido em 10 segundos. Você sabe exatamente onde focar.

---

## Practical Examples

### Example 1: Code Review with Context

```bash
copilot

> @samples/book-app-project/books.py Review this file for potential bugs

# Copilot CLI now has the full file content and can give specific feedback:
# "Line 49: Case-sensitive comparison may miss books..."
# "Line 29: JSON decode errors are caught but data corruption isn't logged..."

> What about @samples/book-app-project/book_app.py?

# Now reviewing book_app.py, but still aware of books.py context
```

### Example 2: Understanding a Codebase

```bash
copilot

> @samples/book-app-project/books.py What does this module do?

# Copilot CLI reads books.py and understands the BookCollection class

> @samples/book-app-project/ Give me an overview of the code structure

# Copilot CLI scans the directory and summarizes

> How does the app save and load books?

# Copilot CLI can trace through the code it's already seen
```

<details>
<summary>🎬 See a multi-turn conversation in action!</summary>

![Multi-Turn Demo](assets/multi-turn-demo.gif)

*A saída da demo varia. Seu modelo, ferramentas e respostas podem diferir do que é mostrado aqui.*

</details>

### Example 3: Multi-File Refactoring

```bash
copilot

> @samples/book-app-project/book_app.py @samples/book-app-project/utils.py
> I see duplicate display functions: show_books() and print_books(). Help me consolidate these.

# Copilot CLI sees both files and can suggest how to merge the duplicate code
```

---

## Session Management

Sessions are automatically saved as you work. You can resume previous sessions to continue where you left off.

### Sessions Auto-Save

Every conversation is automatically saved. Just exit normally:

```bash
copilot

> @samples/book-app-project/ Let's improve error handling across all modules

[... do some work ...]

> /exit
```

### Resume the Most Recent Session

```bash
# Continue where you left off
copilot --continue
```

### Resume a Specific Session

```bash
# Pick from a list of sessions interactively
copilot --resume

# -r is a shorthand for --resume (saves some typing!)
copilot -r

# Or resume a specific session by ID
copilot --resume=abc123

# Or resume by the name you gave the session
copilot --resume="my book app review"
```

> 💡 **How do I find a session ID?** You don't need to memorize them. Running `copilot --resume` without an ID shows an interactive list of your previous sessions, their names, IDs, and when they were last active. Just pick the one you want.
>
> **What about multiple terminals?** Each terminal window is its own session with its own context. If you have Copilot CLI open in three terminals, that's three separate sessions. Running `--resume` from any terminal lets you browse all of them. The `--continue` flag grabs the session from the current working directory first; if none exists there, it picks the most recently active session.
>
> **Can I switch sessions without restarting?** Yes. Use the `/resume` slash command from inside an active session:
> ```
> > /resume
> # Shows a list of sessions to switch to
> ```

### Organize Your Sessions

Give sessions meaningful names so you can find them later. You can name a session when you start it, or rename it at any time while inside the session:

```bash
# Name a session right when you start it
copilot --name book-app-review

# Or rename the current session from inside
copilot

> /rename book-app-review
# Session renamed for easier identification
```

Once a session is named, you can resume it directly by name without browsing through a list:

```bash
copilot --resume=book-app-review
```

To clean up sessions you no longer need, use `/session delete` from inside a session:

```bash
copilot

> /session delete            # Deletes the current session
> /session delete abc123     # Deletes a specific session by ID
> /session delete-all        # Deletes all sessions (use with care!)
```

### Persistent Memory Across Sessions

Sessions save your conversation history, but **memory** goes one step further and lets Copilot CLI remember preferences and facts *across all sessions*, not just within a single one.

```bash
copilot

> /memory show
# Shows what Copilot CLI currently remembers about you and your project

> /memory on
# Enables memory (on by default if your account supports it)

> /memory off
# Disables memory (useful if you prefer a fresh slate each time)
```

For example, if you tell Copilot CLI "I always prefer pytest for Python testing", it can remember that preference and apply it automatically in future sessions. All without you having to repeat it.

> 💡 **Memory vs. Sessions**: Sessions save conversation history so you can resume a specific task. Memory saves reusable repository facts and user preferences that Copilot can apply in future work. Think of sessions as task notebooks, and memory as reusable context Copilot can carry forward.

### Check and Manage Context

As you add files and conversation, Copilot CLI's [context window](../GLOSSARY.md#context-window) fills up. Several commands are available to help you stay in control:

```bash
copilot

> /context
Uso de contexto: 62k/200k tokens (31%)

> /clear
# Abandons the current session (no history saved) and starts a fresh conversation

> /new
# Ends the current session (saving it to history for search/resume) and starts a fresh conversation

> /rewind
# Opens a timeline picker allowing you to roll back to an earlier point in your conversation
```

> 💡 **Quando usar `/clear` ou `/new`**: Se você estava revisando books.py e quer mudar para discutir utils.py, execute /new primeiro (ou /clear se não precisar do histórico da sessão). Caso contrário, contexto antigo pode confundir as respostas.

> 💡 **Made a mistake or want to try a different approach?** Use `/rewind` (or press Esc twice) to open a **timeline picker** that lets you roll back to any earlier point in your conversation, not just the most recent one. This is useful when you went down the wrong path and want to backtrack without starting over entirely.

---

### Pick Up Where You Left Off

<img src="assets/session-persistence-timeline.png" alt="Timeline showing how GitHub Copilot CLI sessions persist across days - start on Monday, resume on Wednesday with full context restored" width="800"/>

*Sessions auto-save when you exit. Resume days later with full context: files, issues, and progress all remembered.*

Imagine this workflow across multiple days:

```bash
# Monday: Start book app review with a name right from the beginning
copilot --name book-app-review

> @samples/book-app-project/books.py
> Review and number all code quality issues

Quality Issues Found:
1. Duplicate display functions (book_app.py & utils.py) - MEDIUM
2. No input validation for empty strings - MEDIUM
3. Year can be 0 or negative - LOW
4. No type hints on all functions - LOW
5. Missing error logging - LOW

> Fix issue #1 (duplicate functions)
# Work on the fix...

> /exit
```

```bash
# Wednesday: Resume exactly where you left off, by name
copilot --resume=book-app-review

> What issues remain unfixed from our book app review?

Remaining issues from our book-app-review session:
2. No input validation for empty strings - MEDIUM
3. Year can be 0 or negative - LOW
4. No type hints on all functions - LOW
5. Missing error logging - LOW

Issue #1 (duplicate functions) was fixed on Monday.

> Let's tackle issue #2 next
```

**What makes this powerful**: Days later, Copilot CLI remembers:
- The exact file you were working on
- The numbered list of issues
- Which ones you've already addressed
- The context of your conversation

No re-explaining. No re-reading files. Just continue working.

---

**🎉 You now know the essentials!** The `@` syntax, session management (`--name`/`--continue`/`--resume`/`/rename`), and context commands (`/context`/`/clear`) are enough to be highly productive. Everything below is optional. Return to it when you're ready.

---

# Optional: Going Deeper

<img src="assets/optional-going-deeper.png" alt="Abstract crystal cave in blue and purple tones representing deeper exploration of context concepts" width="800"/>

These topics build on the essentials above. **Pick what interests you, or skip ahead to [Practice](#practice).**

| I want to learn about... | Jump to |
|---|---|
| Wildcard patterns and advanced session commands | [Additional @ Patterns & Session Commands](#additional-patterns) |
| Building on context across multiple prompts | [Context-Aware Conversations](#context-aware-conversations) |
| Token limits and `/compact` | [Understanding Context Windows](#understanding-context-windows) |
| How to pick the right files to reference | [Choosing What to Reference](#choosing-what-to-reference) |
| Analyzing screenshots and mockups | [Working with Images](#working-with-images) |

<details>
<summary><strong>Padrões @ adicionais e comandos de sessão</strong></summary>
<a id="additional-patterns"></a>

### Padrões @ adicionais

Para usuários avançados, o Copilot CLI suporta padrões curinga e referências a imagens:

| Padrão | O que faz |
|---------|--------------|
| `@folder/*.py` | Todos os arquivos .py na pasta |
| `@**/test_*.py` | Coringa recursivo: encontra todos os arquivos de teste em qualquer lugar |
| `@image.png` | Arquivo de imagem para revisão na interface |

```bash
copilot

> Find all TODO comments in @samples/book-app-project/**/*.py
```

### View Session Info

```bash
copilot

> /session
# Shows current session details and workspace summary

> /usage
# Shows session metrics and statistics
```

### Share Your Session

```bash
copilot

> /share file ./my-session.md
# Exports session as a markdown file

> /share gist
# Creates a GitHub gist with the session

> /share html
# Exports session as a self-contained interactive HTML file
# Useful for sharing polished session reports with teammates or saving for reference
```

</details>

<details>
<summary><strong>Context-Aware Conversations</strong></summary>
<a id="context-aware-conversations"></a>

### Context-Aware Conversations

The magic happens when you have multi-turn conversations that build on each other.

#### Example: Progressive Enhancement

```bash
copilot

> @samples/book-app-project/books.py Review the BookCollection class

Copilot CLI: "The class looks functional, but I notice:
1. Missing type hints on some methods
2. No validation for empty title/author
3. Could benefit from better error handling"

> Add type hints to all methods

Copilot CLI: "Here's the class with complete type hints..."
[Shows typed version]

> Now improve error handling

Copilot CLI: "Building on the typed version, here's improved error handling..."
[Adds validation and proper exceptions]

> Generate tests for this final version

Copilot CLI: "Based on the class with types and error handling..."
[Generates comprehensive tests]
```

Notice how each prompt builds on the previous work. This is the power of context.

</details>

<details>
<summary><strong>Understanding Context Windows</strong></summary>
<a id="understanding-context-windows"></a>

### Understanding Context Windows

You already know `/context` and `/clear` from the essentials. Here's the deeper picture of how context windows work.

Every AI has a "context window," which is the amount of text it can consider at once.

<img src="assets/context-window-visualization.png" alt="Context Window Visualization" width="800"/>

*The context window is like a desk: it can only hold so much at once. Files, conversation history, and system prompts all take space.*

#### What Happens at the Limit

```bash
copilot

> /context

Uso de contexto: 45,000 / 128,000 tokens (35%)

# As you add more files and conversation, this grows

> @large-codebase/

Uso de contexto: 120,000 / 128,000 tokens (94%)

# Warning: Approaching context limit

> @another-large-file.py

Context limit reached. Older context will be summarized.
```

#### The `/compact` Command

When your context is getting full but you don't want to lose the conversation, `/compact` summarizes your history to free up tokens:

```bash
copilot

> /compact
# Summarizes conversation history, freeing up context space
# Your key findings and decisions are preserved
```

Também é possível fornecer instruções de foco opcionais ao `/compact` para definir o que deve ser priorizado no resumo:

```bash
copilot

> /compact focus on the list of bugs we found and decisions made
# Resume o histórico, mantendo a lista de bugs e decisões em destaque
```

> 💡 **Quando usar instruções de foco**: Se sua conversa cobriu muitos tópicos, instruções de foco ajudam o `/compact` a reter as partes mais relevantes para seus próximos passos, evitando perder o fio da conversa.

#### Dicas de eficiência de contexto

| Situação | Ação | Por quê |
|-----------|--------|-----|
| Starting new topic | `/clear` | Removes irrelevant context |
| Went down wrong path | `/rewind` | Roll back to any earlier point |
| Long conversation | `/compact` | Summarizes history, frees tokens |
| Need specific file | `@file.py` not `@folder/` | Loads only what you need |
| Hitting limits | `/new` or `/clear` | Fresh context |
| Multiple topics | Use `/rename` per topic | Easy to resume right session |

#### Best Practices for Large Codebases

1. **Be specific**: `@samples/book-app-project/books.py` instead of `@samples/book-app-project/`
2. **Clear context between topics**: Use `/new` or `/clear` when switching focus
3. **Use `/compact`**: Summarize conversation to free up context
4. **Use multiple sessions**: One session per feature or topic

</details>

<details>
<summary><strong>Choosing What to Reference</strong></summary>
<a id="choosing-what-to-reference"></a>

### Choosing What to Reference

Not all files are equal when it comes to context. Here's how to choose wisely:

#### File Size Considerations

| File Size | Approximate [Tokens](../GLOSSARY.md#token) | Strategy |
|-----------|-------------------|----------|
| Small (<100 lines) | ~500-1,500 tokens | Reference freely |
| Medium (100-500 lines) | ~1,500-7,500 tokens | Reference specific files |
| Large (500+ lines) | 7,500+ tokens | Be selective, use specific files |
| Very Large (1000+ lines) | 15,000+ tokens | Consider splitting or targeting sections |

**Concrete examples:**
- The book app's 4 Python files combined ≈ 2,000-3,000 tokens
- A typical Python module (200 lines) ≈ 3,000 tokens
- A Flask API file (400 lines) ≈ 6,000 tokens
- Your package.json ≈ 200-500 tokens
- A short prompt + response ≈ 500-1,500 tokens

> 💡 **Quick estimate for code:** Multiply lines of code by ~15 to get approximate tokens. Keep in mind this is only an estimate.

#### What to Include vs. Exclude

**High value** (include these):
- Entry points (`book_app.py`, `main.py`, `app.py`)
- The specific files you're asking about
- Files directly imported by your target file
- Configuration files (`requirements.txt`, `pyproject.toml`)
- Data models or dataclasses

**Lower value** (consider excluding):
- Generated files (compiled output, bundled assets)
- Node modules or vendor directories
- Large data files or fixtures
- Files unrelated to your question

#### The Specificity Spectrum

```
Less specific ────────────────────────► More specific
@samples/book-app-project/                      @samples/book-app-project/books.py:47-52
     │                                       │
     └─ Scans everything                     └─ Just what you need
        (uses more context)                      (preserves context)
```

**Quando usar abordagem ampla** (`@samples/book-app-project/`):
- Exploração inicial da base de código
- Encontrar padrões em vários arquivos
- Revisões de arquitetura

**Quando ser específico** (`@samples/book-app-project/books.py`):
- Depuração de um problema específico
- Revisão de código de um arquivo em particular
- Perguntar sobre uma única função

#### Practical Example: Staged Context Loading

```bash
copilot

# Step 1: Start with structure
> @package.json What frameworks does this project use?

# Step 2: Narrow based on answer
> @samples/book-app-project/ Show me the project structure

# Step 3: Focus on what matters
> @samples/book-app-project/books.py Review the BookCollection class

# Step 4: Add related files only as needed
> @samples/book-app-project/book_app.py @samples/book-app-project/books.py How does the CLI use the BookCollection?
```

This staged approach keeps context focused and efficient.

</details>

<details>
<summary><strong>Working with Images</strong></summary>
<a id="working-with-images"></a>

### Working with Images

You can include images in your conversations using the `@` syntax, or simply **paste from your clipboard** (Cmd+V / Ctrl+V). Copilot CLI can analyze screenshots, mockups, and diagrams to help with UI debugging, design implementation, and error analysis.

```bash
copilot

> @assets/screenshot.png What is happening in this image?

> @assets/mockup.png Write the HTML and CSS to match this design. Place it in a new file called index.html and put the CSS in styles.css.
```

> 📖 **Learn more**: See [Additional Context Features](../appendices/additional-context.md#working-with-images) for supported formats, practical use cases, and tips for combining images with code.

</details>

---

# Practice

<img src="../assets/practice.png" alt="Warm desk setup with monitor showing code, lamp, coffee cup, and headphones ready for hands-on practice" width="800"/>

Time to apply your context and session management skills.

---

## ▶️ Try It Yourself

### Full Project Review

The course includes sample files you can review directly. Start copilot and run the prompt shown next:

```bash
copilot

> @samples/book-app-project/ Give me a code quality review of this project

# Copilot CLI will identify issues like:
# - Duplicate display functions
# - Missing input validation
# - Inconsistent error handling
```

> 💡 **Want to try with your own files?** Create a small Python project (`mkdir -p my-project/src`), add some .py files, then use `@my-project/src/` to review them. You can ask copilot to create sample code for you if you'd like!

### Session Workflow

```bash
copilot

> /rename book-app-review
> @samples/book-app-project/books.py Let's add input validation for empty titles

[Copilot CLI suggests validation approach]

> Implement that fix
> Now consolidate the duplicate display functions in @samples/book-app-project/
> /exit

# Later - resume where you left off
copilot --continue

> Generate tests for the changes we made
```

---

After completing the demos, try these variations:

1. **Cross-File Challenge**: Analyze how book_app.py and books.py work together:
   ```bash
   copilot
   > @samples/book-app-project/book_app.py @samples/book-app-project/books.py
   > What's the relationship between these files? Are there any code smells?
   ```

2. **Session Challenge**: Start a session, name it with `/rename my-first-session`, work on something, exit with `/exit`, then run `copilot --continue`. Does it remember what you were doing?

3. **Context Challenge**: Run `/context` mid-session. How many tokens are you using? Try `/compact` and check again. (See [Understanding Context Windows](#understanding-context-windows) in Going Deeper for more on `/compact`.)

**Self-Check**: You understand context when you can explain why `@folder/` is more powerful than opening each file individually.

---

## 📝 Assignment

### Main Challenge: Trace the Data Flow

The hands-on examples focused on code quality reviews and input validation. Now practice the same context skills on a different task, tracing how data moves through the app:

1. Start an interactive session: `copilot`
2. Reference `books.py` and `book_app.py` together:
   `@samples/book-app-project/books.py @samples/book-app-project/book_app.py Trace how a book goes from user input to being saved in data.json. What functions are involved at each step?`
3. Bring in the data file for additional context:
   `@samples/book-app-project/data.json What happens if this JSON file is missing or corrupted? Which functions would fail?`
4. Ask for a cross-file improvement:
   `@samples/book-app-project/books.py @samples/book-app-project/utils.py Suggest a consistent error-handling strategy that works across both files.`
5. Rename the session: `/rename data-flow-analysis`
6. Exit with `/exit`, then resume with `copilot --continue` and ask a follow-up question about the data flow

**Success criteria**: You can trace data across multiple files, resume a named session, and get cross-file suggestions.

<details>
<summary>💡 Hints (click to expand)</summary>

**Getting started:**
```bash
cd /path/to/copilot-cli-for-beginners
copilot
> @samples/book-app-project/books.py @samples/book-app-project/book_app.py Trace how a book goes from user input to being saved in data.json.
> @samples/book-app-project/data.json What happens if this file is missing or corrupted?
> /rename data-flow-analysis
> /exit
```

Then resume with: `copilot --continue`

**Useful commands:**
- `@file.py` - Reference a single file
- `@folder/` - Reference all files in a folder (note the trailing `/`)
- `/context` - Check how much context you're using
- `/rename <name>` - Name your session for easy resuming

</details>

### Bonus Challenge: Context Limits

1. Reference all the book app files at once with `@samples/book-app-project/`
2. Ask several detailed questions about different files (`books.py`, `utils.py`, `book_app.py`, `data.json`)
3. Run `/context` to see usage. How quickly does it fill up?
4. Practice using `/compact` to reclaim space, then continue the conversation
5. Try being more specific with file references (e.g., `@samples/book-app-project/books.py` instead of the whole folder) and see how it affects context usage

---

<details>
<summary>🔧 <strong>Common Mistakes & Troubleshooting</strong> (click to expand)</summary>

### Common Mistakes

| Mistake | What Happens | Fix |
|---------|--------------|-----|
| Forgetting `@` before filenames | Copilot CLI treats "books.py" as plain text | Use `@samples/book-app-project/books.py` to reference files |
| Expecting sessions to persist automatically | Starting `copilot` fresh loses all previous context | Use `--continue` (last session) or `--resume` (pick a session) |
| Referencing files outside current directory | "Permission denied" or "File not found" errors | Use `/add-dir /path/to/directory` to grant access |
| Not using `/clear` when switching topics | Old context confuses responses about the new topic | Run `/clear` before starting a different task |

### Troubleshooting

**"File not found" errors** - Make sure you're in the correct directory:

```bash
pwd  # Check current directory
ls   # List files

# Then start copilot and use relative paths
copilot

> Review @samples/book-app-project/books.py
```

**"Permission denied"** - Add the directory to your allowed list:

```bash
copilot --add-dir /path/to/directory

# Or in a session:
> /add-dir /path/to/directory
```

**Context fills up too quickly**:
- Be more specific with file references
- Use `/clear` between different topics
- Split work across multiple sessions

</details>

---

# Summary

## 🔑 Key Takeaways

1. **`@` syntax** gives Copilot CLI context about files, directories, and images
2. **Multi-turn conversations** build on each other as context accumulates
3. **Sessions auto-save**: name them at startup with `--name`, resume by name with `--resume=<name>`, or use `--continue` to pick up the most recent session
4. **Context windows** have limits: manage them with `/clear`, `/compact`, `/context`, `/new`, and `/rewind`. Use `/compact focus on <topic>` to shape what gets kept in the summary
5. **Persistent memory** (`/memory`) lets Copilot CLI remember preferences and facts across *all* sessions — not just the current one
6. **Permission flags** (`--add-dir`, `--allow-all`) control multi-directory access. Use them wisely!
7. **Image references** (`@screenshot.png`) help debug UI issues visually

> 📚 **Official Documentation**: [Use Copilot CLI](https://docs.github.com/copilot/how-tos/copilot-cli/use-copilot-cli) for the complete reference on context, sessions, and working with files.

> 📋 **Quick Reference**: See the [GitHub Copilot CLI command reference](https://docs.github.com/en/copilot/reference/cli-command-reference) for a complete list of commands and shortcuts.

---

## ➡️ What's Next

Now that you can give Copilot CLI context, let's put it to work on real development tasks. The context techniques you just learned (file references, cross-file analysis, and session management) are the foundation for the powerful workflows in the next chapter.

In **[Chapter 03: Development Workflows](../03-development-workflows/README.md)**, you'll learn:

- Code review workflows
- Refactoring patterns
- Debugging assistance
- Test generation
- Git integration

---

**[← Back to Chapter 01](../01-setup-and-first-steps/README.md)** | **[Continue to Chapter 03 →](../03-development-workflows/README.md)**
