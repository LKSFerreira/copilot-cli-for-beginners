# user_service.py - Código de exemplo com bugs intencionais para prática
# Use este arquivo para praticar revisão de código e depuração com GitHub Copilot CLI
#
# Tente estes comandos:
#   copilot --allow-all -p "Revise @samples/buggy-code/python/user_service.py para problemas de segurança"
#   copilot --allow-all -p "Encontre todos os bugs em @samples/buggy-code/python/user_service.py"

import sqlite3
import hashlib

# BUG 1: Injeção de SQL
# O user_id é interpolado diretamente na string de consulta
def get_user(user_id):
    conn = sqlite3.connect('users.db')
    cursor = conn.cursor()
    cursor.execute(f"SELECT * FROM users WHERE id = {user_id}")
    return cursor.fetchone()


# BUG 2: Condição de corrida
# Múltiplas requisições podem acionarem chamadas paralelas ao banco de dados antes que o cache seja definido
user_cache = {}

def get_cached_user(user_id):
    if user_id not in user_cache:
        user_cache[user_id] = get_user(user_id)
    return user_cache[user_id]


# BUG 3: Injeção de SQL + Sem tratamento de erro
# Interpolação de string em SQL e sem try/except
def update_user(user_id, data):
    conn = sqlite3.connect('users.db')
    cursor = conn.cursor()
    cursor.execute(f"UPDATE users SET name = '{data['name']}' WHERE id = {user_id}")
    conn.commit()
    return get_user(user_id)


# BUG 4: Dados sensíveis em logs
# A senha é registrada em texto plano
def login(email, password):
    print(f"Login attempt: {email} / {password}")
    conn = sqlite3.connect('users.db')
    cursor = conn.cursor()
    cursor.execute(f"SELECT * FROM users WHERE email = '{email}'")
    user = cursor.fetchone()
    if user and user['password'] == password:
        return {"success": True, "user": user}
    return {"success": False}


# BUG 5: Comparação de senha fraca
# Usando == para comparação de senha (vulnerável a ataques de timing) e senhas em texto plano
def verify_password(input_password, stored_password):
    return input_password == stored_password


# BUG 6: Sem validação de entrada
# Usando entrada do usuário diretamente sem validação
def create_user(user_data):
    conn = sqlite3.connect('users.db')
    cursor = conn.cursor()
    query = f"INSERT INTO users (name, email, password) VALUES ('{user_data['name']}', '{user_data['email']}', '{user_data['password']}')"
    cursor.execute(query)
    conn.commit()


# BUG 7: Segredo hardcoded
# A chave secreta do JWT deve estar em variáveis de ambiente
JWT_SECRET = "super-secret-key-12345"

def generate_token(user_id):
    import jwt
    return jwt.encode({"user_id": user_id}, JWT_SECRET, algorithm="HS256")


# BUG 8: Verificação de autenticação ausente
# Esta função deveria verificar se o usuário está autorizado a deletar
def delete_user(user_id):
    conn = sqlite3.connect('users.db')
    cursor = conn.cursor()
    cursor.execute(f"DELETE FROM users WHERE id = {user_id}")
    conn.commit()


# BUG 9: Hash fraco (específico de Python)
# MD5 é criptograficamente quebrado para hash de senha
def hash_password(password):
    return hashlib.md5(password.encode()).hexdigest()


# BUG 10: Desserialização com Pickle (específico de Python)
# Desserializar dados não confiáveis com pickle é perigoso
import pickle
import base64

def load_user_preferences(encoded_data):
    decoded = base64.b64decode(encoded_data)
    return pickle.loads(decoded)  # Vulnerabilidade de execução remota de código!
