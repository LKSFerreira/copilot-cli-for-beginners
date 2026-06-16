<!--
---
id: CopilotCLI-02
title: !translate Contexto e Conversas
description: !translate Use contexto de arquivos e diretórios, retome sessões anteriores e escreva conversas multitorno eficazes com o GitHub Copilot CLI.
audience: Desenvolvedores / Estudantes / Usuários de terminal
slug: context-and-conversations
weight: 3
---
-->

![Capítulo 02: Contexto e Conversas](assets/chapter-header.png)

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

<img src="assets/colleague-context-analogy.png" alt="Contexto faz a diferença — sem contexto versus com contexto" width="800"/>

*Assim como seus colegas, o Copilot CLI não é um leitor de mentes. Fornecer mais informações ajuda tanto humanos quanto o Copilot a oferecer suporte mais direcionado!*

Imagine explicar um bug a um colega:

> **Sem contexto**: "O app de livros não funciona."

> **Com contexto**: "Veja `books.py`, especialmente a função `find_book_by_title`. Ela não faz correspondência sem distinguir maiúsculas/minúsculas."

Para fornecer contexto ao Copilot CLI, use *a sintaxe `@`* para apontar o Copilot CLI para arquivos específicos.

---

# Essencial: Contexto básico

<img src="assets/essential-basic-context.png" alt="Blocos de código brilhantes conectados por trilhas de luz representando como o contexto flui nas conversas do Copilot CLI" width="800"/>

Esta seção cobre tudo que você precisa para trabalhar bem com contexto. Domine estes fundamentos primeiro.

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
| `@file.py` | Referencia um único arquivo | `Review @samples/book-app-project/books.py` |
| `@folder/` | Referencia todos os arquivos em um diretório | `Review @samples/book-app-project/` |
| `@file1.py @file2.py` | Referencia vários arquivos | `Compare @samples/book-app-project/book_app.py @samples/book-app-project/books.py` |

### Referenciar um único arquivo

```bash
copilot

> Explain what @samples/book-app-project/utils.py does
```

---

<details>
<summary>🎬 Veja em ação!</summary>

![Demo de contexto de arquivo](assets/file-context-demo.gif)

*A saída da demo varia. Seu modelo, ferramentas e respostas podem diferir do que é mostrado aqui.*

</details>

---

### Referenciar vários arquivos

```bash
copilot

> Compare @samples/book-app-project/book_app.py and @samples/book-app-project/books.py for consistency
```

### Referenciar um diretório inteiro

```bash
copilot

> Review all files in @samples/book-app-project/ for error handling
```

---

## Inteligência entre arquivos

É aqui que o contexto se torna um superpoder. A análise de arquivo único é útil. A análise entre arquivos é transformadora.

<img src="assets/cross-file-intelligence.png" alt="Inteligência entre arquivos — comparando análise de arquivo único com análise entre arquivos, mostrando como analisar arquivos juntos revela bugs, fluxo de dados e padrões invisíveis isoladamente" width="800"/>

### Demo: Encontre bugs que atravessam vários arquivos

```bash
copilot

> @samples/book-app-project/book_app.py @samples/book-app-project/books.py
>
> How do these files work together? What's the data flow?
```

> 💡 **Opção avançada**: Para análise entre arquivos com foco em segurança, experimente os exemplos Python de segurança:
> ```bash
> > @samples/buggy-code/python/user_service.py @samples/buggy-code/python/payment_processor.py
> > Find security vulnerabilities that span BOTH files
> ```

---

<details>
<summary>🎬 Veja em ação!</summary>

![Demo de vários arquivos](assets/multi-file-demo.gif)

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

**Por que isso importa**: uma revisão de arquivo único perderia o panorama geral. Apenas a análise entre arquivos revela:
- **Código duplicado** que deveria ser consolidado
- **Padrões de fluxo de dados** mostrando como componentes interagem
- **Problemas arquiteturais** que afetam a manutenibilidade

---

### Demo: Entenda uma base de código em 60 segundos

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

**Resultado**: o que levaria uma hora de leitura de código é comprimido em 10 segundos. Você sabe exatamente onde focar.

---

## Exemplos práticos

### Exemplo 1: Revisão de código com contexto

