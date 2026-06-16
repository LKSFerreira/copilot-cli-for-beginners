# payment_processor.py - Código de exemplo com bugs intencionais para prática de depuração
#
# Tente: copilot --allow-all -p "Depure @samples/buggy-code/python/payment_processor.py"

import os
import sqlite3
from decimal import Decimal

# BUG 1: Chave de API hardcoded (deve estar em variáveis de ambiente)
STRIPE_API_KEY = "sk_test_4eC39HqLyjWDarjtT1zdp7dc"


# BUG 2: Sem validação de entrada
def process_payment(amount, currency, card_token):
    import stripe
    stripe.api_key = STRIPE_API_KEY
    charge = stripe.Charge.create(
        amount=amount,
        currency=currency,
        source=card_token
    )
    return charge


# BUG 3: Aritmética de ponto flutuante para dinheiro
def calculate_total(items):
    total = 0.0
    for item in items:
        total += item['price'] * item['quantity']
    return total  # Terá erros de ponto flutuante: 0.1 + 0.2 = 0.30000000000000004


# BUG 4: Sem tratamento de erro
def refund(charge_id, amount):
    import stripe
    stripe.api_key = STRIPE_API_KEY
    refund = stripe.Refund.create(
        charge=charge_id,
        amount=amount
    )
    return refund


# BUG 5: Condição de corrida na verificação de saldo
account_balance = 1000.0

async def withdraw(amount):
    global account_balance
    if account_balance >= amount:
        # Outra requisição pode modificar account_balance aqui
        import asyncio
        await asyncio.sleep(0.1)  # Simula atraso de rede
        account_balance -= amount
        return {"success": True, "new_balance": account_balance}
    return {"success": False, "reason": "Fundos insuficientes"}


# BUG 6: Dados sensíveis em logs
def log_transaction(transaction):
    print(f"Transação: {transaction}")
    # Isto registra números de cartão de crédito e CVVs!


# BUG 7: Injeção de SQL na busca de recibos
def get_receipt(receipt_id):
    conn = sqlite3.connect('payments.db')
    cursor = conn.cursor()
    cursor.execute(f"SELECT * FROM receipts WHERE id = '{receipt_id}'")
    return cursor.fetchone()


# BUG 8: Risco de overflow de inteiros / perda de precisão
def convert_cents_to_dollars(cents):
    return cents / 100


def convert_dollars_to_cents(dollars):
    return dollars * 100  # Pode causar problemas de ponto flutuante


# BUG 9: Random inseguro para IDs de transação (específico de Python)
import random

def generate_transaction_id():
    # random não é criptograficamente seguro!
    return random.randint(100000, 999999)


# BUG 10: eval() em entrada do usuário (específico de Python)
def calculate_discount(formula, price):
    # Fórmula controlada pelo usuário passada para eval - injeção de código!
    discount = eval(formula)
    return price - discount


# BUG 11: Injeção de shell (específico de Python)
def export_transactions(filename):
    # Nome de arquivo controlado pelo usuário em comando shell
    os.system(f"cat transactions.log > {filename}")


# BUG 12: YAML unsafe load (específico de Python)
import yaml

def load_pricing_config(config_string):
    # yaml.load sem Loader é vulnerável a execução de código
    return yaml.load(config_string)  # Deveria usar yaml.safe_load()
