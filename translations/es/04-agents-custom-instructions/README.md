![Capítulo 04: Agentes e Instrucciones Personalizadas](../../../04-agents-custom-instructions/images/chapter-header.png)

> **¿Y si pudieras contratar a un revisor de código Python, un experto en pruebas y un revisor de seguridad... todo en una sola herramienta?**

En el Capítulo 03, dominaste los flujos de trabajo esenciales: revisión de código, refactorización, depuración, generación de pruebas e integración con git. Eso te hace muy productivo con GitHub Copilot CLI. Ahora, vayamos más allá.

Hasta ahora, has estado usando Copilot CLI como un asistente de propósito general. Los agentes te permiten darle una persona específica con estándares incorporados, como un revisor de código que hace cumplir las anotaciones de tipo y PEP 8, o un ayudante de pruebas que escribe casos con pytest. Verás cómo el mismo prompt obtiene resultados notablemente mejores cuando lo maneja un agente con instrucciones específicas.

## 🎯 Objetivos de aprendizaje

Al final de este capítulo, podrás:

- Usar agentes integrados: Plan (`/plan`), Code-review (`/review`), y entender agentes automáticos (Explore, Task)
- Crear agentes especializados usando archivos de agente (`.agent.md`)
- Usar agentes para tareas específicas de dominio
- Cambiar entre agentes usando `/agent` y `--agent`
- Escribir archivos de instrucciones personalizados para estándares específicos del proyecto

> ⏱️ **Tiempo estimado**: ~55 minutos (20 min lectura + 35 min práctico)

---

## 🧩 Analogía del mundo real: Contratar especialistas

Cuando necesitas ayuda con tu casa, no llamas a un "ayudante general". Llamas a especialistas:

| Problema | Especialista | Por qué |
|---------|------------|-----|
| Fuga en la tubería | Fontanero | Conoce los códigos de fontanería, tiene herramientas especializadas |
| Recableado | Electricista | Comprende los requisitos de seguridad, cumple con la normativa |
| Techo nuevo | Instalador de techos | Conoce los materiales y las consideraciones del clima local |

Los agentes funcionan igual. En lugar de una IA genérica, usa agentes que se centran en tareas específicas y conocen el proceso correcto a seguir. Configura las instrucciones una vez y reutilízalas siempre que necesites esa especialidad: revisión de código, pruebas, seguridad, documentación.

<img src="../../../04-agents-custom-instructions/images/hiring-specialists-analogy.png" alt="Analogía de contratación de especialistas - Así como llamas a oficios especializados para reparaciones en la casa, los agentes de IA están especializados en tareas concretas como revisión de código, pruebas, seguridad y documentación" width="800" />

---

# Uso de agentes

Comienza con agentes integrados y personalizados de inmediato.

---

## *¿Nuevo en Agentes?* ¡Empieza aquí!
¿Nunca has usado o creado un agente? Esto es todo lo que necesitas saber para comenzar con este curso.

1. **Prueba un agente *integrado* ahora mismo:**
   ```bash
   copilot
   > /plan Add input validation for book year in the book app
   ```
   Esto invoca el agente Plan para crear un plan de implementación paso a paso.

2. **Mira uno de nuestros ejemplos de agentes personalizados:** Es simple definir las instrucciones de un agente; consulta nuestro archivo [python-reviewer.agent.md](../../../.github/agents/python-reviewer.agent.md) para ver el patrón.

3. **Comprende el concepto central:** Los agentes son como consultar a un especialista en lugar de a un generalista. Un "agente de frontend" se centrará automáticamente en la accesibilidad y en los patrones de componentes; no tienes que recordárselo porque ya está especificado en las instrucciones del agente.


## Agentes integrados

**Ya has usado algunos agentes integrados en el Capítulo 03 Flujo de trabajo de desarrollo!**
<br>`/plan` and `/review` son en realidad agentes integrados. Ahora sabes qué sucede bajo el capó. Aquí está la lista completa:

| Agent | How to Invoke | What It Does |
|-------|---------------|--------------|
| **Plan** | `/plan` or `Shift+Tab` (cycle modes) | Crea planes de implementación paso a paso antes de codificar |
| **Code-review** | `/review` | Revisa cambios preparados/no preparados con retroalimentación enfocada y accionable |
| **Init** | `/init` | Genera archivos de configuración del proyecto (instrucciones, agentes) |
| **Explore** | *Automatic* | Se usa internamente cuando pides a Copilot que explore o analice la base de código |
| **Task** | *Automatic* | Ejecuta comandos como pruebas, compilaciones, lint y la instalación de dependencias |

