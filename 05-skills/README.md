<!--
---
id: CopilotCLI-05
title: !translate Automatize Tarefas Repetitivas
description: !translate Crie e use Agent Skills para que o GitHub Copilot CLI aplique automaticamente instruções específicas de tarefas e melhores práticas da equipe.
audience: Desenvolvedores / Estudantes / Usuários de terminal
slug: automate-repetitive-tasks
weight: 6
---
-->

![Capítulo 05: Sistema de Skills](assets/chapter-header.png)

> **E se o Copilot pudesse aplicar automaticamente as melhores práticas da sua equipe sem que você precise explicá-las toda vez?**

Neste capítulo, você conhecerá as Agent Skills: pastas de instruções que o Copilot carrega automaticamente quando relevantes para sua tarefa. Enquanto agents mudam *como* o Copilot pensa, skills ensinam *maneiras específicas de executar tarefas*. Você criará uma skill de auditoria de segurança que o Copilot aplica quando você pedir por segurança, construirá critérios de revisão padronizados pela equipe para garantir qualidade consistente do código e aprenderá como skills funcionam no Copilot CLI, VS Code e no agente Copilot na nuvem do GitHub.


## 🎯 Objetivos de Aprendizagem

Ao final deste capítulo, você será capaz de:

- Entender como Agent Skills funcionam e quando usá-las
- Criar skills personalizadas com arquivos SKILL.md
- Usar skills da comunidade a partir de repositórios compartilhados
- Saber quando usar skills vs agents vs MCP

> ⏱️ **Tempo estimado**: ~55 minutos (20 min leitura + 35 min prático)

---

## 🧩 Analogia do mundo real: Ferramentas elétricas

Uma furadeira de uso geral é útil, mas acessórios especializados a tornam poderosa.
<img src="assets/power-tools-analogy.png" alt="Ferramentas elétricas — skills ampliam as capacidades do Copilot" width="800"/>


As skills funcionam da mesma forma. Assim como trocar brocas para tarefas diferentes, você pode adicionar skills ao Copilot para trabalhos distintos:

| Acessório de skill | Propósito |
|------------|---------|
| `commit` | Gerar mensagens de commit consistentes |
| `security-audit` | Verificar vulnerabilidades OWASP |
| `generate-tests` | Criar testes pytest abrangentes |
| `code-checklist` | Aplicar padrões de qualidade de código da equipe |



*Skills são acessórios especializados que ampliam o que o Copilot consegue fazer*

---

# Como as skills funcionam

<img src="assets/how-skills-work.png" alt="Ícones de skill brilhantes em estilo RPG conectados por trilhas de luz em um fundo estrelado representando skills do Copilot" width="800"/>

Aprenda o que são skills, por que elas importam e como diferem de agents e MCP.

---

## *Novo em Skills?* Comece aqui!

1. **Veja quais skills já estão disponíveis:**
   ```bash
   copilot
   > /skills list
   ```
   Isso mostra todas as skills que o Copilot consegue encontrar, incluindo **skills embutidas** que acompanham o CLI, além das skills do seu projeto e da sua pasta pessoal.

   > 💡 **Skills embutidas**: O Copilot CLI inclui algumas skills por padrão. Por exemplo, a skill `customizing-copilot-cloud-agents-environment` fornece um guia para customizar o ambiente do agente Copilot na nuvem. Não é necessário criar ou instalar nada para usá-las. Execute `/skills list` para ver o que está disponível.

2. **Veja um arquivo real de skill:** consulte nossa [code-checklist SKILL.md](../.github/skills/code-checklist/SKILL.md) fornecida para ver o padrão. É apenas frontmatter YAML mais instruções em Markdown.

3. **Entenda o conceito central:** skills são instruções específicas de tarefas que o Copilot carrega *automaticamente* quando seu prompt corresponde à descrição da skill. Você não precisa ativá-las, basta perguntar naturalmente.


## Entendendo as skills

Agent Skills são pastas que contêm instruções, scripts e recursos que o Copilot **carrega automaticamente quando relevantes** para sua tarefa. O Copilot analisa seu prompt, verifica se alguma skill corresponde e aplica as instruções relevantes automaticamente.

