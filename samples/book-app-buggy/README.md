# App de Livros — Versão com Bugs

Este diretório contém uma versão propositalmente com bugs do app de coleção de livros, usada para exercícios de depuração no Capítulo 03.

**NÃO conserte esses bugs diretamente.** Eles existem para que os alunos pratiquem usando o GitHub Copilot CLI para identificar e debugar problemas.

---

## Bugs Intencionais

### books_buggy.py

| # | Bug | Sintoma |
|---|-----|---------|
| 1 | `find_book_by_title()` usa comparação com case exato | Pesquisas por "the hobbit" não retornam nada apesar de "The Hobbit" existir |
| 2 | `save_books()` não usa gerenciador de contexto | Vazamento de descritor de arquivo; sem tratamento de erros para problemas de permissão |
| 3 | `add_book()` não valida o ano | Aceita anos negativos, ano 0 e anos muito no futuro |
| 4 | `remove_book()` usa checagem por substring com `in` | Remover "Dune" também corresponde e remove "Dune Messiah" |
| 5 | `mark_as_read()` marca TODOS os livros como lidos | Bug na variável do loop — itera por todos os livros em vez de somente o correspondente |
| 6 | `find_by_author()` exige correspondência exata | "Tolkien" não encontra "J.R.R. Tolkien" (sem busca parcial) |

### book_app_buggy.py

| # | Bug | Sintoma |
|---|-----|---------|
| 7 | `show_books()` numeração começa em 0 | Livros exibidos como "0. ...", "1. ..." em vez de "1. ...", "2. ..." |
| 8 | `handle_add()` aceita título/autor vazios | Pode adicionar livros com títulos e autores em branco |
| 9 | `handle_remove()` sempre imprime sucesso | Diz "Livro removido" mesmo quando o livro não foi encontrado |

---

## Como Usar no Capítulo 03

```bash
copilot

> @samples/book-app-buggy/books_buggy.py Usuários relatam que pesquisar por
> "The Hobbit" não retorna resultados mesmo estando nos dados. Debugue o motivo.

> @samples/book-app-buggy/book_app_buggy.py Quando removo um livro que
> não existe, o app diz que ele foi removido. Ajude a encontrar o motivo.
```
