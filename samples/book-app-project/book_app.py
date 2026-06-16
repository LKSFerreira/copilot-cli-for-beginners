import sys
from books import BookCollection


# Global collection instance
collection = BookCollection()


def show_books(books):
    """Exibe livros em um formato amigável ao usuário."""
    if not books:
        print("Nenhum livro encontrado.")
        return

    print("\nSua Coleção de Livros:\n")

    for index, book in enumerate(books, start=1):
        status = "✓" if book.read else " "
        print(f"{index}. [{status}] {book.title} by {book.author} ({book.year})")

    print()


def handle_list():
    books = collection.list_books()
    show_books(books)


def handle_add():
    print("\nAdicionar um Novo Livro\n")

    title = input("Título: ").strip()
    author = input("Autor: ").strip()
    year_str = input("Ano: ").strip()

    try:
        year = int(year_str) if year_str else 0
        collection.add_book(title, author, year)
        print("\nLivro adicionado com sucesso.\n")
    except ValueError as e:
        print(f"\nErro: {e}\n")


def handle_remove():
    print("\nRemover um Livro\n")

    title = input("Digite o título do livro a remover: ").strip()
    collection.remove_book(title)

    print("\nLivro removido, se existia.\n")


def handle_find():
    print("\nEncontrar Livros por Autor\n")

    author = input("Nome do autor: ").strip()
    books = collection.find_by_author(author)

    show_books(books)


def show_help():
    print("""
Assistente de Coleção de Livros

Comandos:
  list     - Mostrar todos os livros
  add      - Adicionar um novo livro
  remove   - Remover um livro por título
  find     - Encontrar livros por autor
  help     - Mostrar esta mensagem de ajuda
""")


def main():
    if len(sys.argv) < 2:
        show_help()
        return

    command = sys.argv[1].lower()

    if command == "list":
        handle_list()
    elif command == "add":
        handle_add()
    elif command == "remove":
        handle_remove()
    elif command == "find":
        handle_find()
    elif command == "help":
        show_help()
    else:
        print("Comando desconhecido.\n")
        show_help()


if __name__ == "__main__":
    main()
