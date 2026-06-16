<!--
---
id: CopilotCLI-01
title: !translate First Steps
description: !translate Experience GitHub Copilot CLI through hands-on demos, then learn when to use interactive, plan, and programmatic modes.
audience: Developers / Students / Terminal users
slug: first-steps
weight: 2
---
-->

![Chapter 01: First Steps](assets/chapter-header.png)

> **Veja a IA encontrar bugs instantaneamente, explicar código confuso e gerar scripts funcionais. Depois, aprenda três maneiras diferentes de usar o GitHub Copilot CLI.**

Este capítulo é onde a mágica começa! Você verá por que desenvolvedores descrevem o GitHub Copilot CLI como ter um engenheiro sênior a um toque de distância. A IA encontrará bugs de segurança em segundos, explicará código complexo em linguagem simples e gerará scripts funcionais instantaneamente. Em seguida, você dominará os três modos de interação (Interativo, Plano e Programático) para saber exatamente qual usar em cada tarefa.

> ⚠️ **Pré-requisitos**: Certifique-se de ter concluído **[Capítulo 00: Início Rápido](../00-quick-start/README.md)** primeiro. Você precisará do GitHub Copilot CLI instalado e autenticado antes de executar as demos abaixo.

## 🎯 Objetivos de Aprendizagem

Ao final deste capítulo, você será capaz de:

- Experimentar o aumento de produtividade que o GitHub Copilot CLI oferece por meio de demos práticas
- Escolher o modo certo (Interativo, Plano ou Programático) para cada tarefa
- Usar comandos com barra (slash commands) para controlar suas sessões

> ⏱️ **Tempo estimado**: ~45 minutos (15 min leitura + 30 min prático)

---

# Sua primeira experiência com o Copilot CLI

<img src="assets/first-copilot-experience.png" alt="Desenvolvedor sentado à mesa com código no monitor e partículas brilhantes representando assistência de IA" width="800"/>

Comece agora e veja o que o Copilot CLI pode fazer.

---

## Fique à vontade: Seus primeiros prompts

Antes de mergulhar nas demos, comece com alguns prompts simples que você pode testar agora. **Não é necessário um repositório de código**! Abra um terminal e inicie o Copilot CLI:

```bash
copilot
```

Experimente estes prompts para iniciantes:

```
> Explain what a dataclass is in Python in simple terms

> Write a function that sorts a list of dictionaries by a specific key

> What's the difference between a list and a tuple in Python?

> Give me 5 best practices for writing clean Python code
```

Não usa Python? Sem problema! Faça perguntas sobre a linguagem de sua preferência.

Notice how natural it feels. Just ask questions like you would to a colleague. When you're done exploring, type `/exit` to leave the session.

**The key insight**: GitHub Copilot CLI is conversational. You don't need special syntax to get started. Just ask questions in plain English.

## Veja em ação

Agora veja por que desenvolvedores chamam isso de "ter um engenheiro sênior a um toque de distância".

> 📖 **Lendo os exemplos**: Linhas que começam com `>` são prompts que você digita dentro de uma sessão interativa do Copilot CLI. Linhas sem o prefixo `>` são comandos de shell que você executa no terminal.

> 💡 **Sobre as saídas de exemplo**: As saídas mostradas ao longo do curso são ilustrativas. Como as respostas do Copilot CLI variam a cada execução, seus resultados podem diferir em redação, formatação e nível de detalhe. Foque no *tipo* de informação retornada, não no texto exato.

### Demo 1: Code Review in Seconds

The course includes sample files with intentional code quality issues. If you're working on your local machine and haven't already cloned the repo, please run the `git clone` command below, navigate to the `copilot-cli-for-beginners` folder, and then run the `copilot` command.

```bash
# Clone the course repository if you're working locally and haven't already
git clone https://github.com/github/copilot-cli-for-beginners
cd copilot-cli-for-beginners

# Start Copilot
copilot
```

Once inside the interactive Copilot CLI session, run the following:

