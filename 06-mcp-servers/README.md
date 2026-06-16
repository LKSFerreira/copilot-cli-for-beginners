<!--
---
id: CopilotCLI-06
title: !translate Conectar ao GitHub, Bancos de Dados e APIs
description: !translate Configure servidores MCP para que o GitHub Copilot CLI possa se conectar ao GitHub, arquivos locais, documentação, bancos de dados e outras fontes de dados ao vivo.
audience: Desenvolvedores / Estudantes / Usuários de terminal
slug: connect-to-github-databases-and-apis
weight: 7
---
-->

![Capítulo 06: Servidores MCP](assets/chapter-header.png)

> **E se o Copilot pudesse ler suas issues do GitHub, checar seu banco de dados e criar PRs... tudo a partir do terminal?**

Até agora, o Copilot só consegue trabalhar com o que você fornece diretamente: arquivos referenciados com `@`, histórico de conversas e seus próprios dados de treinamento. Mas e se ele pudesse consultar por conta própria o seu repositório no GitHub, navegar pelos arquivos do projeto ou buscar a documentação mais recente de uma biblioteca?

É isso que o MCP (Model Context Protocol) faz. Ele conecta o Copilot a serviços externos, dando acesso a dados ao vivo e do mundo real. Cada serviço conectado ao Copilot é chamado de "servidor MCP". Neste capítulo, você irá configurar alguns desses servidores e verá como tornam o Copilot muito mais útil.

