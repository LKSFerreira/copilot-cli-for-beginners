# Código Fonte de Exemplo (Legado - Referência Opcional)

> **Observação**: O exemplo principal deste curso é o **app de coleção de livros em Python** em `../book-app-project/`. Estes arquivos JS/React vêm de uma versão anterior do curso e são mantidos como material de referência opcional para quem deseja exemplos em JS.

Esta pasta contém arquivos de código de exemplo. São apenas amostras e não têm a intenção de formar uma aplicação completa em execução.

## Estrutura

```
src/
├── api/           # API route handlers
│   ├── auth.js    # Authentication endpoints
│   └── users.js   # User CRUD endpoints
├── auth/          # Client-side auth handlers
│   ├── login.js   # Login form logic
│   └── register.js # Registration form logic
├── components/    # React components
│   ├── Button.jsx # Reusable button
│   └── Header.jsx # App header with nav
├── models/        # Data models
│   └── User.js    # User model
├── services/      # Business logic
│   ├── productService.js
│   └── userService.js
├── utils/         # Helper functions
│   └── helpers.js
├── index.js       # App entry point
└── refactor-me.js # Beginner refactoring practice (Chapter 03)
```

## Uso

Estes arquivos são referenciados nos exemplos do curso usando a sintaxe `@`:

```bash
copilot

> Explique o que @samples/src/utils/helpers.js faz
> Revise @samples/src/api/ em busca de problemas de segurança
> Compare @samples/src/auth/login.js com @samples/src/auth/register.js
```

## Prática de Refatoração

O arquivo `refactor-me.js` foi projetado especificamente para os exercícios de refatoração do Capítulo 03:

```bash
copilot

> @samples/src/refactor-me.js Renomeie a variável 'x' para algo mais descritivo
> @samples/src/refactor-me.js Esta função é muito longa. Divida-a em funções menores.
> @samples/src/refactor-me.js Remova variáveis não utilizadas
```

## Notas

- Os arquivos contêm TODOs intencionais e pequenas falhas para o Copilot encontrar durante as revisões
- Este código de demonstração não foi concebido para execução plena. NÃO é pronto para produção
- Usado para aprender a sintaxe de referência de arquivo `@`