```bash
copilot

> Verifique books.py em relação à nossa lista de verificação de qualidade
# Copilot detects this matches your "code-checklist" skill
# and automatically applies its Python quality checklist

> Gere testes para a classe BookCollection
# Copilot loads your "pytest-gen" skill
# and applies your preferred test structure

> Quais são os problemas de qualidade de código neste arquivo?
# Copilot loads your "code-checklist" skill
# and checks against your team's standards
```

> 💡 **Insight principal**: skills são **acionadas automaticamente** com base na correspondência entre seu prompt e a descrição da skill. Basta perguntar naturalmente e o Copilot aplica skills relevantes nos bastidores. Você também pode invocar skills diretamente, como aprenderá a seguir.

> 🧰 **Templates prontos para usar**: confira a pasta [.github/skills](../.github/skills/) para skills simples de copiar e colar que você pode experimentar.

### Invocação direta via comando com barra

Embora o acionamento automático seja a forma principal de funcionamento das skills, você também pode **invocar skills diretamente** usando seu nome como um comando com barra:

```bash
> /generate-tests Create tests for the user authentication module

> /code-checklist Check books.py for code quality issues

> /security-audit Check the API endpoints for vulnerabilities
```

Isso dá controle explícito quando você quer garantir que uma skill específica seja usada.

#### Combinando múltiplas skills em uma única mensagem

Você pode invocar **mais de uma skill em uma única mensagem**, e o comando com barra da skill pode aparecer em qualquer lugar do seu prompt — não apenas no início. Isso é útil quando você quer realizar duas verificações diferentes de uma vez:

```bash
> Verifique @samples/book-app-project/book_app.py com /code-checklist e também execute /generate-tests para ele

> Revise o módulo de autenticação /security-audit e depois /code-checklist o resultado
```

O Copilot aplicará cada skill nomeada na mesma resposta, poupando você de enviar várias mensagens separadas.

> 💡 **Dica**: coloque os comandos com barra de skill onde parecerem mais naturais na sua frase. Você pode colocá-los no início, no meio ou no fim da mensagem.

> 📝 **Skills vs invocação de agents**: não confunda invocação de skill com invocação de agent:
> - **Skills**: `/skill-name <prompt>`, por exemplo `/code-checklist Check this file`
> - **Agents**: `/agent` (selecionar da lista) ou `copilot --agent <name>` (linha de comando)
>
> Se você tiver uma skill e um agent com o mesmo nome (por exemplo, "code-reviewer"), digitar `/code-reviewer` invoca a **skill**, não o agent.

### Como saber se uma skill foi utilizada?

Você pode perguntar diretamente ao Copilot:

```bash
> Quais skills você usou para essa resposta?

> Quais skills você tem disponíveis para revisões de segurança?
```

### Skills vs Agents vs MCP

As skills são apenas uma parte do modelo de extensibilidade do GitHub Copilot. Veja como elas se comparam a agents e servidores MCP.

> *Não se preocupe com MCP por enquanto. Vamos cobrir isso no [Capítulo 06](../06-mcp-servers/). Está incluído aqui para você entender como as skills se encaixam no panorama geral.*

<img src="assets/skills-agents-mcp-comparison.png" alt="Diagrama de comparação mostrando as diferenças entre agents, skills e servidores MCP e como eles se combinam ao seu fluxo de trabalho" width="800"/>

| Função | O que faz | Quando usar |
|---------|--------------|-------------|
| **Agents** | Muda como a IA pensa | Precisa de expertise especializada em várias tarefas |
| **Skills** | Fornece instruções específicas de tarefas | Tarefas específicas e repetíveis com etapas detalhadas |
| **MCP** | Conecta serviços externos | Precisa de dados ao vivo de APIs |

Use agents para expertise ampla, skills para instruções específicas de tarefas e MCP para dados externos. Um agent pode usar uma ou mais skills durante uma conversa. Por exemplo, quando você pede a um agent para verificar seu código, ele pode aplicar automaticamente tanto uma skill `security-audit` quanto uma skill `code-checklist`.

