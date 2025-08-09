import pyrebase
from config.firebase import firebaseConfig

print("Iniciando conexão com o Firebase...")
print("Configuração do Firebase:", firebaseConfig)

firebase = pyrebase.initialize_app(firebaseConfig)
auth = firebase.auth()

user = auth.create_user_with_email_and_password("teste@testes.com", "123456")
print("Usuário criado:", user)