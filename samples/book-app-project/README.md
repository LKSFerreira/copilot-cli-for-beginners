# App de Coleção de Livros

*(Este README é propositalmente simples para que você possa melhorá-lo com o GitHub Copilot CLI)*

Um app em Python para gerenciar livros que você possui ou deseja ler.
Ele pode adicionar, remover e listar livros. Também marcar livros como lidos.

---

## Funcionalidades atuais

* Lê livros a partir de um arquivo JSON (nosso 'banco de dados')
* A validação de entrada é fraca em algumas áreas
* Alguns testes existem, mas provavelmente não são suficientes

---

## Arquivos

* `book_app.py` - Ponto de entrada do CLI
* `books.py` - Classe BookCollection com a lógica de dados
* `utils.py` - Funções auxiliares para UI e entrada
* `data.json` - Dados de exemplo dos livros
* `tests/test_books.py` - Testes iniciais (pytest)

---

## Executando o app

```bash
python book_app.py list
python book_app.py add
python book_app.py find
python book_app.py remove
python book_app.py help
```

## Executando os testes

```bash
python -m pytest tests/
```

---

## Notas

* Não é pronto para produção (obviamente)
* Parte do código pode ser melhorada
* Podem ser adicionados mais comandos futuramente