```bash
copilot

> @samples/book-app-project/books.py Review this file for potential bugs

# Copilot CLI now has the full file content and can give specific feedback:
# "Line 49: Case-sensitive comparison may miss books..."
# "Line 29: JSON decode errors are caught but data corruption isn't logged..."

> What about @samples/book-app-project/book_app.py?

# Now reviewing book_app.py, but still aware of books.py context
```

### Exemplo 2: Entendendo uma base de código

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
<summary>🎬 Veja uma conversa multitorno em ação!</summary>

![Demo multitorno](assets/multi-turn-demo.gif)

*A saída da demo varia. Seu modelo, ferramentas e respostas podem diferir do que é mostrado aqui.*

</details>

### Exemplo 3: Refatoração em vários arquivos

```bash
copilot

> @samples/book-app-project/book_app.py @samples/book-app-project/utils.py
> I see duplicate display functions: show_books() and print_books(). Help me consolidate these.

# Copilot CLI sees both files and can suggest how to merge the duplicate code
```

---

## Gerenciamento de sessões

As sessões são salvas automaticamente enquanto você trabalha. Você pode retomar sessões anteriores para continuar de onde parou.

### Sessões são salvas automaticamente

Toda conversa é salva automaticamente. Basta sair normalmente:

```bash
copilot

> @samples/book-app-project/ Let's improve error handling across all modules

[... do some work ...]

> /exit
```

### Retomar a sessão mais recente

```bash
# Continue where you left off
copilot --continue
```

### Retomar uma sessão específica

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

> 💡 **Como encontro um ID de sessão?** Você não precisa memorizá-los. Executar `copilot --resume` sem ID mostra uma lista interativa das sessões anteriores, seus nomes, IDs e quando foram ativas pela última vez. Basta escolher a desejada.
>
> **E vários terminais?** Cada janela de terminal é sua própria sessão, com seu próprio contexto. Se você tiver o Copilot CLI aberto em três terminais, são três sessões separadas. Executar `--resume` de qualquer terminal permite navegar por todas elas. A flag `--continue` pega primeiro a sessão do diretório de trabalho atual; se não houver nenhuma ali, escolhe a sessão ativa mais recente.
>
> **Posso trocar de sessão sem reiniciar?** Sim. Use o comando com barra `/resume` dentro de uma sessão ativa:
> ```
> > /resume
> # Shows a list of sessions to switch to
> ```

### Organize suas sessões

Dê nomes significativos às sessões para encontrá-las depois. Você pode nomear uma sessão ao iniciá-la ou renomeá-la a qualquer momento dentro da sessão:

```bash
# Name a session right when you start it
copilot --name book-app-review

# Or rename the current session from inside
copilot

> /rename book-app-review
# Session renamed for easier identification
```

Depois que uma sessão é nomeada, você pode retomá-la diretamente pelo nome sem navegar por uma lista:

```bash
copilot --resume=book-app-review
```

Para limpar sessões que você não precisa mais, use `/session delete` dentro de uma sessão:

```bash
copilot

> /session delete            # Deletes the current session
> /session delete abc123     # Deletes a specific session by ID
> /session delete-all        # Deletes all sessions (use with care!)
```

### Memória persistente entre sessões

As sessões salvam seu histórico de conversa, mas a **memória** vai um passo além e permite que o Copilot CLI lembre preferências e fatos *em todas as sessões*, não apenas dentro de uma única sessão.

```bash
copilot

> /memory show
# Shows what Copilot CLI currently remembers about you and your project

> /memory on
# Enables memory (on by default if your account supports it)

> /memory off
# Disables memory (useful if you prefer a fresh slate each time)
```

Por exemplo, se você disser ao Copilot CLI "I always prefer pytest for Python testing", ele pode lembrar dessa preferência e aplicá-la automaticamente em sessões futuras. Tudo isso sem você precisar repetir.

> 💡 **Memória vs. sessões**: sessões salvam o histórico da conversa para que você possa retomar uma tarefa específica. Memória salva fatos reutilizáveis do repositório e preferências do usuário que o Copilot pode aplicar em trabalhos futuros. Pense em sessões como cadernos de tarefas e em memória como contexto reutilizável que o Copilot leva adiante.

### Verificar e gerenciar contexto

