---
name: pytest-gen
description: Generate comprehensive pytest tests - use when generating tests, creating test suites, or testing Python code
---

# Geração de testes com pytest

Ao gerar testes, siga esta estrutura.

## Organização dos Testes

- Agrupe os testes pela função que está sendo testada
- Use `@pytest.mark.parametrize` para múltiplas entradas
- Use fixtures para setup compartilhado
- Siga o padrão arrange/act/assert (organizar/agir/afirmar)

## Requisitos de Cobertura

- Cenário de sucesso (uso esperado)
- Casos de borda (strings vazias, None, valores limite)
- Casos de erro (entrada inválida, arquivo não encontrado, tipos incorretos)
- Integração (funções trabalhando em conjunto)

## Modelo (Template)

```python
import pytest
from module_under_test import function_to_test


@pytest.fixture
def sample_data():
    """Fornece dados de teste compartilhados."""
    return {"key": "value"}


class TestFunctionName:
    """Testes para function_name."""

    def test_happy_path(self, sample_data):
        result = function_to_test(valid_input)
        assert result == expected_output

    def test_empty_input(self):
        result = function_to_test("")
        assert result == expected_for_empty

    @pytest.mark.parametrize("input_val,expected", [
        ("valid", True),
        ("", False),
        (None, False),
    ])
    def test_various_inputs(self, input_val, expected):
        assert function_to_test(input_val) == expected
```
