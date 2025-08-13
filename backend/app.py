from flask import request, jsonify
from flask import Flask
from flask_cors import CORS
from database import session

from controllers.user_auth_controller import (
    cadastrar_usuario,
    login_usuario
)

from controllers.fornecedores_controller import (
    listar_fornecedores,
    listar_fornecedor_id,
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

from controllers.categoria_controller import (
    create_categoria,
    listar_categorias,
    obter_categoria,
    atualizar_categoria,
    deletar_categoria,
)

from controllers.search_id_user_controller import (
    buscar_id_user
)

app = Flask(__name__)
# Permitir somente o localhost:3000 e o 5000
CORS(app, resources={r"/*": {"origins": ["http://localhost:3000", "http://127.0.0.1:5000"]}})

## ============== [ Rotas de Clientes ] ==============

# Rota para criar cliente
@app.route('/clientes', methods=['POST'])
def route_post_cliente():
    usuario_id = buscar_id_user()
    return create_cliente(usuario_id)

# Rota para listar clientes "/clientes"
@app.route('/clientes', methods=['GET'])
def route_get_clientes():
    usuario_id = buscar_id_user()
    return listar_clientes(usuario_id)  

# Rota para buscar cliente por ID
@app.route('/clientes/<int:id>', methods=['GET'])
def get_cliente(id):
    return listar_cliente_id(id)

# Rota para deletar cliente pelo ID
@app.route('/clientes/<int:id>', methods=['DELETE'])
def del_cliente(id):
    return delete_cliente(id)

# Rota para atualizar cliente pelo ID
@app.route('/clientes/<int:id>', methods=['PUT'])
def update_cliente_id(id):
    return update_cliente(id)

## ============== [ Rotas de Fornecedores ] ==============

# Rota para listar fornecedores "/fornecedores"
@app.route('/fornecedores', methods=['GET'])
def route_lista_fornecedores():
    usuario_id = buscar_id_user()
    return listar_fornecedores(usuario_id)

# Rota para buscar fornecedor por ID
@app.route('/fornecedores/<int:id>', methods=['GET'])
def get_fornecedor(id):
    return listar_fornecedor_id(id)

# Rota para deletar fornecedor pelo ID
@app.route('/fornecedores/<int:id>', methods=['DELETE'])
def route_delete_fornecedor(id):
    return delete_fornecedor(id)

# Rota para atualizar fornecedor pelo ID
@app.route('/fornecedores/<int:id>', methods=['PUT'])
def upt_fornecedor(id):
    return update_fornecedor(id)

# Rota para criar fornecedor
@app.route('/fornecedores/cadastro', methods=['POST'])
def post_fornecedor():
    usuario_id = buscar_id_user()
    return create_fornecedor(usuario_id)

## ============== [ Rotas de Usuario ] ==============

@app.route('/usuarios/cadastrar', methods=['POST'])
def post_user():
    return cadastrar_usuario()

@app.route('/usuarios/login', methods=['POST'])
def post_login():
    return login_usuario()

## ============== [ Rotas de Categoria ] ==============

@app.route('/categorias', methods=['POST'])
def route_criar_categoria():
    usuario_id = buscar_id_user()
    return create_categoria(usuario_id)

@app.route('/categorias', methods=['GET'])
def route_listar_categorias():
    usuario_id = buscar_id_user()
    return listar_categorias(usuario_id)

@app.route('/categorias/<int:id>', methods=['GET'])
def route_obter_categoria(id):
    return obter_categoria(id)

@app.route('/categorias/<int:id>', methods=['PUT'])
def route_atualizar_categoria(id):
    return atualizar_categoria(id)

@app.route('/categorias/<int:id>', methods=['DELETE'])
def route_deletar_categoria(id):
    return deletar_categoria(id)

if __name__ == "__main__":
   app.run(debug=True)
