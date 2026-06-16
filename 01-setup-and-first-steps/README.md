<!--
---
id: CopilotCLI-01
title: !translate Primeiros Passos
description: !translate Experimente o GitHub Copilot CLI por meio de demos práticas e aprenda quando usar os modos interativo, plano e programático.
audience: Desenvolvedores / Estudantes / Usuários de terminal
slug: first-steps
weight: 2
---
-->

![Capítulo 01: Primeiros Passos](assets/chapter-header.png)

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

Repare como é natural. Faça perguntas como se estivesse conversando com um colega. Quando terminar de explorar, digite `/exit` para sair da sessão.

**O insight principal**: o GitHub Copilot CLI é conversacional. Você não precisa de sintaxe especial para começar. Faça perguntas em linguagem natural.

## Veja em ação

Agora veja por que desenvolvedores chamam isso de "ter um engenheiro sênior a um toque de distância".

> 📖 **Lendo os exemplos**: Linhas que começam com `>` são prompts que você digita dentro de uma sessão interativa do Copilot CLI. Linhas sem o prefixo `>` são comandos de shell que você executa no terminal.

> 💡 **Sobre as saídas de exemplo**: As saídas mostradas ao longo do curso são ilustrativas. Como as respostas do Copilot CLI variam a cada execução, seus resultados podem diferir em redação, formatação e nível de detalhe. Foque no *tipo* de informação retornada, não no texto exato.

### Demo 1: Revisão de código em segundos

O curso inclui arquivos de exemplo com problemas intencionais de qualidade de código. Se você estiver trabalhando localmente e ainda não tiver clonado o repositório, execute o comando `git clone` abaixo, navegue até a pasta `copilot-cli-for-beginners` e então execute o comando `copilot`.

```bash
# Clone the course repository if you're working locally and haven't already
git clone https://github.com/github/copilot-cli-for-beginners
cd copilot-cli-for-beginners

# Start Copilot
copilot
```

Dentro da sessão interativa do Copilot CLI, execute o seguinte:

```
> Review @samples/book-app-project/book_app.py for code quality issues and suggest improvements
```

> 💡 **Para que serve o símbolo `@`?** O símbolo `@` indica ao Copilot CLI que leia um arquivo. Você aprenderá tudo sobre isso no Capítulo 02. Por enquanto, copie o comando exatamente como mostrado.

---

<details>
<summary>🎬 Veja em ação!</summary>

![Demo de revisão de código](assets/code-review-demo.gif)

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

![Demo de explicação de código](assets/explain-code-demo.gif)

*A saída da demo varia. Seu modelo, ferramentas e respostas podem diferir do que é mostrado aqui.*

</details>

---

**O que acontece**: (sua saída pode variar) O Copilot CLI lê o arquivo, entende o código e o explica em linguagem simples.

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

**Conclusão**: Código complexo explicado como um mentor paciente faria.

---

### Demo 3: Gerar código funcional

Precisa de uma função que você gastaria 15 minutos procurando no Google? Ainda na sua sessão:

```
> Write a Python function that takes a list of books and returns statistics: 
  total count, number read, number unread, oldest and newest book
```

---

<details>
<summary>🎬 Veja em ação!</summary>

![Demo de geração de código](assets/generate-code-demo.gif)

*A saída da demo varia. Seu modelo, ferramentas e respostas podem diferir do que é mostrado aqui.*

</details>

---

**O que acontece**: Uma função completa e funcional em segundos que você pode copiar, colar e executar.

Quando terminar de explorar, saia da sessão:

```
> /exit
```

**Conclusão**: Gratificação instantânea, e você permaneceu em uma sessão contínua o tempo todo.

---

# Modos e Comandos

<img src="assets/modes-and-commands.png" alt="Painel de controle futurista com telas brilhantes, botões e equalizadores representando modos e comandos do Copilot CLI" width="800"/>

Você acabou de ver o que o Copilot CLI pode fazer. Agora vamos entender *como* usar essas capacidades de forma eficaz. O ponto-chave é saber qual dos três modos de interação usar em cada situação.

> 💡 **Observação**: O Copilot CLI também possui um modo **Autopilot** que executa tarefas sem aguardar sua entrada. É poderoso, mas exige concessão de permissões completas e pode usar requisições premium de forma autônoma. Este curso foca nos três modos abaixo. Abordaremos o Autopilot quando você estiver confortável com o básico.