À medida que você adiciona arquivos e conversa, a [janela de contexto](../GLOSSARY.md#context-window) do Copilot CLI se enche. Vários comandos estão disponíveis para ajudar você a manter o controle:

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

> 💡 **Cometeu um erro ou quer tentar uma abordagem diferente?** Use `/rewind` (ou pressione Esc duas vezes) para abrir um **seletor de linha do tempo** que permite voltar a qualquer ponto anterior da conversa, não apenas ao mais recente. Isso é útil quando você seguiu pelo caminho errado e quer retroceder sem começar tudo de novo.

---

### Retome de onde parou

<img src="assets/session-persistence-timeline.png" alt="Linha do tempo mostrando como as sessões do GitHub Copilot CLI persistem por dias — iniciar na segunda-feira, retomar na quarta-feira com contexto completo restaurado" width="800"/>

*As sessões são salvas automaticamente quando você sai. Retome dias depois com contexto completo: arquivos, problemas e progresso lembrados.*

Imagine este fluxo ao longo de vários dias:

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

**O que torna isso poderoso**: dias depois, o Copilot CLI lembra:
- O arquivo exato em que você estava trabalhando
- A lista numerada de problemas
- Quais deles você já resolveu
- O contexto da sua conversa

Sem reexplicar. Sem reler arquivos. Apenas continue trabalhando.

---

**🎉 Agora você conhece o essencial!** A sintaxe `@`, o gerenciamento de sessões (`--name`/`--continue`/`--resume`/`/rename`) e os comandos de contexto (`/context`/`/clear`) são suficientes para ser altamente produtivo. Tudo abaixo é opcional. Volte a isso quando estiver pronto.

---

# Opcional: Indo mais fundo

<img src="assets/optional-going-deeper.png" alt="Caverna de cristal abstrata em tons de azul e roxo representando exploração mais profunda dos conceitos de contexto" width="800"/>

Estes tópicos se baseiam no essencial acima. **Escolha o que interessa ou avance para [Prática](#practice).**

| Quero aprender sobre... | Ir para |
|---|---|
| Padrões curinga e comandos avançados de sessão | [Padrões @ adicionais e comandos de sessão](#additional-patterns) |
| Construir sobre contexto em vários prompts | [Conversas conscientes de contexto](#context-aware-conversations) |
| Limites de tokens e `/compact` | [Entendendo janelas de contexto](#understanding-context-windows) |
| Como escolher os arquivos certos para referenciar | [Escolhendo o que referenciar](#choosing-what-to-reference) |
| Analisar capturas de tela e mockups | [Trabalhando com imagens](#working-with-images) |

<details>
<summary><strong>Padrões @ adicionais e comandos de sessão</strong></summary>
<a id="additional-patterns"></a>

### Padrões @ adicionais

Para usuários avançados, o Copilot CLI oferece suporte a padrões curinga e referências a imagens:

| Padrão | O que faz |
|---------|--------------|
| `@folder/*.py` | Todos os arquivos .py na pasta |
| `@**/test_*.py` | Coringa recursivo: encontra todos os arquivos de teste em qualquer lugar |
| `@image.png` | Arquivo de imagem para revisão na interface |

```bash
copilot

> Find all TODO comments in @samples/book-app-project/**/*.py
```

### Ver informações da sessão

```bash
copilot

> /session
# Shows current session details and workspace summary

> /usage
# Shows session metrics and statistics
```

### Compartilhar sua sessão

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
<summary><strong>Conversas conscientes de contexto</strong></summary>
<a id="context-aware-conversations"></a>

### Conversas conscientes de contexto

A mágica acontece quando você tem conversas multitorno que se constroem umas sobre as outras.

#### Exemplo: Aprimoramento progressivo

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

Observe como cada prompt se baseia no trabalho anterior. Este é o poder do contexto.

</details>

<details>
<summary><strong>Entendendo janelas de contexto</strong></summary>
<a id="understanding-context-windows"></a>

### Entendendo janelas de contexto

Você já conhece `/context` e `/clear` do essencial. Aqui está o panorama mais profundo de como as janelas de contexto funcionam.

Toda IA tem uma "janela de contexto", que é a quantidade de texto que ela consegue considerar de uma vez.

<img src="assets/context-window-visualization.png" alt="Visualização da janela de contexto" width="800"/>

*A janela de contexto é como uma mesa: ela só consegue comportar certa quantidade de coisa por vez. Arquivos, histórico de conversa e prompts do sistema ocupam espaço.*

#### O que acontece no limite

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

#### O comando `/compact`

Quando seu contexto está ficando cheio, mas você não quer perder a conversa, `/compact` resume seu histórico para liberar tokens:

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
| Iniciando novo tópico | `/clear` | Remove contexto irrelevante |
| Seguiu pelo caminho errado | `/rewind` | Volta a qualquer ponto anterior |
| Conversa longa | `/compact` | Resume o histórico, libera tokens |
| Precisa de arquivo específico | `@file.py` em vez de `@folder/` | Carrega apenas o necessário |
| Atingindo limites | `/new` ou `/clear` | Contexto novo |
| Múltiplos tópicos | Use `/rename` por tópico | Fácil retomar a sessão certa |

#### Melhores práticas para bases de código grandes

1. **Seja específico**: `@samples/book-app-project/books.py` em vez de `@samples/book-app-project/`
2. **Limpe o contexto entre tópicos**: Use `/new` ou `/clear` ao mudar de foco
3. **Use `/compact`**: Resuma a conversa para liberar contexto
4. **Use várias sessões**: uma sessão por funcionalidade ou tópico

</details>

<details>
<summary><strong>Escolhendo o que referenciar</strong></summary>
<a id="choosing-what-to-reference"></a>

### Escolhendo o que referenciar

Nem todos os arquivos têm o mesmo valor quando se trata de contexto. Veja como escolher com sabedoria:

#### Considerações sobre tamanho do arquivo

| Tamanho do arquivo | [Tokens](../GLOSSARY.md#token) aproximados | Estratégia |
|-----------|-------------------|----------|
| Pequeno (<100 linhas) | ~500-1.500 tokens | Referencie livremente |
| Médio (100-500 linhas) | ~1.500-7.500 tokens | Referencie arquivos específicos |
| Grande (500+ linhas) | 7.500+ tokens | Seja seletivo, use arquivos específicos |
| Muito grande (1000+ linhas) | 15.000+ tokens | Considere dividir ou mirar seções |

**Exemplos concretos:**
- Os 4 arquivos Python do app de livros combinados ≈ 2.000-3.000 tokens
- Um módulo Python típico (200 linhas) ≈ 3.000 tokens
- Um arquivo Flask API (400 linhas) ≈ 6.000 tokens
- Seu package.json ≈ 200-500 tokens
- Um prompt + resposta curtos ≈ 500-1.500 tokens

> 💡 **Estimativa rápida para código:** multiplique linhas de código por ~15 para obter tokens aproximados. Lembre-se de que isso é apenas uma estimativa.

#### O que incluir vs. excluir

**Alto valor** (inclua estes):
- Pontos de entrada (`book_app.py`, `main.py`, `app.py`)
- Os arquivos específicos sobre os quais você está perguntando
- Arquivos importados diretamente pelo arquivo-alvo
- Arquivos de configuração (`requirements.txt`, `pyproject.toml`)
- Modelos de dados ou dataclasses

**Valor menor** (considere excluir):
- Arquivos gerados (saída compilada, assets empacotados)
- Node modules ou diretórios vendor
- Arquivos de dados grandes ou fixtures
- Arquivos não relacionados à sua pergunta

#### O espectro da especificidade

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

#### Exemplo prático: carregamento de contexto em etapas

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

Esta abordagem em etapas mantém o contexto focado e eficiente.

</details>

<details>
<summary><strong>Trabalhando com imagens</strong></summary>
<a id="working-with-images"></a>

### Trabalhando com imagens

Você pode incluir imagens em suas conversas usando a sintaxe `@`, ou simplesmente **colar da área de transferência** (Cmd+V / Ctrl+V). O Copilot CLI pode analisar capturas de tela, mockups e diagramas para ajudar com depuração de UI, implementação de design e análise de erros.

```bash
copilot

> @assets/screenshot.png What is happening in this image?

> @assets/mockup.png Write the HTML and CSS to match this design. Place it in a new file called index.html and put the CSS in styles.css.
```

> 📖 **Saiba mais**: veja [Recursos adicionais de contexto](../appendices/additional-context.md#working-with-images) para formatos suportados, casos de uso práticos e dicas para combinar imagens com código.

</details>

---

<a id="practice"></a>
# Prática

<img src="../assets/practice.png" alt="Ambiente de mesa aconchegante com monitor mostrando código, luminária, xícara de café e fones de ouvido prontos para prática" width="800"/>

Hora de aplicar suas habilidades de contexto e gerenciamento de sessões.

---

## ▶️ Experimente você mesmo

### Revisão completa do projeto

O curso inclui arquivos de exemplo que você pode revisar diretamente. Inicie o copilot e execute o prompt a seguir:

```bash
copilot

> @samples/book-app-project/ Give me a code quality review of this project

# Copilot CLI will identify issues like:
# - Duplicate display functions
# - Missing input validation
# - Inconsistent error handling
```

> 💡 **Quer tentar com seus próprios arquivos?** Crie um pequeno projeto Python (`mkdir -p my-project/src`), adicione alguns arquivos .py e use `@my-project/src/` para revisá-los. Você pode pedir ao Copilot para criar código de exemplo se quiser!

### Fluxo de sessão

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

Depois de concluir as demos, experimente estas variações:

1. **Desafio entre arquivos**: Analise como book_app.py e books.py trabalham juntos:
   ```bash
   copilot
   > @samples/book-app-project/book_app.py @samples/book-app-project/books.py
   > What's the relationship between these files? Are there any code smells?
   ```

2. **Desafio de sessão**: Inicie uma sessão, nomeie-a com `/rename my-first-session`, trabalhe em algo, saia com `/exit`, depois execute `copilot --continue`. Ela lembra o que você estava fazendo?

3. **Desafio de contexto**: Execute `/context` no meio da sessão. Quantos tokens você está usando? Tente `/compact` e verifique novamente. (Veja [Entendendo janelas de contexto](#understanding-context-windows) em Indo mais fundo para saber mais sobre `/compact`.)

**Autoverificação**: você entende contexto quando consegue explicar por que `@folder/` é mais poderoso do que abrir cada arquivo individualmente.

---

## 📝 Tarefa

### Desafio principal: Rastrear o fluxo de dados

Os exemplos práticos focaram em revisões de qualidade de código e validação de entrada. Agora pratique as mesmas habilidades de contexto em uma tarefa diferente: rastrear como os dados se movem pelo app:

1. Inicie uma sessão interativa: `copilot`
2. Referencie `books.py` e `book_app.py` juntos:
   `@samples/book-app-project/books.py @samples/book-app-project/book_app.py Trace how a book goes from user input to being saved in data.json. What functions are involved at each step?`
3. Traga o arquivo de dados para contexto adicional:
   `@samples/book-app-project/data.json What happens if this JSON file is missing or corrupted? Which functions would fail?`
4. Peça uma melhoria entre arquivos:
   `@samples/book-app-project/books.py @samples/book-app-project/utils.py Suggest a consistent error-handling strategy that works across both files.`
5. Renomeie a sessão: `/rename data-flow-analysis`
6. Saia com `/exit`, depois retome com `copilot --continue` e faça uma pergunta de acompanhamento sobre o fluxo de dados

**Critérios de sucesso**: você consegue rastrear dados em vários arquivos, retomar uma sessão nomeada e obter sugestões entre arquivos.

<details>
<summary>💡 Dicas (clique para expandir)</summary>

**Para começar:**
```bash
cd /path/to/copilot-cli-for-beginners
copilot
> @samples/book-app-project/books.py @samples/book-app-project/book_app.py Trace how a book goes from user input to being saved in data.json.
> @samples/book-app-project/data.json What happens if this file is missing or corrupted?
> /rename data-flow-analysis
> /exit
```

Depois retome com: `copilot --continue`

**Comandos úteis:**
- `@file.py` - Referencia um único arquivo
- `@folder/` - Referencia todos os arquivos em uma pasta (observe a `/` final)
- `/context` - Verifica quanto contexto você está usando
- `/rename <name>` - Nomeia sua sessão para facilitar a retomada

</details>

### Desafio bônus: Limites de contexto

1. Referencie todos os arquivos do app de livros de uma vez com `@samples/book-app-project/`
2. Faça várias perguntas detalhadas sobre arquivos diferentes (`books.py`, `utils.py`, `book_app.py`, `data.json`)
3. Execute `/context` para ver o uso. Quão rápido ele se enche?
4. Pratique usar `/compact` para recuperar espaço e continue a conversa
5. Tente ser mais específico com referências de arquivos (por exemplo, `@samples/book-app-project/books.py` em vez da pasta inteira) e veja como isso afeta o uso de contexto

---

<details>
<summary>🔧 <strong>Erros comuns e solução de problemas</strong> (clique para expandir)</summary>

### Erros comuns

| Erro | O que acontece | Correção |
|---------|--------------|-----|
| Esquecer `@` antes dos nomes de arquivo | O Copilot CLI trata "books.py" como texto simples | Use `@samples/book-app-project/books.py` para referenciar arquivos |
| Esperar que sessões persistam automaticamente | Iniciar `copilot` do zero perde todo o contexto anterior | Use `--continue` (última sessão) ou `--resume` (escolher uma sessão) |
| Referenciar arquivos fora do diretório atual | Erros "Permission denied" ou "File not found" | Use `/add-dir /path/to/directory` para conceder acesso |
| Não usar `/clear` ao mudar de tópico | Contexto antigo confunde respostas sobre o novo tópico | Execute `/clear` antes de iniciar uma tarefa diferente |

### Solução de problemas

**Erros "File not found"** - Certifique-se de estar no diretório correto:

```bash
pwd  # Check current directory
ls   # List files

# Then start copilot and use relative paths
copilot

> Review @samples/book-app-project/books.py
```

**"Permission denied"** - Adicione o diretório à sua lista de permissões:

```bash
copilot --add-dir /path/to/directory

# Or in a session:
> /add-dir /path/to/directory
```

**O contexto enche rápido demais**:
- Seja mais específico com referências de arquivos
- Use `/clear` entre tópicos diferentes
- Divida o trabalho em várias sessões

</details>

---

# Resumo

## 🔑 Principais aprendizados

1. A sintaxe **`@`** dá ao Copilot CLI contexto sobre arquivos, diretórios e imagens
2. **Conversas multitorno** se constroem umas sobre as outras à medida que o contexto se acumula
3. **Sessões são salvas automaticamente**: nomeie-as na inicialização com `--name`, retome pelo nome com `--resume=<name>` ou use `--continue` para pegar a sessão mais recente
4. **Janelas de contexto** têm limites: gerencie-as com `/clear`, `/compact`, `/context`, `/new` e `/rewind`. Use `/compact focus on <topic>` para moldar o que será mantido no resumo
5. **Memória persistente** (`/memory`) permite que o Copilot CLI lembre preferências e fatos em *todas* as sessões — não apenas na atual
6. **Flags de permissão** (`--add-dir`, `--allow-all`) controlam acesso a múltiplos diretórios. Use-as com sabedoria!
7. **Referências de imagem** (`@screenshot.png`) ajudam a depurar problemas de UI visualmente

> 📚 **Documentação oficial**: [Use Copilot CLI](https://docs.github.com/copilot/how-tos/copilot-cli/use-copilot-cli) para a referência completa sobre contexto, sessões e trabalho com arquivos.

> 📋 **Referência rápida**: Veja a [referência de comandos do GitHub Copilot CLI](https://docs.github.com/en/copilot/reference/cli-command-reference) para uma lista completa de comandos e atalhos.

---

## ➡️ O que vem a seguir

Agora que você consegue dar contexto ao Copilot CLI, vamos colocá-lo para trabalhar em tarefas reais de desenvolvimento. As técnicas de contexto que você acabou de aprender (referências de arquivos, análise entre arquivos e gerenciamento de sessões) são a base para os fluxos de trabalho poderosos do próximo capítulo.

Em **[Capítulo 03: Fluxos de Desenvolvimento](../03-development-workflows/README.md)**, você aprenderá:

- Fluxos de revisão de código
- Padrões de refatoração
- Assistência para depuração
- Geração de testes
- Integração com Git

---

**[← Voltar ao Capítulo 01](../01-setup-and-first-steps/README.md)** | **[Continue para o Capítulo 03 →](../03-development-workflows/README.md)**
