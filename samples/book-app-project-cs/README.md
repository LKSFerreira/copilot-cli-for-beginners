# App de Coleção de Livros

*(Este README é propositalmente simples para que você possa melhorá-lo com o GitHub Copilot CLI)*

Um app console em C# para gerenciar livros que você possui ou deseja ler.
Ele pode adicionar, remover e listar livros. Também marcar livros como lidos.

---

## Funcionalidades atuais

* Lê livros a partir de um arquivo JSON (nosso 'banco de dados')
* A validação de entrada é fraca em algumas áreas
* Alguns testes existem, mas provavelmente não são suficientes

---

## Arquivos

* `Program.cs` - Ponto de entrada do CLI
* `Models/Book.cs` - Classe modelo Book
* `Services/BookCollection.cs` - Classe BookCollection com a lógica de dados
* `data.json` - Dados de exemplo dos livros
* `Tests/BookCollectionTests.cs` - Testes (xUnit)

---

## Executando o app

```bash
dotnet run -- list
dotnet run -- add
dotnet run -- find
dotnet run -- remove
dotnet run -- help
```

## Executando os testes

```bash
cd Tests
dotnet test
```

---

## Notas

* Não é pronto para produção (obviamente)
* Parte do código pode ser melhorada
* Podem ser adicionados mais comandos futuramente
