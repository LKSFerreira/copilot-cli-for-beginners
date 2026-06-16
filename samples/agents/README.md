# Modelos de Agentes de Exemplo

Esta pasta contém alguns modelos simples de agentes para o GitHub Copilot CLI, pensados para ajudar você a começar a usar agentes.

## Início Rápido

```bash
# Copie um agente para a pasta de agentes pessoal
cp hello-world.agent.md ~/.copilot/agents/

# Ou copie para o projeto para compartilhamento em equipe
cp python-reviewer.agent.md .github/agents/
```

## Arquivos de Exemplo nesta Pasta

| Arquivo | Descrição | Mais indicado para |
|------|-------------|----------|
| `hello-world.agent.md` | Exemplo mínimo (11 linhas) | Aprender o formato |
| `python-reviewer.agent.md` | Revisor de qualidade de código Python | Revisões de código, PEP 8, anotações de tipo |
| `pytest-helper.agent.md` | Especialista em pytest | Geração de testes, fixtures, casos-limite |

## Encontrando Mais Agentes

- **[github/awesome-copilot](https://github.com/github/awesome-copilot)** - Recursos oficiais do GitHub com agentes da comunidade e instruções

---

## Formato de Arquivo de Agente

Cada arquivo de agente requer frontmatter YAML com ao menos o campo `description`:

```markdown
---
name: my-agent
description: Breve descrição do que este agente faz
tools: ["read", "edit", "search"]  # Opcional: limitar ferramentas disponíveis
---

# Nome do Agente

Instruções do agente vão aqui...
```

**Propriedades YAML disponíveis:**

| Propriedade | Obrigatória | Descrição |
|----------|----------|-------------|
| `description` | **Sim** | O que o agente faz |
| `name` | Não | Nome exibido (padrão = nome do arquivo) |
| `tools` | Não | Lista de ferramentas permitidas (omitindo = todas). Veja aliases abaixo. |
| `target` | Não | Limita para `vscode` ou `github-copilot` apenas |

**Aliases de Ferramentas**: `read`, `edit`, `search`, `execute` (shell), `web`, `agent`

> 💡 **Observação**: a propriedade `model` funciona no VS Code, mas ainda não é suportada pelo Copilot CLI.
>
> 📖 **Documentação oficial**: [Custom agents configuration](https://docs.github.com/copilot/reference/custom-agents-configuration)

## Locais de Arquivo de Agente

Os agentes podem ser armazenados em:
- `~/.copilot/agents/` - Agentes globais disponíveis em todos os projetos
- `.github/agents/` - Agentes específicos do projeto
- Arquivos com extensão `.agent.md` - Formato compatível com VS Code

Cada agente é um arquivo separado com extensão `.agent.md`.

---

## Exemplos de Uso

```bash
# Iniciar com um agente específico
copilot --agent python-reviewer

# Ou selecionar um agente interativamente durante a sessão
copilot
> /agent
# Selecione "python-reviewer" na lista

# A especialidade do agente será aplicada às suas mensagens
> @samples/book-app-project/books.py Revise este código por problemas de qualidade

# Trocar para outro agente
> /agent
# Selecione "pytest-helper"

> @samples/book-app-project/tests/test_books.py Que testes adicionais devemos adicionar?
```

---

## Criando Seus Próprios Agentes

1. Crie um novo arquivo em `~/.copilot/agents/` com extensão `.agent.md`
2. Adicione frontmatter YAML com ao menos o campo `description`
3. Acrescente um cabeçalho descritivo (por exemplo, `# Agente de Segurança`)
4. Defina a especialidade, padrões e comportamentos do agente
5. Use o agente com `/agent` ou `--agent <nome>`

**Dicas para agentes eficazes:**
- Seja específico sobre as áreas de especialidade
- Inclua padrões e padrões de código
- Defina o que o agente deve checar
- Inclua preferências de formato de saída
