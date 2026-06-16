---
name: code-checklist
description: Checklist de qualidade de código da equipe — use para verificar qualidade de código Python, bugs, problemas de segurança e melhores práticas
---

# Skill de Checklist de Código

Aplique este checklist ao revisar código Python.

## Checklist de Qualidade de Código

- [ ] Todas as funções possuem type hints
- [ ] Sem cláusulas "bare except"
- [ ] Sem argumentos padrão mutáveis
- [ ] Gerenciadores de contexto (context managers) usados para I/O de arquivos
- [ ] Funções com menos de 50 linhas
- [ ] Nomes de variáveis e funções seguem PEP 8 (snake_case)

## Checklist de Validação de Entrada

- [ ] Entrada do usuário é validada antes do processamento
- [ ] Casos de borda tratados (strings vazias, None, valores fora do intervalo)
- [ ] Mensagens de erro são claras e úteis

## Checklist de Testes

- [ ] Novo código possui testes pytest correspondentes
- [ ] Casos de borda estão cobertos
- [ ] Testes usam nomes descritivos

## Formato de Saída

Apresente as descobertas como:

```
## Code Checklist: [filename]

### Qualidade de Código
- [PASS/FAIL] Descrição da descoberta

### Validação de Entrada
- [PASS/FAIL] Descrição da descoberta

### Testes
- [PASS/FAIL] Descrição da descoberta

### Resumo
[X] itens precisam de atenção antes do merge
```
