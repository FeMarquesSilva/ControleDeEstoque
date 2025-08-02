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
    resultado = listar_clientes()
    session.close()
    return resultado

# Rota para deletar cliente pelo ID
@app.route('/clientes/<int:id>', methods=['DELETE'])
def delete_cliente(id):
    cliente = session.query(Cliente).get(id)
    if not cliente:
        session.close()
        return jsonify({'erro': 'Cliente não encontrado'}), 404
    session.delete(cliente)
    session.commit()
    session.close()
    return jsonify({'mensagem': 'Cliente deletado com sucesso'})

# Rota para atualizar cliente pelo ID
@app.route('/clientes/<int:id>', methods=['PUT'])
def update_cliente(id):
    data = request.json
    cliente = session.query(Cliente).get(id)
    if not cliente:
        session.close()
        return jsonify({'erro': 'Cliente não encontrado'}), 404
    cliente.nome = data.get('nome', cliente.nome)
    cliente.cnpj = data.get('cnpj', cliente.cnpj)
    cliente.email = data.get('email', cliente.email)
    session.commit()
    session.close()
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
    id_cliente = novo_cliente.id
    session.close()
    return jsonify({'mensagem': 'Cliente criado com sucesso', 'id': id_cliente}), 201

# Rota para buscar cliente por ID
@app.route('/clientes/<int:id>', methods=['GET'])
def get_cliente(id):
    cliente = session.query(Cliente).get(id)
    if not cliente:
        session.close()
        return jsonify({'erro': 'Cliente não encontrado'}), 404
    resultado = jsonify({
        'id': cliente.id,
        'nome': cliente.nome,
        'cnpj': cliente.cnpj,
        'email': cliente.email
    })
    session.close()
    return resultado

# Rota para buscar clientes por nome
@app.route('/clientes/busca', methods=['GET'])
def busca_cliente_nome():
    nome = request.args.get('nome')
    clientes = session.query(Cliente).filter(Cliente.nome.ilike(f"%{nome}%")).all()
    lista = [
        {'id': c.id, 'nome': c.nome, 'cnpj': c.cnpj, 'email': c.email}
        for c in clientes
    ]
    session.close()
    return jsonify(lista)


@app.route('/clientes/count', methods=['GET'])
def count_clientes():
    total = session.query(Cliente).count()
    session.close()
    return jsonify({'total_clientes': total})

if __name__ == "__main__":
    app.run(debug=True)