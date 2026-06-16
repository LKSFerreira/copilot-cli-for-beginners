# Glossário

Referência rápida para termos técnicos usados ao longo deste curso. Não se preocupe em memorizar agora — consulte quando precisar.

---

## A

### Agent

Uma persona de IA especializada com conhecimento de domínio (por exemplo, frontend, segurança). Definida em arquivos `.agent.md` com frontmatter YAML que contém, no mínimo, o campo `description`.

### API

Application Programming Interface. Uma forma de comunicação entre programas (interface de programação de aplicações).

---

## C

### CI/CD

Continuous Integration/Continuous Deployment. Pipelines automatizados de testes e deploy.

### CLI

Command Line Interface. Uma interface de linha de comando — uma forma baseada em texto de interagir com software (como esta ferramenta).

### Context Window

A quantidade de texto que uma IA pode considerar de uma só vez. Pense como uma mesa com espaço limitado: arquivos, histórico de conversa e prompts do sistema ocupam espaço nessa janela de contexto.

### Context Manager

Um recurso do Python que usa a instrução `with` para gerenciar automaticamente configuração e limpeza (por exemplo, abrir e fechar arquivos). Exemplo: `with open("file.txt") as f:` garante que o arquivo seja fechado mesmo em caso de erro.

### Conventional Commit

Formato padronizado de mensagem de commit: `type(scope): description`. Tipos comuns incluem `feat` (nova funcionalidade), `fix` (correção), `docs` (documentação), `refactor` e `test`. Exemplo: `feat(auth): add password reset flow`.

### Dataclass

Decorador do Python (`@dataclass`) que gera automaticamente `__init__`, `__repr__` e outros métodos para classes que servem principalmente para armazenar dados. Usado no book app para definir a classe `Book` com campos como `title`, `author`, `year` e `read`.

---

## F

### Frontmatter

Metadados no topo de um arquivo Markdown delimitados por `---`. Usados em arquivos de agente e skill para definir propriedades como `description` e `name` em formato YAML.

---

## G

### Glob Pattern

Padrão com curingas usado para corresponder caminhos de arquivos (por exemplo, `*.py` encontra todos os arquivos Python, `*.js` encontra arquivos JavaScript).

---

## J

### JWT

JSON Web Token. Um mecanismo seguro para transmitir informações de autenticação entre sistemas.

---

## M

### MCP

Model Context Protocol. Um padrão para conectar assistentes de IA a fontes de dados externas.

---

### Memory (Copilot CLI)

Recurso que permite ao Copilot CLI lembrar fatos e preferências *entre sessões*, não apenas dentro de uma única conversa. Diferente do histórico de sessão (que salva uma conversa específica), a memória persiste globalmente e é aplicada automaticamente em sessões futuras. Gerenciada pelo comando com barra `/memory` (`/memory on`, `/memory off`, `/memory show`). A memória pode ser escopada ao seu usuário (visível em todos os repositórios) ou a um repositório específico (compartilhada com colaboradores).

---

## N

### npx

Ferramenta do Node.js que executa pacotes npm sem instalá-los globalmente. Usada em configurações de servidores MCP para iniciar servidores (por exemplo, `npx @modelcontextprotocol/server-filesystem`).

---

## O

### OWASP

Open Web Application Security Project. Organização que publica boas práticas de segurança e mantém a lista "OWASP Top 10" com os riscos de segurança mais críticos para aplicações web.

---

## P

### PEP 8

Python Enhancement Proposal 8. Guia de estilo oficial para código Python, cobrindo convenções de nomeação (snake_case para funções, PascalCase para classes), indentação (4 espaços) e layout do código. Seguir o PEP 8 torna o código mais consistente e legível.

### Pre-commit Hook

Script executado automaticamente antes de cada `git commit`. Pode ser usado para rodar revisões de segurança com o Copilot ou checagens de qualidade de código antes do commit.

### pytest

Framework de testes Python popular por sua sintaxe simples, fixtures poderosas e ecossistema de plugins. Usado neste curso para testar o book app. Testes são executados com `python -m pytest tests/`.

### Programmatic Mode

Executar o Copilot com a flag `-p` para comandos únicos, sem interação.

---

## R

### Rate Limiting

Limitações na quantidade de requisições a uma API em um período de tempo. O Copilot pode limitar temporariamente respostas se você exceder a cota do seu plano.

---

## S

### Session

Uma conversa com o Copilot que mantém contexto e pode ser retomada posteriormente.

### Skill

Pasta com instruções que o Copilot carrega automaticamente quando relevantes para seu prompt. Definidas em arquivos `SKILL.md` com frontmatter YAML.

### Slash Command

Comandos que começam com `/` para controlar o Copilot (por exemplo, `/help`, `/clear`, `/model`).

---

## T

### Token

Unidade de texto que modelos de IA processam. Aproximadamente 4 caracteres ou 0,75 palavras. Usado para medir entrada (prompts e contexto) e saída (respostas da IA).

### Type Hints

Anotações do Python que indicam tipos esperados de parâmetros e valores retornados (ex.: `def add_book(title: str, year: int) -> Book:`). Não impõem tipos em tempo de execução, mas ajudam na clareza do código, suporte em IDE e ferramentas de análise estática como mypy.

---

## W

### WCAG

Web Content Accessibility Guidelines. Padrões publicados pelo W3C para tornar conteúdo web acessível a pessoas com deficiência. WCAG 2.1 AA é um alvo comum de conformidade.

---

## Y

### YAML

YAML Ain't Markup Language. Formato legível por humanos usado para configuração. Neste curso, o YAML aparece no frontmatter de agentes e skills (o bloco `---` no topo de `.agent.md` e `SKILL.md`).
