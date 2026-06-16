<!--
---
id: CopilotCLI-04
title: !translate Criar Assistentes de IA Especializados
description: !translate Use agentes embutidos, crie agents personalizados e escreva instruções customizadas que orientam o GitHub Copilot CLI em tarefas especializadas.
audience: Desenvolvedores / Estudantes / Usuários de terminal
slug: create-specialized-ai-assistants
weight: 5
---
-->

![Capítulo 04: Agents e Instruções Customizadas](assets/chapter-header.png)

> **E se você pudesse contratar um revisor de código Python, um especialista em testes e um revisor de segurança... tudo em uma única ferramenta?**

No Capítulo 03, você dominou os fluxos essenciais: revisão de código, refatoração, depuração, geração de testes e integração com git. Isso torna você altamente produtivo com o GitHub Copilot CLI. Agora vamos além.

Até agora, você tem usado o Copilot CLI como um assistente de uso geral. Agents permitem atribuir uma persona específica com padrões incorporados, como um revisor de código que aplica type hints e PEP 8, ou um assistente de testes que escreve casos pytest. Você verá como o mesmo prompt produz resultados melhores quando tratado por um agent com instruções direcionadas.

## 🎯 Objetivos de Aprendizagem

Ao final deste capítulo, você será capaz de:

- Usar agents embutidos: Plan (`/plan`), Code-review (`/review`) e entender agents automáticos (Explore, Task)
- Criar agents especializados usando arquivos de agent (`.agent.md`)
- Usar agents para tarefas específicas de domínio
- Alternar entre agents usando `/agent` e `--agent`
- Escrever arquivos de instruções customizadas para padrões do projeto

> ⏱️ **Tempo estimado**: ~55 minutos (20 min leitura + 35 min prático)

---

## 🧩 Analogia do mundo real: Contratando especialistas

Quando você precisa de ajuda com sua casa, não chama um "ajudante geral". Você chama especialistas:

| Problema | Especialista | Por quê |
|---------|------------|-----|
| Cano vazando | Encanador | Conhece códigos de encanamento e tem ferramentas especializadas |
| Refazer fiação | Eletricista | Entende requisitos de segurança e normas |
| Telhado novo | Telhador | Conhece materiais e condições climáticas locais |

Agents funcionam da mesma forma. Em vez de uma IA genérica, use agents focados em tarefas específicas e que conhecem o processo certo a seguir. Configure as instruções uma vez e reutilize-as sempre que precisar dessa especialidade: revisão de código, testes, segurança, documentação.

<img src="assets/hiring-specialists-analogy.png" alt="Analogia de contratar especialistas — assim como você chama profissionais especializados para reparos domésticos, agents de IA são especializados em tarefas específicas como revisão de código, testes, segurança e documentação" width="800" />

---

# Usando Agents

Comece agora com agents embutidos e personalizados.

---

## *Novo em Agents?* Comece aqui!

Nunca usou ou criou um agent? Aqui está tudo que você precisa saber para começar neste curso.

1. **Experimente um agent *embutido* agora:**
   ```bash
   copilot
   > /plan Add input validation for book year in the book app
   ```
   Isso invoca o agent Plan para criar um plano de implementação passo a passo.

2. **Veja um de nossos exemplos de agent personalizado:** É simples definir as instruções de um agent; consulte o arquivo fornecido [python-reviewer.agent.md](../.github/agents/python-reviewer.agent.md) para ver o padrão.

3. **Entenda o conceito central:** Agents são como consultar um especialista em vez de um generalista. Um "frontend agent" focará automaticamente em acessibilidade e padrões de componentes — você não precisa reexplicar porque isso já está especificado nas instruções do agent.


## Agents embutidos

**Você já usou alguns agents embutidos no fluxo de desenvolvimento do Capítulo 03!**
<br>`/plan` e `/review` são, na verdade, agents embutidos. Agora você sabe o que acontece nos bastidores. Aqui está a lista completa:

| Agent | Como invocar | O que faz |
|-------|---------------|--------------|
| **Plan** | `/plan` ou `Shift+Tab` (alternar modos) | Cria planos de implementação passo a passo antes de codar |
| **Code-review** | `/review` | Revisa mudanças staged/unstaged com feedback focado e acionável |
| **Init** | `/init` | Gera arquivos de configuração do projeto (instruções, agents) |
| **Explore** | *Automático* | Usado internamente quando você pede ao Copilot para explorar ou analisar a base de código |
| **Task** | *Automático* | Executa comandos como testes, builds, lints e instalação de dependências |

<br>

**Agents embutidos em ação** - Exemplos de invocação de Plan, Code-review, Explore e Task

```bash
copilot

# Invoke the Plan agent to create an implementation plan
> /plan Add input validation for book year in the book app

# Invoke the Code-review agent on your changes
> /review

# Explore and Task agents are invoked automatically when relevant:
> Run the test suite        # Uses Task agent

> Explore how book data is loaded    # Uses Explore agent
```

E o Agent Task? Ele atua nos bastidores para gerenciar e acompanhar atividades, retornando resultados de forma clara e concisa:

| Resultado | O que você vê |
|---------|--------------|
| ✅ **Sucesso** | Resumo breve (por exemplo, "All 247 tests passed", "Build succeeded") |
| ❌ **Falha** | Saída completa com stack traces, erros de compilador e logs detalhados |