---

## 🧩 Analogia do mundo real: Sair para comer

Pense em usar o GitHub Copilot CLI como sair para comer. Desde planejar a viagem até fazer o pedido, diferentes situações pedem abordagens diferentes:

| Modo | Analogia (refeição) | Quando usar |
|------|----------------|-------------|
| **Plano** | Rota GPS até o restaurante | Tarefas complexas — mapear a rota, revisar etapas, concordar no plano e então executar |
| **Interativo** | Conversar com o garçom | Exploração e iteração — fazer perguntas, personalizar, obter feedback em tempo real |
| **Programático** | Pedido no drive-through | Tarefas rápidas e específicas — permaneça no seu ambiente e obtenha o resultado rapidamente |

Assim como ao sair para comer, você naturalmente aprenderá quando cada abordagem for a mais adequada.

<img src="assets/ordering-food-analogy.png" alt="Três formas de usar o GitHub Copilot CLI — modo Plano (rota GPS até o restaurante), modo Interativo (conversar com o garçom) e modo Programático (drive-through)" width="800"/>

*Escolha seu modo com base na tarefa: Plano para mapear primeiro, Interativo para colaboração com idas e vindas, Programático para resultados rápidos de uma vez.*

### Com qual modo devo começar?

**Comece com o modo Interativo.**
- Você pode experimentar e fazer perguntas de acompanhamento
- O contexto se acumula naturalmente durante a conversa
- Erros são fáceis de corrigir com `/clear`

Depois que estiver confortável, experimente:
- **Modo programático** (`copilot -p "<your prompt>"`) para perguntas rápidas e pontuais
- **Modo Plano** (`/plan`) quando você precisar planejar algo com mais detalhes antes de codar

---

## Os três modos

### Modo 1: Modo Interativo (comece aqui)

<img src="assets/interactive-mode.png" alt="Modo Interativo — como falar com um garçom que pode responder perguntas e ajustar o pedido" width="250"/>

**Melhor para**: exploração, iteração e conversas com várias mensagens. Como conversar com um garçom que pode responder perguntas, receber feedback e ajustar o pedido na hora.

Inicie uma sessão interativa:

```bash
copilot
```

Como você viu até aqui, verá um prompt em que pode digitar naturalmente. Para obter ajuda sobre os comandos disponíveis, basta digitar:

```
> /help
```

**Insight principal**: o modo Interativo mantém contexto. Cada mensagem se baseia nas anteriores, como uma conversa real.

#### Exemplo de modo Interativo

```bash
copilot

> Review @samples/book-app-project/utils.py and suggest improvements

> Add type hints to all functions

> Make the error handling more robust

> /exit
```

Observe como cada prompt se baseia na resposta anterior. Você está tendo uma conversa, não recomeçando a cada vez.

---

### Modo 2: Modo Plano

<img src="assets/plan-mode.png" alt="Modo Plano — como planejar uma rota antes de uma viagem usando GPS" width="250"/>

**Melhor para**: tarefas complexas em que você quer revisar a abordagem antes da execução. Semelhante a planejar uma rota antes de uma viagem usando GPS.

O modo Plano ajuda você a criar um plano passo a passo antes de escrever qualquer código. Use o comando `/plan`; pressione **Shift+Tab** para alternar para o modo Plano:

```bash
copilot

> /plan Add a "mark as read" command to the book app
```

> 💡 **Dica**: **Shift+Tab** alterna entre modos: Interativo → Plano → Autopilot. Pressione a qualquer momento durante uma sessão interativa para mudar de modo sem digitar um comando.

Você também pode iniciar o Copilot CLI diretamente no modo Plano usando a flag `--plan`:

```bash
copilot --plan
```

**Saída do modo Plano:** (sua saída pode diferir)

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

**Insight principal**: o modo Plano permite revisar e modificar a abordagem antes que qualquer código seja escrito. Depois que um plano estiver completo, você pode até pedir ao Copilot CLI para salvá-lo em um arquivo para referência posterior. Por exemplo, "Save this plan to `mark_as_read_plan.md`" criaria um arquivo Markdown com os detalhes do plano.

