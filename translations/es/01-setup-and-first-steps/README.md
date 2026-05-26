![Capítulo 01: Primeros pasos](../../../01-setup-and-first-steps/images/chapter-header.png)

> **Observa cómo la IA encuentra errores al instante, explica código confuso y genera scripts funcionales. Luego aprende tres maneras diferentes de usar GitHub Copilot CLI.**

This chapter is where the magic starts! You'll experience firsthand why developers describe GitHub Copilot CLI as having a senior engineer on speed dial. You'll watch AI find security bugs in seconds, get complex code explained in plain English, and generate working scripts instantly. Then you'll master the three interaction modes (Interactive, Plan, and Programmatic) so you know exactly which one to use for any task.

> ⚠️ **Requisitos previos**: Asegúrate de haber completado primero **[Capítulo 00: Inicio rápido](../00-quick-start/README.md)**. Necesitarás GitHub Copilot CLI instalado y autenticado antes de ejecutar las demostraciones a continuación.

## 🎯 Objetivos de aprendizaje

By the end of this chapter, you'll be able to:

- Experience the productivity boost GitHub Copilot CLI provides through hands-on demos
- Choose the right mode (Interactive, Plan, or Programmatic) for any task
- Use slash commands to control your sessions

> ⏱️ **Tiempo estimado**: ~45 minutos (15 min lectura + 30 min práctica)

---

# Tu primera experiencia con Copilot CLI

<img src="../../../01-setup-and-first-steps/images/first-copilot-experience.png" alt="Desarrollador sentado en un escritorio con código en el monitor y partículas brillantes que representan la asistencia de IA" width="800"/>

Jump right in and see what Copilot CLI can do.

---

## Familiarizándote: Tus primeros prompts

Before diving into the impressive demos, let's start with some simple prompts you can try right now. **No code repository needed**! Just open a terminal and start Copilot CLI:

```bash
copilot
```

Try these beginner-friendly prompts:

```
> Explain what a dataclass is in Python in simple terms

> Write a function that sorts a list of dictionaries by a specific key

> What's the difference between a list and a tuple in Python?

> Give me 5 best practices for writing clean Python code
```

Don't use Python? No problem! Just ask questions about your language of choice.

Notice how natural it feels. Just ask questions like you would to a colleague. When you're done exploring, type `/exit` to leave the session.

**The key insight**: GitHub Copilot CLI is conversational. You don't need special syntax to get started. Just ask questions in plain English.

## Verlo en acción

Now let's see why developers are calling this "having a senior engineer on speed dial."

> 📖 **Cómo leer los ejemplos**: Lines starting with `>` are prompts you type inside an interactive Copilot CLI session. Lines without a `>` prefix are shell commands you run in your terminal.

> 💡 **Sobre las salidas de ejemplo**: The sample outputs shown throughout this course are illustrative. Because Copilot CLI's responses vary each time, your results will differ in wording, formatting, and detail. Focus on the *type* of information returned, not the exact text.

### Demostración 1: Revisión de código en segundos

The course includes sample files with intentional code quality issues. If you're working on your local machine and haven't already cloned the repo, please run the `git clone` command below, navigate to the `copilot-cli-for-beginners` folder, and then run the `copilot` command.

```bash
# Clona el repositorio del curso si estás trabajando localmente y aún no lo has hecho
git clone https://github.com/github/copilot-cli-for-beginners
cd copilot-cli-for-beginners

# Inicia Copilot
copilot
```

Once inside the interactive Copilot CLI session, run the following:

```
> Review @samples/book-app-project/book_app.py for code quality issues and suggest improvements
```

> 💡 **¿Para qué se usa el símbolo `@`?** The `@` symbol tells Copilot CLI to read a file. You'll learn all about this in Chapter 02. For now, just copy the command exactly as shown.

---

<details>
<summary>🎬 ¡Míralo en acción!</summary>

![Demostración de revisión de código](../../../01-setup-and-first-steps/images/code-review-demo.gif)

*La salida de la demostración varía. Tu modelo, herramientas y respuestas diferirán de lo mostrado aquí.*

</details>

---

**Conclusión**: Una revisión de código profesional en segundos. Manual review would take...well...more time than that!

