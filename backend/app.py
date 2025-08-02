from flask import Flask
from flask_cors import CORS
from database import session
from models import Cliente
from controllers import listar_clientes, listar_cliente_id, busca_cliente, delete_cliente, update_cliente, create_cliente
from flask import request, jsonify

app = Flask(__name__)
CORS(app)  # Permite CORS para todas rotas e origens

# Rota para listar clientes "/clientes"
@app.route('/clientes', methods=['GET'])
def get_clientes():
    return listar_clientes()  

# Rota para buscar cliente por ID
@app.route('/clientes/<int:id>', methods=['GET'])
def get_cliente(id):
    return listar_cliente_id(id)

# Rota para deletar cliente pelo ID
@app.route('/clientes/<int:id>', methods=['DELETE'])
def delete_cliente(id):
    return delete_cliente(id)

# Rota para atualizar cliente pelo ID
@app.route('/clientes/<int:id>', methods=['PUT'])
def update_cliente(id):
    return update_cliente(id)

# Rota para criar cliente
@app.route('/clientes', methods=['POST'])
def create_cliente():
    return create_cliente()

    
if __name__ == "__main__":
   app.run(debug=True)