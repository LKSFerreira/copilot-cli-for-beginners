<!--
---
id: CopilotCLI-00
title: !translate Início Rápido
description: !translate Instale o GitHub Copilot CLI, entre com sua conta GitHub e verifique se tudo funciona.
audience: Desenvolvedores / Estudantes / Usuários de terminal
slug: quick-start
weight: 1
---
-->

![Capítulo 00: Início Rápido](assets/chapter-header.png)

Bem-vindo! Neste capítulo, você instalará o GitHub Copilot CLI (Interface de Linha de Comando), fará login com sua conta GitHub e verificará se tudo funciona. Este é um capítulo de configuração rápida. Assim que estiver em funcionamento, as demos começam no Capítulo 01!

## 🎯 Objetivos de Aprendizagem

Ao final deste capítulo, você terá:

- Instalado o GitHub Copilot CLI
- Conectado com sua conta GitHub
- Verificado que funciona com um teste simples

> ⏱️ **Tempo estimado**: ~10 minutos (5 min leitura + 5 min prática)

---

## ✅ Pré-requisitos

- **Conta GitHub** com acesso ao Copilot. [Veja opções de assinatura](https://github.com/features/copilot/plans). Estudantes/professores podem acessar o Copilot Pro gratuitamente via [GitHub Education](https://education.github.com/pack).
- **Conceitos básicos de terminal**: Confortável com comandos como `cd` e `ls`

### O que significa "Acesso ao Copilot"

O GitHub Copilot CLI requer uma assinatura ativa do Copilot. Você pode verificar seu status em [github.com/settings/copilot](https://github.com/settings/copilot). Você deve ver uma das opções:

- **Copilot Individual** - Assinatura pessoal
- **Copilot Business** - Por meio da sua organização
- **Copilot Enterprise** - Por meio da sua empresa
- **GitHub Education** - Gratuito para estudantes/professores verificados

Se você vir "You don't have access to GitHub Copilot" (Você não tem acesso ao GitHub Copilot), será necessário usar a opção gratuita, assinar um plano ou ingressar em uma organização que forneça acesso.

---

## Instalação

> ⏱️ **Estimativa de tempo**: A instalação leva 2–5 minutos. A autenticação acrescenta mais 1–2 minutos.

### GitHub Codespaces (sem configuração)

Se você não quiser instalar nenhum dos pré-requisitos, pode usar o GitHub Codespaces, que já vem com o GitHub Copilot CLI pronto para uso (é necessário fazer login) e pré-instala Python e pytest.

1. [Faça um fork deste repositório](https://github.com/github/copilot-cli-for-beginners/fork) para sua conta no GitHub
2. Selecione **Code** (Código) > **Codespaces** > **Create codespace on main** (Criar codespace na main)
3. Aguarde alguns minutos até o container ser criado
4. Pronto! O terminal abrirá automaticamente no ambiente do Codespace.

> 💡 **Verifique no Codespace**: Execute `cd samples/book-app-project && python book_app.py help` para confirmar que o Python e o app de exemplo estão funcionando.

### Instalação Local

Siga estes passos se quiser executar o Copilot CLI em sua máquina local com os exemplos do curso.

1. Clone o repositório para obter os exemplos do curso em sua máquina:

    ```bash
    git clone https://github.com/github/copilot-cli-for-beginners
    cd copilot-cli-for-beginners
    ```

2. Instale o Copilot CLI usando uma das opções a seguir.

    > 💡 **Não tem certeza do que escolher?** Use `npm` se tiver o Node.js instalado. Caso contrário, escolha a opção que corresponda ao seu sistema.

    ### Todas as plataformas (npm)

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

    ### macOS/Linux (script de instalação)

    ```bash
    curl -fsSL https://gh.io/copilot-install | bash
    ```

<details>
<summary>Opcional: Ativar conclusão por tabulação no shell</summary>

A conclusão por tabulação do shell permite pressionar **Tab** para completar subcomandos do `copilot`, opções de comando e alguns valores de opção. Isso é opcional, mas pode ser útil depois que você se sentir confortável usando o CLI.

O Copilot CLI atualmente oferece scripts de conclusão para Bash, Zsh e Fish:

```shell
# Bash, somente na sessão atual
source <(copilot completion bash)

# Bash, persistente no Linux
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

<img src="assets/copilot-trust.png" alt="Confiando em arquivos em uma pasta com o Copilot CLI" width="800"/>

Após confiar na pasta, você pode entrar com sua conta GitHub.

```
> /login
```

**O que acontece em seguida:**

1. O Copilot CLI exibe um código temporário (ex.: `ABCD-1234`)
2. Seu navegador abrirá a página de autorização de dispositivo do GitHub. Faça login no GitHub se ainda não o fez.
3. Insira o código quando solicitado
4. Selecione "Authorize" (Autorizar) para conceder acesso ao GitHub Copilot CLI
5. Retorne ao terminal — você agora está autenticado!

<img src="assets/auth-device-flow.png" alt="Fluxo de autorização de dispositivo — mostrando o processo de 5 etapas, do login no terminal à confirmação de autenticação" width="800"/>

*Fluxo de autorização de dispositivo: seu terminal gera um código, você o verifica no navegador e o Copilot CLI é autenticado.*

**Dica**: O login persiste entre as sessões. Você só precisa fazer isso uma vez, a menos que seu token expire ou você faça logout explicitamente.

---

## Verifique se está funcionando

### Passo 1: Teste o Copilot CLI

Agora que você está conectado, vamos verificar se o Copilot CLI está funcionando para você. No terminal, inicie o CLI se ainda não o fez:

```bash
> Diga oi e me conte com o que você pode ajudar
```

Após receber uma resposta, você pode sair do CLI:

```bash
> /exit
```

---

<details>
<summary>🎬 Veja em ação!</summary>

![Demo de olá](assets/hello-demo.gif)

*A saída da demo varia. Seu modelo, ferramentas e respostas podem diferir do que é mostrado aqui.*

</details>

---

**Saída esperada**: Uma resposta amigável listando as capacidades do Copilot CLI.

### Passo 2: Execute o app de exemplo de livros

O curso fornece um app de exemplo que você explorará e melhorará ao longo do curso usando o CLI *(o código está em /samples/book-app-project)*. Verifique se o *app de terminal de coleção de livros em Python* funciona antes de começar. Execute `python` ou `python3` dependendo do seu sistema.

> **Observação:** Os exemplos principais mostrados ao longo do curso usam Python (`samples/book-app-project`), então você precisará ter [Python 3.10+](https://www.python.org/downloads/) disponível na sua máquina local se escolheu essa opção (o Codespace já o tem instalado). Versões em JavaScript (`samples/book-app-project-js`) e C# (`samples/book-app-project-cs`) também estão disponíveis se você preferir trabalhar com essas linguagens. Cada amostra tem um README com instruções para executar o app nessa linguagem.

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
> O que @samples/book-app-project/book_app.py faz?
```

**Saída esperada**: Um resumo das principais funções e comandos do app de livros.

Se você vir um erro, verifique a seção de [solução de problemas](#troubleshooting) abaixo.

Quando terminar, você pode sair do Copilot CLI:

```bash
> /exit
```

---

## ✅ Você está pronto!

Isso é tudo para a instalação. A parte prática começa no Capítulo 01, onde você irá:

- Ver como a IA revisa o app de livros e encontra problemas de qualidade de código instantaneamente
- Aprender três formas diferentes de usar o Copilot CLI
- Gerar código funcional a partir de instruções em linguagem natural

**[Continue para o Capítulo 01: Primeiros Passos →](../01-setup-and-first-steps/README.md)**

---

<a id="troubleshooting"></a>
## Solução de problemas

### "copilot: comando não encontrado"

A CLI não está instalada. Tente um método de instalação diferente:

```bash
# If brew failed, try npm:
npm install -g @github/copilot

# Or the install script:
curl -fsSL https://gh.io/copilot-install | bash
```

### "Você não tem acesso ao GitHub Copilot"

1. Verifique se você possui uma assinatura do Copilot em [github.com/settings/copilot](https://github.com/settings/copilot)
2. Verifique se a sua organização permite acesso ao CLI caso esteja usando uma conta de trabalho

### "Autenticação falhou"

Reautenticar:

```bash
copilot
> /login
```

### O navegador não abre automaticamente

Visite manualmente [github.com/login/device](https://github.com/login/device) e insira o código exibido no seu terminal.

### Token expirado

Basta executar `/login` novamente:

```bash
copilot
> /login
```

### Ainda com problemas?

- Verifique a [documentação do GitHub Copilot CLI](https://docs.github.com/copilot/concepts/agents/about-copilot-cli)
- Pesquise por problemas em [GitHub Issues](https://github.com/github/copilot-cli/issues)

---

## 🔑 Principais aprendizados

1. **Um GitHub Codespace é uma forma rápida de começar** — Python, pytest e o GitHub Copilot CLI já vêm pré-instalados, permitindo iniciar as demos imediatamente
2. **Múltiplos métodos de instalação** — Escolha o que funciona para o seu sistema (Homebrew, WinGet, npm ou script de instalação)
3. **Autenticação única** — O login persiste até que o token expire
4. **O app de livros funciona** — Você usará `samples/book-app-project` ao longo de todo o curso

> 📚 **Documentação oficial**: [Instalar o Copilot CLI](https://docs.github.com/copilot/how-tos/copilot-cli/cli-getting-started) para opções de instalação e requisitos.

> 📋 **Referência rápida**: Veja a [referência de comandos do GitHub Copilot CLI](https://docs.github.com/en/copilot/reference/cli-command-reference) para a lista completa de comandos e atalhos.

---

**[Continue para o Capítulo 01: Primeiros Passos →](../01-setup-and-first-steps/README.md)**