```
> Review @samples/book-app-project/book_app.py for code quality issues and suggest improvements
```

> 💡 **What's the `@` symbol used for?** The `@` symbol tells Copilot CLI to read a file. You'll learn all about this in Chapter 02. For now, just copy the command exactly as shown.

---

<details>
<summary>🎬 Veja em ação!</summary>

![Code Review Demo](assets/code-review-demo.gif)

*A saída da demo varia. Seu modelo, ferramentas e respostas podem diferir do que é mostrado aqui.*

</details>

---

**Resumo**: Uma revisão de código profissional em segundos. A revisão manual levaria... bem... muito mais tempo!

---

### Demonstração 2: Explicar código confuso

Já ficou olhando para um código sem entender o que ele faz? Tente isto na sua sessão do Copilot CLI:

```
> Explique em termos simples o que faz @samples/book-app-project/books.py
```

---

<details>
<summary>🎬 Veja em ação!</summary>

![Explain Code Demo](assets/explain-code-demo.gif)

*A saída da demo varia. Seu modelo, ferramentas e respostas podem diferir do que é mostrado aqui.*

</details>

---

**What happens**: (your output will differ) Copilot CLI reads the file, understands the code, and explains it in plain English.

```
This is a book collection management module using Python dataclasses.

Think of it like a digital bookshelf:
- Book is a dataclass - a simple way to store book information (title, author, year, read status)
- BookCollection manages the entire collection and handles saving/loading

Key components:

1. @dataclass decorator (line 8)
   - Automatically creates __init__, __repr__, etc.
   - Clean way to define data structures in Python

2. BookCollection class (line 16)
   - Maintains a list of Book objects
   - Handles persistence with JSON file I/O
   - load_books() reads from data.json
   - save_books() writes to data.json using asdict()

3. Book operations:
   - add_book() - creates and saves new books
   - find_book_by_title() - searches collection
   - mark_as_read() - updates read status
   - find_by_author() - filters by author name

Common pattern: Read from JSON → Work with Python objects → Write back to JSON
```

**The takeaway**: Complex code explained like a patient mentor would explain it.

---

### Demo 3: Generate Working Code

Need a function you'd otherwise spend 15 minutes googling? Still in your session:

```
> Write a Python function that takes a list of books and returns statistics: 
  total count, number read, number unread, oldest and newest book
```

---

<details>
<summary>🎬 Veja em ação!</summary>

![Generate Code Demo](assets/generate-code-demo.gif)

*A saída da demo varia. Seu modelo, ferramentas e respostas podem diferir do que é mostrado aqui.*

</details>

---

**What happens**: A complete, working function in seconds that you can copy-paste-run.

When you're done exploring, exit the session:

```
> /exit
```

**The takeaway**: Instant gratification, and you stayed in one continuous session the whole time.

---

# Modos e Comandos

<img src="assets/modes-and-commands.png" alt="Futuristic control panel with glowing screens, dials, and equalizers representing Copilot CLI modes and commands" width="800"/>

You've just seen what Copilot CLI can do. Now let's understand *how* to use these capabilities effectively. The key is knowing which of the three interaction modes to use for different situations.

> 💡 **Note**: Copilot CLI also has an **Autopilot** mode where it works through tasks without waiting for your input. It's powerful but requires granting full permissions and uses premium requests autonomously. This course focuses on the three modes below. We'll point you to Autopilot once you're comfortable with the basics.

---

## 🧩 Real-World Analogy: Dining Out

Think of using GitHub Copilot CLI like going out to eat. From planning the trip to placing your order, different situations call for different approaches:

| Modo | Analogia (refeição) | Quando usar |
|------|----------------|-------------|
| **Plan** | GPS route to the restaurant | Complex tasks - map out the route, review stops, agree on the plan, then drive |
| **Interactive** | Talking to the waiter | Exploration and iteration - ask questions, customize, get real-time feedback |
| **Programmatic** | Drive-through ordering | Quick, specific tasks - stay in your environment, get a result fast |

