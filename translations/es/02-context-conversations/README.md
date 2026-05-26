![Chapter 02: Context and Conversations](../../../02-context-conversations/images/chapter-header.png)

> **¿Y si la IA pudiera ver todo tu código, no solo un archivo a la vez?**

En este capítulo, desbloquearás el verdadero poder de GitHub Copilot CLI: contexto. Aprenderás a usar la sintaxis `@` para referenciar archivos y directorios, dando a Copilot CLI una comprensión profunda de tu base de código. Descubrirás cómo mantener conversaciones a través de sesiones, reanudar el trabajo días después exactamente donde lo dejaste, y verás cómo el análisis entre archivos detecta errores que las revisiones de un solo archivo pasan por alto por completo.

## 🎯 Objetivos de aprendizaje

Al final de este capítulo, podrás:

- Usar la sintaxis `@` para referenciar archivos, directorios e imágenes
- Reanudar sesiones previas con `--resume` y `--continue`
- Entender cómo funcionan las [ventanas de contexto](../GLOSSARY.md#context-window)
- Escribir conversaciones multironda efectivas
- Administrar permisos de directorio para flujos de trabajo con múltiples proyectos

> ⏱️ **Tiempo estimado**: ~50 minutos (20 min de lectura + 30 min prácticos)

---

## 🧩 Analogía del mundo real: Trabajar con un colega

<img src="../../../02-context-conversations/images/colleague-context-analogy.png" alt="El contexto marca la diferencia - Sin contexto vs Con contexto" width="800"/>

*Al igual que tus colegas, Copilot CLI no es un lector de mentes. ¡Proporcionar más información ayuda tanto a las personas como a Copilot a ofrecer soporte más enfocado!*

Imagina explicar un error a un colega:

> **Sin contexto**: "La aplicación de libros no funciona."

> **Con contexto**: "Mira `books.py`, especialmente la función `find_book_by_title`. No está haciendo una comparación sin distinguir mayúsculas/minúsculas."

Para proporcionar contexto a Copilot CLI usa *la sintaxis `@`* para señalar archivos específicos.

---

# Esencial: Contexto básico

<img src="../../../02-context-conversations/images/essential-basic-context.png" alt="Bloques de código brillantes conectados por rastros de luz que representan cómo fluye el contexto a través de las conversaciones de Copilot CLI" width="800"/>

Esta sección cubre todo lo que necesitas para trabajar eficazmente con el contexto. Domina estos conceptos básicos primero.

---

## La sintaxis @

El símbolo `@` referencia archivos y directorios en tus indicaciones. Es la forma de decirle a Copilot CLI "mira este archivo".

> 💡 **Nota**: Todos los ejemplos en este curso usan la carpeta `samples/` incluida en este repositorio, para que puedas probar cada comando directamente.

### Pruébalo ahora (sin configuración)

Puedes probar esto con cualquier archivo en tu computadora:

```bash
copilot

# Señala cualquier archivo que tengas
> Explain what @package.json does
> Summarize @README.md
> What's in @.gitignore and why?
```

> 💡 **¿No tienes un proyecto a mano?** Crea un archivo de prueba rápido:
> ```bash
> echo "def greet(name): return 'Hello ' + name" > test.py
> copilot
> > What does @test.py do?
> ```

### Patrones básicos de @

| Pattern | Qué hace | Ejemplo de uso |
|---------|--------------|-------------|
| `@file.py` | Referencia un solo archivo | `Review @samples/book-app-project/books.py` |
| `@folder/` | Referencia todos los archivos en un directorio | `Review @samples/book-app-project/` |
| `@file1.py @file2.py` | Referencia múltiples archivos | `Compare @samples/book-app-project/book_app.py @samples/book-app-project/books.py` |

### Referenciar un solo archivo

```bash
copilot

> Explain what @samples/book-app-project/utils.py does
```

---

<details>
<summary>🎬 ¡Véalo en acción!</summary>

![File Context Demo](../../../02-context-conversations/images/file-context-demo.gif)

*La salida de la demostración varía. Tu modelo, herramientas y respuestas diferirán de lo que se muestra aquí.*

</details>

---

### Referenciar múltiples archivos

```bash
copilot

> Compare @samples/book-app-project/book_app.py and @samples/book-app-project/books.py for consistency
```

### Referenciar un directorio entero

```bash
copilot

> Review all files in @samples/book-app-project/ for error handling
```

---

## Inteligencia entre archivos

Aquí es donde el contexto se convierte en una superpotencia. El análisis de un solo archivo es útil. El análisis entre archivos es transformador.

<img src="../../../02-context-conversations/images/cross-file-intelligence.png" alt="Inteligencia entre archivos - comparando análisis de un solo archivo vs análisis entre archivos mostrando cómo analizar archivos juntos revela errores, flujo de datos y patrones invisibles en aislamiento" width="800"/>

### Demostración: Encontrar errores que abarcan varios archivos

```bash
copilot

> @samples/book-app-project/book_app.py @samples/book-app-project/books.py
>
> How do these files work together? What's the data flow?
```

> 💡 **Opción avanzada**: Para análisis de seguridad centrado en múltiples archivos, prueba los ejemplos de seguridad en Python:
> ```bash
> > @samples/buggy-code/python/user_service.py @samples/buggy-code/python/payment_processor.py
> > Find security vulnerabilities that span BOTH files
> ```

---

<details>
<summary>🎬 ¡Véalo en acción!</summary>

![Multi-File Demo](../../../02-context-conversations/images/multi-file-demo.gif)

*La salida de la demostración varía. Tu modelo, herramientas y respuestas diferirán de lo que se muestra aquí.*

</details>

---

**Lo que Copilot CLI descubre**:

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

**Por qué esto importa**: Una revisión de un solo archivo perdería la visión global. Solo el análisis entre archivos revela:
- **Código duplicado** que debería consolidarse
- **Patrones de flujo de datos** que muestran cómo interactúan los componentes
- **Problemas arquitectónicos** que afectan la mantenibilidad

---

### Demostración: Entender una base de código en 60 segundos

<img src="../../../02-context-conversations/images/codebase-understanding.png" alt="Comparación en pantalla dividida mostrando revisión manual de código tomando 1 hora frente a análisis asistido por IA tomando 10 segundos" width="800" />

¿Nuevo en un proyecto? Conócelo rápidamente usando Copilot CLI.

```bash
copilot

> @samples/book-app-project/
>
> In one paragraph, what does this app do and what are its biggest quality issues?
```

**Lo que obtienes**:
```
This is a CLI book collection manager that lets users add, list, remove, and
search books stored in a JSON file. The biggest quality issues are:

1. Duplicate display logic - show_books() and print_books() do the same thing
2. Inconsistent error handling - some errors raise exceptions, others return False
3. No input validation - year can be 0, empty strings accepted for title/author
4. Missing tests - no test coverage for critical functions like find_book_by_title

Priority fix: Consolidate duplicate display functions and add input validation.
```

**Resultado**: Lo que toma una hora de lectura de código comprimido en 10 segundos. Sabes exactamente dónde enfocarte.

---

## Ejemplos prácticos

### Ejemplo 1: Revisión de código con contexto

```bash
copilot

> @samples/book-app-project/books.py Review this file for potential bugs

# Copilot CLI ahora tiene el contenido completo del archivo y puede ofrecer comentarios específicos:
# "Línea 49: La comparación que distingue entre mayúsculas y minúsculas puede omitir libros..."
# "Línea 29: Los errores de decodificación JSON se capturan pero no se registra la corrupción de datos..."

> What about @samples/book-app-project/book_app.py?

# Ahora revisando book_app.py, pero sigo teniendo en cuenta el contexto de books.py
```

### Ejemplo 2: Entender una base de código

```bash
copilot

> @samples/book-app-project/books.py What does this module do?

# Copilot CLI lee books.py y entiende la clase BookCollection

> @samples/book-app-project/ Give me an overview of the code structure

# Copilot CLI escanea el directorio y resume

> How does the app save and load books?

# Copilot CLI puede rastrear el código que ya ha visto
```

<details>
<summary>🎬 ¡Ve una conversación multironda en acción!</summary>

![Multi-Turn Demo](../../../02-context-conversations/images/multi-turn-demo.gif)

*La salida de la demostración varía. Tu modelo, herramientas y respuestas diferirán de lo que se muestra aquí.*

</details>

### Ejemplo 3: Refactorización entre archivos

```bash
copilot

> @samples/book-app-project/book_app.py @samples/book-app-project/utils.py
> I see duplicate display functions: show_books() and print_books(). Help me consolidate these.

# Copilot CLI ve ambos archivos y puede sugerir cómo fusionar el código duplicado
```

---

## Gestión de sesiones

Las sesiones se guardan automáticamente mientras trabajas. Puedes reanudar sesiones previas para continuar donde lo dejaste.

### Las sesiones se guardan automáticamente

Cada conversación se guarda automáticamente. Simplemente sal normalmente:

```bash
copilot

> @samples/book-app-project/ Let's improve error handling across all modules

[... do some work ...]

> /exit
```

### Reanudar la sesión más reciente

```bash
# Continúa donde lo dejaste
copilot --continue
```

### Reanudar una sesión específica

```bash
# Selecciona de una lista de sesiones de forma interactiva
copilot --resume

# O reanuda una sesión específica por su ID
copilot --resume=abc123

# O reanuda usando el nombre que le diste a la sesión
copilot --resume="my book app review"
```

> 💡 **¿Cómo encuentro un ID de sesión?** No necesitas memorizarlos. Ejecutar `copilot --resume` sin un ID muestra una lista interactiva de tus sesiones previas, sus nombres, IDs y cuándo estuvieron activas por última vez. Solo elige la que quieras.
>
> **¿Y si hay múltiples terminales?** Cada ventana de terminal es su propia sesión con su propio contexto. Si tienes Copilot CLI abierto en tres terminales, son tres sesiones separadas. Ejecutar `--resume` desde cualquier terminal te permite explorar todas ellas. La bandera `--continue` toma la sesión desde el directorio de trabajo actual primero; si no existe allí, selecciona la sesión más recientemente activa.
>
> **¿Puedo cambiar de sesión sin reiniciar?** Sí. Usa el comando de barra `/resume` desde dentro de una sesión activa:
> ```
> > /resume
> # Shows a list of sessions to switch to
> ```

### Organiza tus sesiones

Dale nombres significativos a las sesiones para que puedas encontrarlas después. Puedes nombrar una sesión cuando la inicies, o renombrarla en cualquier momento mientras estás dentro de la sesión:

```bash
# Nombra una sesión justo cuando la inicias
copilot --name book-app-review

# O renombra la sesión actual desde dentro
copilot

> /rename book-app-review
# Sesión renombrada para facilitar su identificación
```

Una vez que una sesión tiene nombre, puedes reanudarla directamente por nombre sin navegar por una lista:

```bash
copilot --resume=book-app-review
```

Para limpiar sesiones que ya no necesitas, usa `/session delete` desde dentro de una sesión:

```bash
copilot

> /session delete            # Elimina la sesión actual
> /session delete abc123     # Elimina una sesión específica por ID
> /session delete-all        # Elimina todas las sesiones (¡usar con precaución!)
```

### Memoria persistente entre sesiones

Las sesiones guardan el historial de tu conversación, pero la **memoria** va un paso más allá y permite que Copilot CLI recuerde preferencias y hechos *a través de todas las sesiones*, no solo dentro de una sola.

```bash
copilot

> /memory show
# Muestra lo que Copilot CLI recuerda actualmente sobre ti y tu proyecto

> /memory on
# Activa la memoria (activada por defecto si tu cuenta la admite)

> /memory off
# Desactiva la memoria (útil si prefieres empezar de cero cada vez)
```

Por ejemplo, si le dices a Copilot CLI "Siempre prefiero pytest para pruebas en Python", puede recordar esa preferencia y aplicarla automáticamente en sesiones futuras. Todo sin que tengas que repetirlo.

> 💡 **Memoria vs. Sesiones**: Las sesiones guardan el historial de la conversación para que puedas reanudar una tarea específica. La memoria guarda hechos reutilizables del repositorio y preferencias del usuario que Copilot puede aplicar en trabajos futuros. Piensa en las sesiones como cuadernos de tareas, y en la memoria como contexto reutilizable que Copilot puede llevar adelante.

### Comprobar y administrar el contexto

A medida que agregas archivos y conversación, la [ventana de contexto](../GLOSSARY.md#context-window) de Copilot CLI se llena. Hay varios comandos disponibles para ayudarte a mantener el control:

```bash
copilot

> /context
Context usage: 62k/200k tokens (31%)

> /clear
# Abandona la sesión actual (no se guarda el historial) e inicia una conversación nueva

> /new
# Finaliza la sesión actual (guardándola en el historial para búsqueda/reanudación) e inicia una conversación nueva

> /rewind
# Abre un selector de línea de tiempo que te permite retroceder a un punto anterior de tu conversación
```

> 💡 **Cuándo usar `/clear` o `/new`**: Si has estado revisando books.py y quieres cambiar a discutir utils.py, ejecuta /new primero (o /clear si no necesitas el historial de la sesión). De lo contrario, el contexto obsoleto del tema anterior puede confundir las respuestas.

> 💡 **¿Cometiste un error o quieres probar un enfoque diferente?** Usa `/rewind` (o presiona Esc dos veces) para abrir un **selector de línea de tiempo** que te permite retroceder a cualquier punto anterior en tu conversación, no solo al más reciente. Esto es útil cuando tomaste un camino equivocado y quieres retroceder sin empezar totalmente de nuevo.

---

### Retomar donde lo dejaste

<img src="../../../02-context-conversations/images/session-persistence-timeline.png" alt="Línea de tiempo que muestra cómo las sesiones de GitHub Copilot CLI persisten a través de los días - comienza el lunes, reanuda el miércoles con todo el contexto restaurado" width="800"/>

*Las sesiones se guardan automáticamente cuando sales. Reanuda días después con todo el contexto: archivos, issues y progreso todo recordado.*

Imagina este flujo de trabajo a lo largo de varios días:

```bash
# Lunes: Comenzar la revisión de la aplicación de libros con un nombre desde el principio
copilot --name book-app-review

> @samples/book-app-project/books.py
> Review and number all code quality issues

Quality Issues Found:
1. Duplicate display functions (book_app.py & utils.py) - MEDIUM
2. No input validation for empty strings - MEDIUM
3. Year can be 0 or negative - LOW
4. No type hints on all functions - LOW
5. Missing error logging - LOW

> Fix issue #1 (funciones duplicadas)
# Trabajar en la corrección...

> /exit
```

```bash
# Miércoles: Reanuda exactamente donde lo dejaste, por nombre
copilot --resume=book-app-review

> What issues remain unfixed from our book app review?

Remaining issues from our book-app-review session:
2. No input validation for empty strings - MEDIUM
3. Year can be 0 or negative - LOW
4. No type hints on all functions - LOW
5. Missing error logging - LOW

Issue #1 (funciones duplicadas) se solucionó el lunes.

> Let's tackle issue #2 next
```

**Lo que hace esto poderoso**: Días después, Copilot CLI recuerda:
- El archivo exacto en el que estabas trabajando
- La lista numerada de issues
- Cuáles ya has abordado
- El contexto de tu conversación

Sin volver a explicar. Sin volver a leer archivos. Simplemente continúa trabajando.

---

**🎉 ¡Ahora conoces lo esencial!** La sintaxis `@`, la gestión de sesiones (`--name`/`--continue`/`--resume`/`/rename`) y los comandos de contexto (`/context`/`/clear`) son suficientes para ser muy productivo. Todo lo de abajo es opcional. Vuélvelo a ver cuando estés listo.

---

# Opcional: Profundizando

<img src="../../../02-context-conversations/images/optional-going-deeper.png" alt="Cueva de cristales abstracta en tonos azules y morados que representa una exploración más profunda de conceptos de contexto" width="800"/>

Estos temas construyen sobre los conceptos esenciales anteriores. **Elige lo que te interese, o salta a [Práctica](#el-espectro-de-especificidad).**

| Quiero aprender sobre... | Ir a |
|---|---|
| Patrones comodín y comandos avanzados de sesión | [Additional @ Patterns & Session Commands](#comprobar-y-administrar-el-contexto) |
| Construir sobre el contexto a través de múltiples indicaciones | [Context-Aware Conversations](#patrones-adicionales-de) |
| Límites de tokens y `/compact` | [Understanding Context Windows](#compartir-tu-sesión) |
| Cómo elegir los archivos correctos para referenciar | [Choosing What to Reference](#el-comando-compact) |
| Analizar capturas de pantalla y maquetas | [Working with Images](#qué-incluir-vs-excluir) |

<details>
<summary><strong>Patrones adicionales de @ y comandos de sesión</strong></summary>
<a id="additional-patterns"></a>

### Patrones adicionales de @

Para usuarios avanzados, Copilot CLI admite patrones comodín y referencias a imágenes:

| Pattern | Qué hace |
|---------|--------------|
| `@folder/*.py` | Todos los archivos .py en la carpeta |
| `@**/test_*.py` | Comodín recursivo: encuentra todos los archivos de prueba en cualquier lugar |
| `@image.png` | Archivo de imagen para revisión de UI |

```bash
copilot

> Find all TODO comments in @samples/book-app-project/**/*.py
```

### Ver información de la sesión

```bash
copilot

> /session
# Muestra los detalles de la sesión actual y el resumen del espacio de trabajo

> /usage
# Muestra métricas y estadísticas de la sesión
```

### Compartir tu sesión

```bash
copilot

> /share file ./my-session.md
# Exporta la sesión como un archivo Markdown

> /share gist
# Crea un gist de GitHub con la sesión

> /share html
# Exporta la sesión como un archivo HTML interactivo autocontenido
# Útil para compartir informes de sesión pulidos con compañeros de equipo o guardarlos como referencia
```

</details>

<details>
<summary><strong>Conversaciones conscientes del contexto</strong></summary>
<a id="context-aware-conversations"></a>

### Conversaciones conscientes del contexto

La magia ocurre cuando tienes conversaciones multironda que se construyen unas sobre otras.

#### Ejemplo: Mejora progresiva

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

Fíjate cómo cada indicación se basa en el trabajo previo. Ese es el poder del contexto.

</details>

<details>
<summary><strong>Entendiendo las ventanas de contexto</strong></summary>
<a id="understanding-context-windows"></a>

### Entendiendo las ventanas de contexto

Ya conoces `/context` y `/clear` de lo esencial. Aquí está la imagen más profunda de cómo funcionan las ventanas de contexto.

Cada IA tiene una "ventana de contexto", que es la cantidad de texto que puede considerar a la vez.

<img src="../../../02-context-conversations/images/context-window-visualization.png" alt="Visualización de la ventana de contexto" width="800"/>

*La ventana de contexto es como un escritorio: solo puede contener cierta cantidad a la vez. Los archivos, el historial de conversación y los prompts del sistema ocupan espacio.*

#### Qué sucede al llegar al límite

```bash
copilot

> /context

Context usage: 45,000 / 128,000 tokens (35%)

# A medida que añades más archivos y conversaciones, esto crece

> @large-codebase/

Context usage: 120,000 / 128,000 tokens (94%)

# Advertencia: Se está acercando al límite de contexto

> @another-large-file.py

Context limit reached. Older context will be summarized.
```

#### El comando `/compact`

Cuando tu contexto se está llenando pero no quieres perder la conversación, `/compact` resume tu historial para liberar tokens:

```bash
copilot

> /compact
# Resume el historial de la conversación, liberando espacio de contexto
# Sus hallazgos y decisiones clave se conservan
```

También puedes darle a `/compact` instrucciones opcionales de enfoque para moldear qué se prioriza en el resumen:

```bash
copilot

> /compact focus on the list of bugs we found and decisions made
# Resume el historial, manteniendo la lista de errores y las decisiones en primer plano
```

> 💡 **Cuándo usar las instrucciones de enfoque**: Si tu conversación cubrió muchos temas, las instrucciones de enfoque ayudan a `/compact` a conservar las partes más relevantes para tus próximos pasos para que no pierdas el hilo.

#### Consejos de eficiencia de contexto

| Situation | Action | Why |
|-----------|--------|-----|
| Starting new topic | `/clear` | Removes irrelevant context |
| Went down wrong path | `/rewind` | Roll back to any earlier point |
| Long conversation | `/compact` | Summarizes history, frees tokens |
| Need specific file | `@file.py` not `@folder/` | Loads only what you need |
| Hitting limits | `/new` or `/clear` | Fresh context |
| Multiple topics | Use `/rename` per topic | Easy to resume right session |

#### Buenas prácticas para proyectos grandes

1. **Sé específico**: `@samples/book-app-project/books.py` en lugar de `@samples/book-app-project/`
2. **Aclara el contexto entre temas**: Usa `/new` o `/clear` al cambiar el enfoque
3. **Usa `/compact`**: Resume la conversación para liberar contexto
4. **Usa varias sesiones**: Una sesión por característica o tema

</details>

<details>
<summary><strong>Elegir qué referenciar</strong></summary>
<a id="choosing-what-to-reference"></a>

### Elegir qué referenciar

No todos los archivos tienen el mismo valor cuando se trata de contexto. Aquí tienes cómo elegir con criterio:

#### Consideraciones sobre el tamaño de archivo

| File Size | Approximate [Tokens](../GLOSSARY.md#token) | Strategy |
|-----------|-------------------|----------|
| Small (<100 lines) | ~500-1,500 tokens | Reference freely |
| Medium (100-500 lines) | ~1,500-7,500 tokens | Reference specific files |
| Large (500+ lines) | 7,500+ tokens | Be selective, use specific files |
| Very Large (1000+ lines) | 15,000+ tokens | Consider splitting or targeting sections |

**Ejemplos concretos:**
- The book app's 4 Python files combined ≈ 2,000-3,000 tokens
- A typical Python module (200 lines) ≈ 3,000 tokens
- A Flask API file (400 lines) ≈ 6,000 tokens
- Your package.json ≈ 200-500 tokens
- A short prompt + response ≈ 500-1,500 tokens

> 💡 **Estimación rápida para código:** Multiplica las líneas de código por ~15 para obtener un aproximado de tokens. Ten en cuenta que esto es solo una estimación.

#### Qué incluir vs. excluir

**Alto valor** (incluye estos):
- Entry points (`book_app.py`, `main.py`, `app.py`)
- The specific files you're asking about
- Files directly imported by your target file
- Configuration files (`requirements.txt`, `pyproject.toml`)
- Data models or dataclasses

**Menor valor** (considera excluir):
- Generated files (compiled output, bundled assets)
- Node modules or vendor directories
- Large data files or fixtures
- Files unrelated to your question

#### El espectro de especificidad

```
Less specific ────────────────────────► More specific
@samples/book-app-project/                      @samples/book-app-project/books.py:47-52
     │                                       │
     └─ Scans everything                     └─ Just what you need
        (uses more context)                      (preserves context)
```

**Cuando ampliar** (`@samples/book-app-project/`):
- Initial codebase exploration
- Finding patterns across many files
- Architecture reviews

**Cuando ser específico** (`@samples/book-app-project/books.py`):
- Debugging a particular issue
- Code review of a specific file
- Asking about a single function

#### Ejemplo práctico: carga de contexto por etapas

```bash
copilot

# Paso 1: Comienza con la estructura
> @package.json What frameworks does this project use?

# Paso 2: Acota según la respuesta
> @samples/book-app-project/ Show me the project structure

# Paso 3: Concéntrate en lo que importa
> @samples/book-app-project/books.py Review the BookCollection class

# Paso 4: Agrega archivos relacionados solo cuando sea necesario
> @samples/book-app-project/book_app.py @samples/book-app-project/books.py How does the CLI use the BookCollection?
```

Este enfoque por etapas mantiene el contexto centrado y eficiente.

</details>

<details>
<summary><strong>Trabajar con imágenes</strong></summary>
<a id="working-with-images"></a>

### Trabajar con imágenes

Puedes incluir imágenes en tus conversaciones usando la sintaxis `@`, o simplemente **pegar desde tu portapapeles** (Cmd+V / Ctrl+V). Copilot CLI puede analizar capturas de pantalla, maquetas y diagramas para ayudar con la depuración de UI, la implementación de diseño y el análisis de errores.

```bash
copilot

> @images/screenshot.png What is happening in this image?

> @images/mockup.png Write the HTML and CSS to match this design. Place it in a new file called index.html and put the CSS in styles.css.
```

> 📖 **Aprende más**: Consulta [Additional Context Features](../appendices/additional-context.md#trabajar-con-imágenes) para ver los formatos compatibles, casos de uso prácticos y consejos para combinar imágenes con código.

</details>

---

# Practice

<img src="../../../images/practice.png" alt="Escenario de escritorio cálido con monitor mostrando código, lámpara, taza de café y auriculares listos para práctica práctica" width="800"/>

Es hora de aplicar tus habilidades de gestión de contexto y sesiones.

---

## ▶️ Pruébalo tú mismo

### Revisión completa del proyecto

El curso incluye archivos de ejemplo que puedes revisar directamente. Inicia copilot y ejecuta el prompt que se muestra a continuación:

```bash
copilot

> @samples/book-app-project/ Give me a code quality review of this project

# Copilot CLI identificará problemas como:
# - Funciones de visualización duplicadas
# - Falta de validación de entradas
# - Manejo de errores inconsistente
```

> 💡 **¿Quieres probar con tus propios archivos?** Crea un pequeño proyecto Python (`mkdir -p my-project/src`), añade algunos archivos .py y luego usa `@my-project/src/` para revisarlos. Puedes pedirle a copilot que cree código de ejemplo si quieres.

### Flujo de trabajo de la sesión

```bash
copilot

> /rename book-app-review
> @samples/book-app-project/books.py Let's add input validation for empty titles

[Copilot CLI suggests validation approach]

> Implement that fix
> Now consolidate the duplicate display functions in @samples/book-app-project/
> /exit

# Más tarde - retoma donde lo dejaste
copilot --continue

> Generate tests for the changes we made
```

---

Después de completar las demos, prueba estas variaciones:

1. **Desafío entre archivos**: Analiza cómo trabajan juntos book_app.py y books.py:
   ```bash
   copilot
   > @samples/book-app-project/book_app.py @samples/book-app-project/books.py
   > What's the relationship between these files? Are there any code smells?
   ```

2. **Desafío de sesión**: Inicia una sesión, nómbrala con `/rename my-first-session`, trabaja en algo, sal con `/exit`, y luego ejecuta `copilot --continue`. ¿Recuerda lo que estabas haciendo?

3. **Desafío de contexto**: Ejecuta `/context` a mitad de la sesión. ¿Cuántos tokens estás usando? Prueba `/compact` y verifica de nuevo. (Ver [Understanding Context Windows](#compartir-tu-sesión) en Going Deeper para más sobre `/compact`.)

**Autoevaluación**: Entiendes el contexto cuando puedes explicar por qué `@folder/` es más potente que abrir cada archivo individualmente.

---

## 📝 Tarea

### Desafío principal: Rastrear el flujo de datos

Los ejemplos prácticos se centraron en revisiones de calidad de código y validación de entradas. Ahora practica las mismas habilidades de contexto en una tarea diferente, rastreando cómo se mueve la información a través de la aplicación:

1. Start an interactive session: `copilot`
2. Reference `books.py` and `book_app.py` together:
   `@samples/book-app-project/books.py @samples/book-app-project/book_app.py Trace how a book goes from user input to being saved in data.json. What functions are involved at each step?`
3. Bring in the data file for additional context:
   `@samples/book-app-project/data.json What happens if this JSON file is missing or corrupted? Which functions would fail?`
4. Ask for a cross-file improvement:
   `@samples/book-app-project/books.py @samples/book-app-project/utils.py Suggest a consistent error-handling strategy that works across both files.`
5. Rename the session: `/rename data-flow-analysis`
6. Exit with `/exit`, then resume with `copilot --continue` and ask a follow-up question about the data flow

**Criterios de éxito**: Puedes rastrear datos a través de varios archivos, reanudar una sesión con nombre y obtener sugerencias entre archivos.

<details>
<summary>💡 Pistas (haz clic para expandir)</summary>

**Para empezar:**
```bash
cd /path/to/copilot-cli-for-beginners
copilot
> @samples/book-app-project/books.py @samples/book-app-project/book_app.py Trace how a book goes from user input to being saved in data.json.
> @samples/book-app-project/data.json What happens if this file is missing or corrupted?
> /rename data-flow-analysis
> /exit
```

Then resume with: `copilot --continue`

**Comandos útiles:**
- `@file.py` - Reference a single file
- `@folder/` - Reference all files in a folder (note the trailing `/`)
- `/context` - Check how much context you're using
- `/rename <name>` - Name your session for easy resuming

</details>

### Desafío adicional: Límites de contexto

1. Reference all the book app files at once with `@samples/book-app-project/`
2. Ask several detailed questions about different files (`books.py`, `utils.py`, `book_app.py`, `data.json`)
3. Run `/context` to see usage. How quickly does it fill up?
4. Practice using `/compact` to reclaim space, then continue the conversation
5. Try being more specific with file references (e.g., `@samples/book-app-project/books.py` instead of the whole folder) and see how it affects context usage

---

<details>
<summary>🔧 <strong>Errores comunes y solución de problemas</strong> (haz clic para expandir)</summary>

### Errores comunes

| Mistake | What Happens | Fix |
|---------|--------------|-----|
| Forgetting `@` before filenames | Copilot CLI treats "books.py" as plain text | Use `@samples/book-app-project/books.py` to reference files |
| Expecting sessions to persist automatically | Starting `copilot` fresh loses all previous context | Use `--continue` (last session) or `--resume` (pick a session) |
| Referencing files outside current directory | "Permission denied" or "File not found" errors | Use `/add-dir /path/to/directory` to grant access |
| Not using `/clear` when switching topics | Old context confuses responses about the new topic | Run `/clear` before starting a different task |

### Solución de problemas

**Errores de "Archivo no encontrado"** - Asegúrate de estar en el directorio correcto:

```bash
pwd  # Comprobar el directorio actual
ls   # Listar archivos

# Luego inicia copilot y usa rutas relativas
copilot

> Review @samples/book-app-project/books.py
```

**"Permission denied"** - Add the directory to your allowed list:

```bash
copilot --add-dir /path/to/directory

# O en una sesión:
> /add-dir /path/to/directory
```

**Context fills up too quickly**:
- Be more specific with file references
- Use `/clear` between different topics
- Split work across multiple sessions

</details>

---

# Resumen

## 🔑 Puntos clave

1. **La sintaxis `@`** proporciona a Copilot CLI contexto sobre archivos, directorios e imágenes
2. **Las conversaciones multi-turno** se construyen unas sobre otras a medida que el contexto se acumula
3. **Las sesiones se guardan automáticamente**: nómbralas al iniciar con `--name`, reanúdalas por nombre con `--resume=<name>`, o usa `--continue` para retomar la sesión más reciente
4. **Las ventanas de contexto** tienen límites: adminístralas con `/clear`, `/compact`, `/context`, `/new` y `/rewind`. Usa `/compact focus on <topic>` para definir qué se mantiene en el resumen
5. **Memoria persistente** (`/memory`) permite que Copilot CLI recuerde preferencias y hechos a través de *todas* las sesiones — no solo la actual
6. **Banderas de permiso** (`--add-dir`, `--allow-all`) controlan el acceso a múltiples directorios. ¡Úsalas con prudencia!
7. **Referencias de imagen** (`@screenshot.png`) ayudan a depurar problemas de UI visualmente

> 📚 **Documentación oficial**: [Use Copilot CLI](https://docs.github.com/copilot/how-tos/copilot-cli/use-copilot-cli) para la referencia completa sobre contexto, sesiones y trabajar con archivos.

> 📋 **Referencia rápida**: Consulta la [GitHub Copilot CLI command reference](https://docs.github.com/en/copilot/reference/cli-command-reference) para la lista completa de comandos y atajos.

---

## ➡️ Qué sigue

Ahora que puedes proporcionar contexto a Copilot CLI, pongámoslo a trabajar en tareas de desarrollo reales. Las técnicas de contexto que acabas de aprender (referencias de archivos, análisis entre archivos y gestión de sesiones) son la base para los flujos de trabajo potentes del siguiente capítulo.

En **[Chapter 03: Development Workflows](../03-development-workflows/README.md)**, aprenderás:

- Flujos de trabajo de revisión de código
- Patrones de refactorización
- Asistencia en depuración
- Generación de pruebas
- Integración con Git

---

**[← Volver al Capítulo 01](../01-setup-and-first-steps/README.md)** | **[Continuar al Capítulo 03 →](../03-development-workflows/README.md)**

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Descargo de responsabilidad**:
Este documento ha sido traducido utilizando el servicio de traducción automática [Co-op Translator](https://github.com/Azure/co-op-translator). Aunque nos esforzamos por la precisión, tenga en cuenta que las traducciones automatizadas pueden contener errores o inexactitudes. El documento original en su idioma nativo debe considerarse la fuente autorizada. Para información crítica, se recomienda una traducción profesional humana. No somos responsables de cualquier malentendido o interpretación errónea que surja del uso de esta traducción.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->