<!--
---
id: CopilotCLI-Appendix-Additional-Context
title: !translate Funcionalidades adicionais de contexto
description: !translate Aprenda a usar contexto de imagens e gerenciar permissões em vários diretórios no GitHub Copilot CLI.
audience: Desenvolvedores / Estudantes / Usuários de terminal
slug: additional-context-features
weight: 92
---
-->

# Recursos Adicionais de Contexto

> 📖 **Pré-requisito**: Conclua o [Capítulo 02: Contexto e Conversas](../02-context-conversations/README.md) antes de ler este apêndice.

Este apêndice aborda duas funcionalidades adicionais de contexto: trabalhar com imagens e gerenciar permissões em múltiplos diretórios.

---

<a id="working-with-images"></a>
## Trabalhando com imagens

Você pode incluir imagens nas suas conversas usando a sintaxe `@`. O Copilot pode analisar capturas de tela, mockups, diagramas e outros conteúdos visuais.

### Referência básica de imagem

```bash
copilot

> @screenshot.png O que está acontecendo nesta interface?

# Copilot analyzes the image and responds

> @mockup.png @current-design.png Compare esses dois designs

# You can also drag and drop images or paste from clipboard
```

### Formatos de imagem suportados

| Formato | Melhor para |
|--------|----------|
| PNG | Capturas de tela, mockups de interface de usuário (UI), diagramas |
| JPG/JPEG | Fotos, imagens complexas |
| GIF | Diagramas simples (apenas o primeiro quadro) |
| WebP | Capturas de tela de páginas web |

### Casos de uso práticos com imagens

**1. Depuração de interface de usuário**
```bash
> @bug-screenshot.png O botão não se alinha corretamente. Qual CSS pode estar causando isso?
```

**2. Implementação de design**
```bash
> @figma-export.png Escreva o HTML e Tailwind CSS para corresponder a este design
```

**3. Análise de erro**
```bash
> @error-screenshot.png O que este erro significa e como faço para corrigi-lo?
```

**4. Revisão de arquitetura**
```bash
> @whiteboard-diagram.png Converta este diagrama de arquitetura em um diagrama Mermaid que eu possa colocar na documentação
```

**5. Comparação antes/depois**
```bash
> @before.png @after.png O que mudou entre essas duas versões da interface?
```

### Combinando imagens com código

As imagens ficam ainda mais úteis quando combinadas com contexto de código:

```bash
copilot

> @screenshot-of-bug.png @src/components/Header.jsx
> O header parece estar errado na screenshot. O que está causando isso no código?
```

### Dicas para imagens

- **Recorte capturas de tela** para mostrar apenas as partes relevantes (economiza tokens de contexto)
- **Use alto contraste** nos elementos de interface que você quer que sejam analisados
- **Faça anotações se necessário** - circule ou destaque áreas problemáticas antes de enviar
- **Uma imagem por conceito** - múltiplas imagens funcionam, mas mantenha o foco

---

## Padrões de permissão

Por padrão, o Copilot pode acessar arquivos no seu diretório atual. Para arquivos em outro local, você precisa conceder acesso.

### Adicionar diretórios

```bash
# Add a directory to the allowed list
copilot --add-dir /path/to/other/project

# Add multiple directories
copilot --add-dir ~/workspace --add-dir /tmp
```

### Permitir todos os caminhos

```bash
# Disable path restrictions entirely (use with caution)
copilot --allow-all-paths
```

### Dentro de uma sessão

```bash
copilot

> /add-dir /path/to/other/project
# Now you can reference files from that directory

> /list-dirs
# See all allowed directories

> /yolo
# Quick alias for /allow-all on — auto-approves all permission prompts
```

### Para automação

```bash
# Allow all permissions for non-interactive scripts
copilot -p "Review @src/" --allow-all

# Or use the memorable alias
copilot -p "Review @src/" --yolo
```

### Quando precisar de acesso a múltiplos diretórios

Cenários comuns em que você precisará dessas permissões:

1. **Trabalho em monorepo** - Comparar código entre pacotes
2. **Refatoração entre projetos** - Atualizar bibliotecas compartilhadas
3. **Projetos de documentação** - Referenciar várias bases de código
4. **Trabalho de migração** - Comparar implementações antigas e novas

---

**[← Voltar ao Capítulo 02](../02-context-conversations/README.md)** | **[Voltar aos Apêndices](README.md)**