---

### Demostración 2: Explicar código confuso

Ever stared at code wondering what it does? Try this in your Copilot CLI session:

```
> Explain what @samples/book-app-project/books.py does in simple terms
```

---

<details>
<summary>🎬 ¡Míralo en acción!</summary>

![Demostración de explicación de código](../../../01-setup-and-first-steps/images/explain-code-demo.gif)

*La salida de la demostración varía. Tu modelo, herramientas y respuestas diferirán de lo mostrado aquí.*

</details>

---

**Qué sucede**: (your output will differ) Copilot CLI reads the file, understands the code, and explains it in plain English.

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

**Conclusión**: Código complejo explicado como lo haría un mentor paciente.

---

### Demostración 3: Generar código funcional

Need a function you'd otherwise spend 15 minutes googling? Still in your session:

```
> Write a Python function that takes a list of books and returns statistics: 
  total count, number read, number unread, oldest and newest book
```

---

<details>
<summary>🎬 ¡Míralo en acción!</summary>

![Demostración de generación de código](../../../01-setup-and-first-steps/images/generate-code-demo.gif)

*La salida de la demostración varía. Tu modelo, herramientas y respuestas diferirán de lo mostrado aquí.*

</details>

---

**Qué sucede**: A complete, working function in seconds that you can copy-paste-run.

When you're done exploring, exit the session:

```
> /exit
```

**Conclusión**: Gratificación instantánea, y te mantuviste en una única sesión continua todo el tiempo.

---

# Modos y comandos

<img src="../../../01-setup-and-first-steps/images/modes-and-commands.png" alt="Panel de control futurista con pantallas brillantes, diales y ecualizadores que representan los modos y comandos de Copilot CLI" width="800"/>

You've just seen what Copilot CLI can do. Now let's understand *how* to use these capabilities effectively. The key is knowing which of the three interaction modes to use for different situations.

> 💡 **Note**: Copilot CLI also has an **Autopilot** mode where it works through tasks without waiting for your input. It's powerful but requires granting full permissions and uses premium requests autonomously. This course focuses on the three modes below. We'll point you to Autopilot once you're comfortable with the basics.

---

## 🧩 Analogía del mundo real: Salir a comer

Think of using GitHub Copilot CLI like going out to eat. From planning the trip to placing your order, different situations call for different approaches:

| Modo | Analogía gastronómica | Cuándo usar |
|------|-----------------------|-------------|
| **Plan** | Ruta GPS al restaurante | Tareas complejas - traza la ruta, revisa las paradas, acuerda el plan y luego conduce |
| **Interactivo** | Hablar con el camarero | Exploración e iteración - haz preguntas, personaliza, obtén retroalimentación en tiempo real |
| **Programático** | Pedir en el autoservicio | Tareas rápidas y específicas - permanece en tu entorno y obtén un resultado rápido |

<img src="../../../01-setup-and-first-steps/images/ordering-food-analogy.png" alt="Tres formas de usar GitHub Copilot CLI - Modo Plan (ruta GPS al restaurante), Modo Interactivo (hablar con el camarero), Modo Programático (autoservicio)" width="800"/>

*Elige tu modo según la tarea: Plan para trazarla primero, Interactivo para colaboración ida y vuelta, Programático para resultados rápidos de una sola vez*

### ¿Con qué modo debería empezar?

**Empieza con el modo interactivo.** 
- Puedes experimentar y hacer preguntas de seguimiento
- El contexto se construye de forma natural a través de la conversación
- Los errores son fáciles de corregir con `/clear`

Once you're comfortable, try:
- **Modo programático** (`copilot -p "<your prompt>"`) para preguntas rápidas y puntuales
- **Modo Plan** (`/plan`) cuando necesites planear con más detalle antes de codificar

---

## Los tres modos

### Modo 1: Modo interactivo (comienza aquí)

<img src="../../../01-setup-and-first-steps/images/interactive-mode.png" alt="Modo interactivo - Como hablar con un camarero que puede responder preguntas y ajustar el pedido" width="250"/>

**Ideal para**: Exploración, iteración y conversaciones de varios turnos. Como hablar con un camarero que puede responder preguntas, recibir comentarios y ajustar el pedido al instante.

