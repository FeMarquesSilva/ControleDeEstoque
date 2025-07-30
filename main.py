from database import session
from models import Cliente

clientes = session.query(Cliente).all()

print("Executando lista de clientes: ")

for cliente in clientes:
    print(cliente.nome, cliente.cnpj, cliente.email)