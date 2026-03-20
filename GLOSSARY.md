# Glossário

Referência rápida para termos técnicos usados ao longo deste curso. Não se preocupe em memorizá-los agora - volte aqui sempre que necessário.

---

## A

### Agente (Agent)

Uma personalidade especializada de IA com expertise em um domínio (ex: frontend, segurança). Definidos em arquivos `.agent.md` com YAML frontmatter contendo, no mínimo, o campo `description` (descrição).

### API

Application Programming Interface (Interface de Programação de Aplicações). Uma forma de os programas se comunicarem uns com os outros.

---

## C

### CI/CD

Integração Contínua/Entrega Contínua. Pipelines automatizados de testes e implantação.

### CLI

Command Line Interface (Interface de Linha de Comando). Uma maneira baseada em texto para interagir com softwares (como esta ferramenta!).

### Janela de Contexto (Context Window)

A quantidade de texto que uma IA pode considerar de uma vez só. É como uma mesa de trabalho que só tem espaço para uma certa quantidade de coisas. Quando você adiciona arquivos, histórico de conversas e prompts de sistema, tudo isso ocupa espaço nesta janela.

### Gerenciador de Contexto (Context Manager)

Uma construção em Python usando a declaração `with` que lidam automaticamente com configuração e limpeza (como abrir e fechar arquivos). Exemplo: `with open("file.txt") as f:` garante que o arquivo será fechado mesmo que ocorra um erro.

### Commit Convencional (Conventional Commit)

Um formato de mensagem de commit que segue uma estrutura padronizada: `tipo(escopo): descrição`. Tipos comuns incluem `feat` (nova funcionalidade), `fix` (correção de bug), `docs` (documentação), `refactor` e `test`. Exemplo: `feat(auth): add password reset flow`.

### Dataclass

Um decorador Python (`@dataclass`) que gera automaticamente métodos como `__init__`, `__repr__` e outros para classes que servem primariamente para armazenar dados. Usado no aplicativo de livros para definir a classe `Book` com atributos como `title`, `author`, `year` e `read`.

---

## F

### Frontmatter

Metadados no topo de um arquivo Markdown delimitados por `---`. Usado em arquivos de agentes e skills para definir propriedades como `description` (descrição) e `name` (nome) no formato YAML.

---

## G

### Padrão Glob (Glob Pattern)

Um padrão que usa curingas para combinar caminhos de arquivos (ex: `*.py` corresponde a todos os arquivos Python, `*.js` a todos os arquivos JavaScript).

---

## J

### JWT

JSON Web Token. Uma maneira segura de transmitir informações de autenticação entre sistemas.

---

## M

### MCP

Model Context Protocol. Um padrão para conectar assistentes de IA a fontes de dados externas.

---

## N

### npx

Uma ferramenta Node.js que executa pacotes npm sem instalá-los globalmente. Usado em configurações de servidores MCP para iniciar os servidores (ex: `npx @modelcontextprotocol/server-filesystem`).

---

## O

### OWASP

Open Web Application Security Project. Uma organização que publica as melhores práticas de segurança e mantém a lista "OWASP Top 10" sobre os riscos de segurança em aplicações web mais críticos.

---

## P

### PEP 8

A Proposta de Melhoria do Python N° 8 (Python Enhancement Proposal 8). O guia oficial de estilo para código Python, cobrindo convenções de nomenclatura (snake_case para funções, PascalCase para classes), recuo (4 espaços) e estrutura do código. Seguir a PEP 8 torna o código Python consistente e legível.

### Hook de Pre-commit

Um script que executa automaticamente antes de cada `git commit`. Pode ser usado para rodar revisões de segurança do Copilot ou verificações de qualidade de código antes que ele seja commitado.

### pytest

Um popular framework de testes em Python conhecido pela sua sintaxe simples, fixtures poderosas e um vasto ecossistema de plugins. Usado durante este curso para testar o aplicativo de livros. Os testes são executados com `python -m pytest tests/`.

### Modo Programático (Programmatic Mode)

Execução do Copilot com a flag `-p` para comandos únicos sem interação de chat.

---

## R

### Limite de Requisições (Rate Limiting)

Restrições sobre quantas chamadas você pode fazer a uma API dentro de um determinado período. O Copilot pode limitar temporariamente as respostas caso você exceda a cota de uso do seu plano.

---

## S

### Sessão (Session)

Uma conversa com o Copilot que mantém o contexto e pode ser continuada mais tarde.

### Skill

Uma pasta com instruções que o Copilot carrega automaticamente quando são relevantes para o seu prompt. Definida através de arquivos `SKILL.md` que contêm YAML frontmatter.

### Comando Slash (Slash Command)

Comandos iniciados por `/` que controlam o Copilot (ex: `/help`, `/clear`, `/model`).

---

## T

### Token

Uma unidade de texto que modelos de IA processam. Correspondem a cerca de 4 caracteres ou 0.75 palavras. Usados para quantificar as entradas (seus prompts e contextos) e saídas (respostas da IA).

### Dicas de Tipo (Type Hints)

Anotações num código Python que indicam os tipos esperados de parâmetros de função e valores de retorno (ex: `def add_book(title: str, year: int) -> Book:`). Elas não impõem os tipos em tempo de execução, mas ajudam na clareza do código, oferecem suporte às IDEs e ferramentas de análise estática como o `mypy`.

---

## W

### WCAG

Web Content Accessibility Guidelines (Diretrizes de Acessibilidade para Conteúdo Web). Padrões publicados pela W3C para garantir que os conteúdos na web sejam acessíveis para pessoas com deficiências. A versão WCAG 2.1 nível AA é um objetivo de conformidade muito comum.

---

## Y

### YAML

YAML Ain't Markup Language. Um formato de leitura humana para dados usado em configurações. Neste curso, o YAML aparece nos frontmatters de agentes e skills (o bloco entre limites `---` no início de arquivos `.agent.md` e `SKILL.md`).