Start an interactive session:

```bash
copilot
```

As you've seen up to this point, you'll see a prompt where you can type naturally. To get help on available commands, just type:

```
> /help
```

**Idea clave**: El modo interactivo mantiene el contexto. Cada mensaje se basa en los anteriores, como en una conversación real.

#### Ejemplo de modo interactivo

```bash
copilot

> Review @samples/book-app-project/utils.py and suggest improvements

> Add type hints to all functions

> Make the error handling more robust

> /exit
```

Fíjate en cómo cada prompt se construye sobre la respuesta anterior. Estás manteniendo una conversación, no empezando de nuevo cada vez.

---

### Modo 2: Modo Plan

<img src="../../../01-setup-and-first-steps/images/plan-mode.png" alt="Modo Plan - Como planificar una ruta antes de un viaje usando GPS" width="250"/>

**Ideal para**: Tareas complejas en las que quieres revisar el enfoque antes de ejecutarlo. Similar a planificar una ruta antes de un viaje usando GPS.

El modo Plan te ayuda a crear un plan paso a paso antes de escribir cualquier código. Usa el comando `/plan`, presiona **Shift+Tab** para cambiar al modo Plan:

```bash
copilot

> /plan Add a "mark as read" command to the book app
```

> 💡 **Consejo**: **Shift+Tab** alterna entre modos: Interactivo → Plan → Autopilot. Púlsalo en cualquier momento durante una sesión interactiva para cambiar de modo sin escribir un comando.

You can also launch Copilot CLI directly in plan mode using the `--plan` flag:

```bash
copilot --plan
```

**Salida del modo Plan:** (tu salida puede diferir)

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
  - Document the command usage

Step 4: Test the flow
  - Add a book
  - Mark it as read
  - Verify status changes in list output

Proceed with implementation? [Y/n]
```

**Idea clave**: El modo Plan te permite revisar y modificar el enfoque antes de que se escriba código. Una vez que un plan está completo, incluso puedes decirle a Copilot CLI que lo guarde en un archivo para referencia posterior. Por ejemplo, "Guardar este plan en `mark_as_read_plan.md`" crearía un archivo markdown con los detalles del plan.

> 💡 **¿Quieres algo más complejo?** Prueba: `/plan Add search and filter capabilities to the book app`. El modo Plan escala desde funciones sencillas hasta aplicaciones completas.

> 📚 **Modo Autopilot**: Puede que hayas notado que Shift+Tab cicla por un tercer modo llamado **Autopilot**. En el modo autopilot, Copilot ejecuta todo un plan sin esperar tu entrada después de cada paso — como delegar una tarea a un colega y decir "avísame cuando termines." El flujo típico es plan → aceptar → autopilot, lo que significa que debes ser hábil escribiendo planes primero. También puedes iniciar directamente en autopilot con `copilot --autopilot`. Familiarízate primero con los modos Interactivo y Plan, y luego consulta la [documentación oficial](https://docs.github.com/copilot/concepts/agents/copilot-cli/autopilot) cuando estés listo.

---

### Modo 3: Modo programático

<img src="../../../01-setup-and-first-steps/images/programmatic-mode.png" alt="Modo programático - Como usar un autoservicio para un pedido rápido" width="250"/>

**Ideal para**: Automatización, scripts, CI/CD, comandos de una sola ejecución. Como usar un autoservicio para un pedido rápido sin necesidad de hablar con un camarero.

Usa la opción `-p` para comandos puntuales que no necesitan interacción:

```bash
# Generar código
copilot -p "Write a function that checks if a number is even or odd"

# Obtener ayuda rápida
copilot -p "How do I read a JSON file in Python?"
```

**Idea clave**: El modo programático te da una respuesta rápida y sale. Sin conversación, solo entrada → salida.

<details>
<summary>📚 <strong>Ir más allá: Usar el modo programático en scripts</strong> (haz clic para expandir)</summary>

Una vez que te sientas cómodo, puedes usar `-p` en scripts de shell:

```bash
#!/bin/bash

