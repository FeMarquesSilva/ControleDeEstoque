from database import session
from models import Cliente
from flask import jsonify

# Função para listar clientes;
def listar_clientes():
    try:
        clientes = session.query(Cliente).all()
        clientes_list = [{
            "id": c.id,
            "nome": c.nome,
            "cnpj": c.cnpj,
            "email": c.email,
            "telefone": c.telefone,
            "endereco": c.endereco
        } for c in clientes]
        return jsonify(clientes_list)
    finally:
        session.remove()