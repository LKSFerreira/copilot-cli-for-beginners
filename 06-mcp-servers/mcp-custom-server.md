<!--
---
id: CopilotCLI-06-Custom-MCP-Server
title: !translate Construindo um servidor MCP personalizado
description: !translate Crie um servidor MCP personalizado simples em Python para conectar o GitHub Copilot CLI às suas próprias APIs.
audience: Desenvolvedores / Estudantes / Usuários de terminal
slug: building-a-custom-mcp-server
weight: 61
---
-->

# Construindo um servidor MCP personalizado

> ⚠️ **Este conteúdo é totalmente opcional.** Você pode ser altamente produtivo com o Copilot CLI usando apenas os servidores MCP pré-instalados (GitHub, filesystem, Context7). Este guia é para desenvolvedores que desejam conectar o Copilot a APIs internas personalizadas. Veja o [curso MCP for Beginners](https://github.com/microsoft/mcp-for-beginners) para mais detalhes.
>
> **Pré-requisitos:**
> - Confortável com Python
> - Compreensão de padrões `async`/`await`
> - `pip` disponível no seu sistema (incluído neste dev container)
>
> **[← Voltar ao Capítulo 06: Servidores MCP](README.md)**

---

Quer conectar o Copilot às suas próprias APIs? Veja como construir um servidor MCP simples em Python que consulta informações sobre livros, integrando-se ao projeto do app de livros usado ao longo deste curso.

## Configuração do projeto

```bash
mkdir book-lookup-mcp-server
cd book-lookup-mcp-server
pip install mcp
```

> 💡 **O que é o pacote `mcp`?** É o SDK oficial em Python para construir servidores MCP. Ele cuida dos detalhes do protocolo para que você possa focar nas suas ferramentas.

## Implementação do servidor

Crie um arquivo chamado `server.py`:

```python
# server.py
import json
from mcp.server.fastmcp import FastMCP

# Create the MCP server
mcp = FastMCP("book-lookup")

# Sample book database (in a real server, this could query an API or database)
BOOKS_DB = {
    "978-0-547-92822-7": {
        "title": "The Hobbit",
        "author": "J.R.R. Tolkien",
        "year": 1937,
        "genre": "Fantasy",
    },
    "978-0-451-52493-5": {
        "title": "1984",
        "author": "George Orwell",
        "year": 1949,
        "genre": "Dystopian Fiction",
    },
    "978-0-441-17271-9": {
        "title": "Dune",
        "author": "Frank Herbert",
        "year": 1965,
        "genre": "Science Fiction",
    },
}


@mcp.tool()
def lookup_book(isbn: str) -> str:
    """Look up a book by its ISBN and return title, author, year, and genre."""
    book = BOOKS_DB.get(isbn)
    if book:
        return json.dumps(book, indent=2)
    return f"No book found with ISBN: {isbn}"


@mcp.tool()
def search_books(query: str) -> str:
    """Search for books by title or author. Returns all matching results."""
    query_lower = query.lower()
    results = [
        {**book, "isbn": isbn}
        for isbn, book in BOOKS_DB.items()
        if query_lower in book["title"].lower()
        or query_lower in book["author"].lower()
    ]
    if results:
        return json.dumps(results, indent=2)
    return f"No books found matching: {query}"


@mcp.tool()
def list_all_books() -> str:
    """List all books in the database with their ISBNs."""
    books_list = [
        {"isbn": isbn, "title": book["title"], "author": book["author"]}
        for isbn, book in BOOKS_DB.items()
    ]
    return json.dumps(books_list, indent=2)


if __name__ == "__main__":
    mcp.run()
```

**O que está acontecendo aqui:**

| Parte | O que faz |
|------|-------------|
| `FastMCP("book-lookup")` | Cria um servidor chamado "book-lookup" |
| `@mcp.tool()` | Registra uma função como uma ferramenta que o Copilot pode chamar |
| Anotações de tipo + docstrings | Informam ao Copilot o que cada ferramenta faz e quais parâmetros precisa |
| `mcp.run()` | Inicia o servidor e escuta por requisições |

> 💡 **Por que decorators?** O decorator `@mcp.tool()` é tudo que você precisa. O SDK MCP lê automaticamente o nome da sua função, as anotações de tipo e o docstring para gerar o esquema da ferramenta. Nenhum JSON schema manual é necessário!

## Configuração

Adicione ao seu `~/.copilot/mcp-config.json`:

```json
{
  "mcpServers": {
    "book-lookup": {
      "type": "local",
      "command": "python3",
      "args": ["./book-lookup-mcp-server/server.py"],
      "tools": ["*"]
    }
  }
}
```

## Uso

```bash
copilot

> Procure o livro com ISBN 978-0-547-92822-7

{
  "title": "The Hobbit",
  "author": "J.R.R. Tolkien",
  "year": 1937,
  "genre": "Fantasy"
}

> Search for books by Orwell

[
  {
    "title": "1984",
    "author": "George Orwell",
    "year": 1949,
    "genre": "Dystopian Fiction",
    "isbn": "978-0-451-52493-5"
  }
]

> List all available books

[Shows all books in the database with ISBNs]
```

## Próximos passos

Depois de construir um servidor básico, você pode:

1. **Adicionar mais ferramentas** - Cada função `@mcp.tool()` se torna uma ferramenta que o Copilot pode chamar
2. **Conectar APIs reais** - Substitua o `BOOKS_DB` de exemplo por chamadas reais de API ou consultas de banco de dados
3. **Adicionar autenticação** - Lidar com chaves de API e tokens de forma segura
4. **Compartilhar seu servidor** - Publique no PyPI para que outras pessoas possam instalá-lo com `pip`

## Recursos

- [MCP Python SDK](https://github.com/modelcontextprotocol/python-sdk)
- [MCP TypeScript SDK](https://github.com/modelcontextprotocol/typescript-sdk)
- [Exemplo de servidores MCP](https://github.com/modelcontextprotocol/servers)
- [MCP for Beginners Course](https://github.com/microsoft/mcp-for-beginners)

---

**[← Voltar ao Capítulo 06: Servidores MCP](README.md)**