# Generar mensajes de confirmación automáticamente
COMMIT_MSG=$(copilot -p "Generate a commit message for: $(git diff --staged)")
git commit -m "$COMMIT_MSG"

# Revisar un archivo
copilot --allow-all -p "Review @myfile.py for issues"
```
> ⚠️ **Acerca de `--allow-all`**: Esta opción omite todos los avisos de permisos, permitiendo que Copilot CLI lea archivos, ejecute comandos y acceda a URLs sin pedir permiso primero. Esto es necesario para el modo programático (`-p`) ya que no hay una sesión interactiva para aprobar acciones. Usa `--allow-all` solo con prompts que hayas escrito tú mismo y en directorios de confianza. Nunca lo uses con entradas no confiables ni en directorios sensibles.

</details>

---

## Comandos esenciales con barra (slash)

These commands are great to learn initially as you're getting started with Copilot CLI:

| Comando | Qué hace | Cuándo usar |
|---------|----------|-------------|
| `/ask` | Haz una pregunta rápida sin que afecte el historial de la conversación | Cuando quieras una respuesta rápida sin descarrilar tu tarea actual |
| `/clear` | Borra la conversación y comienza de nuevo | Al cambiar de tema |
| `/help` | Muestra todos los comandos disponibles | Cuando olvides un comando |
| `/model` | Muestra o cambia el modelo de IA | Cuando quieras cambiar el modelo de IA |
| `/plan` | Planifica tu trabajo antes de codificar | Para funciones más complejas |
| `/research` | Investigación profunda usando GitHub y fuentes web | Cuando necesites investigar un tema antes de codificar |
| `/exit` | Finaliza la sesión | Cuando hayas terminado |

> 💡 **`/ask` vs chat normal**: Normally every message you send becomes part of the ongoing conversation and affects future responses. `/ask` is an "off the record" shortcut — perfect for quick one-off questions like `/ask What does YAML mean?` without polluting your session context.

> 💡 **Autocompletar con Tab**: When typing a slash command, press **Tab** to auto-complete the command name or cycle through available subcommands and arguments. This is especially handy when you can't remember the exact name of a command.

That's it for getting started! As you become comfortable, you can explore additional commands.
> 📚 **Documentación oficial**: [Referencia de comandos de la CLI](https://docs.github.com/copilot/reference/cli-command-reference) para la lista completa de comandos y banderas.

<details>
<summary>📚 <strong>Comandos adicionales</strong> (clic para expandir)</summary>

> 💡 Los comandos esenciales anteriores cubren gran parte de lo que harás en el uso diario. Esta referencia está aquí para cuando estés listo para explorar más.

### Entorno del agente

| Command | What It Does |
|---------|--------------|
| `/agent` | Browse and select from available agents |
| `/env` | Show loaded environment details — what instructions, MCP servers, skills, agents, and plugins are active |
| `/init` | Initialize Copilot instructions for your repository |
| `/mcp` | Manage MCP server configuration |
| `/skills` | Manage skills for enhanced capabilities |

> 💡 Agents are covered in [Capítulo 04](../04-agents-custom-instructions/README.md), skills are covered in [Capítulo 05](../05-skills/README.md), and MCP servers are covered in [Capítulo 06](../06-mcp-servers/README.md).

### Models and Subagents

| Command | What It Does |
|---------|--------------|
| `/delegate` | Hand off task to GitHub Copilot cloud agent |
| `/fleet` | Split a complex task into parallel subtasks for faster completion |
| `/model` | Show or switch AI model |
| `/tasks` | View background subagents and detached shell sessions |

### Code

| Command | What It Does |
|---------|--------------|
| `/diff` | Review the changes made in the current directory |
| `/pr` | Operate on pull requests for the current branch |
| `/research` | Run deep research investigation using GitHub and web sources |
| `/review` | Run the code-review agent to analyze changes |
| `/terminal-setup` | Enable multiline input support (shift+enter and ctrl+enter) |

### Permissions

| Command | What It Does |
|---------|--------------|
| `/add-dir <directory>` | Add a directory to allowed list |
| `/allow-all [on\|off\|show]` | Auto-approve all permission prompts; use `on` to enable, `off` to disable, `show` to check current status |
| `/yolo` | Quick alias for `/allow-all on` — auto-approves all permission prompts. |
| `/cwd`, `/cd [directory]` | View or change working directory |
| `/list-dirs` | Show all allowed directories |

> ⚠️ **Usar con precaución**: `/allow-all` y `/yolo` omiten los avisos de confirmación. Genial para proyectos de confianza, pero ten cuidado con código no confiable.

### Session

| Command | What It Does |
|---------|--------------|
| `/clear` | Abandons the current session (no history saved) and starts a fresh conversation |
| `/compact` | Summarize conversation to reduce context usage (optionally add focus instructions, e.g. `/compact focus on the bug list`) |
| `/context` | Show context window token usage and visualization |
| `/keep-alive` | Prevent your system from sleeping while Copilot CLI is active — handy for long-running tasks on a laptop |
| `/memory [on\|off\|show]` | Enable, disable, or view persistent memory — facts and preferences remembered across all sessions |
| `/new` | Ends the current session (saving it to history for search/resume) and starts a fresh conversation. |
| `/resume` | Switch to a different session (optionally specify session ID or name) |
| `/rename` | Rename the current session (omit the name to auto-generate one) |
| `/rewind` | Open a timeline picker to roll back to any earlier point in the conversation |
| `/usage` | Display session usage metrics and statistics, including quota progress bars |
| `/session` | Show session info and workspace summary; use `/session delete`, `/session delete <id>`, or `/session delete-all` to remove sessions |
| `/share` | Export session as a markdown file, GitHub gist, or self-contained HTML file |

### Display

| Command | What It Does |
|---------|--------------|
| `/statusline` (or `/footer`) | Customize which items appear in the status bar at the bottom of the session (directory, branch, effort, context window, quota) |
| `/theme` | View or set terminal theme |

### Help and Feedback

| Command | What It Does |
|---------|--------------|
| `/changelog` | Display changelog for CLI versions |
| `/feedback` | Submit feedback to GitHub |
| `/help` | Show all available commands |

### Quick Shell Commands

Run shell commands directly without AI by prefixing with `!`:

```bash
copilot

