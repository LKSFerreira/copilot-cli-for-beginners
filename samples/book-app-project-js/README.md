# App de Coleção de Livros

*(Este README é propositalmente simples para que você possa melhorá-lo com o GitHub Copilot CLI)*

Um app em JavaScript para gerenciar livros que você possui ou deseja ler.
Ele pode adicionar, remover e listar livros. Também marcar livros como lidos.

---

## Funcionalidades atuais

* Lê livros a partir de um arquivo JSON (nosso 'banco de dados')
* A validação de entrada é fraca em algumas áreas
* Alguns testes existem, mas provavelmente não são suficientes

---

## Arquivos

* `book_app.js` - Ponto de entrada do CLI
* `books.js` - Classe BookCollection com a lógica de dados
* `utils.js` - Funções auxiliares para UI e entrada
* `data.json` - Dados de exemplo dos livros
* `tests/test_books.js` - Testes iniciais (runner embutido do Node)

---

## Executando o app

```bash
node book_app.js list
node book_app.js add
node book_app.js find
node book_app.js remove
node book_app.js help
```

## Executando os testes

```bash
npm test
```

---

## Notas

* Não é pronto para produção (obviamente)
* Parte do código pode ser melhorada
* Podem ser adicionados mais comandos futuramente
