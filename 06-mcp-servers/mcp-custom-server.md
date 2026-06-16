<!--
---
id: CopilotCLI-06-Custom-MCP-Server
title: !translate Building a Custom MCP Server
description: !translate Build a simple custom MCP server in Python to connect GitHub Copilot CLI to your own APIs.
audience: Developers / Students / Terminal users
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
> **[← Voltar ao Capítulo 06: MCP Servers](README.md)**

---

Want to connect Copilot to your own APIs? Here's how to build a simple MCP server in Python that looks up book information, tying back to the book app project you've been using throughout this course.

## Project Setup

```bash
mkdir book-lookup-mcp-server
cd book-lookup-mcp-server
pip install mcp
```

> 💡 **What is the `mcp` package?** It's the official Python SDK for building MCP servers. It handles the protocol details so you can focus on your tools.

## Server Implementation

Create a file called `server.py`:

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

## Configuration

Add to your `~/.copilot/mcp-config.json`:

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

## Next Steps

Once you've built a basic server, you can:

1. **Add more tools** - Each `@mcp.tool()` function becomes a tool Copilot can call
2. **Connect real APIs** - Replace the mock `BOOKS_DB` with actual API calls or database queries
3. **Add authentication** - Handle API keys and tokens securely
4. **Share your server** - Publish to PyPI so others can install it with `pip`

## Resources

- [MCP Python SDK](https://github.com/modelcontextprotocol/python-sdk)
- [MCP TypeScript SDK](https://github.com/modelcontextprotocol/typescript-sdk)
- [Example MCP Servers](https://github.com/modelcontextprotocol/servers)
- [MCP for Beginners Course](https://github.com/microsoft/mcp-for-beginners)

---

**[← Back to Chapter 06: MCP Servers](README.md)**
