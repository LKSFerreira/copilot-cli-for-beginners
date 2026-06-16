# Exemplos de Código com Bugs

Esta pasta contém código propositalmente com bugs para praticar revisão de código e depuração com o GitHub Copilot CLI.

## Estrutura da Pasta

```
buggy-code/
├── js/                    # Exemplos em JavaScript
│   ├── userService.js     # Gerenciamento de usuários com 8 bugs
│   └── paymentProcessor.js # Processamento de pagamentos com 8 bugs
└── python/                # Exemplos em Python
    ├── user_service.py    # Gerenciamento de usuários com 10 bugs
    └── payment_processor.py # Processamento de pagamentos com 12 bugs
```

## Início Rápido

### JavaScript

```bash
copilot

# Auditoria de segurança
> Revise @samples/buggy-code/js/userService.js em busca de problemas de segurança

# Encontrar todos os bugs
> Encontre todos os bugs em @samples/buggy-code/js/paymentProcessor.js
```

### Python

```bash
copilot

# Auditoria de segurança
> Revise @samples/buggy-code/python/user_service.py em busca de problemas de segurança

# Encontrar todos os bugs
> Encontre todos os bugs em @samples/buggy-code/python/payment_processor.py
```

## Categorias de Bugs

### Comum a Ambas as Linguagens

| Tipo de Bug | Descrição |
|----------|-------------|
| SQL Injection | Entrada do usuário diretamente em consultas SQL |
| Segredos Hardcoded | Chaves de API e senhas no código fonte |
| Condições de Corrida | Estado compartilhado sem sincronização adequada |
| Registro de Dados Sensíveis | Senhas e números de cartão em logs |
| Falta de Validação de Entrada | Sem checagens dos dados fornecidos pelo usuário |
| Falta de Tratamento de Erros | Ausência de try/catch ou try/except |
| Comparação Fraca de Senhas | Texto puro ou comparações vulneráveis a timing |
| Falta de Verificação de Autorização | Operações sem verificação de autorização |

### Bugs Específicos de Python

| Tipo de Bug | Descrição |
|----------|-------------|
| Desserialização com pickle | `pickle.loads()` em dados não confiáveis |
| Injeção via eval() | Entrada do usuário passada para `eval()` |
| Carregamento YAML inseguro | `yaml.load()` sem loader seguro |
| Injeção de Shell | Entrada do usuário em chamadas `os.system()` |
| Hashing Fraco | MD5 para hashing de senhas |
| Random Inseguro | Uso do módulo `random` para fins de segurança |

## Exercícios Práticos

1. **Auditoria de Segurança**: Faça uma revisão de segurança completa e liste todas as vulnerabilidades por severidade
2. **Corrigir Um Bug**: Escolha um bug crítico, obtenha a correção sugerida pelo Copilot e entenda por que ela funciona
3. **Gerar Testes**: Crie testes que capturem esses bugs antes do deploy
4. **Refatorar com Segurança**: Corrija os bugs de SQL injection mantendo a funcionalidade
