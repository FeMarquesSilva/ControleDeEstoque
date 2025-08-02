from flask import Flask
from flask_cors import CORS
from database import session
from models import Cliente
from controllers import listar_clientes
from flask import request, jsonify

app = Flask(__name__)
CORS(app)  # Permite CORS para todas rotas e origens

# Rota para listar clientes "/clientes"
@app.route('/clientes', methods=['GET'])
def get_clientes():
    return listar_clientes()  

# Rota para deletar cliente pelo ID
@app.route('/clientes/<int:id>', methods=['DELETE'])
def delete_cliente(id):
    cliente = session.query(Cliente).get(id)
    if not cliente:
        return jsonify({'erro': 'Cliente não encontrado'}), 404
    session.delete(cliente)
    session.commit()
    return jsonify({'mensagem': 'Cliente deletado com sucesso'})

# Rota para atualizar cliente pelo ID
@app.route('/clientes/<int:id>', methods=['PUT'])
def update_cliente(id):
    data = request.json
    cliente = session.query(Cliente).get(id)
    if not cliente:
        return jsonify({'erro': 'Cliente não encontrado'}), 404
    cliente.nome = data.get('nome', cliente.nome)
    cliente.cnpj = data.get('cnpj', cliente.cnpj)
    cliente.email = data.get('email', cliente.email)
    session.commit()
    return jsonify({'mensagem': 'Cliente atualizado com sucesso'})

# Rota para criar cliente
@app.route('/clientes', methods=['POST'])
def create_cliente():
    data = request.json
    novo_cliente = Cliente(
        nome=data.get('nome'),
        cnpj=data.get('cnpj'),
        email=data.get('email')
    )
    session.add(novo_cliente)
    session.commit()
    return jsonify({'mensagem': 'Cliente criado com sucesso', 'id': novo_cliente.id}), 201

# Rota para buscar cliente por ID
@app.route('/clientes/<int:id>', methods=['GET'])
def get_cliente(id):
    cliente = session.query(Cliente).get(id)
    if not cliente:
        return jsonify({'erro': 'Cliente não encontrado'}), 404
    return jsonify({
        'id': cliente.id,
        'nome': cliente.nome,
        'cnpj': cliente.cnpj,
        'email': cliente.email
    })