> 💡 **Quer algo mais complexo?** Tente: `/plan Add search and filter capabilities to the book app`. O modo Plano escala de funcionalidades simples a aplicações completas.

> 📚 **Modo Autopilot**: você talvez tenha notado que Shift+Tab passa por um terceiro modo chamado **Autopilot**. No modo Autopilot, o Copilot executa um plano inteiro sem esperar sua entrada após cada etapa — como entregar uma tarefa a um colega e dizer "me avise quando terminar". O fluxo típico é planejar → aceitar → autopilot, o que significa que você precisa ser bom em escrever planos primeiro. Também é possível iniciar diretamente no autopilot com `copilot --autopilot`. Primeiro fique confortável com os modos Interativo e Plano; depois veja a [documentação oficial](https://docs.github.com/copilot/concepts/agents/copilot-cli/autopilot) quando estiver pronto.

---

### Modo 3: Modo Programático

<img src="assets/programmatic-mode.png" alt="Modo Programático — como usar um drive-through para um pedido rápido" width="250"/>

**Melhor para**: automação, scripts, CI/CD e comandos únicos. Como usar um drive-through para um pedido rápido sem precisar falar com um garçom.

Use a flag `-p` para comandos únicos que não precisam de interação:

```bash
# Generate code
copilot -p "Write a function that checks if a number is even or odd"

# Get quick help
copilot -p "How do I read a JSON file in Python?"
```

**Insight principal**: o modo Programático fornece uma resposta rápida e sai. Sem conversa, apenas entrada → saída.

<details>
<summary>📚 <strong>Indo além: usando o modo Programático em scripts</strong> (clique para expandir)</summary>

Quando estiver confortável, você pode usar `-p` em scripts de shell:

```bash
#!/bin/bash

# Generate commit messages automatically
COMMIT_MSG=$(copilot -p "Generate a commit message for: $(git diff --staged)")
git commit -m "$COMMIT_MSG"

# Review a file
copilot --allow-all -p "Review @myfile.py for issues"
```
> ⚠️ **Sobre `--allow-all`**: esta flag ignora todos os prompts de permissão, permitindo que o Copilot CLI leia arquivos, execute comandos e acesse URLs sem perguntar antes. Isso é necessário no modo Programático (`-p`), pois não há uma sessão interativa para aprovar ações. Use `--allow-all` apenas com prompts que você mesmo escreveu e em diretórios confiáveis. Nunca use com entrada não confiável ou em diretórios sensíveis.

</details>

---

## Comandos com barra essenciais

Estes comandos são ótimos para aprender no início, enquanto você começa a usar o Copilot CLI:

| Comando | O que faz | Quando usar |
|---------|--------------|-------------|
| `/ask` | Faça uma pergunta rápida sem afetar o histórico da conversa | Quando você quer uma resposta rápida sem atrapalhar a tarefa atual |
| `/clear` | Limpa a conversa e inicia do zero | Ao mudar de assunto |
| `/help` | Mostra todos os comandos disponíveis | Quando você esquecer um comando |
| `/model` | Mostra ou alterna o modelo de IA | Quando quiser mudar o modelo de IA |
| `/plan` | Planeje seu trabalho antes de codar | Para funcionalidades mais complexas |
| `/research` | Pesquisa profunda usando GitHub e fontes web | Quando precisar investigar um tópico antes de codar |
| `/exit` | Encerra a sessão | Quando terminar |

> 💡 **`/ask` vs chat normal**: normalmente, toda mensagem que você envia passa a fazer parte da conversa em andamento e afeta respostas futuras. `/ask` é um atalho "fora do registro" — perfeito para perguntas rápidas e pontuais como `/ask What does YAML mean?` sem poluir o contexto da sessão.

> 💡 **Conclusão por tabulação**: ao digitar um comando com barra, pressione **Tab** para completar automaticamente o nome do comando ou alternar entre subcomandos e argumentos disponíveis. Isso é especialmente útil quando você não lembra o nome exato de um comando.

Isso é tudo para começar! Conforme você ficar confortável, pode explorar comandos adicionais.

> 📚 **Documentação oficial**: [Referência de comandos do CLI](https://docs.github.com/copilot/reference/cli-command-reference) para a lista completa de comandos e flags.

<details>
<summary>📚 <strong>Comandos adicionais</strong> (clique para expandir)</summary>

> 💡 Os comandos essenciais acima cobrem grande parte do uso diário. Esta referência serve quando estiver pronto para explorar mais.

### Ambiente de agents

| Comando | O que faz |
|---------|-----------|
| `/agent` | Navegar e selecionar entre agents disponíveis |
| `/env` | Mostrar detalhes do ambiente carregado — quais instruções, servidores MCP, skills, agents e plugins estão ativos |
| `/init` | Inicializar as instruções do Copilot para o repositório |
| `/mcp` | Gerenciar a configuração do servidor MCP |
| `/settings` | Abrir um diálogo interativo para navegar e editar todas as configurações do usuário em um só lugar |
| `/skills` | Gerenciar skills para capacidades adicionais |

> 💡 Agents são abordados no [Capítulo 04](../04-agents-custom-instructions/README.md), skills no [Capítulo 05](../05-skills/README.md) e servidores MCP no [Capítulo 06](../06-mcp-servers/README.md).

### Modelos e subagents

| Comando | O que faz |
|---------|-----------|
| `/delegate` | Delegar tarefa para um agent em nuvem do GitHub Copilot |
| `/fleet` | Dividir uma tarefa complexa em subtarefas paralelas para acelerar a execução |
| `/model` | Mostrar ou trocar o modelo de IA |
| `/tasks` | Ver subagents em background e sessões shell destacadas |

### Código

| Comando | O que faz |
|---------|-----------|
| `/diff` | Revisar mudanças feitas no diretório atual |
| `/pr` | Operar sobre pull requests do branch atual |
| `/research` | Realizar investigação aprofundada usando GitHub e fontes web |
| `/review` | Executar o agent de revisão de código para analisar mudanças |
| `/terminal-setup` | Habilitar suporte a entrada multilinha (shift+enter e ctrl+enter) |

### Permissões

| Comando | O que faz |
|---------|-----------|
| `/add-dir <directory>` | Adicionar um diretório à lista permitida |
| `/allow-all [on\|off\|show]` | Aprovar automaticamente todos os prompts de permissão; use `on` para habilitar, `off` para desabilitar, `show` para verificar o estado |
| `/yolo` | Atalho rápido para `/allow-all on` — aprova automaticamente todos os prompts de permissão |
| `/cwd`, `/cd [directory]` | Ver ou mudar o diretório de trabalho |
| `/list-dirs` | Mostrar todos os diretórios permitidos |

> ⚠️ **Use com cuidado**: `/allow-all` e `/yolo` ignoram prompts de confirmação. Ótimos para projetos confiáveis, mas tenha cuidado com código não confiável.

### Sessão

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
| `/share` | Exporta a sessão como um arquivo Markdown, gist do GitHub ou arquivo HTML autocontido |

### Exibição

| Comando | O que faz |
|---------|--------------|
| `/statusline` (ou `/footer`) | Personalize quais itens aparecem na barra de status na parte inferior da sessão (diretório, branch, esforço, janela de contexto, cota) |
| `/theme` | Ver ou definir o tema do terminal |
| `/voice` | Dicte seu prompt usando reconhecimento de fala local — fale naturalmente em vez de digitar |

### Ajuda e feedback

| Comando | O que faz |
|---------|--------------|
| `/app` | Abrir o aplicativo do GitHub (ou o fallback no navegador) diretamente do CLI |
| `/changelog` | Exibe o changelog das versões do CLI |
| `/feedback` | Enviar feedback ao GitHub |
| `/help` | Mostra todos os comandos disponíveis |

### Comandos rápidos de shell

Execute comandos de shell diretamente sem IA prefixando com `!`:

```bash
copilot

> !git status
# Runs git status directly, bypassing the AI

> !python -m pytest tests/
# Runs pytest directly
```

### Troca de modelos

O Copilot CLI oferece suporte a vários modelos de IA da OpenAI, Anthropic, Google e outros. Os modelos disponíveis para você dependem do seu nível de assinatura e região. Use `/model` para ver suas opções e alternar entre elas:

```bash
copilot
> /model

# Shows available models and lets you pick one. Select Sonnet 4.5.
```

> 💡 **Dica**: alguns modelos custam mais "premium requests" que outros. Modelos marcados como **1x** (como Claude Sonnet 4.5) são uma ótima opção padrão. Eles são capazes e eficientes. Modelos com multiplicador maior usam sua cota de premium requests mais rapidamente, então guarde-os para quando você realmente precisar.

> 💡 **Não sabe qual modelo escolher?** Selecione **`Auto`** no seletor de modelos para deixar o Copilot escolher automaticamente o melhor modelo disponível para cada sessão. Esta é uma ótima opção padrão se você está começando e não quer pensar sobre seleção de modelo.

</details>

---

# Prática

<img src="../assets/practice.png" alt="Ambiente de mesa aconchegante com monitor mostrando código, luminária, xícara de café e fones de ouvido prontos para prática" width="800"/>

Hora de colocar o que você aprendeu em ação.

---

## ▶️ Experimente você mesmo

### Exploração Interativa

Inicie o Copilot e use prompts de acompanhamento para melhorar iterativamente o app de livros:

```bash
copilot

> Review @samples/book-app-project/book_app.py - what could be improved?

> Refactor the if/elif chain into a more maintainable structure

> Add type hints to all the handler functions

> /exit
```

### Planeje uma funcionalidade

Use `/plan` para pedir ao Copilot CLI que mapeie uma implementação antes de escrever qualquer código:

```bash
copilot

> /plan Add a search feature to the book app that can find books by title or author

# Review the plan
# Approve or modify
# Watch it implement step by step
```

### Automatize com o modo Programático

A flag `-p` permite executar o Copilot CLI diretamente do terminal sem entrar no modo Interativo. Copie e cole o script a seguir no seu terminal (não dentro do Copilot), a partir da raiz do repositório, para revisar todos os arquivos Python no app de livros.

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

Depois de concluir as demos, experimente estas variações:

1. **Desafio Interativo**: Inicie `copilot` e explore o app de livros. Pergunte sobre `@samples/book-app-project/books.py` e solicite melhorias 3 vezes seguidas.

2. **Desafio do modo Plano**: Execute `/plan Add rating and review features to the book app`. Leia o plano com atenção. Ele faz sentido?

3. **Desafio Programático**: Execute `copilot --allow-all -p "List all functions in @samples/book-app-project/book_app.py and describe what each does"`. Funcionou de primeira?

---

## 💡 Dica: Controle sua sessão do CLI pela web ou pelo celular

O GitHub Copilot CLI oferece suporte a **sessões remotas**, permitindo que você monitore e interaja com uma sessão do CLI em execução a partir de um navegador web (no desktop ou no celular) ou do app GitHub Mobile sem estar fisicamente no terminal.

Inicie uma sessão remota com a flag `--remote`:

```bash
copilot --remote
```

O Copilot CLI exibirá um link e fornecerá acesso a um QR code. Abra o link no seu telefone ou em uma aba do navegador desktop para acompanhar a sessão em tempo real, enviar prompts de acompanhamento, revisar planos e orientar o agent remotamente. As sessões são específicas do usuário, então você só pode acessar suas próprias sessões do Copilot CLI.

Você também pode habilitar o acesso remoto de dentro de uma sessão ativa a qualquer momento:

```
> /remote
```

Mais detalhes sobre sessões remotas podem ser encontrados na [documentação do Copilot CLI](https://docs.github.com/copilot/how-tos/copilot-cli/steer-remotely).

---

## 📝 Tarefa

### Desafio principal: Melhorar os utilitários do Book App

Os exemplos práticos focaram em revisar e refatorar `book_app.py`. Agora pratique as mesmas habilidades em um arquivo diferente, `utils.py`:

1. Inicie uma sessão interativa: `copilot`
2. Peça ao Copilot CLI para resumir o arquivo: "Summarize @samples/book-app-project/utils.py and explain what each function in this file does"
3. Peça para adicionar validação de entrada: "Add validation to `get_user_choice()` so it handles empty input and non-numeric entries"
4. Peça para melhorar o tratamento de erros: "What happens if `get_book_details()` receives an empty string for the title? Add guards for that."
5. Peça uma docstring: "Add a comprehensive docstring to `get_book_details()` with parameter descriptions and return values"
6. Observe como o contexto é mantido entre prompts. Cada melhoria se baseia na anterior
7. Saia com `/exit`

**Critérios de sucesso**: você deve ter um `utils.py` melhorado com validação de entrada, tratamento de erros e uma docstring, tudo construído por meio de uma conversa multitorno.

<details>
<summary>💡 Dicas (clique para expandir)</summary>

**Prompts de exemplo para tentar:**
```bash
> @samples/book-app-project/utils.py What does each function in this file do?
> Add validation to get_user_choice() so it handles empty input and non-numeric entries
> What happens if get_book_details() receives an empty string for the title? Add guards for that.
> Add a comprehensive docstring to get_book_details() with parameter descriptions and return values
```

**Problemas comuns:**
- Se o Copilot CLI fizer perguntas de esclarecimento, responda naturalmente
- O contexto avança, então cada prompt se baseia no anterior
- Use `/clear` se quiser recomeçar

</details>

### Desafio bônus: Compare os modos

Os exemplos usaram `/plan` para uma funcionalidade de busca e `-p` para revisões em lote. Agora tente os três modos em uma única nova tarefa: adicionar um método `list_by_year()` à classe `BookCollection`:

1. **Interativo**: `copilot` → peça para projetar e construir o método passo a passo
2. **Plano**: `/plan Add a list_by_year(start, end) method to BookCollection that filters books by publication year range`
3. **Programático**: `copilot --allow-all -p "@samples/book-app-project/books.py Add a list_by_year(start, end) method that returns books published between start and end year inclusive"`

**Reflexão**: Qual modo pareceu mais natural? Quando você usaria cada um?

---

<details>
<summary>🔧 <strong>Erros comuns e solução de problemas</strong> (clique para expandir)</summary>

### Erros comuns

| Erro | O que acontece | Correção |
|---------|--------------|-----|
| Digitar `exit` em vez de `/exit` | O Copilot CLI trata "exit" como prompt, não como comando | Comandos com barra sempre começam com `/` |
| Usar `-p` para conversas multitorno | Cada chamada `-p` é isolada e não lembra chamadas anteriores | Use o modo Interativo (`copilot`) para conversas que se baseiam em contexto |
| Esquecer aspas em prompts com `$` ou `!` | O shell interpreta caracteres especiais antes do Copilot CLI vê-los | Coloque prompts entre aspas: `copilot -p "What does $HOME mean?"` |
| Pressionar Esc uma vez para cancelar uma tarefa em execução | Um único Esc não cancela mais trabalho em andamento (para evitar acidentes) | Pressione **Esc duas vezes** para cancelar enquanto o Copilot CLI está processando |

### Solução de problemas

**"Model not available"** - Sua assinatura pode não incluir todos os modelos. Use `/model` para ver o que está disponível.

**"Context too long"** - Sua conversa usou toda a janela de contexto. Use `/clear` para redefinir ou inicie uma nova sessão.

**"Rate limit exceeded"** - Aguarde alguns minutos e tente novamente. Considere usar o modo Programático para operações em lote com intervalos.

</details>

---

# Resumo

## 🔑 Principais aprendizados

1. **Modo Interativo** é para exploração e iteração — o contexto avança. É como conversar com alguém que lembra o que você disse até aquele ponto.
2. **Modo Plano** normalmente é para tarefas mais envolvidas. Revise antes de implementar.
3. **Modo Programático** é para automação. Não é necessária interação.
4. **Comandos essenciais** (`/ask`, `/help`, `/clear`, `/plan`, `/research`, `/model`, `/exit`) cobrem a maior parte do uso diário.

> 📋 **Referência rápida**: Veja a [referência de comandos do GitHub Copilot CLI](https://docs.github.com/en/copilot/reference/cli-command-reference) para uma lista completa de comandos e atalhos.

---

## ➡️ O que vem a seguir

Agora que você entende os três modos, vamos aprender como dar contexto ao Copilot CLI sobre seu código.

Em **[Capítulo 02: Contexto e Conversas](../02-context-conversations/README.md)**, você aprenderá:

- A sintaxe `@` para referenciar arquivos e diretórios
- Gerenciamento de sessões com `--resume` e `--continue`
- Como o gerenciamento de contexto torna o Copilot CLI realmente poderoso

---

**[← Voltar ao Início do Curso](../README.md)** | **[Continue para o Capítulo 02 →](../02-context-conversations/README.md)**
