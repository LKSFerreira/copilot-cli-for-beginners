# Skills de Exemplo

Modelos de skills prontos para uso para o GitHub Copilot CLI. Copie qualquer pasta de skill para começar a usá-la imediatamente.

## Início Rápido

```bash
# Copie uma skill para a pasta de skills pessoal
cp -r hello-world ~/.copilot/skills/

# Ou copie para o projeto para compartilhamento em equipe
cp -r code-checklist .github/skills/
```

## Skills Disponíveis

| Skill | Descrição | Mais indicado para |
|-------|-----------|--------------------|
| `hello-world` | Exemplo mínimo (aprender o formato) | Criadores de skills pela primeira vez |
| `code-checklist` | Lista de verificação de qualidade de código Python (PEP 8, type hints, validação) | Verificações de qualidade consistentes |
| `pytest-gen` | Gera testes pytest abrangentes | Geração estruturada de testes |
| `commit-message` | Mensagens de commit convencionais | Histórico Git padronizado |

## Como as Skills Funcionam

As skills são **acionadas automaticamente** quando sua mensagem corresponde ao campo `description` da skill. Não é necessário invocá-las manualmente.

```bash
copilot

> Verifique este código por problemas de qualidade
# O Copilot detecta que isto corresponde à skill "code-checklist" e a carrega automaticamente

> Gere uma mensagem de commit
# O Copilot carrega a skill "commit-message"
```

Também é possível invocar as skills diretamente:
```bash
> /code-checklist Verifique books.py
> /pytest-gen Gere testes para BookCollection
> /commit-message
```

## Estrutura da Skill

Cada skill é uma pasta contendo um arquivo `SKILL.md`:

```
skill-name/
└── SKILL.md    # Obrigatório: contém frontmatter + instruções
```

O arquivo `SKILL.md` possui frontmatter YAML com `name` e `description` (ambos obrigatórios):

```markdown
---
name: my-skill
description: O que esta skill faz e quando usá-la
---

# Instruções da Skill

Suas instruções aqui...
```

## Encontrando Mais Skills

- **[github/awesome-copilot](https://github.com/github/awesome-copilot)** - Recursos oficiais do GitHub com skills da comunidade
- **`/plugin marketplace`** - Navegue e instale skills a partir do Copilot CLI

## Criando Sua Própria Skill

1. Crie uma pasta: `mkdir ~/.copilot/skills/my-skill`
2. Crie `SKILL.md` com frontmatter
3. Adicione suas instruções
4. Teste pedindo ao Copilot algo que corresponda à sua descrição

Veja [Capítulo 05: Skills](../../05-skills/README.md) para orientações detalhadas.
