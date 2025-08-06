from flask import Flask
from flask_cors import CORS
from database import session
from models import Cliente, Fornecedor
from controllers.fornecedores_controller import (
    listar_fornecedores,
    listar_fornecedor_id,
    busca_fornecedor,
    delete_fornecedor,
    update_fornecedor,
    create_fornecedor
)

from controllers.clientes_controller import (
    listar_clientes,
    listar_cliente_id,
    busca_cliente,
    delete_cliente,
    update_cliente,
    create_cliente
)

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

# Rota para listar fornecedores "/fornecedores"
@app.route('/fornecedores', methods=['GET'])
def get_fornecedores():
    return listar_fornecedores()

# Rota para buscar fornecedor por ID
@app.route('/fornecedores/<int:id>', methods=['GET'])
def get_fornecedor(id):
    return listar_fornecedor_id(id)

# Rota para deletar fornecedor pelo ID
@app.route('/fornecedores/<int:id>', methods=['DELETE'])
def delete_fornecedor(id):
    return delete_fornecedor(id)

# Rota para atualizar fornecedor pelo ID
@app.route('/fornecedores/<int:id>', methods=['PUT'])
def update_fornecedor(id):
    return update_fornecedor(id)

# Rota para criar fornecedor
@app.route('/fornecedores', methods=['POST'])
def create_fornecedor():
    return create_fornecedor()

if __name__ == "__main__":
   app.run(debug=True)