> 💡 **Já conhece MCP?** [Vá para o início rápido](#-use-the-built-in-github-mcp) para confirmar que está funcionando e começar a configurar servidores.

## 🎯 Objetivos de Aprendizagem

Ao final deste capítulo, você será capaz de:

- Entender o que é MCP e por que importa
- Gerenciar servidores MCP usando os comandos `/mcp`
- Configurar servidores MCP para GitHub, sistema de arquivos e documentação
- Usar fluxos de trabalho com MCP no projeto do book app
- Saber quando e como construir um servidor MCP customizado (opcional)

> ⏱️ **Tempo estimado**: ~50 minutos (15 min leitura + 35 min prático)

---

## 🧩 Analogia do mundo real: Extensões de navegador

<img src="assets/browser-extensions-analogy.png" alt="Servidores MCP são como extensões de navegador" width="800"/>

Pense em servidores MCP como extensões de navegador. Seu navegador consegue exibir páginas por si só, mas extensões conectam-no a serviços extras:

| Extensão de navegador | A que se conecta | Equivalente MCP |
|-------------------|---------------------|----------------|
| Gerenciador de senhas | Seu cofre de senhas | **GitHub MCP** → seus repositórios, issues, PRs |
| Grammarly | Serviço de análise de escrita | **Context7 MCP** → documentação de bibliotecas |
| Gerenciador de arquivos | Armazenamento em nuvem | **Filesystem MCP** → arquivos locais do projeto |

Sem extensões, seu navegador ainda é útil, mas com elas se torna uma ferramenta poderosa. Servidores MCP fazem o mesmo pelo Copilot. Eles o conectam a fontes de dados reais e ao vivo para que ele possa ler suas issues do GitHub, explorar seu sistema de arquivos, buscar documentação atualizada e muito mais.

***Servidores MCP conectam o Copilot ao mundo externo: GitHub, repositórios, documentação e mais***

> 💡 **Insight principal**: sem MCP, o Copilot só enxerga arquivos que você compartilha explicitamente com `@`. Com MCP, ele pode explorar proativamente seu projeto, checar seu repositório no GitHub e buscar documentação automaticamente.

---

<img src="assets/quick-start-mcp.png" alt="Cabo de energia se conectando com uma faísca elétrica brilhante cercado por ícones tecnológicos flutuantes representando conexões de servidores MCP" width="800"/>

<a id="-use-the-built-in-github-mcp"></a>
# Início rápido: MCP em 30 segundos

<a id="github-server-built-in"></a>
## Comece com o GitHub MCP embutido
Vamos ver o MCP em ação agora, antes de configurar nada.
O servidor MCP do GitHub está incluído por padrão. Experimente:

```bash
copilot
> Liste os commits recentes neste repositório
```

Se o Copilot retornar dados reais de commits, você acabou de ver o MCP em ação. Esse é o servidor GitHub MCP consultando o GitHub em seu nome. Mas o GitHub é apenas *um* servidor. Este capítulo mostra como adicionar mais (acesso ao sistema de arquivos, documentação atualizada e outros) para que o Copilot possa fazer ainda mais.

---

## O comando `/mcp show`

Use `/mcp show` para ver quais servidores MCP estão configurados e se estão habilitados:

```bash
copilot

> /mcp show

Servidores MCP:
✓ github (habilitado) - Integração com o GitHub
✓ filesystem (habilitado) - Acesso ao sistema de arquivos
```

> 💡 **Vendo apenas o servidor GitHub?** Isso é esperado! Se você não adicionou outros servidores MCP ainda, o GitHub será o único listado. Você adicionará mais na próxima seção.

> 📚 **Quer ver todos os comandos de gerenciamento de MCP?** Você pode gerenciar servidores com comandos `/mcp` dentro do chat, ou com `copilot mcp` diretamente no terminal. Veja a [referência completa de comandos](#-additional-mcp-commands) no final deste capítulo.

<details>
<summary>🎬 Veja em ação!</summary>

![Demo de status MCP](assets/mcp-status-demo.gif)

*A saída da demo varia. Seu modelo, ferramentas e respostas podem diferir do que é mostrado aqui.*

</details>

---

## O que muda com o MCP?

Veja a diferença que o MCP faz na prática:

**Sem MCP:**
```bash
> O que há na issue #42 do GitHub?

"Não tenho acesso ao GitHub. Você precisará copiar e colar o conteúdo da issue."
```

**Com MCP:**
```bash
> O que há na issue #42 deste repositório?

Issue #42: Falha de login com caracteres especiais
Status: Open
Labels: bug, priority-high
Descrição: Usuários relatam que senhas contendo...
```

O MCP torna o Copilot ciente do seu ambiente de desenvolvimento.

> 📚 **Documentação oficial**: [About MCP](https://docs.github.com/copilot/concepts/context/mcp) para um olhar mais profundo sobre como o MCP funciona com o GitHub Copilot.

---

# Configurando servidores MCP

<img src="assets/configuring-mcp-servers.png" alt="Mãos ajustando botões e sliders em uma mesa de mixagem profissional representando configuração de servidores MCP" width="800"/>

Agora que você viu o MCP em ação, vamos configurar servidores adicionais. Você pode adicionar servidores de duas maneiras: **pelo registro embutido** (mais fácil — configuração guiada diretamente na CLI) ou **editando o arquivo de configuração** manualmente (mais flexível). Comece pelo registro se não souber qual escolher.

---

## Instalando servidores MCP a partir do registro

A CLI possui um registro embutido de servidores MCP que permite descobrir e instalar servidores populares com configuração guiada — não é necessário editar JSON.

```bash
copilot

> /mcp search
```

O Copilot abre um seletor interativo mostrando servidores disponíveis. Selecione um, e a CLI orienta você por qualquer configuração necessária (chaves de API, caminhos etc.) e o adiciona automaticamente à sua configuração.

> 💡 **Por que usar o registro?** É a forma mais fácil de começar — você não precisa saber o nome do pacote npm, os argumentos de comando ou a estrutura JSON. A CLI cuida de tudo isso para você.

---

## Arquivo de configuração do MCP

Servidores MCP podem ser configurados no nível do usuário em `~/.copilot/mcp-config.json` (aplica-se a todos os projetos), no nível do projeto em `.mcp.json` ou no arquivo de configuração de workspace `.github/mcp.json`. O `.github/mcp.json` é carregado automaticamente junto com `.mcp.json`. Se você usou `/mcp search`, a CLI já criou ou atualizou seu `~/.copilot/mcp-config.json` no nível do usuário, mas entender o formato JSON é útil para personalizar ou compartilhar configurações de MCP no nível do projeto.

> ⚠️ **Observação**: `.vscode/mcp.json` não é mais suportado como fonte de configuração MCP. Se você tiver um `.vscode/mcp.json` existente, migre-o para `.mcp.json` na raiz do projeto. A CLI mostrará uma dica de migração se detectar um arquivo de configuração antigo.

```json
{
  "mcpServers": {
    "server-name": {
      "type": "local",
      "command": "npx",
      "args": ["@package/server-name"],
      "tools": ["*"]
    }
  }
}
```

*A maioria dos servidores MCP é distribuída como pacotes npm e executada via o comando `npx`.*

<details>
<summary>💡 <strong>Novo em JSON?</strong> Clique aqui para aprender o que cada campo significa</summary>

| Campo | O que significa |
|-------|---------------|
| `"mcpServers"` | Container para todas as configurações dos seus servidores MCP |
| `"server-name"` | Um nome que você escolhe (por exemplo, "github", "filesystem") |
| `"type": "local"` | O servidor roda na sua máquina |
| `"command": "npx"` | O programa a executar (npx executa pacotes npm) |
| `"args": [...]` | Argumentos passados ao comando |
| `"tools": ["*"]` | Permitir todas as ferramentas deste servidor |

**Regras importantes de JSON:**
- Use aspas duplas `"` para strings (não aspas simples)
- Sem vírgulas finais após o último item
- O arquivo deve ser JSON válido (use um [validador JSON](https://jsonlint.com/) se tiver dúvidas)

</details>

---

## Adicionando servidores MCP

O servidor GitHub MCP é embutido e não requer configuração. Abaixo estão servidores adicionais que você pode adicionar. **Escolha o que mais lhe interessar ou percorra-os na ordem sugerida.**

| Quero... | Ir para |
|---|---|
| Permitir que o Copilot navegue pelos arquivos do projeto | [Servidor Filesystem](#filesystem-server) |
| Obter documentação atualizada de bibliotecas | [Servidor Context7](#context7-server-documentation) |
| Explorar extras opcionais (servidores personalizados, web_fetch) | [Além do básico](#beyond-the-basics) |

<details>
<summary><strong>Servidor Filesystem</strong> - Permita que o Copilot explore os arquivos do seu projeto</summary>
<a id="filesystem-server"></a>

### Servidor Filesystem

```json
{
  "mcpServers": {
    "filesystem": {
      "type": "local",
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-filesystem", "."],
      "tools": ["*"]
    }
  }
}
```

> 💡 **O caminho `.`**: o `.` significa "diretório atual". O Copilot pode acessar arquivos relativos ao local onde foi iniciado. Em um Codespace, este é o diretório raiz do workspace. Você também pode usar um caminho absoluto como `/workspaces/copilot-cli-for-beginners` se preferir.

Adicione isto ao seu `~/.copilot/mcp-config.json` e reinicie o Copilot.

</details>

<details>
<summary><strong>Servidor Context7</strong> - Obtenha documentação atualizada de bibliotecas</summary>
<a id="context7-server-documentation"></a>

### Servidor Context7 (documentação)

O Context7 dá ao Copilot acesso a documentação atualizada de frameworks e bibliotecas populares. Em vez de depender de dados de treinamento que podem estar desatualizados, o Copilot busca a documentação atual real.

```json
{
  "mcpServers": {
    "context7": {
      "type": "local",
      "command": "npx",
      "args": ["-y", "@upstash/context7-mcp"],
      "tools": ["*"]
    }
  }
}
```

- ✅ **Nenhuma chave de API necessária**
- ✅ **Nenhuma conta necessária**
- ✅ **Seu código permanece local**

Adicione isto ao seu `~/.copilot/mcp-config.json` e reinicie o Copilot.

</details>

<details>
<summary><strong>Além do básico</strong> - Servidores personalizados e acesso web (opcional)</summary>
<a id="beyond-the-basics"></a>

Estes são extras opcionais para quando você estiver confortável com os servidores principais acima.

<a id="microsoft-learn-mcp-server"></a>
### Servidor Microsoft Learn MCP

Todo servidor MCP que você viu até agora (filesystem, Context7) roda localmente na sua máquina. Mas servidores MCP também podem rodar remotamente, ou seja, você apenas aponta o Copilot CLI para uma URL e ele cuida do restante. Sem `npx` ou `python`, sem processo local, sem dependências para instalar.

O [Microsoft Learn MCP Server](https://github.com/microsoftdocs/mcp) é um bom exemplo. Ele dá ao Copilot CLI acesso direto à documentação oficial da Microsoft (Azure, Microsoft Foundry e outros tópicos de IA, .NET, Microsoft 365 e muito mais) para que ele possa pesquisar docs, buscar páginas completas e encontrar exemplos oficiais de código em vez de depender dos dados de treinamento de um modelo.

- ✅ **Nenhuma chave de API necessária**
- ✅ **Nenhuma conta necessária**
- ✅ **Nenhuma instalação local necessária**

**Instalação rápida com `/plugin install`:**

Em vez de editar manualmente seu arquivo JSON de configuração, você pode instalá-lo em um comando:

```bash
copilot

> /plugin install microsoftdocs/mcp
```

Isso adiciona o servidor e suas Agent Skills associadas automaticamente. As skills instaladas incluem:

- **microsoft-docs**: conceitos, tutoriais e consultas factuais
- **microsoft-code-reference**: consultas de API, exemplos de código e solução de problemas
- **microsoft-skill-creator**: uma meta-skill para gerar skills personalizadas sobre tecnologias Microsoft

**Uso:**
```bash
copilot

> Qual é a maneira recomendada para implantar um app Python no Azure App Service? Procure no Microsoft Learn.
```

📚 Saiba mais: [Visão geral do Microsoft Learn MCP Server](https://learn.microsoft.com/training/support/mcp-get-started)

### Acesso web com `web_fetch`

O Copilot CLI inclui a ferramenta `web_fetch` embutida, que pode buscar conteúdo de qualquer URL. Isso é útil para recuperar READMEs, documentação de API ou notas de release sem sair do terminal. Nenhum servidor MCP adicional é necessário.

Você pode controlar quais URLs são acessíveis via `~/.copilot/config.json` (configurações gerais do Copilot), que é separado de `~/.copilot/mcp-config.json` (definições de servidores MCP).

```json
{
  "permissions": {
    "allowedUrls": [
      "https://api.github.com/**",
      "https://docs.github.com/**",
      "https://*.npmjs.org/**"
    ],
    "blockedUrls": [
      "http://**"
    ]
  }
}
```

**Uso:**
```bash
copilot

> Buscar e resumir o README em https://github.com/facebook/react
```

### Criando um servidor MCP personalizado

Quer conectar o Copilot às suas próprias APIs, bancos de dados ou ferramentas internas? Você pode construir um servidor MCP personalizado em Python. Isso é completamente opcional, pois os servidores pré-criados (GitHub, filesystem, Context7) cobrem a maioria dos casos de uso.

📖 Veja o [Guia de servidor MCP personalizado](mcp-custom-server.md) para um passo a passo completo usando o app de livros como exemplo.

📚 Para mais contexto, veja o curso [MCP for Beginners](https://github.com/microsoft/mcp-for-beginners).

</details>

<a id="complete-configuration-file"></a>

### Arquivo de configuração completo

Aqui está um `mcp-config.json` completo com servidores filesystem e Context7:

> 💡 **Observação:** o GitHub MCP é embutido. Você não precisa adicioná-lo ao arquivo de configuração.

```json
{
  "mcpServers": {
    "filesystem": {
      "type": "local",
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-filesystem", "."],
      "tools": ["*"]
    },
    "context7": {
      "type": "local",
      "command": "npx",
      "args": ["-y", "@upstash/context7-mcp"],
      "tools": ["*"]
    }
  }
}
```

Salve isto como `~/.copilot/mcp-config.json` para acesso global ou `.mcp.json` na raiz do projeto para configuração específica do projeto.

---

# Usando servidores MCP

Agora que você tem servidores MCP configurados, vamos ver o que eles podem fazer.

<img src="assets/using-mcp-servers.png" alt="Usando servidores MCP — diagrama hub-and-spoke mostrando um CLI de desenvolvedor conectado a servidores GitHub, Filesystem, Context7 e Custom/Web Fetch" width="800" />

---

## Exemplos de uso do servidor

**Escolha um servidor para explorar ou percorra-os em ordem.**

| Quero tentar... | Ir para |
|---|---|
| Repositórios, issues e PRs do GitHub | [Servidor GitHub](#github-server-built-in) |
| Navegando por arquivos do projeto | [Uso do servidor de sistema de arquivos](#filesystem-server-usage) |
| Busca de documentação da biblioteca | [Uso do servidor Context7](#context7-server-usage) |
| Servidor customizado, Microsoft Learn MCP e uso do web_fetch | [Além do básico: uso](#beyond-the-basics-usage) |

<details>
<summary><strong>Servidor GitHub (embutido)</strong> - Acesse repositórios, issues, PRs e mais</summary>
<a id="github-server-built-in"></a>

### Servidor GitHub (embutido)

O servidor GitHub MCP é **embutido**. Se você fez login no Copilot (o que fez durante a configuração inicial), ele já funciona. Nenhuma configuração necessária!

> 💡 **Não está funcionando?** Execute `/login` para reautenticar com o GitHub.

<details>
<summary><strong>Autenticação em dev containers</strong></summary>

- **GitHub Codespaces** (recomendado): a autenticação é automática. O CLI `gh` herda seu token do Codespace. Nenhuma ação necessária.
- **Dev container local (Docker)**: execute `gh auth login` depois que o container iniciar e reinicie o Copilot.

**Solução de problemas de autenticação:**
```bash
# Check if you're authenticated
gh auth status

# If not, log in
gh auth login

# Verify GitHub MCP is connected
copilot
> /mcp show
```

</details>

| Funcionalidade | Exemplo |
|---------|----------|
| **Informações do repositório** | Ver commits, branches e contribuidores |
| **Issues** | Listar, criar, pesquisar e comentar em issues |
| **Pull requests** | Ver PRs, diffs, criar PRs e verificar status |
| **Busca de código** | Pesquisar código em repositórios |
| **Actions** | Consultar execuções de workflow e status |

```bash
copilot

# See recent activity in this repo
> Liste os 5 últimos commits neste repositório

Recent commits:
1. abc1234 - Update chapter 05 skills examples (2 days ago)
2. def5678 - Add book app test fixtures (3 days ago)
3. ghi9012 - Fix typo in chapter 03 README (4 days ago)
...

# Explore the repo structure
> Quais branches existem neste repositório?

Branches:
- main (default)
- chapter6 (current)

# Search for code patterns across the repo
> Pesquise neste repositório por arquivos que importam pytest

Found 1 file:
- samples/book-app-project/tests/test_books.py
```

> 💡 **Trabalhando em seu próprio fork?** Se você fez fork deste repositório do curso, também pode tentar operações de escrita como criar issues e pull requests. Praticaremos isso nos exercícios abaixo.

> ⚠️ **Não vê resultados?** O GitHub MCP opera no remote do repositório (em github.com), não apenas em arquivos locais. Certifique-se de que seu repositório tenha um remote: execute `git remote -v` para verificar.

</details>

<details>
<summary><strong>Servidor Filesystem</strong> - Navegue e analise arquivos do projeto</summary>
<a id="filesystem-server-usage"></a>

### Servidor Filesystem

Depois de configurado, o filesystem MCP fornece ferramentas que o Copilot pode usar automaticamente:

```bash
copilot

> Quantos arquivos Python estão no diretório book-app-project?

Found 3 Python files in samples/book-app-project/:
- book_app.py
- books.py
- utils.py

> Qual é o tamanho total do arquivo data.json?

samples/book-app-project/data.json: 2.4 KB

> Encontre todas as funções que não têm type hints no app de livros

Found 2 functions without type hints:
- samples/book-app-project/utils.py:10 - get_user_choice()
- samples/book-app-project/utils.py:14 - get_book_details()
```

</details>

<details>
<summary><strong>Servidor Context7</strong> - Consulte documentação de bibliotecas</summary>
<a id="context7-server-usage"></a>

### Servidor Context7

```bash
copilot

> Quais são as melhores práticas para usar fixtures pytest?

From pytest Documentation:

Fixtures - Use fixtures to provide a fixed baseline for tests:

    import pytest

    @pytest.fixture
    def sample_books():
        return [
            {"title": "1984", "author": "George Orwell", "year": 1949},
            {"title": "Dune", "author": "Frank Herbert", "year": 1965},
        ]

    def test_find_by_author(sample_books):
        # fixture is automatically passed as argument
        results = [b for b in sample_books if "Orwell" in b["author"]]
        assert len(results) == 1

Best practices:
- Use fixtures instead of setup/teardown methods
- Use tmp_path fixture for temporary files
- Use monkeypatch for modifying environment
- Scope fixtures appropriately (function, class, module, session)

> Como posso aplicar isso ao arquivo de teste do app de livros?

# Copilot now knows the official pytest patterns
# and can apply them to samples/book-app-project/tests/test_books.py
```

</details>

<details>
<summary><strong>Além do básico</strong> — Servidor customizado e uso do web_fetch</summary>
<a id="beyond-the-basics-usage"></a>

### Além do básico

**Servidor MCP customizado**: se você construiu o servidor de busca de livros seguindo o [Guia de servidor MCP personalizado](mcp-custom-server.md), pode consultar sua coleção de livros diretamente:

```bash
copilot

> Procure informações sobre "1984" usando o servidor de lookup de livros. Pesquise por livros de George Orwell
```

**Microsoft Learn MCP**: se você instalou o [servidor Microsoft Learn MCP](#microsoft-learn-mcp-server), pode consultar a documentação oficial da Microsoft diretamente:

```bash
copilot

> Como faço para configurar identidade gerenciada para uma Azure Function? Pesquise no Microsoft Learn.
```

**Web Fetch**: use a ferramenta embutida `web_fetch` para trazer conteúdo de qualquer URL:

```bash
copilot

> Busque e resuma o README de https://github.com/facebook/react
```

</details>

---

## Fluxos de trabalho com vários servidores

Estes fluxos mostram por que desenvolvedores dizem "nunca mais quero trabalhar sem isso". Cada exemplo combina vários servidores MCP em uma única sessão.

<img src="assets/issue-to-pr-workflow.png" alt="Fluxo de issue para PR usando MCP — mostra o fluxo completo desde obter uma issue do GitHub até criar um pull request" width="800"/>

*Fluxo MCP completo: GitHub MCP recupera dados do repositório, Filesystem MCP encontra código, Context7 MCP fornece melhores práticas e o Copilot cuida da análise*

Cada exemplo abaixo é autocontido. **Escolha um que interesse ou leia todos.**

| Quero ver... | Ir para |
|---|---|
| Vários servidores trabalhando juntos | [Exploração com vários servidores](#multi-server-exploration) |
| Ir de issue a PR em uma sessão | [Fluxo issue para PR](#issue-to-pr-workflow) |
| Uma verificação rápida de saúde do projeto | [Painel de saúde](#health-dashboard) |

<details>
<summary><strong>Exploração com vários servidores</strong> - Combine filesystem, GitHub e Context7 em uma sessão</summary>
<a id="multi-server-exploration"></a>

#### Explorando o Book App com vários servidores MCP

```bash
copilot

# Step 1: Use filesystem MCP to explore the book app
> Liste todos os arquivos Python em samples/book-app-project/ e resuma
> o que cada arquivo faz

Found 3 Python files:
- book_app.py: CLI entry point with command routing (list, add, remove, find)
- books.py: BookCollection class with data persistence via JSON
- utils.py: Helper functions for user input and display

# Step 2: Use GitHub MCP to check recent changes
> Quais foram os 3 últimos commits que tocaram arquivos em samples/book-app-project/?

Recent commits affecting book app:
1. abc1234 - Add test fixtures for BookCollection (2 days ago)
2. def5678 - Add find_by_author method (5 days ago)
3. ghi9012 - Initial book app setup (1 week ago)

# Step 3: Use Context7 MCP for best practices
> Quais são as melhores práticas do Python para persistência de dados JSON?

From Python Documentation:
- Use context managers (with statements) for file I/O
- Handle JSONDecodeError for corrupted files
- Use dataclasses for structured data
- Consider atomic writes to prevent data corruption

# Step 4: Synthesize a recommendation
> Com base no código do app de livros e nessas melhores práticas,
> what improvements would you suggest?

Suggestions:
1. Add input validation in add_book() for empty strings and invalid years
2. Consider atomic writes in save_books() to prevent data corruption
3. Add type hints to utils.py functions (get_user_choice, get_book_details)
```

<details>
<summary>🎬 Veja o fluxo MCP em ação!</summary>

![Demo de fluxo MCP](assets/mcp-workflow-demo.gif)

*A saída da demo varia. Seu modelo, ferramentas e respostas podem diferir do que é mostrado aqui.*

</details>

**O resultado**: exploração de código → revisão de histórico → consulta de melhores práticas → plano de melhorias. **Tudo em uma sessão de terminal, usando três servidores MCP juntos.**

</details>

<details>
<summary><strong>Fluxo issue para PR</strong> - Vá de uma issue do GitHub a um pull request sem sair do terminal</summary>
<a id="issue-to-pr-workflow"></a>

#### O fluxo issue para PR (no seu próprio repositório)

Isso funciona melhor em seu próprio fork ou repositório em que você tem acesso de escrita:

> 💡 **Não se preocupe se não puder tentar agora.** Se você estiver em um clone somente leitura, praticará isso na tarefa. Por enquanto, apenas leia para entender o fluxo.

```bash
copilot

> Obtenha os detalhes da issue #1 do GitHub

Issue #1: Add input validation for book year
Status: Open
Description: The add_book function accepts any year value...

> @samples/book-app-project/books.py Fix the issue described in issue #1

[Copilot implements year validation in add_book()]

> Execute os testes para certificar-se de que a correção funciona

All 8 tests passed ✓

> Crie um pull request intitulado "Add year validation to book app"

✓ Created PR #2: Add year validation to book app
```

**Zero copiar e colar. Zero troca de contexto. Uma sessão de terminal.**

</details>

<details>
<summary><strong>Painel de saúde</strong> - Obtenha uma verificação rápida da saúde do projeto usando vários servidores</summary>
<a id="health-dashboard"></a>

#### Painel de saúde do Book App

```bash
copilot

> Dê-me um relatório de saúde do projeto de app de livros:
> 1. Liste todas as funções nos arquivos Python em samples/book-app-project/
> 2. Verifique quais funções têm type hints e quais não têm
> 3. Mostre quais testes existem em samples/book-app-project/tests/
> 4. Verifique o histórico de commits recentes para este diretório

Book App Health Report
======================

📊 Functions Found:
- books.py: 8 methods in BookCollection (all have type hints ✓)
- book_app.py: 6 functions (4 have type hints, 2 missing)
- utils.py: 3 functions (1 has type hints, 2 missing)

🧪 Test Coverage:
- test_books.py: 8 test functions covering BookCollection
- Missing: no tests for book_app.py CLI functions
- Missing: no tests for utils.py helper functions

📝 Recent Activity:
- 3 commits in the last week
- Most recent: added test fixtures

Recommendations:
- Add type hints to utils.py functions
- Add tests for book_app.py CLI handlers
- All files well-sized (<100 lines) - good structure!
```

**O resultado**: várias fontes de dados agregadas em segundos. Manualmente, isso significaria executar grep, contar linhas, verificar git log e navegar por arquivos de teste. Facilmente 15+ minutos de trabalho.

</details>

---

# Prática

<img src="../assets/practice.png" alt="Ambiente de mesa aconchegante com monitor mostrando código, luminária, xícara de café e fones de ouvido prontos para prática" width="800"/>

**🎉 Agora você conhece o essencial!** Você entende MCP, viu como configurar servidores e viu fluxos reais em ação. Agora é hora de tentar por conta própria.

---

## ▶️ Experimente você mesmo

Agora é sua vez! Complete estes exercícios para praticar o uso de servidores MCP com o projeto do app de livros.

### Exercício 1: Verifique o status do MCP

Comece vendo quais servidores MCP estão disponíveis:

```bash
copilot

> /mcp show
```

Você deve ver o servidor GitHub listado como habilitado. Caso contrário, execute `/login` para autenticar.

---

### Exercício 2: Explore o Book App com Filesystem MCP

Se você configurou o servidor filesystem, use-o para explorar o app de livros:

```bash
copilot

> Quantos arquivos Python estão em samples/book-app-project/?
> Quais funções são definidas em cada arquivo?
```

**Resultado esperado**: o Copilot lista `book_app.py`, `books.py` e `utils.py` com suas funções.

> 💡 **Ainda não configurou o filesystem MCP?** Crie o arquivo de configuração a partir da seção [Configuração completa](#complete-configuration-file) acima. Depois reinicie o Copilot.

---

### Exercício 3: Consulte o histórico do repositório com GitHub MCP

Use o GitHub MCP embutido para explorar este repositório do curso:

```bash
copilot

> Liste os 5 últimos commits neste repositório

> Quais branches existem neste repositório?
```

**Resultado esperado**: o Copilot mostra mensagens de commit recentes e nomes de branch a partir do remote do GitHub.

> ⚠️ **Em um Codespace?** Isso funciona automaticamente. A autenticação é herdada. Se você estiver em um clone local, certifique-se de que `gh auth status` mostre que você está logado.

---

### Exercício 4: Combine vários servidores MCP

Agora combine filesystem e GitHub MCP em uma única sessão:

```bash
copilot

> Leia samples/book-app-project/data.json e me diga quais livros estão
> in the collection. Then check the recent commits to see when this
> file was last modified.
```

**Resultado esperado**: o Copilot lê o arquivo JSON (filesystem MCP), lista os 5 livros incluindo "The Hobbit", "1984", "Dune", "To Kill a Mockingbird" e "Mysterious Book", e consulta o GitHub para obter o histórico de commits.

**Autoverificação**: você entende MCP quando consegue explicar por que "Check my repo's commit history" é melhor do que executar manualmente `git log` e colar a saída no seu prompt.

---

## 📝 Tarefa

### Desafio principal: Exploração do Book App com MCP

Pratique usar servidores MCP juntos no projeto do app de livros. Complete estas etapas em uma única sessão do Copilot:

1. **Verifique se o MCP está funcionando**: execute `/mcp show` e confirme que pelo menos o servidor GitHub está habilitado
2. **Configure o filesystem MCP** (se ainda não estiver feito): crie `~/.copilot/mcp-config.json` com a configuração do servidor filesystem
3. **Explore o código**: peça ao Copilot para usar o servidor filesystem para:
   - Listar todas as funções em `samples/book-app-project/books.py`
   - Verificar quais funções em `samples/book-app-project/utils.py` estão sem type hints
   - Ler `samples/book-app-project/data.json` e identificar problemas de qualidade de dados (dica: olhe a última entrada)
4. **Verifique a atividade do repositório**: peça ao Copilot para usar o GitHub MCP para:
   - Listar commits recentes que tocaram arquivos em `samples/book-app-project/`
   - Verificar se há issues ou pull requests abertos
5. **Combine servidores**: em um único prompt, peça ao Copilot para:
   - Ler o arquivo de teste em `samples/book-app-project/tests/test_books.py`
   - Comparar as funções testadas com todas as funções em `books.py`
   - Resumir qual cobertura de testes está faltando

**Critérios de sucesso**: você consegue combinar dados de filesystem e GitHub MCP sem atrito em uma única sessão do Copilot e consegue explicar o que cada servidor MCP contribuiu para a resposta.

<details>
<summary>💡 Dicas (clique para expandir)</summary>

**Etapa 1: Verificar MCP**
```bash
copilot
> /mcp show
# Should show "github" as enabled
# If not, run: /login
```

**Etapa 2: Criar o arquivo de configuração**

Use o JSON da seção [Configuração completa](#complete-configuration-file) acima e salve-o como `~/.copilot/mcp-config.json`.

**Etapa 3: Problema de qualidade de dados a procurar**

O último livro em `data.json` é:
```json
{
  "title": "Mysterious Book",
  "author": "",
  "year": 0,
  "read": false
}
```
Um autor vazio e ano 0. Esse é o problema de qualidade de dados!

**Etapa 5: Comparação de cobertura de testes**

Os testes em `test_books.py` cobrem: `add_book`, `mark_as_read`, `remove_book`, `get_unread_books` e `find_book_by_title`. Funções como `load_books`, `save_books` e `list_books` não têm testes diretos. As funções CLI em `book_app.py` e os helpers em `utils.py` não têm testes.

**Se o MCP não estiver funcionando:** reinicie o Copilot depois de editar o arquivo de configuração.

</details>

### Desafio bônus: Construir um servidor MCP personalizado

Pronto para ir mais fundo? Siga o [Guia de servidor MCP personalizado](mcp-custom-server.md) para construir seu próprio servidor MCP em Python que se conecta a qualquer API.

---

<details>
<summary>🔧 <strong>Erros comuns e solução de problemas</strong> (clique para expandir)</summary>

### Erros comuns

| Erro | O que acontece | Correção |
|---------|--------------|-----|
| Não saber que o GitHub MCP é embutido | Tentar instalar/configurá-lo manualmente | O GitHub MCP está incluído por padrão. Basta tentar: "List the recent commits in this repo" |
| Procurar configuração no local errado | Não consegue encontrar ou editar configurações MCP | A configuração de usuário fica em `~/.copilot/mcp-config.json`; a de projeto é `.mcp.json` na raiz do projeto |
| JSON inválido no arquivo de configuração | Servidores MCP falham ao carregar | Use `/mcp show` para verificar a configuração; valide a sintaxe JSON |
| Esquecer de autenticar servidores MCP | Erros "Authentication failed" (autenticação falhou) | Alguns MCPs precisam de autenticação separada. Verifique os requisitos de cada servidor |

### Solução de problemas

**"MCP server not found" (servidor MCP não encontrado)** - Verifique se:
1. O pacote npm existe: `npm view @modelcontextprotocol/server-github`
2. Sua configuração é JSON válido
3. O nome do servidor corresponde à sua configuração

Use `/mcp show` para ver a configuração atual.

**"GitHub authentication failed" (autenticação do GitHub falhou)** - o GitHub MCP embutido usa suas credenciais de `/login`. Tente:

```bash
copilot
> /login
```

Isso reautenticará você com o GitHub. Se os problemas persistirem, verifique se sua conta do GitHub tem as permissões necessárias para o repositório que está acessando.

**"MCP server failed to start" (falha ao iniciar o servidor MCP)** - Verifique os logs do servidor:
```bash
# Run the server command manually to see errors
npx -y @modelcontextprotocol/server-github
```

**Ferramentas MCP não disponíveis** - Certifique-se de que o servidor está habilitado:
```bash
copilot

> /mcp show
# Check if server is listed and enabled
```

Se um servidor estiver desativado, veja os [comandos `/mcp` adicionais](#-additional-mcp-commands) abaixo para saber como reativá-lo.

</details>

---

<details>
<summary>📚 <strong>Comandos MCP adicionais</strong> (clique para expandir)</summary>
<a id="-additional-mcp-commands"></a>

Você pode gerenciar servidores MCP de duas formas: usando **comandos com barra dentro de uma sessão de chat** ou usando o **comando `copilot mcp` diretamente no terminal** (sem sessão de chat).

### Opção 1: Comandos com barra (dentro de uma sessão de chat)

Estes funcionam quando você já está dentro de `copilot`:

| Comando | O que faz |
|---------|--------------|
| `/mcp show` | Mostrar todos os servidores MCP configurados e seus status |
| `/mcp add` | Configuração interativa para adicionar um novo servidor |
| `/mcp edit <server-name>` | Editar a configuração de um servidor existente |
| `/mcp enable <server-name>` | Habilitar um servidor desativado (persiste entre sessões) |
| `/mcp disable <server-name>` | Desativar um servidor (persiste entre sessões) |
| `/mcp delete <server-name>` | Remover um servidor permanentemente |
| `/mcp auth <server-name>` | Reautenticar com um servidor MCP que usa OAuth (por exemplo, depois de trocar de conta) |

### Opção 2: Comando `copilot mcp` (do seu terminal)

Você também pode gerenciar servidores MCP diretamente do terminal sem iniciar uma sessão de chat primeiro:

```bash
# List all configured MCP servers
copilot mcp list

# Enable a server
copilot mcp enable filesystem

# Disable a server
copilot mcp disable context7
```

> 💡 **Quando usar cada um?** Use os comandos `/mcp` dentro de uma sessão de chat quando já estiver nela. Use `copilot mcp` no terminal quando quiser verificar ou alterar rapidamente as configurações do servidor antes de iniciar uma sessão.

Para a maior parte deste curso, `/mcp show` é tudo que você precisa. Os outros comandos se tornam úteis conforme você gerencia mais servidores ao longo do tempo.

</details>

---

# Resumo

## 🔑 Principais aprendizados

1. **MCP** conecta o Copilot a serviços externos (GitHub, filesystem, documentação)
2. **GitHub MCP é embutido** - não é necessária configuração, apenas `/login`
3. **Filesystem e Context7** são configurados via `~/.copilot/mcp-config.json`
4. **Fluxos com vários servidores** combinam dados de várias fontes em uma única sessão
5. **Gerencie servidores de duas formas**: use comandos com barra `/mcp` dentro do chat ou `copilot mcp` no terminal
6. **Servidores personalizados** permitem conectar qualquer API (opcional, coberto no guia do apêndice)

> 📋 **Referência rápida**: Veja a [referência de comandos do GitHub Copilot CLI](https://docs.github.com/en/copilot/reference/cli-command-reference) para uma lista completa de comandos e atalhos.

---

## ➡️ O que vem a seguir

Agora você tem todos os blocos de construção: modos, contexto, fluxos de trabalho, agents, skills e MCP. Hora de juntar tudo.

Em **[Capítulo 07: Colocando Tudo em Prática](../07-putting-it-together/README.md)**, você aprenderá:

- Combinar agents, skills e MCP em fluxos unificados
- Desenvolvimento completo de funcionalidades da ideia ao PR mesclado
- Automação com hooks
- Melhores práticas para ambientes de equipe

---

**[← Voltar ao Capítulo 05](../05-skills/README.md)** | **[Continue para o Capítulo 07 →](../07-putting-it-together/README.md)**
