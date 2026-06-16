<!--
---
id: CopilotCLI-00
title: !translate Quick Start
description: !translate Install GitHub Copilot CLI, sign in with your GitHub account, and verify that everything works.
audience: Developers / Students / Terminal users
slug: quick-start
weight: 1
---
-->

![Chapter 00: Quick Start](assets/chapter-header.png)

Bem-vindo! Neste capítulo, você instalará o GitHub Copilot CLI (Interface de Linha de Comando), fará login com sua conta GitHub e verificará se tudo funciona. Este é um capítulo de configuração rápida. Assim que estiver em funcionamento, as demos começam no Capítulo 01!

## 🎯 Objetivos de Aprendizagem

Ao final deste capítulo, você terá:

- Instalado o GitHub Copilot CLI
- Conectado com sua conta GitHub
- Verificado que funciona com um teste simples

> ⏱️ **Estimated Time**: ~10 minutes (5 min reading + 5 min hands-on)

---

## ✅ Pré-requisitos

- **Conta GitHub** com acesso ao Copilot. [Veja opções de assinatura](https://github.com/features/copilot/plans). Estudantes/professores podem acessar o Copilot Pro gratuitamente via [GitHub Education](https://education.github.com/pack).
- **Terminal basics**: Comfortable with commands like `cd` and `ls`

### O que significa "Acesso ao Copilot"

O GitHub Copilot CLI requer uma assinatura ativa do Copilot. Você pode verificar seu status em [github.com/settings/copilot](https://github.com/settings/copilot). Você deve ver uma das opções:

- **Copilot Individual** - Personal subscription
- **Copilot Business** - Through your organization
- **Copilot Enterprise** - Through your enterprise
- **GitHub Education** - Free for verified students/teachers

If you see "You don't have access to GitHub Copilot," you'll need to use the free option, subscribe to a plan, or join an organization that provides access.

---

## Instalação

> ⏱️ **Time estimate**: Installation takes 2-5 minutes. Authentication adds another 1-2 minutes.

### GitHub Codespaces (Zero Setup)

Se você não quiser instalar nenhum dos pré-requisitos, pode usar o GitHub Codespaces, que já vem com o GitHub Copilot CLI pronto para uso (é necessário fazer login) e pré-instala Python e pytest.

1. [Fork this repository](https://github.com/github/copilot-cli-for-beginners/fork) to your GitHub account
2. Select **Code** > **Codespaces** > **Create codespace on main**
3. Wait a few minutes for the container to build
4. You're ready to go! The terminal will open automatically in the Codespace environment.

> 💡 **Verify in Codespace**: Run `cd samples/book-app-project && python book_app.py help` to confirm Python and the sample app are working.

### Instalação Local

Siga estes passos se quiser executar o Copilot CLI em sua máquina local com os exemplos do curso.

1. Clone o repositório para obter os exemplos do curso em sua máquina:

    ```bash
    git clone https://github.com/github/copilot-cli-for-beginners
    cd copilot-cli-for-beginners
    ```

2. Instale o Copilot CLI usando uma das opções a seguir.

    > 💡 **Não tem certeza do que escolher?** Use `npm` se tiver o Node.js instalado. Caso contrário, escolha a opção que corresponda ao seu sistema.

    ### All Platforms (npm)

    ```bash
    # If you have Node.js installed, this is a quick way to get the CLI
    npm install -g @github/copilot
    ```

    ### macOS/Linux (Homebrew)

    ```bash
    brew install copilot-cli
    ```

    ### Windows (WinGet)

    ```bash
    winget install GitHub.Copilot
    ```

    ### macOS/Linux (Install Script)

    ```bash
    curl -fsSL https://gh.io/copilot-install | bash
    ```

<details>
<summary>Optional: Enable shell tab completion</summary>

Shell tab completion lets you press **Tab** to complete `copilot` subcommands, command options, and some option values. This is optional, but it can be handy once you're comfortable using the CLI.

Copilot CLI currently supports completion scripts for Bash, Zsh, and Fish:

```shell
# Bash, somente na sessão atual
source <(copilot completion bash)

# Bash, persistent on Linux
copilot completion bash | sudo tee /etc/bash_completion.d/copilot

# Zsh
copilot completion zsh > "${fpath[1]}/_copilot"

# Fish
copilot completion fish > ~/.config/fish/completions/copilot.fish
```

Reinicie seu shell após adicionar a conclusão persistente. O PowerShell é suportado para executar o Copilot CLI no Windows, mas `copilot completion` atualmente suporta apenas Bash, Zsh e Fish.

</details>

---

## Autenticação

Abra uma janela do terminal na raiz do repositório `copilot-cli-for-beginners`, inicie o CLI e permita o acesso à pasta.

```bash
copilot
```

Você será solicitado a confiar na pasta que contém o repositório (se ainda não tiver feito). É possível confiar apenas uma vez ou em todas as sessões futuras.

<img src="assets/copilot-trust.png" alt="Trusting files in a folder with the Copilot CLI" width="800"/>

Após confiar na pasta, você pode entrar com sua conta GitHub.

```
> /login
```

**O que acontece em seguida:**

1. O Copilot CLI exibe um código temporário (ex.: `ABCD-1234`)
2. Your browser opens to GitHub's device authorization page. Sign in to GitHub if you haven't already.
3. Enter the code when prompted
4. Select "Authorize" to grant GitHub Copilot CLI access
5. Return to your terminal - you're now signed in!

<img src="assets/auth-device-flow.png" alt="Device Authorization Flow - showing the 5-step process from terminal login to signed-in confirmation" width="800"/>

*Fluxo de autorização de dispositivo: seu terminal gera um código, você o verifica no navegador e o Copilot CLI é autenticado.*

**Tip**: The sign-in persists across sessions. You only need to do this once unless your token expires or you explicitly sign out.

---

## Verifique se está funcionando

### Passo 1: Teste o Copilot CLI

Agora que você está conectado, vamos verificar se o Copilot CLI está funcionando para você. No terminal, inicie o CLI se ainda não o fez:

```bash
> Say hello and tell me what you can help with
```

Após receber uma resposta, você pode sair do CLI:

```bash
> /exit
```

---

<details>
<summary>🎬 See it in action!</summary>

![Hello Demo](assets/hello-demo.gif)

*Demo output varies. Your model, tools, and responses will differ from what's shown here.*

</details>

---

**Saída esperada**: Uma resposta amigável listando as capacidades do Copilot CLI.

### Passo 2: Execute o app de exemplo de livros

O curso fornece um app de exemplo que você explorará e melhorará ao longo do curso usando o CLI *(o código está em /samples/book-app-project)*. Verifique se o *app de terminal de coleção de livros em Python* funciona antes de começar. Execute `python` ou `python3` dependendo do seu sistema.

> **Note:** The primary examples shown throughout the course use Python (`samples/book-app-project`) so you'll need to have [Python 3.10+](https://www.python.org/downloads/) available on your local machine if you chose that option (the Codespace already has it installed). JavaScript (`samples/book-app-project-js`) and C# (`samples/book-app-project-cs`) versions are also available if you prefer to work with those languages. Each sample has a README with instructions for running the app in that language.

```bash
cd samples/book-app-project
python book_app.py list
```

**Saída esperada**: Uma lista de 5 livros incluindo "O Hobbit", "1984" e "Duna".

### Passo 3: Experimente o Copilot CLI com o Book App

Navegue de volta para a raiz do repositório primeiro (se você executou o Passo 2):

```bash
cd ../..   # Back to the repository root if needed
copilot 
> What does @samples/book-app-project/book_app.py do?
```

**Expected output**: A summary of the book app's main functions and commands.

Se você vir um erro, verifique a seção de [solução de problemas](#troubleshooting) abaixo.

Once you're done you can exit the Copilot CLI:

```bash
> /exit
```

---

## ✅ Você está pronto!

Isso é tudo para a instalação. A parte prática começa no Capítulo 01, onde você irá:

- Ver como a IA revisa o app de livros e encontra problemas de qualidade de código instantaneamente
- Aprender três formas diferentes de usar o Copilot CLI
- Gerar código funcional a partir de instruções em linguagem natural

**[Continue to Chapter 01: First Steps →](../01-setup-and-first-steps/README.md)**

---

## Solução de problemas

### "copilot: comando não encontrado"

The CLI isn't installed. Try a different installation method:

```bash
# If brew failed, try npm:
npm install -g @github/copilot

# Or the install script:
curl -fsSL https://gh.io/copilot-install | bash
```

### "Você não tem acesso ao GitHub Copilot"

1. Verify you have a Copilot subscription at [github.com/settings/copilot](https://github.com/settings/copilot)
2. Check that your organization permits CLI access if using a work account

### "Autenticação falhou"

Re-authenticate:

```bash
copilot
> /login
```

### O navegador não abre automaticamente

Manually visit [github.com/login/device](https://github.com/login/device) and enter the code shown in your terminal.

### Token expirado

Simply run `/login` again:

```bash
copilot
> /login
```

### Still stuck?

- Check the [GitHub Copilot CLI documentation](https://docs.github.com/copilot/concepts/agents/about-copilot-cli)
- Search [GitHub Issues](https://github.com/github/copilot-cli/issues)

---

## 🔑 Key Takeaways

1. **A GitHub Codespace is a quick way to get started** - Python, pytest, and GitHub Copilot CLI are all pre-installed so you can jump right into the demos
2. **Multiple installation methods** - Choose what works for your system (Homebrew, WinGet, npm, or install script)
3. **One-time authentication** - Login persists until token expires
4. **The book app works** - You'll use `samples/book-app-project` throughout the entire course

> 📚 **Official Documentation**: [Install Copilot CLI](https://docs.github.com/copilot/how-tos/copilot-cli/cli-getting-started) for installation options and requirements.

> 📋 **Quick Reference**: See the [GitHub Copilot CLI command reference](https://docs.github.com/en/copilot/reference/cli-command-reference) for a complete list of commands and shortcuts.

---

**[Continue to Chapter 01: First Steps →](../01-setup-and-first-steps/README.md)**
