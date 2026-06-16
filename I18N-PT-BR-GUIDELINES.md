I18N pt-BR — Diretrizes de Tradução

Escopo
- Traduzir somente material didático (.md): capítulos (00–07), README.md, AGENTS.md, GLOSSARY.md, SKILL.md, arquivos de samples com documentação. Não traduzir código, nomes de ficheiros, variáveis, nomes de funções, ou samples intencionalmente buggy.
- Preservar blocos de código, YAML frontmatter, anchors e links relativos.

Terminologia e escolhas de tradução
- Usar pt-BR (ortografia brasileira) e tom amigável/didático.
- Manter termos consolidados em inglês quando são marcas ou padrões da indústria: Copilot, CLI, API, SDK, GitHub, VS Code, README, PR, YAML. No primeiro uso útil, adicionar explicação entre parênteses: ex.: API (Interface de Programação de Aplicações).
- Traduzir strings voltadas ao usuário (menus, labels, instruções, alt-text) para pt-BR. Exemplos técnicos (nomes de comandos, flags, código) permanecem inalterados.
- Não traduzir nomes de arquivos e caminhos; mantenha kebab-case quando já existente.

Estilo e tom
- Explicar termos técnicos na primeira ocorrência; use linguagem simples para iniciantes.
- Manter estrutura dos capítulos: Analogia → Conceitos → Hands-on → Assignment → Next.
- Preserve exemplos copy-paste prontos (comandos `--flag=value` etc.) exatamente como aparecem.

Formato e qualidade
- Não editar código nos exemplos. Se uma explicação referir-se a uma palavra em inglês, pode-se inserir a tradução entre parênteses sem remover o original.
- Preservar tabelas, listas e anchors (para não quebrar links internos).
- Ao terminar um arquivo, adicionar comentário curto no commit: "i18n(pt-BR): traduzir <caminho>" e seguir branch i18n/pt-BR.

Fluxo de trabalho recomendado
1. Traduzir capítulo/arquivo preservando frontmatter e blocos de código.
2. Atualizar o plano de sessão (plan.md) e marcar o todo correspondente.
3. Quando todos os arquivos forem traduzidos: executar etapa "review-and-polish" (revisão humana) antes de abrir PR(s).

Exceções e dúvidas
- Para termos ambíguos, manter o original + tradução entre parênteses.
- Quando houver disputa sobre traduzir um termo técnico, priorizar clareza para iniciantes e consistência em todo o repositório.

Contato
- Se quiser mudança nas regras (por exemplo traduzir alguns termos que aqui ficam em inglês), solicite por mensagem e aplicará retroativamente com busca/edição.