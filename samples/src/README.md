# Código Fonte de Exemplo (Legado - Referência Opcional)

> **Observação**: O exemplo principal deste curso é o **app de coleção de livros em Python** em `../book-app-project/`. Estes arquivos JS/React vêm de uma versão anterior do curso e são mantidos como material de referência opcional para quem deseja exemplos em JS.

Esta pasta contém arquivos de código de exemplo. São apenas amostras e não têm a intenção de formar uma aplicação completa em execução.

## Estrutura

```
src/
├── api/           # Handlers de rotas da API
│   ├── auth.js    # Endpoints de autenticação
│   └── users.js   # Endpoints CRUD de usuários
├── auth/          # Handlers de autenticação no lado do cliente
│   ├── login.js   # Lógica do formulário de login
│   └── register.js # Lógica do formulário de registro
├── components/    # Componentes React
│   ├── Button.jsx # Botão reutilizável
│   └── Header.jsx # Cabeçalho do app com navegação
├── models/        # Modelos de dados
│   └── User.js    # Modelo de usuário
├── services/      # Lógica de negócio
│   ├── productService.js
│   └── userService.js
├── utils/         # Funções auxiliares
│   └── helpers.js
├── index.js       # Ponto de entrada do app
└── refactor-me.js # Prática de refatoração para iniciantes (Capítulo 03)
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