> !git status
# Ejecuta git status directamente, omitiendo la IA

> !python -m pytest tests/
# Ejecuta pytest directamente
```

### Switching Models

Copilot CLI supports multiple AI models from OpenAI, Anthropic, Google, and others. The models available to you depend on your subscription level and region. Use `/model` to see your options and switch between them:

```bash
copilot
> /model

# Muestra los modelos disponibles y te permite elegir uno. Selecciona Sonnet 4.5.
```

> 💡 **Consejo**: Algunos modelos consumen más "solicitudes premium" que otros. Los modelos marcados **1x** (como Claude Sonnet 4.5) son una excelente opción por defecto. Son capaces y eficientes. Los modelos con multiplicador mayor usan tu cuota de solicitudes premium más rápido, así que guárdalos para cuando realmente los necesites.

> 💡 **¿No sabes qué modelo elegir?** Selecciona **`Auto`** en el selector de modelos para dejar que Copilot elija automáticamente el mejor modelo disponible para cada sesión. Esta es una buena opción por defecto si estás empezando y no quieres pensar en la selección de modelos.

</details>

---

# Práctica

<img src="../../../images/practice.png" alt="Escritorio acogedor con monitor mostrando código, lámpara, taza de café y auriculares listos para la práctica" width="800"/>

Es hora de poner en acción lo que has aprendido.

---

## ▶️ Pruébalo tú mismo

### Exploración interactiva

Inicia Copilot y usa indicaciones sucesivas para mejorar iterativamente la aplicación de libros:

```bash
copilot

> Review @samples/book-app-project/book_app.py - what could be improved?

> Refactor the if/elif chain into a more maintainable structure

> Add type hints to all the handler functions

> /exit
```

### Planificar una función

Usa `/plan` para que Copilot CLI trace una implementación antes de escribir cualquier código:

```bash
copilot

> /plan Add a search feature to the book app that can find books by title or author