> 📚 **Documentação oficial**: [Agents do GitHub Copilot CLI](https://docs.github.com/copilot/how-tos/use-copilot-agents/use-copilot-cli#use-custom-agents)

---

# Adicionando Agents ao Copilot CLI

Você pode simplesmente definir seus próprios agents para fazer parte do seu fluxo! Defina uma vez e depois direcione!

<img src="assets/using-agents.png" alt="Quatro robôs coloridos de IA juntos, cada um com ferramentas diferentes representando capacidades especializadas de agents" width="800"/>

<a id="-adicione-seus-agents"></a>
## 🗂️ Adicione seus agents

Arquivos de agent são arquivos Markdown com a extensão `.agent.md`. Eles têm duas partes: frontmatter YAML (metadados) e instruções em Markdown.

> 💡 **Novo em frontmatter YAML?** É um pequeno bloco de configurações no topo do arquivo, cercado por marcadores `---`. YAML é apenas pares `key: value`. O restante do arquivo é Markdown normal.

Aqui está um agent mínimo:

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

> 💡 **Obrigatório vs opcional**: O campo `description` é obrigatório. Outros campos como `name`, `tools` e `model` são opcionais.

## Onde colocar arquivos de agent

| Localização | Escopo | Melhor para |
|----------|-------|----------|
| `.github/agents/` | Específico do projeto | Agents compartilhados em equipe com convenções do projeto |
| `~/.copilot/agents/` | Global (todos os projetos) | Agents pessoais que você usa em qualquer lugar |

**Este projeto inclui arquivos de exemplo de agents na pasta [.github/agents/](../.github/agents/)**. Você pode escrever os seus ou personalizar os que já foram fornecidos.

<details>
<summary>📂 Veja os agents de exemplo neste curso</summary>

| Arquivo | Descrição |
|------|-------------|
| `hello-world.agent.md` | Exemplo mínimo — comece por aqui |
| `python-reviewer.agent.md` | Revisor de qualidade de código Python |
| `pytest-helper.agent.md` | Especialista em testes com Pytest |

```bash
# Or copy one to your personal agents folder (available in every project)
cp .github/agents/python-reviewer.agent.md ~/.copilot/agents/
```

Para mais agents da comunidade, veja [github/awesome-copilot](https://github.com/github/awesome-copilot)

</details>


## 🚀 Duas formas de usar agents personalizados

### Modo Interativo
Dentro do modo Interativo, liste agents usando `/agent` e selecione o agent com o qual quer trabalhar.
Selecione um agent para continuar sua conversa com ele.

```bash
copilot
> /agent
```

Para mudar para um agent diferente, ou voltar ao modo padrão, use novamente o comando `/agent`.

### Modo Programático

Inicie diretamente uma nova sessão com um agent.

```bash
copilot --agent python-reviewer
> Review @samples/book-app-project/books.py
```

> 💡 **Alternar agents**: você pode mudar para um agent diferente a qualquer momento usando `/agent` ou `--agent` novamente. Para voltar à experiência padrão do Copilot CLI, use `/agent` e selecione **nenhum agent**.

---

# Indo mais fundo com Agents

<img src="assets/creating-custom-agents.png" alt="Robô sendo montado em uma bancada cercado por componentes e ferramentas representando criação de agents personalizados" width="800"/>

> 💡 **Esta seção é opcional.** Os agents embutidos (`/plan`, `/review`) são poderosos o suficiente para a maioria dos fluxos. Crie agents personalizados quando precisar de expertise especializada aplicada de forma consistente ao seu trabalho.

Cada tópico abaixo é autocontido. **Escolha o que interessa — você não precisa ler todos de uma vez.**

| Quero... | Ir para |
|---|---|
| Ver por que agents superam prompts genéricos | [Especialista vs genérico](#specialist-vs-generic-see-the-difference) |
| Combinar agents em uma funcionalidade | [Trabalhando com múltiplos agents](#working-with-multiple-agents) |
| Organizar, nomear e compartilhar agents | [Organizando e compartilhando agents](#organizing--sharing-agents) |
| Configurar contexto sempre ativo do projeto | [Configurando seu projeto para o Copilot](#configuring-your-project-for-copilot) |
| Consultar propriedades YAML e ferramentas | [Referência de arquivo de agent](#agent-file-reference) |

Selecione um cenário abaixo para expandi-lo.

---

<a id="specialist-vs-generic-see-the-difference"></a>
<details>
<summary><strong>Especialista vs genérico: veja a diferença</strong> - Por que agents produzem saída melhor do que prompts genéricos</summary>

## Especialista vs genérico: veja a diferença

É aqui que os agents provam seu valor. Observe a diferença:

### Sem um agent (Copilot genérico)

```bash
copilot

> Add a function to search books by year range in the book app
```

**Saída genérica**:
```python
def search_by_year_range(books, start_year, end_year):
    results = []
    for book in books:
        if book['year'] >= start_year and book['year'] <= end_year:
            results.append(book)
    return results
```

Básico. Funciona. Mas falta muita coisa.

---

### Com o agent Python Reviewer

```bash
copilot

> /agent
# Select "python-reviewer"

> Add a function to search books by year range in the book app
```

**Saída especializada**:
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

**O que o agent python-reviewer inclui automaticamente**:
- ✅ Type hints em todos os parâmetros e valores de retorno
- ✅ Docstring abrangente com Args/Returns/Raises
- ✅ Validação de entrada com tratamento de erros adequado
- ✅ List comprehension para melhor desempenho
- ✅ Tratamento de casos de borda (valores de ano ausentes/inválidos)
- ✅ Formatação compatível com PEP 8
- ✅ Práticas de programação defensiva

**A diferença**: mesmo prompt, saída dramaticamente melhor. O agent traz expertise que você poderia esquecer de pedir.

</details>

---

<a id="working-with-multiple-agents"></a>
<details>
<summary><strong>Trabalhando com múltiplos agents</strong> - Combine especialistas, troque no meio da sessão e use agents como ferramentas</summary>

## Trabalhando com múltiplos agents

O verdadeiro poder surge quando especialistas trabalham juntos em uma funcionalidade.

### Exemplo: construindo uma funcionalidade simples

```bash
copilot

> I want to add a "search by year range" feature to the book app

# Use python-reviewer for design
> /agent
# Select "python-reviewer"

> @samples/book-app-project/books.py Design a find_by_year_range method. What's the best approach?

# Switch to pytest-helper for test design
> /agent
# Select "pytest-helper"

> @samples/book-app-project/tests/test_books.py Design test cases for a find_by_year_range method.
> What edge cases should we cover?

# Synthesize both designs
> Create an implementation plan that includes the method implementation and comprehensive tests.
```

**O insight principal**: você é o arquiteto dirigindo especialistas. Eles lidam com os detalhes; você cuida da visão.

<details>
<summary>🎬 Veja em ação!</summary>

![Demo do Python Reviewer](assets/python-reviewer-demo.gif)

*A saída da demo varia — seu modelo, ferramentas e respostas podem diferir do que é mostrado aqui.*

</details>

### Agent como ferramentas

Quando os agents estão configurados, o Copilot também pode chamá-los como ferramentas durante tarefas complexas. Se você pedir uma funcionalidade full-stack, o Copilot pode delegar automaticamente partes ao especialista adequado.

</details>

---

<a id="organizing--sharing-agents"></a>
<details>
<summary><strong>Organizando e compartilhando agents</strong> - Nomes, localização de arquivos, arquivos de instruções e compartilhamento em equipe</summary>

## Organizando e compartilhando agents

### Nomeando seus agents

Quando você cria arquivos de agent, o nome importa. É o que você digitará depois de `/agent` ou `--agent`, e o que seus colegas verão na lista de agents.

| ✅ Bons nomes | ❌ Evite |
|--------------|----------|
| `frontend` | `my-agent` |
| `backend-api` | `agent1` |
| `security-reviewer` | `helper` |
| `react-specialist` | `code` |
| `python-backend` | `assistant` |

**Convenções de nomes:**
- Use letras minúsculas com hífens: `my-agent-name.agent.md`
- Inclua o domínio: `frontend`, `backend`, `devops`, `security`
- Seja específico quando necessário: `react-typescript` em vez de apenas `frontend`

---

### Compartilhando com sua equipe

Coloque arquivos de agent em `.github/agents/` e eles serão versionados. Faça push para seu repositório e todos os membros da equipe os recebem automaticamente. Mas agents são apenas um tipo de arquivo que o Copilot lê do seu projeto. Ele também oferece suporte a **arquivos de instruções** que se aplicam automaticamente a cada sessão, sem que ninguém precise executar `/agent`.

Pense assim: agents são especialistas que você chama, e arquivos de instruções são regras da equipe que estão sempre ativas.

### Onde colocar seus arquivos

Você já conhece as duas localizações principais (veja [Onde colocar arquivos de agent](#onde-colocar-arquivos-de-agent) acima). Use esta árvore de decisão para escolher:

<img src="assets/agent-file-placement-decision-tree.png" alt="Árvore de decisão para onde colocar arquivos de agent: experimentando → pasta atual, uso em equipe → .github/agents/, em todos os lugares → ~/.copilot/agents/" width="800"/>

**Comece simples:** crie um único arquivo `*.agent.md` na pasta do projeto. Mova-o para uma localização permanente quando estiver satisfeito.

Além de arquivos de agent, o Copilot também lê **arquivos de instruções em nível de projeto** automaticamente, sem `/agent`. Veja [Configurando seu projeto para o Copilot](#configurando-seu-projeto-para-o-copilot) abaixo para `AGENTS.md`, `.instructions.md` e `/init`.

</details>

---

<a id="configuring-your-project-for-copilot"></a>
<details>
<summary><strong>Configurando seu projeto para o Copilot</strong> - AGENTS.md, arquivos de instruções e configuração com /init</summary>

## Configurando seu projeto para o Copilot

Agents são especialistas que você invoca sob demanda. **Arquivos de configuração do projeto** são diferentes: o Copilot os lê automaticamente em cada sessão para entender as convenções, stack tecnológico e regras do seu projeto. Ninguém precisa executar `/agent`; o contexto está sempre ativo para todos que trabalham no repositório.

### Configuração rápida com /init

A forma mais rápida de começar é deixar o Copilot gerar arquivos de configuração para você:

```bash
copilot
> /init
```

O Copilot examinará seu projeto e criará arquivos de instrução sob medida. Você pode editá-los depois.

### Formatos de arquivo de instrução

| Arquivo | Escopo | Notas |
|------|-------|-------|
| `AGENTS.md` | Raiz do projeto ou aninhada | **Padrão cross-platform** - funciona com Copilot e outros assistentes de IA |
| `.github/copilot-instructions.md` | Projeto | Específico do GitHub Copilot |
| `.github/instructions/*.instructions.md` | Projeto | Instruções granulares e específicas por tópico |
| `~/.copilot/instructions/**/*.instructions.md` | Usuário (todos os projetos) | Instruções pessoais que se aplicam em todos os seus repositórios |
| `CLAUDE.md`, `GEMINI.md` | Raiz do projeto | Suportados para compatibilidade |

> 🎯 **Está começando agora?** Use `AGENTS.md` para instruções do projeto. Você pode explorar os outros formatos depois, conforme necessário.

### AGENTS.md

`AGENTS.md` é o formato recomendado. É um [padrão aberto](https://agents.md/) que funciona com Copilot e outras ferramentas de codificação com IA. Coloque-o na raiz do repositório e o Copilot o lê automaticamente. O [AGENTS.md](../AGENTS.md) deste próprio projeto é um exemplo funcional.

Um `AGENTS.md` típico descreve o contexto do projeto, estilo de código, requisitos de segurança e padrões de teste. Escreva o seu seguindo o padrão do nosso arquivo de exemplo.

### Arquivos de instruções customizadas (.instructions.md)

Para equipes que querem controle mais granular, divida instruções em arquivos específicos por tópico. Cada arquivo cobre uma preocupação e se aplica automaticamente:

```
.github/
└── instructions/
    ├── python-standards.instructions.md
    ├── security-checklist.instructions.md
    └── api-design.instructions.md
```

> 💡 **Observação**: arquivos de instrução funcionam com qualquer linguagem. Este exemplo usa Python para combinar com o projeto do curso, mas você pode criar arquivos semelhantes para TypeScript, Go, Rust ou qualquer tecnologia que sua equipe use.

#### Escopando instruções com `applyTo`

Por padrão, um arquivo de instrução se aplica a toda conversa. Para limitá-lo a tipos de arquivo específicos, adicione um campo `applyTo` no frontmatter YAML (o bloco entre marcadores `---` no topo do arquivo):

```markdown
---
applyTo: "**/*.py"
---
# Python Standards
Always follow PEP 8 style conventions.
Use type hints in all function signatures.
```

Com `applyTo: "**/*.py"`, o Copilot só carrega esse arquivo de instrução quando você está trabalhando com arquivos Python. Instruções de estilo Python nunca poluem uma conversa sobre, digamos, um Dockerfile ou uma consulta SQL.

Aqui estão alguns padrões comuns:

| Valor de `applyTo` | Quando se aplica |
|---|---|
| `"**/*.py"` | Qualquer arquivo Python |
| `"**/*.{ts,tsx}"` | Arquivos TypeScript e TSX |
| `"tests/**"` | Qualquer arquivo dentro de uma pasta `tests/` |
| (sem frontmatter) | Toda conversa — o padrão |

> 💡 **Dica**: coloque o padrão glob entre aspas (por exemplo, `"**/*.py"`) para garantir que ele seja interpretado corretamente em todos os sistemas operacionais e shells.

**Encontrando arquivos de instrução da comunidade**: navegue por [github/awesome-copilot](https://github.com/github/awesome-copilot) para encontrar arquivos de instrução prontos cobrindo .NET, Angular, Azure, Python, Docker e muitas outras tecnologias.

### Desativar instruções customizadas

Se você precisar que o Copilot ignore todas as configurações específicas do projeto (útil para depuração ou comparação de comportamento):

```bash
copilot --no-custom-instructions
```

</details>

---

<a id="agent-file-reference"></a>
<details>
<summary><strong>Referência de arquivo de agent</strong> - Propriedades YAML, aliases de ferramentas e exemplos completos</summary>

## Referências de arquivo de agent

### Um exemplo mais completo

Você viu o [formato mínimo de agent](#-adicione-seus-agents) acima. Aqui está um agent mais completo que usa a propriedade `tools`. Crie `~/.copilot/agents/python-reviewer.agent.md`:

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

### Propriedades YAML

| Propriedade | Obrigatória | Descrição |
|----------|----------|-------------|
| `name` | Não | Nome exibido (padrão: nome do arquivo) |
| `description` | **Sim** | O que o agent faz — ajuda o Copilot a entender quando sugeri-lo |
| `tools` | Não | Lista de ferramentas permitidas (omitir = todas as ferramentas disponíveis). Veja os aliases de ferramentas abaixo. |
| `target` | Não | Limitar a `vscode` ou `github-copilot` apenas |

### Aliases de ferramentas

Use estes nomes na lista `tools`:
- `read` - Ler conteúdos de arquivos
- `edit` - Editar arquivos
- `search` - Pesquisar arquivos (grep/glob)
- `execute` - Executar comandos de shell (também: `shell`, `Bash`)
- `agent` - Invocar outros agents personalizados

> 📖 **Documentação oficial**: [Configuração de agents personalizados](https://docs.github.com/copilot/reference/custom-agents-configuration)
>
> ⚠️ **Somente VS Code**: a propriedade `model` (para selecionar modelos de IA) funciona no VS Code, mas não é suportada no GitHub Copilot CLI. Você pode incluí-la com segurança em arquivos de agent cross-platform. O GitHub Copilot CLI a ignorará.

### Mais modelos de agents

> 💡 **Observação para iniciantes**: os exemplos abaixo são templates. **Substitua as tecnologias específicas pelas que seu projeto usa.** O importante é a *estrutura* do agent, não as tecnologias específicas mencionadas.

Este projeto inclui exemplos funcionais na pasta [.github/agents/](../.github/agents/):
- [hello-world.agent.md](../.github/agents/hello-world.agent.md) - Exemplo mínimo, comece por aqui
- [python-reviewer.agent.md](../.github/agents/python-reviewer.agent.md) - Revisor de qualidade de código Python
- [pytest-helper.agent.md](../.github/agents/pytest-helper.agent.md) - Especialista em testes Pytest

Para agents da comunidade, veja [github/awesome-copilot](https://github.com/github/awesome-copilot).

</details>

---

# Prática

<img src="../assets/practice.png" alt="Ambiente de mesa aconchegante com monitor mostrando código, luminária, xícara de café e fones de ouvido prontos para prática" width="800"/>

Crie seus próprios agents e veja-os em ação.

---

## ▶️ Experimente você mesmo

```bash

# Create the agents directory (if it doesn't exist)
mkdir -p .github/agents

# Create a code reviewer agent
cat > .github/agents/reviewer.agent.md << 'EOF'
---
name: reviewer
description: Senior code reviewer focused on security and best practices
---

# Code Reviewer Agent

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

# Create a documentation agent
cat > .github/agents/documentor.agent.md << 'EOF'
---
name: documentor
description: Technical writer for clear and complete documentation
---

# Documentation Agent

Você é um redator técnico que cria documentação clara.

**Padrões de documentação:**
- Comece com um resumo de uma frase
- Inclua exemplos de uso
- Documente parâmetros e valores de retorno
- Observe armadilhas ou limitações
EOF

# Now use them
copilot --agent reviewer
> Review @samples/book-app-project/books.py

# Or switch agents
copilot
> /agent
# Select "documentor"
> Document @samples/book-app-project/books.py
```

---

## 📝 Tarefa

### Desafio principal: Construir uma equipe de agents especializada

O exemplo prático criou os agents `reviewer` e `documentor`. Agora pratique criando e usando agents para uma tarefa diferente — melhorar a validação de dados no app de livros:

1. Crie 3 arquivos de agent (`.agent.md`) adaptados ao app de livros, um por agent, colocados em `.github/agents/`
2. Seus agents:
   - **data-validator**: verifica `data.json` procurando dados ausentes ou malformados (autores vazios, year=0, campos ausentes)
   - **error-handler**: revisa código Python em busca de tratamento de erros inconsistente e sugere uma abordagem unificada
   - **doc-writer**: gera ou atualiza docstrings e conteúdo de README
3. Use cada agent no app de livros:
   - `data-validator` → audite `@samples/book-app-project/data.json`
   - `error-handler` → revise `@samples/book-app-project/books.py` e `@samples/book-app-project/utils.py`
   - `doc-writer` → adicione docstrings a `@samples/book-app-project/books.py`
4. Colabore: use `error-handler` para identificar lacunas de tratamento de erros e depois `doc-writer` para documentar a abordagem melhorada

**Critérios de sucesso**: você tem 3 agents funcionando que produzem saída consistente e de alta qualidade, e consegue alternar entre eles com `/agent`.

<details>
<summary>💡 Dicas (clique para expandir)</summary>

**Templates iniciais**: crie um arquivo por agent em `.github/agents/`:

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

Você é um redator técnico que cria documentação clara em Python.

**Padrões:**
- Docstrings no estilo Google
- Incluir tipos de parâmetros e valores de retorno
- Adicionar exemplos de uso para métodos públicos
- Anotar quaisquer exceções levantadas
```

**Testando seus agents:**

> 💡 **Observação:** você já deve ter `samples/book-app-project/data.json` na sua cópia local deste repositório. Se estiver ausente, baixe a versão original do repositório de origem:
> [data.json](https://github.com/github/copilot-cli-for-beginners/blob/main/samples/book-app-project/data.json)

```bash
copilot
> /agent
# Select "data-validator" from the list
> @samples/book-app-project/data.json Check for books with empty author fields or invalid years
```

**Dica:** o campo `description` no frontmatter YAML é obrigatório para que os agents funcionem.

</details>

### Desafio bônus: Biblioteca de instruções

Você criou agents que invoca sob demanda. Agora experimente o outro lado: **arquivos de instruções** que o Copilot lê automaticamente em cada sessão, sem `/agent`.

Crie uma pasta `.github/instructions/` com pelo menos 3 arquivos de instrução:
- `python-style.instructions.md` para impor convenções PEP 8 e type hints
- `test-standards.instructions.md` para impor convenções pytest em arquivos de teste
- `data-quality.instructions.md` para validar entradas de dados JSON

Teste cada arquivo de instrução no código do app de livros.

---

<details>
<summary>🔧 <strong>Erros comuns e solução de problemas</strong> (clique para expandir)</summary>

### Erros comuns

| Erro | O que acontece | Correção |
|---------|--------------|-----|
| `description` ausente no frontmatter do agent | O agent não carrega ou não é descoberto | Sempre inclua `description:` no frontmatter YAML |
| Localização errada para agents | O agent não é encontrado quando você tenta usá-lo | Coloque em `~/.copilot/agents/` (pessoal) ou `.github/agents/` (projeto) |
| Usar `.md` em vez de `.agent.md` | O arquivo pode não ser reconhecido como agent | Nomeie arquivos como `python-reviewer.agent.md` |
| Prompts de agent longos demais | Podem atingir o limite de 30.000 caracteres | Mantenha definições de agent focadas; use skills para instruções detalhadas |

### Solução de problemas

**Agent não encontrado** - Verifique se o arquivo de agent existe em uma destas localizações:
- `~/.copilot/agents/`
- `.github/agents/`

Liste os agents disponíveis:

```bash
copilot
> /agent
# Shows all available agents
```

**Agent não está seguindo instruções** - Seja explícito nos prompts e adicione mais detalhes às definições do agent:
- Frameworks/bibliotecas específicos com versões
- Convenções da equipe
- Exemplos de padrões de código

**Instruções customizadas não estão carregando** - Execute `/init` no seu projeto para configurar instruções específicas do projeto:

```bash
copilot
> /init
```

Ou verifique se elas estão desativadas:
```bash
# Don't use --no-custom-instructions if you want them loaded
copilot  # This loads custom instructions by default
```

</details>

---

# Resumo

## 🔑 Principais aprendizados

1. **Agents embutidos**: `/plan` e `/review` são invocados diretamente; Explore e Task funcionam automaticamente
2. **Agents personalizados** são especialistas definidos em arquivos `.agent.md`
3. **Bons agents** têm expertise, padrões e formatos de saída claros
4. **Colaboração multi-agent** resolve problemas complexos combinando expertise
5. **Arquivos de instruções** (`.instructions.md`) codificam padrões da equipe para aplicação automática
6. **Saída consistente** vem de instruções de agent bem definidas

> 📋 **Referência rápida**: Veja a [referência de comandos do GitHub Copilot CLI](https://docs.github.com/en/copilot/reference/cli-command-reference) para uma lista completa de comandos e atalhos.

---

## ➡️ O que vem a seguir

Agents mudam *como o Copilot aborda e executa ações direcionadas* no seu código. Em seguida, você aprenderá sobre **skills** — que mudam *quais etapas* ele segue. Quer saber como agents e skills diferem? O Capítulo 05 cobre isso diretamente.

Em **[Capítulo 05: Sistema de Skills](../05-skills/README.md)**, você aprenderá:

- Como skills são acionadas automaticamente por seus prompts (sem comando com barra necessário)
- Instalar skills da comunidade
- Criar skills personalizadas com arquivos SKILL.md
- A diferença entre agents, skills e MCP
- Quando usar cada um

---

**[← Voltar ao Capítulo 03](../03-development-workflows/README.md)** | **[Continue para o Capítulo 05 →](../05-skills/README.md)**
