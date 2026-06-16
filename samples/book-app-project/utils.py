def print_menu():
    print("\n📚 Aplicativo Coleção de Livros")
    print("1. Adicionar um livro")
    print("2. Listar livros")
    print("3. Marcar livro como lido")
    print("4. Remover um livro")
    print("5. Sair")


def get_user_choice() -> str:
    return input("Escolha uma opção (1-5): ").strip()


def get_book_details():
    title = input("Digite o título do livro: ").strip()
    author = input("Digite o autor: ").strip()

    year_input = input("Digite o ano de publicação: ").strip()
    try:
        year = int(year_input)
    except ValueError:
        print("Ano inválido. Usando padrão 0.")
        year = 0

    return title, author, year


def print_books(books):
    if not books:
        print("Nenhum livro na sua coleção.")
        return

    print("\nSeus Livros:")
    for index, book in enumerate(books, start=1):
        status = "✅ Lido" if book.read else "📖 Não lido"
        print(f"{index}. {book.title} por {book.author} ({book.year}) - {status}")