Just like dining out, you'll naturally learn when each approach feels right.

<img src="assets/ordering-food-analogy.png" alt="Three Ways to Use GitHub Copilot CLI - Plan Mode (GPS route to restaurant), Interactive Mode (talking to waiter), Programmatic Mode (drive-through)" width="800"/>

*Choose your mode based on the task: Plan for mapping it out first, Interactive for back-and-forth collaboration, Programmatic for quick one-shot results*

### Which Mode Should I Start With?

**Start with Interactive mode.** 
- You can experiment and ask follow-up questions
- Context builds naturally through conversation
- Mistakes are easy to correct with `/clear`

Once you're comfortable, try:
- **Programmatic mode** (`copilot -p "<your prompt>"`) for quick, one-off questions
- **Plan mode** (`/plan`) when you need to plan things out in more detail before coding

---

## The Three Modes

### Mode 1: Interactive Mode (start here)

<img src="assets/interactive-mode.png" alt="Interactive Mode - Like talking to a waiter who can answer questions and adjust the order" width="250"/>

**Best for**: Exploration, iteration, multi-turn conversations. Like talking to a waiter who can answer questions, take feedback, and adjust the order on the fly.

Start an interactive session:

```bash
copilot
```

As you've seen up to this point, you'll see a prompt where you can type naturally. To get help on available commands, just type:

```
> /help
```

**Key insight**: Interactive mode maintains context. Each message builds on previous ones, just like a real conversation.

#### Interactive Mode Example

```bash
copilot

> Review @samples/book-app-project/utils.py and suggest improvements

> Add type hints to all functions

> Make the error handling more robust

> /exit
```

Notice how each prompt builds on the previous answer. You're having a conversation, not starting over each time.

---

### Mode 2: Plan Mode

<img src="assets/plan-mode.png" alt="Plan Mode - Like planning a route before a trip using GPS" width="250"/>

**Best for**: Complex tasks where you want to review the approach before execution. Similar to planning a route before a trip using GPS.

Plan mode helps you create a step-by-step plan before writing any code. Use the `/plan` command, press **Shift+Tab** to cycle into Plan Mode:

```bash
copilot

> /plan Add a "mark as read" command to the book app
```

> 💡 **Tip**: **Shift+Tab** cycles between modes: Interactive → Plan → Autopilot. Press it anytime during an interactive session to switch modes without typing a command.

You can also launch Copilot CLI directly in plan mode using the `--plan` flag:

```bash
copilot --plan
```

**Plan mode output:** (your output may differ)

```
📋 Implementation Plan

Step 1: Update the command handler in book_app.py
  - Add new elif branch for "mark" command
  - Create handle_mark_as_read() function

Step 2: Implement the handler function
  - Prompt user for book title
  - Call collection.mark_as_read(title)
  - Display success/failure message

Step 3: Update help text
  - Add "mark" to available commands list
  - Documentar o uso do comando

Step 4: Test the flow
  - Add a book
  - Mark it as read
  - Verify status changes in list output

Proceed with implementation? [Y/n]
```

**Key insight**: Plan mode lets you review and modify the approach before any code is written. Once a plan is complete, you can even tell Copilot CLI to save it to a file for later reference. For example, "Save this plan to `mark_as_read_plan.md`" would create a markdown file with the plan details.

> 💡 **Want something more complex?** Try: `/plan Add search and filter capabilities to the book app`. Plan mode scales from simple features to full applications.