<br>

**Agentes integrados en acción** - Ejemplos de invocación de Plan, Code-review, Explore y Task

```bash
copilot

# Invoca al agente Plan para crear un plan de implementación
> /plan Add input validation for book year in the book app

# Invoca al agente Code-review sobre tus cambios
> /review

# Los agentes Explore y Task se invocan automáticamente cuando son relevantes:
> Run the test suite        # Usa el agente Task

> Explore how book data is loaded    # Usa el agente Explore
```

¿Qué pasa con el Agente Task? Funciona entre bastidores para gestionar y rastrear lo que está ocurriendo y para informar de vuelta de forma limpia y clara:

| Resultado | Lo que ves |
|---------|--------------|
| ✅ **Éxito** | Resumen breve (p. ej., "Todos los 247 tests pasaron", "Compilación exitosa") |
| ❌ **Fallo** | Salida completa con rastros de pila, errores del compilador y registros detallados |


> 📚 **Documentación oficial**: [Agentes de GitHub Copilot CLI](https://docs.github.com/copilot/how-tos/use-copilot-agents/use-copilot-cli#use-custom-agents)

---

# Añadiendo agentes a Copilot CLI

¡Puedes definir tus propios agentes para que formen parte de tu flujo de trabajo! Define una vez, ¡luego dirige!

<img src="../../../04-agents-custom-instructions/images/using-agents.png" alt="Cuatro robots de IA coloridos de pie juntos, cada uno con herramientas diferentes que representan capacidades especializadas de los agentes" width="800"/>

## 🗂️ Añade tus agentes 

Los archivos de agente son archivos markdown con una extensión `.agent.md`. Tienen dos partes: frontmatter YAML (metadatos) e instrucciones en markdown.

> 💡 **¿Nuevo en frontmatter YAML?** Es un pequeño bloque de configuraciones en la parte superior del archivo, rodeado por marcadores `---`. YAML son solo pares `clave: valor`. El resto del archivo es markdown normal.

Aquí hay un agente mínimo:

```markdown
---
name: my-reviewer
description: Code reviewer focused on bugs and security issues
---

# Code Reviewer

You are a code reviewer focused on finding bugs and security issues.

When reviewing code, always check for:
- SQL injection vulnerabilities
- Missing error handling
- Hardcoded secrets
```

> 💡 **Requerido vs Opcional**: El campo `description` es obligatorio. Otros campos como `name`, `tools`, y `model` son opcionales.

## Dónde colocar los archivos de agentes

| Location | Scope | Best For |
|----------|-------|----------|
| `.github/agents/` | Project-specific | Agentes compartidos por el equipo con convenciones del proyecto |
| `~/.copilot/agents/` | Global (all projects) | Agentes personales que usas en todas partes |

**Este proyecto incluye archivos de ejemplo de agentes en la carpeta [.github/agents/](../../../.github/agents)**. Puedes escribir los tuyos, o personalizar los ya proporcionados.

<details>
<summary>📂 Ver los agentes de ejemplo en este curso</summary>

| File | Description |
|------|-------------|
| `hello-world.agent.md` | Ejemplo mínimo - empieza aquí |
| `python-reviewer.agent.md` | Revisor de calidad de código Python |
| `pytest-helper.agent.md` | Especialista en pruebas con pytest |

```bash
# O copia uno en tu carpeta de agentes personales (disponible en cada proyecto)
cp .github/agents/python-reviewer.agent.md ~/.copilot/agents/
```

Para más agentes de la comunidad, consulta [github/awesome-copilot](https://github.com/github/awesome-copilot)

</details>


## 🚀 Dos formas de usar agentes personalizados

### Modo interactivo
Dentro del modo interactivo, lista agentes usando `/agent` y selecciona el agente con el que empezar a trabajar. 
Selecciona un agente para continuar tu conversación con él.

```bash
copilot
> /agent
```

Para cambiar a un agente diferente, o para volver al modo predeterminado, usa nuevamente el comando `/agent`.

### Modo programático

Inicia directamente una nueva sesión con un agente.

```bash
copilot --agent python-reviewer
> Review @samples/book-app-project/books.py
```

> 💡 **Cambiar de agente**: Puedes cambiar a un agente diferente en cualquier momento usando `/agent` o `--agent` de nuevo. Para volver a la experiencia estándar de Copilot CLI, usa `/agent` y selecciona **ningún agente**.

---

# Profundizando con los agentes

<img src="../../../04-agents-custom-instructions/images/creating-custom-agents.png" alt="Robot siendo ensamblado en un banco de trabajo rodeado de componentes y herramientas que representan la creación de agentes personalizados" width="800"/>

> 💡 **Esta sección es opcional.** Los agentes integrados (`/plan`, `/review`) son lo bastante potentes para la mayoría de los flujos de trabajo. Crea agentes personalizados cuando necesites experiencia especializada que se aplique de forma consistente en tu trabajo.

Cada tema a continuación es independiente. **Elige lo que te interese - no necesitas leerlos todos a la vez.**

| Quiero... | Ir a |
|---|---|
| Ver por qué los agentes superan a los prompts genéricos | [Specialist vs Generic](#especialista-vs-genérico-observa-la-diferencia) |
| Combinar agentes en una funcionalidad | [Working with Multiple Agents](#trabajar-con-múltiples-agentes) |
| Organizar, nombrar y compartir agentes | [Organizing & Sharing Agents](#organizar-y-compartir-agentes) |
| Configurar contexto de proyecto siempre activo | [Configuring Your Project for Copilot](#quick-setup-with-init) |
| Consultar propiedades YAML y herramientas | [Agent File Reference](#a-more-complete-example) |

Selecciona un escenario abajo para expandirlo.

---

<a id="specialist-vs-generic-see-the-difference"></a>
<details>
<summary><strong>Especialista vs Genérico: Observa la diferencia</strong> - Por qué los agentes producen mejor salida que los prompts genéricos</summary>

## Especialista vs Genérico: Observa la diferencia

Aquí es donde los agentes demuestran su valor. Observa la diferencia:

### Sin un agente (Copilot genérico)

```bash
copilot

> Add a function to search books by year range in the book app
```

**Salida genérica**:
```python
def search_by_year_range(books, start_year, end_year):
    results = []
    for book in books:
        if book['year'] >= start_year and book['year'] <= end_year:
            results.append(book)
    return results
```

Básico. Funciona. Pero le falta mucho.

---

### Con el agente python-reviewer

```bash
copilot

> /agent
# Seleccione "python-reviewer"

> Add a function to search books by year range in the book app
```

**Salida del especialista**:
```python
from typing import List, Dict, Any

def search_by_year_range(
    books: List[Dict[str, Any]],
    start_year: int,
    end_year: int
) -> List[Dict[str, Any]]:
    """
    Search for books within a specified year range.

    Args:
        books: List of book dictionaries
        start_year: Starting year (inclusive)
        end_year: Ending year (inclusive)

    Returns:
        List of books published within the year range

    Raises:
        ValueError: If start_year is greater than end_year
        TypeError: If year values are not integers
    """
    if not isinstance(start_year, int) or not isinstance(end_year, int):
        raise TypeError("Year values must be integers")

    if start_year > end_year:
        raise ValueError(f"Start year ({start_year}) cannot be greater than end year ({end_year})")

    return [
        book for book in books
        if isinstance(book.get('year'), int)
        and start_year <= book['year'] <= end_year
    ]
```

**Lo que el agente python-reviewer incluye automáticamente**:
- ✅ Anotaciones de tipo en todos los parámetros y valores de retorno
- ✅ Docstring completo con Args/Returns/Raises
- ✅ Validación de entrada con manejo de errores adecuado
- ✅ Comprensión de listas para mejor rendimiento
- ✅ Manejo de casos límite (valores de año faltantes/inválidos)
- ✅ Formato conforme a PEP 8
- ✅ Prácticas de programación defensiva

**La diferencia**: Mismo prompt, resultado drásticamente mejor. El agente aporta la experiencia que olvidarías pedir.

</details>

---

<a id="working-with-multiple-agents"></a>
<details>
<summary><strong>Trabajar con múltiples agentes</strong> - Combinar especialistas, cambiar a mitad de sesión, agentes como herramientas</summary>

## Trabajar con múltiples agentes

El verdadero poder llega cuando los especialistas trabajan juntos en una funcionalidad.

### Ejemplo: Construir una funcionalidad simple

```bash
copilot

> I want to add a "search by year range" feature to the book app

# Usa python-reviewer para el diseño
> /agent
# Selecciona "python-reviewer"

> @samples/book-app-project/books.py Design a find_by_year_range method. What's the best approach?

# Cambia a pytest-helper para el diseño de pruebas
> /agent
# Selecciona "pytest-helper"

> @samples/book-app-project/tests/test_books.py Design test cases for a find_by_year_range method.
> What edge cases should we cover?

# Sintetiza ambos diseños
> Create an implementation plan that includes the method implementation and comprehensive tests.
```

**La idea clave**: Tú eres el arquitecto que dirige a los especialistas. Ellos se encargan de los detalles, tú te encargas de la visión.

<details>
<summary>🎬 ¡Míralo en acción!</summary>

![Demostración del revisor de Python](../../../04-agents-custom-instructions/images/python-reviewer-demo.gif)

*La salida de la demo varía: tu modelo, herramientas y respuestas diferirán de lo que se muestra aquí.*

</details>

### Agentes como herramientas

Cuando los agentes están configurados, Copilot también puede llamarlos como herramientas durante tareas complejas. Si pides una funcionalidad full-stack, Copilot puede delegar automáticamente partes a los agentes especialistas correspondientes.

</details>

---

<a id="organizing--sharing-agents"></a>
<details>
<summary><strong>Organizar y compartir agentes</strong> - Nombres, ubicación de archivos, archivos de instrucciones y compartir con el equipo</summary>

## Organizar y compartir agentes

### Nombrar tus agentes

Cuando creas archivos de agente, el nombre importa. Es lo que escribirás después de `/agent` o `--agent`, y lo que tus compañeros verán en la lista de agentes.

| ✅ Good Names | ❌ Avoid |
|--------------|----------|
| `frontend` | `my-agent` |
| `backend-api` | `agent1` |
| `security-reviewer` | `helper` |
| `react-specialist` | `code` |
| `python-backend` | `assistant` |

**Convenciones de nombres:**
- Usa minúsculas con guiones: `my-agent-name.agent.md`
- Incluye el dominio: `frontend`, `backend`, `devops`, `security`
- Sé específico cuando sea necesario: `react-typescript` vs solo `frontend`

---

### Compartir con tu equipo

Coloca los archivos de agente en `.github/agents/` y estarán bajo control de versiones. Haz push a tu repo y todos los miembros del equipo los obtendrán automáticamente. Pero los agentes son solo un tipo de archivo que Copilot lee desde tu proyecto. También admite **archivos de instrucciones** que se aplican automáticamente a cada sesión, sin que nadie necesite ejecutar `/agent`.

Piénsalo así: los agentes son especialistas a los que llamas, y los archivos de instrucciones son reglas del equipo que están siempre activas.

### Dónde poner tus archivos

Ya conoces las dos ubicaciones principales (ver [Where to put agent files](#dónde-colocar-los-archivos-de-agentes) arriba). Usa este árbol de decisión para elegir:

<img src="../../../04-agents-custom-instructions/images/agent-file-placement-decision-tree.png" alt="Árbol de decisión sobre dónde colocar archivos de agente: experimentar → carpeta actual, uso en equipo → .github/agents/, en todas partes → ~/.copilot/agents/" width="800"/>

**Comienza con lo básico:** Crea un único `*.agent.md` en la carpeta de tu proyecto. Muévelo a una ubicación permanente una vez que estés satisfecho.

Más allá de los archivos de agente, Copilot también lee **archivos de instrucciones a nivel de proyecto** automáticamente, sin necesidad de `/agent`. Consulta [Configuring Your Project for Copilot](#quick-setup-with-init) más abajo para `AGENTS.md`, `.instructions.md`, y `/init`.

</details>

---

<a id="configuring-your-project-for-copilot"></a>
<details>
<summary><strong>Configurar tu proyecto para Copilot</strong> - AGENTS.md, archivos de instrucciones y configuración de /init</summary>
## Configuring Your Project for Copilot

Agents are specialists you invoke on demand. **Project configuration files** are different: Copilot reads them automatically in every session to understand your project's conventions, tech stack, and rules. No one needs to run `/agent`; the context is always active for everyone working in the repo.

### Quick Setup with /init

The fastest way to get started is to let Copilot generate configuration files for you:

```bash
copilot
> /init
```

Copilot will scan your project and create tailored instruction files. You can edit them afterwards.

### Instruction File Formats

| File | Scope | Notes |
|------|-------|-------|
| `AGENTS.md` | Project root or nested | **Cross-platform standard** - works with Copilot and other AI assistants |
| `.github/copilot-instructions.md` | Project | GitHub Copilot specific |
| `.github/instructions/*.instructions.md` | Project | Granular, topic-specific instructions |
| `CLAUDE.md`, `GEMINI.md` | Project root | Supported for compatibility |

> 🎯 **Just getting started?** Use `AGENTS.md` for project instructions. You can explore the other formats later as needed.

### AGENTS.md

`AGENTS.md` is the recommended format. It's an [open standard](https://agents.md/) that works across Copilot and other AI coding tools. Place it in your repository root and Copilot reads it automatically. This project's own [AGENTS.md](../AGENTS.md) is a working example.

A typical `AGENTS.md` describes your project context, code style, security requirements, and testing standards. Write your own following the pattern in our example file.

### Custom Instruction Files (.instructions.md)

For teams that want more granular control, split instructions into topic-specific files. Each file covers one concern and applies automatically:

```
.github/
└── instructions/
    ├── python-standards.instructions.md
    ├── security-checklist.instructions.md
    └── api-design.instructions.md
```

> 💡 **Note**: Instruction files work with any language. This example uses Python to match our course project, but you can create similar files for TypeScript, Go, Rust, or any technology your team uses.

#### Scoping Instructions with `applyTo`

By default, an instruction file applies to every conversation. To limit it to specific file types, add an `applyTo` field in YAML frontmatter (the block between `---` markers at the very top of the file):

```markdown
---
applyTo: "**/*.py"
---
# Python Standards
Always follow PEP 8 style conventions.
Use type hints in all function signatures.
```

With `applyTo: "**/*.py"`, Copilot only loads that instruction file when you are working with Python files. Instructions for Python style never clutter a conversation about, say, a Dockerfile or a SQL query.

Here are some common patterns:

| `applyTo` value | When it applies |
|---|---|
| `"**/*.py"` | Any Python file |
| `"**/*.{ts,tsx}"` | TypeScript and TSX files |
| `"tests/**"` | Any file inside a `tests/` folder |
| (no frontmatter) | Every conversation — the default |

> 💡 **Tip**: Wrap the glob pattern in quotes (e.g., `"**/*.py"`) to ensure it is interpreted correctly across all operating systems and shells.

**Finding community instruction files**: Browse [github/awesome-copilot](https://github.com/github/awesome-copilot) for pre-made instruction files covering .NET, Angular, Azure, Python, Docker, and many more technologies.

### Disabling Custom Instructions

If you need Copilot to ignore all project-specific configurations (useful for debugging or comparing behavior):

```bash
copilot --no-custom-instructions
```

</details>

---

<a id="agent-file-reference"></a>
<details>
<summary><strong>Agent File Reference</strong> - YAML properties, tool aliases, and complete examples</summary>

## Agent File Reference

### A More Complete Example

You've seen the [minimal agent format](#-add-your-agents) above. Here's a more comprehensive agent that uses the `tools` property. Create `~/.copilot/agents/python-reviewer.agent.md`:

```markdown
---
name: python-reviewer
description: Python code quality specialist for reviewing Python projects
tools: ["read", "edit", "search", "execute"]
---

# Python Code Reviewer

You are a Python specialist focused on code quality and best practices.

**Your focus areas:**
- Code quality (PEP 8, type hints, docstrings)
- Performance optimization (list comprehensions, generators)
- Error handling (proper exception handling)
- Maintainability (DRY principles, clear naming)

**Code style requirements:**
- Use Python 3.10+ features (dataclasses, type hints, pattern matching)
- Follow PEP 8 naming conventions
- Use context managers for file I/O
- All functions must have type hints and docstrings

**When reviewing code, always check:**
- Missing type hints on function signatures
- Mutable default arguments
- Proper error handling (no bare except)
- Input validation completeness
```

### YAML Properties

| Property | Required | Description |
|----------|----------|-------------|
| `name` | No | Display name (defaults to filename) |
| `description` | **Yes** | What the agent does - helps Copilot understand when to suggest it |
| `tools` | No | List of allowed tools (omit = all tools available). See tool aliases below. |
| `target` | No | Limit to `vscode` or `github-copilot` only |

### Tool Aliases

Use these names in the `tools` list:
- `read` - Read file contents
- `edit` - Edit files
- `search` - Search files (grep/glob)
- `execute` - Run shell commands (also: `shell`, `Bash`)
- `agent` - Invoke other custom agents

> 📖 **Official docs**: [Custom agents configuration](https://docs.github.com/copilot/reference/custom-agents-configuration)
>
> ⚠️ **VS Code Only**: The `model` property (for selecting AI models) works in VS Code but is not supported in GitHub Copilot CLI. You can safely include it for cross-platform agent files. GitHub Copilot CLI will ignore it.

### More Agent Templates

> 💡 **Note for beginners**: The examples below are templates. **Replace the specific technologies with whatever your project uses.** The important thing is the *structure* of the agent, not the specific technologies mentioned.

This project includes working examples in the [.github/agents/](../../../.github/agents) folder:
- [hello-world.agent.md](../../../.github/agents/hello-world.agent.md) - Minimal example, start here
- [python-reviewer.agent.md](../../../.github/agents/python-reviewer.agent.md) - Python code quality reviewer
- [pytest-helper.agent.md](../../../.github/agents/pytest-helper.agent.md) - Pytest testing specialist

For community agents, see [github/awesome-copilot](https://github.com/github/awesome-copilot).

</details>

---

# Practice

<img src="../../../images/practice.png" alt="Warm desk setup with monitor showing code, lamp, coffee cup, and headphones ready for hands-on practice" width="800"/>

Create your own agents and see them in action.

---

## ▶️ Try It Yourself

```bash

# Crear el directorio de agentes (si no existe)
mkdir -p .github/agents

# Crear un agente revisor de código
cat > .github/agents/reviewer.agent.md << 'EOF'
---
name: reviewer
description: Senior code reviewer focused on security and best practices
---

# Agente revisor de código

You are a senior code reviewer focused on code quality.

**Review priorities:**
1. Security vulnerabilities
2. Performance issues
3. Maintainability concerns
4. Best practice violations

**Output format:**
Provide issues as a numbered list with severity tags:
[CRITICAL], [HIGH], [MEDIUM], [LOW]
EOF

# Crear un agente de documentación
cat > .github/agents/documentor.agent.md << 'EOF'
---
name: documentor
description: Technical writer for clear and complete documentation
---

# Agente de documentación

You are a technical writer who creates clear documentation.

**Documentation standards:**
- Start with a one-sentence summary
- Include usage examples
- Document parameters and return values
- Note any gotchas or limitations
EOF

# Ahora úsalos
copilot --agent reviewer
> Review @samples/book-app-project/books.py

# O cambia entre agentes
copilot
> /agent
# Selecciona "documentor"
> Document @samples/book-app-project/books.py
```

---

## 📝 Assignment

### Main Challenge: Build a Specialized Agent Team

The hands-on example created `reviewer` and `documentor` agents. Now practice creating and using agents for a different task - improving data validation in the book app:

1. Create 3 agent files (`.agent.md`) tailored to the book app, one per agent, placed in `.github/agents/`
2. Your agents:
   - **data-validator**: checks `data.json` for missing or malformed data (empty authors, year=0, missing fields)
   - **error-handler**: reviews Python code for inconsistent error handling and suggests a unified approach
   - **doc-writer**: generates or updates docstrings and README content
3. Use each agent on the book app:
   - `data-validator` → audit `@samples/book-app-project/data.json`
   - `error-handler` → review `@samples/book-app-project/books.py` and `@samples/book-app-project/utils.py`
   - `doc-writer` → add docstrings to `@samples/book-app-project/books.py`
4. Collaborate: use `error-handler` to identify error-handling gaps, then `doc-writer` to document the improved approach

**Success criteria**: You have 3 working agents that produce consistent, high-quality output and you can switch between them with `/agent`.

<details>
<summary>💡 Hints (click to expand)</summary>

**Starter templates**: create one file per agent in `.github/agents/`:

`data-validator.agent.md`:
```markdown
---
description: Analyzes JSON data files for missing or malformed entries
---

You analyze JSON data files for missing or malformed entries.

**Focus areas:**
- Empty or missing author fields
- Invalid years (year=0, future years, negative years)
- Missing required fields (title, author, year, read)
- Duplicate entries
```

`error-handler.agent.md`:
```markdown
---
description: Reviews Python code for error handling consistency
---

You review Python code for error handling consistency.

**Standards:**
- No bare except clauses
- Use custom exceptions where appropriate
- All file operations use context managers
- Consistent return types for success/failure
```

`doc-writer.agent.md`:
```markdown
---
description: Technical writer for clear Python documentation
---

You are a technical writer who creates clear Python documentation.

**Standards:**
- Google-style docstrings
- Include parameter types and return values
- Add usage examples for public methods
- Note any exceptions raised
```

**Testing your agents:**

> 💡 **Note:** You should already have `samples/book-app-project/data.json` in your local copy of this repo. If it is missing, download the original version from the source repo:
> [data.json](https://github.com/github/copilot-cli-for-beginners/blob/main/samples/book-app-project/data.json)

```bash
copilot
> /agent
# Seleccione "data-validator" de la lista
> @samples/book-app-project/data.json Check for books with empty author fields or invalid years
```

**Tip:** The `description` field in the YAML frontmatter is required for agents to work.

</details>

### Bonus Challenge: Instruction Library

You've built agents you invoke on demand. Now try the other side: **instruction files** that Copilot reads automatically in every session, no `/agent` needed.

Create a `.github/instructions/` folder with at least 3 instruction files:
- `python-style.instructions.md` for enforcing PEP 8 and type hint conventions
- `test-standards.instructions.md` for enforcing pytest conventions in test files
- `data-quality.instructions.md` for validating JSON data entries

Test each instruction file on the book app code.

---

<details>
<summary>🔧 <strong>Common Mistakes & Troubleshooting</strong> (click to expand)</summary>

### Common Mistakes

| Mistake | What Happens | Fix |
|---------|--------------|-----|
| Missing `description` in agent frontmatter | Agent won't load or won't be discoverable | Always include `description:` in YAML frontmatter |
| Wrong file location for agents | Agent not found when you try to use it | Place in `~/.copilot/agents/` (personal) or `.github/agents/` (project) |
| Using `.md` instead of `.agent.md` | File may not be recognized as an agent | Name files like `python-reviewer.agent.md` |
| Overly long agent prompts | May hit the 30,000 character limit | Keep agent definitions focused; use skills for detailed instructions |

### Troubleshooting

**Agent not found** - Check that the agent file exists in one of these locations:
- `~/.copilot/agents/`
- `.github/agents/`

List available agents:

```bash
copilot
> /agent
# Muestra todos los agentes disponibles
```

**Agent not following instructions** - Be explicit in your prompts and add more detail to agent definitions:
- Specific frameworks/libraries with versions
- Team conventions
- Example code patterns

**Custom instructions not loading** - Run `/init` in your project to set up project-specific instructions:

```bash
copilot
> /init
```

Or check if they're disabled:
```bash
# No use --no-custom-instructions si desea que se carguen
copilot  # Esto carga las instrucciones personalizadas por defecto
```

</details>

---

# Summary

## 🔑 Key Takeaways

1. **Built-in agents**: `/plan` and `/review` are directly invoked; Explore and Task work automatically
2. **Custom agents** are specialists defined in `.agent.md` files
3. **Good agents** have clear expertise, standards, and output formats
4. **Multi-agent collaboration** solves complex problems by combining expertise
5. **Instruction files** (`.instructions.md`) encode team standards for automatic application
6. **Consistent output** comes from well-defined agent instructions

> 📋 **Quick Reference**: See the [GitHub Copilot CLI command reference](https://docs.github.com/en/copilot/reference/cli-command-reference) for a complete list of commands and shortcuts.

---

## ➡️ What's Next

Agents change *how Copilot approaches and takes targeted actions* in your code. Next, you'll learn about **skills** - which change *what steps* it follows. Wondering how agents and skills differ? Chapter 05 covers that head-on.

In **[Chapter 05: Skills System](../05-skills/README.md)**, you'll learn:

- How skills auto-trigger from your prompts (no slash command needed)
- Installing community skills
- Creating custom skills with SKILL.md files
- The difference between agents, skills, and MCP
- When to use each one

---

**[← Back to Chapter 03](../03-development-workflows/README.md)** | **[Continue to Chapter 05 →](../05-skills/README.md)**

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Descargo de responsabilidad**:
Este documento ha sido traducido utilizando el servicio de traducción automática [Co-op Translator](https://github.com/Azure/co-op-translator). Aunque nos esforzamos por la precisión, tenga en cuenta que las traducciones automatizadas pueden contener errores o inexactitudes. El documento original en su idioma nativo debe considerarse la fuente autorizada. Para información crítica, se recomienda una traducción profesional humana. No somos responsables de cualquier malentendido o interpretación errónea que surja del uso de esta traducción.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->