# Revisar el plan
# Aprobar o modificar
# Observar su implementación paso a paso
```

### Automatizar con el modo programático

La bandera `-p` te permite ejecutar Copilot CLI directamente desde tu terminal sin entrar en modo interactivo. Copia y pega el siguiente script en tu terminal (no dentro de Copilot) desde la raíz del repositorio para revisar todos los archivos Python en la aplicación de libros.

```bash
# Revisa todos los archivos Python en la aplicación de libros
for file in samples/book-app-project/*.py; do
  echo "Reviewing $file..."
  copilot --allow-all -p "Quick code quality review of @$file - critical issues only"
done
```

**PowerShell (Windows):**

```powershell
# Revisar todos los archivos Python en la aplicación del libro
Get-ChildItem samples/book-app-project/*.py | ForEach-Object {
  $relativePath = "samples/book-app-project/$($_.Name)";
  Write-Host "Reviewing $relativePath...";
  copilot --allow-all -p "Quick code quality review of @$relativePath - critical issues only" 
}
```

---

Después de completar las demostraciones, prueba estas variaciones:

1. **Desafío interactivo**: Inicia `copilot` y explora la aplicación de libros. Pregunta por `@samples/book-app-project/books.py` y solicita mejoras tres veces seguidas.

2. **Desafío en modo Plan**: Ejecuta `/plan Add rating and review features to the book app`. Lee el plan con atención. ¿Tiene sentido?

3. **Desafío programático**: Ejecuta `copilot --allow-all -p "List all functions in @samples/book-app-project/book_app.py and describe what each does"`. ¿Funcionó a la primera?

---

## 💡 Consejo: Controla tu sesión de CLI desde la web o el móvil

GitHub Copilot CLI admite **sesiones remotas**, lo que te permite supervisar e interactuar con una sesión CLI en ejecución desde un navegador web (en escritorio o móvil) o desde la app GitHub Mobile sin estar físicamente en tu terminal.

Inicia una sesión remota con la bandera `--remote`:

```bash
copilot --remote
```

Copilot CLI mostrará un enlace y proporcionará acceso a un código QR. Abre el enlace en tu teléfono o en una pestaña del navegador de escritorio para ver la sesión en tiempo real, enviar indicaciones de seguimiento, revisar planes y dirigir el agente de forma remota. Las sesiones son específicas del usuario, por lo que solo puedes acceder a tus propias sesiones de Copilot CLI.

También puedes habilitar el acceso remoto desde dentro de una sesión activa en cualquier momento:

```
> /remote
```

Detalles adicionales sobre las sesiones remotas se pueden encontrar en la [documentación de Copilot CLI](https://docs.github.com/copilot/how-tos/copilot-cli/steer-remotely).

---

## 📝 Tarea

### Desafío principal: Mejora las utilidades de la aplicación de libros

Los ejemplos prácticos se centraron en revisar y refactorizar `book_app.py`. Ahora practica las mismas habilidades en un archivo diferente, `utils.py`:

1. Inicia una sesión interactiva: `copilot`
2. Pídele a Copilot CLI que resuma el archivo: "Resume @samples/book-app-project/utils.py y explica lo que hace cada función en este archivo"
3. Pídele que agregue validación de entrada: "Agrega validación a `get_user_choice()` para que maneje entradas vacías y entradas no numéricas"
4. Pídele que mejore el manejo de errores: "¿Qué sucede si `get_book_details()` recibe una cadena vacía para el título? Agrega protecciones para eso."
5. Pídele una docstring: "Agrega una docstring completa a `get_book_details()` con descripciones de parámetros y valores de retorno"
6. Observa cómo el contexto se mantiene entre las indicaciones. Cada mejora se basa en la anterior
7. Sal con `/exit`

**Criterios de éxito**: Debes tener un `utils.py` mejorado con validación de entrada, manejo de errores y una docstring, todo construido mediante una conversación de múltiples turnos.

<details>
<summary>💡 Sugerencias (clic para expandir)</summary>

**Indicaciones de ejemplo para probar:**
```bash
> @samples/book-app-project/utils.py What does each function in this file do?
> Add validation to get_user_choice() so it handles empty input and non-numeric entries
> What happens if get_book_details() receives an empty string for the title? Add guards for that.
> Add a comprehensive docstring to get_book_details() with parameter descriptions and return values
```

**Problemas comunes:**
- Si Copilot CLI hace preguntas de clarificación, respóndelas de forma natural
- El contexto se conserva, así que cada indicación se basa en la anterior
- Usa `/clear` si quieres empezar de nuevo

</details>

### Desafío adicional: Compara los modos

Los ejemplos usaron `/plan` para una función de búsqueda y `-p` para revisiones por lotes. Ahora prueba los tres modos en una sola tarea nueva: agregar un método `list_by_year()` a la clase `BookCollection`:

1. **Interactivo**: `copilot` → pídele que diseñe y construya el método paso a paso
2. **Plan**: `/plan Add a list_by_year(start, end) method to BookCollection that filters books by publication year range`
3. **Programático**: `copilot --allow-all -p "@samples/book-app-project/books.py Add a list_by_year(start, end) method that returns books published between start and end year inclusive"`

**Reflexión**: ¿Qué modo se sintió más natural? ¿Cuándo usarías cada uno?

---

<details>
<summary>🔧 <strong>Errores comunes y solución de problemas</strong> (clic para expandir)</summary>

### Errores comunes

| Mistake | What Happens | Fix |
|---------|--------------|-----|
| Typing `exit` instead of `/exit` | Copilot CLI treats "exit" as a prompt, not a command | Slash commands always start with `/` |
| Using `-p` for multi-turn conversations | Each `-p` call is isolated with no memory of previous calls | Use interactive mode (`copilot`) for conversations that build on context |
| Forgetting quotes around prompts with `$` or `!` | Shell interprets special characters before Copilot CLI sees them | Wrap prompts in quotes: `copilot -p "What does $HOME mean?"` |
| Pressing Esc once to cancel a running task | A single Esc no longer cancels in-flight work (to prevent accidents) | Press **Esc dos veces** to cancel while Copilot CLI is processing |

### Solución de problemas

**"Model not available"** - Es posible que tu suscripción no incluya todos los modelos. Usa `/model` para ver qué está disponible.

**"Context too long"** - Tu conversación ha usado toda la ventana de contexto. Usa `/clear` para reiniciar, o comienza una nueva sesión.

**"Rate limit exceeded"** - Espera unos minutos e inténtalo de nuevo. Considera usar el modo programático para operaciones por lotes con pausas.

</details>

---

# Resumen

## 🔑 Conclusiones clave

1. **El modo interactivo** es para exploración e iteración: el contexto se conserva. Es como tener una conversación con alguien que recuerda lo que has dicho hasta ese punto.
2. **El modo Plan** es normalmente para tareas más involucradas. Revisa antes de implementar.
3. **El modo programático** es para automatización. No se necesita interacción.
4. **Comandos esenciales** (`/ask`, `/help`, `/clear`, `/plan`, `/research`, `/model`, `/exit`) cubren la mayor parte del uso diario.

> 📋 **Referencia rápida**: Consulta la [Referencia de comandos de GitHub Copilot CLI](https://docs.github.com/en/copilot/reference/cli-command-reference) para una lista completa de comandos y atajos.

---

## ➡️ Qué sigue

Ahora que entiendes los tres modos, aprendamos cómo darle a Copilot CLI contexto sobre tu código.

En **[Capítulo 02: Contexto y conversaciones](../02-context-conversations/README.md)**, aprenderás:

- La sintaxis `@` para referenciar archivos y directorios
- Gestión de sesiones con `--resume` y `--continue`
- Cómo la gestión del contexto hace que Copilot CLI sea realmente poderoso

---

**[← Volver al inicio del curso](../README.md)** | **[Continuar al Capítulo 02 →](../02-context-conversations/README.md)**

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Descargo de responsabilidad**:
Este documento ha sido traducido utilizando el servicio de traducción automática [Co-op Translator](https://github.com/Azure/co-op-translator). Aunque nos esforzamos por la precisión, tenga en cuenta que las traducciones automatizadas pueden contener errores o inexactitudes. El documento original en su idioma nativo debe considerarse la fuente autorizada. Para información crítica, se recomienda una traducción profesional humana. No somos responsables de cualquier malentendido o interpretación errónea que surja del uso de esta traducción.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->