> 📚 **Autopilot mode**: You may have noticed Shift+Tab cycles through a third mode called **Autopilot**. In autopilot mode, Copilot works through an entire plan without waiting for your input after each step — like handing a task to a colleague and saying "let me know when you're finished." The typical workflow is plan → accept → autopilot, which means you need to be good at writing plans first. You can also launch directly into autopilot with `copilot --autopilot`. Get comfortable with Interactive and Plan modes first, then see the [official docs](https://docs.github.com/copilot/concepts/agents/copilot-cli/autopilot) when you're ready.

---

### Mode 3: Programmatic Mode

<img src="assets/programmatic-mode.png" alt="Programmatic Mode - Like using a drive-through for a quick order" width="250"/>

**Best for**: Automation, scripts, CI/CD, single-shot commands. Like using a drive-through for a quick order without needing to talk to a waiter.

Use the `-p` flag for one-time commands that don't need interaction:

```bash
# Generate code
copilot -p "Write a function that checks if a number is even or odd"

# Get quick help
copilot -p "How do I read a JSON file in Python?"
```

**Key insight**: Programmatic mode gives you a quick answer and exits. No conversation, just input → output.

<details>
<summary>📚 <strong>Going Further: Using Programmatic Mode in Scripts</strong> (click to expand)</summary>

Once you're comfortable, you can use `-p` in shell scripts:

```bash
#!/bin/bash

# Generate commit messages automatically
COMMIT_MSG=$(copilot -p "Generate a commit message for: $(git diff --staged)")
git commit -m "$COMMIT_MSG"

# Review a file
copilot --allow-all -p "Review @myfile.py for issues"
```
> ⚠️ **About `--allow-all`**: This flag skips all permission prompts, letting Copilot CLI read files, run commands, and access URLs without asking first. This is necessary for programmatic mode (`-p`) since there's no interactive session to approve actions. Only use `--allow-all` with prompts you've written yourself and in directories you trust. Never use it with untrusted input or in sensitive directories.

</details>

---

## Essential Slash Commands

These commands are great to learn initially as you're getting started with Copilot CLI:

| Comando | O que faz | Quando usar |
|---------|--------------|-------------|
| `/ask` | Faça uma pergunta rápida sem afetar o histórico da conversa | Quando você quer uma resposta rápida sem atrapalhar a tarefa atual |
| `/clear` | Limpa a conversa e inicia do zero | Ao mudar de assunto |
| `/help` | Mostra todos os comandos disponíveis | Quando você esquecer um comando |
| `/model` | Mostra ou alterna o modelo de IA | Quando quiser mudar o modelo de IA |
| `/plan` | Planeje seu trabalho antes de codar | Para funcionalidades mais complexas |
| `/research` | Pesquisa profunda usando GitHub e fontes web | Quando precisar investigar um tópico antes de codar |
| `/exit` | Encerra a sessão | Quando terminar |

> 💡 **`/ask` vs regular chat**: Normally every message you send becomes part of the ongoing conversation and affects future responses. `/ask` is an "off the record" shortcut — perfect for quick one-off questions like `/ask What does YAML mean?` without polluting your session context.

> 💡 **Tab-completion**: When typing a slash command, press **Tab** to auto-complete the command name or cycle through available subcommands and arguments. This is especially handy when you can't remember the exact name of a command.

That's it for getting started! As you become comfortable, you can explore additional commands.

> 📚 **Official Documentation**: [CLI command reference](https://docs.github.com/copilot/reference/cli-command-reference) for the complete list of commands and flags.

<details>
<summary>📚 <strong>Comandos adicionais</strong> (clique para expandir)</summary>

> 💡 Os comandos essenciais acima cobrem grande parte do uso diário. Esta referência serve quando estiver pronto para explorar mais.

### Ambiente de agentes

| Comando | O que faz |
|---------|-----------|
| `/agent` | Navegar e selecionar entre agentes disponíveis |
| `/env` | Mostrar detalhes do ambiente carregado — quais instruções, servidores MCP, skills, agentes e plugins estão ativos |
| `/init` | Inicializar as instruções do Copilot para o repositório |
| `/mcp` | Gerenciar a configuração do servidor MCP |
| `/skills` | Gerenciar skills para capacidades adicionais |

> 💡 Agentes são abordados no [Capítulo 04](../04-agents-custom-instructions/README.md), skills no [Capítulo 05](../05-skills/README.md) e servidores MCP no [Capítulo 06](../06-mcp-servers/README.md).

### Modelos e subagentes

| Comando | O que faz |
|---------|-----------|
| `/delegate` | Delegar tarefa para um agente em nuvem do GitHub Copilot |
| `/fleet` | Dividir uma tarefa complexa em subtarefas paralelas para acelerar a execução |
| `/model` | Mostrar ou trocar o modelo de IA |
| `/tasks` | Ver subagentes de background e sessões shell destacadas |

### Código

| Comando | O que faz |
|---------|-----------|
| `/diff` | Revisar mudanças feitas no diretório atual |
| `/pr` | Operar sobre pull requests do branch atual |
| `/research` | Realizar investigação aprofundada usando GitHub e fontes web |
| `/review` | Executar o agente de revisão de código para analisar mudanças |
| `/terminal-setup` | Habilitar suporte a entrada multilinha (shift+enter e ctrl+enter) |

### Permissões

| Comando | O que faz |
|---------|-----------|
| `/add-dir <directory>` | Adicionar um diretório à lista permitida |
| `/allow-all [on\|off\|show]` | Aprovar automaticamente todos os prompts de permissão; use `on` para habilitar, `off` para desabilitar, `show` para verificar o estado |
| `/yolo` | Atalho rápido para `/allow-all on` — aprova automaticamente todos os prompts de permissão |
| `/cwd`, `/cd [directory]` | Ver ou mudar o diretório de trabalho |
| `/list-dirs` | Show all allowed directories |

> ⚠️ **Use with caution**: `/allow-all` and `/yolo` skip confirmation prompts. Great for trusted projects, but be careful with untrusted code.

### Session

| Comando | O que faz |
|---------|--------------|
| `/clear` | Encerra a sessão atual (sem salvar histórico) e inicia uma nova conversa |
| `/compact` | Resume a conversa para reduzir o uso de contexto (opcionalmente adicione instruções de foco, por exemplo `/compact focus on the bug list`) |
| `/context` | Mostra o uso da janela de contexto e uma visualização dos tokens |
| `/keep-alive` | Evita que o seu sistema entre em suspensão enquanto o Copilot CLI está ativo — útil para tarefas longas em um laptop |
| `/memory [on\|off\|show]` | Ativa, desativa ou mostra a memória persistente — fatos e preferências lembradas entre sessões |
| `/new` | Encerra a sessão atual (salvando-a no histórico para busca/retomada) e inicia uma nova conversa |
| `/resume` | Alterna para outra sessão (opcional: especifique ID ou nome da sessão) |
| `/rename` | Renomeia a sessão atual (omitir o nome para gerar automaticamente) |
| `/rewind` | Abre um seletor de linha do tempo para retroceder a qualquer ponto anterior da conversa |
| `/usage` | Exibe métricas e estatísticas de uso da sessão, incluindo barras de cota |
| `/session` | Mostra informações da sessão e resumo do workspace; use `/session delete`, `/session delete <id>` ou `/session delete-all` para remover sessões |
| `/share` | Exporta a sessão como um arquivo markdown, gist do GitHub ou arquivo HTML autocontido |

### Display

| Comando | O que faz |
|---------|--------------|
| `/statusline` (ou `/footer`) | Personalize quais itens aparecem na barra de status na parte inferior da sessão (diretório, branch, esforço, janela de contexto, cota) |
| `/theme` | Ver ou definir o tema do terminal |
| `/voice` | Dite seu prompt usando reconhecimento de fala local — fale naturalmente em vez de digitar |

### Help and Feedback

| Comando | O que faz |
|---------|--------------|
| `/changelog` | Exibe o changelog das versões do CLI |
| `/feedback` | Enviar feedback ao GitHub |
| `/help` | Mostra todos os comandos disponíveis |

### Quick Shell Commands

Run shell commands directly without AI by prefixing with `!`:

```bash
copilot

> !git status
# Runs git status directly, bypassing the AI

> !python -m pytest tests/
# Runs pytest directly
```

### Switching Models

Copilot CLI supports multiple AI models from OpenAI, Anthropic, Google, and others. The models available to you depend on your subscription level and region. Use `/model` to see your options and switch between them:

```bash
copilot
> /model

# Shows available models and lets you pick one. Select Sonnet 4.5.
```

> 💡 **Tip**: Some models cost more "premium requests" than others. Models marked **1x** (like Claude Sonnet 4.5) are a great default. They're capable and efficient. Higher-multiplier models use your premium request quota faster, so save those for when you really need them.

> 💡 **Not sure which model to pick?** Select **`Auto`** from the model picker to let Copilot automatically choose the best available model for each session. This is a great default if you're just getting started and don't want to think about model selection.

</details>

---

# Practice

<img src="../assets/practice.png" alt="Warm desk setup with monitor showing code, lamp, coffee cup, and headphones ready for hands-on practice" width="800"/>

Time to put what you've learned into action.

---

## ▶️ Try It Yourself

### Interactive Exploration

Start Copilot and use follow-up prompts to iteratively improve the book app:

```bash
copilot

> Review @samples/book-app-project/book_app.py - what could be improved?

> Refactor the if/elif chain into a more maintainable structure

> Add type hints to all the handler functions

> /exit
```

### Plan a Feature

Use `/plan` to have Copilot CLI map out an implementation before writing any code:

```bash
copilot

> /plan Add a search feature to the book app that can find books by title or author

# Review the plan
# Approve or modify
# Watch it implement step by step
```

### Automate with Programmatic Mode

The `-p` flag lets you run Copilot CLI directly from your terminal without entering interactive mode. Copy and paste the following script into your terminal (not inside Copilot) from the repository root to review all Python files in the book app.

```bash
# Review all Python files in the book app
for file in samples/book-app-project/*.py; do
  echo "Reviewing $file..."
  copilot --allow-all -p "Quick code quality review of @$file - critical issues only"
done
```

**PowerShell (Windows):**

```powershell
# Review all Python files in the book app
Get-ChildItem samples/book-app-project/*.py | ForEach-Object {
  $relativePath = "samples/book-app-project/$($_.Name)";
  Write-Host "Reviewing $relativePath...";
  copilot --allow-all -p "Quick code quality review of @$relativePath - critical issues only" 
}
```

---

After completing the demos, try these variations:

1. **Interactive Challenge**: Start `copilot` and explore the book app. Ask about `@samples/book-app-project/books.py` and request improvements 3 times in a row.

2. **Plan Mode Challenge**: Run `/plan Add rating and review features to the book app`. Read the plan carefully. Does it make sense?

3. **Programmatic Challenge**: Run `copilot --allow-all -p "List all functions in @samples/book-app-project/book_app.py and describe what each does"`. Did it work on the first try?

---

## 💡 Tip: Control Your CLI Session from Web or Mobile

GitHub Copilot CLI supports **remote sessions**, letting you monitor and interact with a running CLI session from a web browser (on desktop or mobile) or the GitHub Mobile app without being physically at your terminal.

Start a remote session with the `--remote` flag:

```bash
copilot --remote
```

Copilot CLI will display a link and provide access to a QR code. Open the link on your phone or in a desktop browser tab to watch the session in real time, send follow-up prompts, review plans, and steer the agent remotely. Sessions are user-specific so you can only access your own Copilot CLI sessions.

You can also enable remote access from inside an active session at any time:

```
> /remote
```

Additional details about remote sessions can be found in the [Copilot CLI docs](https://docs.github.com/copilot/how-tos/copilot-cli/steer-remotely).

---

## 📝 Assignment

### Main Challenge: Improve the Book App Utilities

The hands-on examples focused on reviewing and refactoring `book_app.py`. Now practice the same skills on a different file, `utils.py`:

1. Start an interactive session: `copilot`
2. Ask Copilot CLI to summarize the file: "Summarize @samples/book-app-project/utils.py and explain what each function in this file does"
3. Ask it to add input validation: "Add validation to `get_user_choice()` so it handles empty input and non-numeric entries"
4. Ask it to improve error handling: "What happens if `get_book_details()` receives an empty string for the title? Add guards for that."
5. Ask for a docstring: "Add a comprehensive docstring to `get_book_details()` with parameter descriptions and return values"
6. Observe how context carries between prompts. Each improvement builds on the last
7. Exit with `/exit`

**Success criteria**: You should have an improved `utils.py` with input validation, error handling, and a docstring, all built through a multi-turn conversation.

<details>
<summary>💡 Hints (click to expand)</summary>

**Sample prompts to try:**
```bash
> @samples/book-app-project/utils.py What does each function in this file do?
> Add validation to get_user_choice() so it handles empty input and non-numeric entries
> What happens if get_book_details() receives an empty string for the title? Add guards for that.
> Add a comprehensive docstring to get_book_details() with parameter descriptions and return values
```

**Common issues:**
- If Copilot CLI asks clarifying questions, just answer them naturally
- The context carries forward, so each prompt builds on the previous
- Use `/clear` if you want to start over

</details>

### Bonus Challenge: Compare the Modes

The examples used `/plan` for a search feature and `-p` for batch reviews. Now try all three modes on a single new task: adding a `list_by_year()` method to the `BookCollection` class:

1. **Interactive**: `copilot` → ask it to design and build the method step by step
2. **Plan**: `/plan Add a list_by_year(start, end) method to BookCollection that filters books by publication year range`
3. **Programmatic**: `copilot --allow-all -p "@samples/book-app-project/books.py Add a list_by_year(start, end) method that returns books published between start and end year inclusive"`

**Reflection**: Which mode felt most natural? When would you use each?

---

<details>
<summary>🔧 <strong>Common Mistakes & Troubleshooting</strong> (click to expand)</summary>

### Common Mistakes

| Mistake | What Happens | Fix |
|---------|--------------|-----|
| Typing `exit` instead of `/exit` | Copilot CLI treats "exit" as a prompt, not a command | Slash commands always start with `/` |
| Using `-p` for multi-turn conversations | Each `-p` call is isolated with no memory of previous calls | Use interactive mode (`copilot`) for conversations that build on context |
| Forgetting quotes around prompts with `$` or `!` | Shell interprets special characters before Copilot CLI sees them | Wrap prompts in quotes: `copilot -p "What does $HOME mean?"` |
| Pressing Esc once to cancel a running task | A single Esc no longer cancels in-flight work (to prevent accidents) | Press **Esc twice** to cancel while Copilot CLI is processing |

### Troubleshooting

**"Model not available"** - Your subscription may not include all models. Use `/model` to see what's available.

**"Context too long"** - Your conversation has used the full context window. Use `/clear` to reset, or start a new session.

**"Rate limit exceeded"** - Wait a few minutes and try again. Consider using programmatic mode for batch operations with delays.

</details>

---

# Summary

## 🔑 Key Takeaways

1. **Interactive mode** is for exploration and iteration - context carries forward. It's like having a conversation with someone who remembers what you've said up to that point.
2. **Plan mode** is normally for more involved tasks. Review before implementation.
3. **Programmatic mode** is for automation. No interaction needed.
4. **Essential commands** (`/ask`, `/help`, `/clear`, `/plan`, `/research`, `/model`, `/exit`) cover most daily use.

> 📋 **Quick Reference**: See the [GitHub Copilot CLI command reference](https://docs.github.com/en/copilot/reference/cli-command-reference) for a complete list of commands and shortcuts.

---

## ➡️ What's Next

Now that you understand the three modes, let's learn how to give Copilot CLI context about your code.

In **[Chapter 02: Context and Conversations](../02-context-conversations/README.md)**, you'll learn:

- The `@` syntax for referencing files and directories
- Session management with `--resume` and `--continue`
- How context management makes Copilot CLI truly powerful

---

**[← Back to Course Home](../README.md)** | **[Continue to Chapter 02 →](../02-context-conversations/README.md)**