> 📚 **Saiba mais**: veja a documentação oficial [About Agent Skills](https://docs.github.com/copilot/concepts/agents/about-agent-skills) para a referência completa sobre formatos de skill e melhores práticas.

---

## De prompts manuais a expertise automática

Antes de mergulhar em como criar skills, vamos ver *por que* vale a pena aprendê-las. Depois que você vê os ganhos de consistência, o "como" faz mais sentido.

### Antes das skills: revisões inconsistentes

A cada revisão de código, você pode esquecer algo:

```bash
copilot

> Revise este código procurando por problemas
# Generic review - might miss your team's specific concerns
```

Ou você escreve um prompt longo toda vez:

```bash
> Revise este código procurando por cláusulas except nuas, type hints ausentes,
> argumentos padrão mutáveis, context managers ausentes para I/O de arquivo,
> funções com mais de 50 linhas, instruções print em código de produção...
```

Tempo: **30+ segundos** para digitar. Consistência: **varia conforme a memória**.

### Depois das skills: melhores práticas automáticas

Com uma skill `code-checklist` instalada, basta perguntar naturalmente:

```bash
copilot

> Verifique o código da coleção de livros procurando por problemas de qualidade
```

**O que acontece nos bastidores**:
1. O Copilot vê "code quality" e "issues" no seu prompt
2. Verifica descrições de skills, encontra sua skill `code-checklist` correspondente
3. Carrega automaticamente a checklist de qualidade da sua equipe
4. Aplica todas as verificações sem você listá-las

<img src="assets/skill-auto-discovery-flow.png" alt="Como skills são acionadas automaticamente — fluxo de 4 etapas mostrando como o Copilot corresponde automaticamente seu prompt à skill certa" width="800"/>

*Basta perguntar naturalmente. O Copilot corresponde seu prompt à skill certa e a aplica automaticamente.*

**Saída**:
```
## Checklist de Código: books.py

### Qualidade de Código
- [PASS] Todas as funções possuem type hints
- [PASS] Sem cláusulas "bare except"
- [PASS] Sem argumentos padrão mutáveis
- [PASS] Context managers usados para I/O de arquivos
- [PASS] Funções com menos de 50 linhas
- [PASS] Nomes de variáveis e funções seguem PEP 8

### Validação de Entrada
- [FAIL] A entrada do usuário não é validada - add_book() aceita qualquer valor de ano
- [FAIL] Casos de borda não tratados completamente - strings vazias aceitas para título/autor
- [PASS] Mensagens de erro são claras e úteis

### Testes
- [FAIL] Nenhum teste pytest correspondente encontrado

### Resumo
3 itens precisam de atenção antes do merge
```

**A diferença**: os padrões da sua equipe são aplicados automaticamente, toda vez, sem que você precise digitá-los.

---

<details>
<summary>🎬 Veja em ação!</summary>

![Demo de acionamento de skill](assets/skill-trigger-demo.gif)

*A saída da demo varia. Seu modelo, ferramentas e respostas podem diferir do que é mostrado aqui.*

</details>

---

## Consistência em escala: skill de revisão de PR da equipe

Imagine que sua equipe tenha uma checklist de PR com 10 pontos. Sem uma skill, cada desenvolvedor precisa lembrar dos 10 pontos, e alguém sempre esquece um deles. Com uma skill `pr-review`, toda a equipe obtém revisões consistentes:

```bash
copilot

> Você pode revisar este PR?
```

O Copilot carrega automaticamente a skill `pr-review` da sua equipe e verifica todos os 10 pontos:

```
PR Review: feature/user-auth

## Security ✅
- No hardcoded secrets
- Input validation present
- No bare except clauses

## Code Quality ⚠️
- [WARN] print statement on line 45 - remove before merge
- [WARN] TODO on line 78 missing issue reference
- [WARN] Missing type hints on public functions

## Testing ✅
- New tests added
- Edge cases covered

## Documentation ❌
- [FAIL] Breaking change not documented in CHANGELOG
- [FAIL] API changes need OpenAPI spec update
```

**O poder**: todos os membros da equipe aplicam os mesmos padrões automaticamente. Novos contratados não precisam memorizar a checklist porque a skill cuida disso.

---

# Criando skills personalizadas

<img src="assets/creating-managing-skills.png" alt="Mãos humanas e robóticas construindo uma parede de blocos brilhantes tipo LEGO representando criação e gerenciamento de skills" width="800"/>

Crie suas próprias skills a partir de arquivos SKILL.md.

---

## Localizações de skills

Skills são armazenadas em `.github/skills/` (específico do projeto) ou `~/.copilot/skills/` (nível de usuário).

### Como o Copilot encontra skills

O Copilot varre automaticamente estas localizações em busca de skills:

| Localização | Escopo |
|----------|-------|
| `.github/skills/` | Específico do projeto (compartilhado com a equipe via git) |
| `~/.copilot/skills/` | Específico do usuário (suas skills pessoais) |

### Estrutura de uma skill

Cada skill vive em sua própria pasta com um arquivo `SKILL.md`. Você pode opcionalmente incluir scripts, exemplos ou outros recursos:

```
.github/skills/
└── my-skill/
    ├── SKILL.md           # Required: Skill definition and instructions
    ├── examples/          # Optional: Example files Copilot can reference
    │   └── sample.py
    └── scripts/           # Optional: Scripts the skill can use
        └── validate.sh
```

> 💡 **Dica**: o nome do diretório deve corresponder ao `name` no frontmatter do seu SKILL.md (letras minúsculas com hífens).

### Formato do SKILL.md

Skills usam um formato simples em Markdown com frontmatter YAML:

```markdown
---
name: code-checklist
description: Comprehensive code quality checklist with security, performance, and maintainability checks
license: MIT
---

# Code Checklist

When checking code, look for:

## Security
- SQL injection vulnerabilities
- XSS vulnerabilities
- Authentication/authorization issues
- Sensitive data exposure

## Performance
- N+1 query problems (running one query per item instead of one query for all items)
- Unnecessary loops or computations
- Memory leaks
- Blocking operations

## Maintainability
- Function length (flag functions > 50 lines)
- Code duplication
- Missing error handling
- Unclear naming

## Output Format
Provide issues as a numbered list with severity:
- [CRITICAL] - Must fix before merge
- [HIGH] - Should fix before merge
- [MEDIUM] - Should address soon
- [LOW] - Nice to have
```

**Propriedades YAML:**

| Propriedade | Obrigatória | Descrição |
|----------|----------|-------------|
| `name` | **Sim** | Identificador único (letras minúsculas, hífens para espaços) |
| `description` | **Sim** | O que a skill faz e quando o Copilot deve usá-la |
| `license` | Não | Licença que se aplica a esta skill |

> 📖 **Documentação oficial**: [About Agent Skills](https://docs.github.com/copilot/concepts/agents/about-agent-skills)

### Criando sua primeira skill

Vamos criar uma skill de auditoria de segurança que verifica vulnerabilidades do OWASP Top 10:

```bash
# Create skill directory
mkdir -p .github/skills/security-audit

# Create the SKILL.md file
cat > .github/skills/security-audit/SKILL.md << 'EOF'
---
name: security-audit
description: Security-focused code review checking OWASP (Open Web Application Security Project) Top 10 vulnerabilities
---

# Security Audit

Perform a security audit checking for:

## Injection Vulnerabilities
- SQL injection (string concatenation in queries)
- Command injection (unsanitized shell commands)
- LDAP injection
- XPath injection

## Authentication Issues
- Hardcoded credentials
- Weak password requirements
- Missing rate limiting
- Session management flaws

## Sensitive Data
- Plaintext passwords
- API keys in code
- Logging sensitive information
- Missing encryption

## Access Control
- Missing authorization checks
- Insecure direct object references
- Path traversal vulnerabilities

## Output
For each issue found, provide:
1. File and line number
2. Vulnerability type
3. Severity (CRITICAL/HIGH/MEDIUM/LOW)
4. Recommended fix
EOF

# Test your skill (skills load automatically based on your prompt)
copilot

> @samples/book-app-project/ Check this code for security vulnerabilities
# Copilot detects "security vulnerabilities" matches your skill
# and automatically applies its OWASP checklist
```

**Saída esperada** (seus resultados variarão):

```
Security Audit: book-app-project

[HIGH] Hardcoded file path (book_app.py, line 12)
  File path is hardcoded rather than configurable
  Fix: Use environment variable or config file

[MEDIUM] No input validation (book_app.py, line 34)
  User input passed directly to function without sanitization
  Fix: Add input validation before processing

✅ No SQL injection found
✅ No hardcoded credentials found
```

---

## Escrevendo boas descrições de skill

O campo `description` no seu SKILL.md é crucial! É assim que o Copilot decide se deve carregar sua skill:

```markdown
---
name: security-audit
description: Use for security reviews, vulnerability scanning,
  checking for SQL injection, XSS, authentication issues,
  OWASP Top 10 vulnerabilities, and security best practices
---
```

> 💡 **Dica**: inclua palavras-chave que correspondam à forma como você naturalmente faz perguntas. Se você diz "security review", inclua "security review" na descrição.

### Combinando skills com agents

Skills e agents trabalham juntos. O agent fornece expertise; a skill fornece instruções específicas:

```bash
# Start with a code-reviewer agent
copilot --agent code-reviewer

> Verifique o app de livros procurando por problemas de qualidade
# code-reviewer agent's expertise combines
# with your code-checklist skill's checklist
```

---

# Gerenciando e compartilhando skills

Descubra skills instaladas, encontre skills da comunidade e compartilhe as suas.

<img src="assets/managing-sharing-skills.png" alt="Gerenciando e compartilhando skills — mostrando o ciclo descobrir, usar, criar e compartilhar para skills do CLI" width="800" />

---

## Gerenciando skills com o comando `/skills`

Use o comando `/skills` para gerenciar suas skills instaladas:

| Comando | O que faz |
|---------|--------------|
| `/skills list` | Mostrar todas as skills instaladas |
| `/skills info <name>` | Obter detalhes sobre uma skill específica |
| `/skills add <name>` | Habilitar uma skill (de um repositório ou marketplace) |
| `/skills remove <name>` | Desabilitar ou desinstalar uma skill |
| `/skills reload` | Recarregar skills depois de editar arquivos SKILL.md |

> 💡 **Lembre-se**: você não precisa "ativar" skills para cada prompt. Depois de instaladas, as skills são **acionadas automaticamente** quando seu prompt corresponde à descrição delas. Esses comandos servem para gerenciar quais skills estão disponíveis, não para usá-las.

### Exemplo: ver suas skills

```bash
copilot

> /skills list

Available skills:
- security-audit: Security-focused code review checking OWASP Top 10
- generate-tests: Generate comprehensive unit tests with edge cases
- code-checklist: Team code quality checklist
...

> /skills info security-audit

Skill: security-audit
Source: Project
Location: .github/skills/security-audit/SKILL.md
Description: Security-focused code review checking OWASP Top 10 vulnerabilities
```

---

<details>
<summary>🎬 Veja em ação!</summary>

![Demo de lista de skills](assets/list-skills-demo.gif)

*A saída da demo varia. Seu modelo, ferramentas e respostas podem diferir do que é mostrado aqui.*

</details>

---

### Quando usar `/skills reload`

Depois de criar ou editar o arquivo SKILL.md de uma skill, execute `/skills reload` para captar as mudanças sem reiniciar o Copilot:

```bash
# Edit your skill file
# Then in Copilot:
> /skills reload
Skills reloaded successfully.
```

> 💡 **Bom saber**: skills permanecem eficazes mesmo depois de usar `/compact` para resumir seu histórico de conversa. Não é necessário recarregar depois de compactar.

---

## Encontrando e usando skills da comunidade

### Usando plugins para instalar skills

> 💡 **O que são plugins?** Plugins são pacotes instaláveis que podem agrupar skills, agents e configurações de servidores MCP. Pense neles como extensões de "app store" para o Copilot CLI.

O comando `/plugin` permite navegar e instalar esses pacotes:

```bash
copilot

> /plugin list
# Shows installed plugins

> /plugin marketplace
# Browse available plugins

> /plugin install <plugin-name>
# Install a plugin from the marketplace
```

Para manter seu catálogo local de plugins atualizado, atualize-o com:

```bash
copilot plugin marketplace update
```

Plugins podem agrupar várias capacidades. Um único plugin pode incluir skills, agents e configurações de servidores MCP relacionadas que trabalham juntas.

### Repositórios de skills da comunidade

Skills prontas também estão disponíveis em repositórios da comunidade:

- **[Awesome Copilot](https://github.com/github/awesome-copilot)** - Recursos oficiais do GitHub Copilot, incluindo documentação e exemplos de skills

### Instalando uma skill da comunidade com GitHub CLI

A maneira mais fácil de instalar uma skill de um repositório do GitHub é usando o comando `gh skill install` (requer [GitHub CLI v2.90.0+](https://github.blog/changelog/2026-04-16-manage-agent-skills-with-github-cli/)):

```bash
# Browse and interactively select a skill from awesome-copilot
gh skill install github/awesome-copilot

# Or install a specific skill directly
gh skill install github/awesome-copilot ai-ready

# Install for personal use across all projects (user scope)
gh skill install github/awesome-copilot ai-ready --scope user
```

> ⚠️ **Revise antes de instalar**: sempre leia o `SKILL.md` de uma skill antes de instalá-la. Skills controlam o que o Copilot faz, e uma skill maliciosa poderia instruí-lo a executar comandos prejudiciais ou modificar código de formas inesperadas.

---

# Prática

<img src="../assets/practice.png" alt="Ambiente de mesa aconchegante com monitor mostrando código, luminária, xícara de café e fones de ouvido prontos para prática" width="800"/>

Aplique o que você aprendeu criando e testando suas próprias skills.

---

## ▶️ Experimente você mesmo

### Criar mais skills

Aqui estão mais duas skills mostrando padrões diferentes. Siga o mesmo fluxo `mkdir` + `cat` de "Criando sua primeira skill" acima ou copie e cole as skills no local adequado. Mais exemplos estão disponíveis em [.github/skills](../.github/skills).

### Skill de geração de testes pytest

Uma skill que garante estrutura pytest consistente em sua base de código:

```bash
mkdir -p .github/skills/pytest-gen

cat > .github/skills/pytest-gen/SKILL.md << 'EOF'
---
name: pytest-gen
description: Generate comprehensive pytest tests with fixtures and edge cases
---

# pytest Test Generation

Generate pytest tests that include:

## Test Structure
- Use pytest conventions (test_ prefix)
- One assertion per test when possible
- Clear test names describing expected behavior
- Use fixtures for setup/teardown

## Coverage
- Happy path scenarios
- Edge cases: None, empty strings, empty lists
- Boundary values
- Error scenarios with pytest.raises()

## Fixtures
- Use @pytest.fixture for reusable test data
- Use tmpdir/tmp_path for file operations
- Mock external dependencies with pytest-mock

## Output
Provide complete, runnable test file with proper imports.
EOF
```

### Skill de revisão de PR da equipe

Uma skill que impõe padrões consistentes de revisão de PR em sua equipe:

```bash
mkdir -p .github/skills/pr-review

cat > .github/skills/pr-review/SKILL.md << 'EOF'
---
name: pr-review
description: Team-standard PR review checklist
---

# PR Review

Review code changes against team standards:

## Security Checklist
- [ ] No hardcoded secrets or API keys
- [ ] Input validation on all user data
- [ ] No bare except clauses
- [ ] No sensitive data in logs

## Code Quality
- [ ] Functions under 50 lines
- [ ] No print statements in production code
- [ ] Type hints on public functions
- [ ] Context managers for file I/O
- [ ] No TODOs without issue references

## Testing
- [ ] New code has tests
- [ ] Edge cases covered
- [ ] No skipped tests without explanation

## Documentation
- [ ] API changes documented
- [ ] Breaking changes noted
- [ ] README updated if needed

## Output Format
Provide results as:
- ✅ PASS: Items that look good
- ⚠️ WARN: Items that could be improved
- ❌ FAIL: Items that must be fixed before merge
EOF
```

### Vá além

1. **Desafio de criação de skill**: crie uma skill `quick-review` que faça uma checklist de 3 pontos:
   - Cláusulas bare except
   - Type hints ausentes
   - Nomes de variáveis pouco claros

   Teste perguntando: "Do a quick review of books.py"

2. **Comparação de skills**: cronometre quanto tempo leva para escrever manualmente um prompt detalhado de revisão de segurança. Depois apenas pergunte "Check for security issues in this file" e deixe sua skill security-audit carregar automaticamente. Quanto tempo a skill economizou?

3. **Desafio de skill da equipe**: pense na checklist de revisão de código da sua equipe. Você poderia codificá-la como uma skill? Anote 3 coisas que a skill sempre deve verificar.

**Autoverificação**: você entende skills quando consegue explicar por que o campo `description` importa (é assim que o Copilot decide se carrega sua skill).

---

## 📝 Tarefa

### Desafio principal: Criar uma skill de resumo de livros

Os exemplos acima criaram as skills `pytest-gen` e `pr-review`. Agora pratique criando um tipo completamente diferente de skill: uma para gerar saída formatada a partir de dados.

1. Liste suas skills atuais: execute Copilot e passe `/skills list`. Você também pode usar `ls .github/skills/` para ver skills do projeto ou `ls ~/.copilot/skills/` para skills pessoais.
2. Crie uma skill `book-summary` em `.github/skills/book-summary/SKILL.md` que gera um resumo Markdown formatado da coleção de livros
3. Sua skill deve ter:
   - Nome e descrição claros (description é crucial para correspondência!)
   - Regras específicas de formatação (por exemplo, tabela Markdown com título, autor, ano e status de leitura)
   - Convenções de saída (por exemplo, usar ✅/❌ para status de leitura, ordenar por ano)
4. Teste a skill: `@samples/book-app-project/data.json Summarize the books in this collection`
5. Verifique o acionamento automático da skill conferindo `/skills list`
6. Tente invocá-la diretamente com `/book-summary Summarize the books in this collection`

**Critérios de sucesso**: você tem uma skill `book-summary` funcionando que o Copilot aplica automaticamente quando você pergunta sobre a coleção de livros.

<details>
<summary>💡 Dicas (clique para expandir)</summary>

**Template inicial**: crie `.github/skills/book-summary/SKILL.md`:

```markdown
---
name: book-summary
description: Generate a formatted markdown summary of a book collection
---

# Book Summary Generator

Generate a summary of the book collection following these rules:

1. Output a markdown table with columns: Title, Author, Year, Status
2. Use ✅ for read books and ❌ for unread books
3. Sort by year (oldest first)
4. Include a total count at the bottom
5. Flag any data issues (missing authors, invalid years)

Example:
| Title | Author | Year | Status |
|-------|--------|------|--------|
| 1984 | George Orwell | 1949 | ✅ |
| Dune | Frank Herbert | 1965 | ❌ |

**Total: 2 books (1 read, 1 unread)**
```

**Teste:**
```bash
copilot
> @samples/book-app-project/data.json Summarize the books in this collection
# The skill should auto-trigger based on the description match
```

**Se ela não for acionada:** tente `/skills reload` e pergunte novamente.

</details>

### Desafio bônus: Skill de mensagem de commit

1. Crie uma skill `commit-message` que gera mensagens de commit convencionais com formato consistente
2. Teste preparando uma mudança e perguntando: "Generate a commit message for my staged changes"
3. Documente sua skill e compartilhe-a no GitHub com o tópico `copilot-skill`

---

<details>
<summary>🔧 <strong>Erros comuns e solução de problemas</strong> (clique para expandir)</summary>

### Erros comuns

| Erro | O que acontece | Correção |
|---------|--------------|-----|
| Nomear o arquivo com algo diferente de `SKILL.md` | A skill não será reconhecida | O arquivo deve se chamar exatamente `SKILL.md` |
| Campo `description` vago | A skill nunca é carregada automaticamente | Description é o mecanismo principal de descoberta. Use palavras de acionamento específicas |
| `name` ou `description` ausentes no frontmatter | A skill falha ao carregar | Adicione ambos os campos no frontmatter YAML |
| Localização da pasta errada | Skill não encontrada | Use `.github/skills/skill-name/` (projeto) ou `~/.copilot/skills/skill-name/` (pessoal) |

### Solução de problemas

**Skill não está sendo usada** - Se o Copilot não estiver usando sua skill quando esperado:

1. **Verifique a descrição**: ela corresponde à forma como você está perguntando?
   ```markdown
   # Bad: Too vague
   description: Reviews code

   # Good: Includes trigger words
   description: Use for code reviews, checking code quality,
     finding bugs, security issues, and best practice violations
   ```

2. **Verifique a localização do arquivo**:
   ```bash
   # Project skills
   ls .github/skills/

   # User skills
   ls ~/.copilot/skills/
   ```

3. **Verifique o formato do SKILL.md**: frontmatter é obrigatório:
   ```markdown
   ---
   name: skill-name
   description: O que esta skill faz e quando usá-la
   ---

   # Instructions here
   ```

**Skill não aparece** - Verifique a estrutura de pastas:
```
.github/skills/
└── my-skill/           # Folder name
    └── SKILL.md        # Must be exactly SKILL.md (case-sensitive)
```

Execute `/skills reload` depois de criar ou editar skills para garantir que as mudanças sejam captadas.

**Testando se uma skill carrega** - Pergunte diretamente ao Copilot:
```bash
> Quais skills você tem disponíveis para verificar qualidade de código?
# Copilot will describe relevant skills it found
```

**Como sei que minha skill está funcionando?**

1. **Verifique o formato de saída**: se sua skill especifica um formato de saída (como tags `[CRITICAL]`), procure isso na resposta
2. **Pergunte diretamente**: depois de obter uma resposta, pergunte "Did you use any skills for that?"
3. **Compare com/sem**: tente o mesmo prompt com `--no-custom-instructions` para ver a diferença:
   ```bash
   # With skills
   copilot --allow-all -p "Review @file.py for security issues"

   # Without skills (baseline comparison)
   copilot --allow-all -p "Review @file.py for security issues" --no-custom-instructions
   ```
4. **Verifique verificações específicas**: se sua skill inclui verificações específicas (como "functions over 50 lines"), veja se elas aparecem na saída

</details>

---

# Resumo

## 🔑 Principais aprendizados

1. **Skills são automáticas**: o Copilot as carrega quando seu prompt corresponde à descrição da skill
2. **Invocação direta**: você também pode invocar skills diretamente com `/skill-name` como comando com barra
3. **Formato SKILL.md**: frontmatter YAML (name, description, license opcional) mais instruções em Markdown
4. **Localização importa**: `.github/skills/` para compartilhamento em projeto/equipe, `~/.copilot/skills/` para uso pessoal
5. **Description é a chave**: escreva descrições que correspondam à forma como você naturalmente faz perguntas

> 📋 **Referência rápida**: Veja a [referência de comandos do GitHub Copilot CLI](https://docs.github.com/en/copilot/reference/cli-command-reference) para uma lista completa de comandos e atalhos.

---

## ➡️ O que vem a seguir

Skills ampliam o que o Copilot consegue fazer com instruções carregadas automaticamente. Mas e quanto a conectar serviços externos? É aí que o MCP entra.

Em **[Capítulo 06: Servidores MCP](../06-mcp-servers/README.md)**, você aprenderá:

- O que é MCP (Model Context Protocol)
- Como conectar ao GitHub, sistema de arquivos e serviços de documentação
- Como configurar servidores MCP
- Fluxos de trabalho com vários servidores

---

**[← Voltar ao Capítulo 04](../04-agents-custom-instructions/README.md)** | **[Continue para o Capítulo 06 →](../06-mcp-servers/README.md)**
