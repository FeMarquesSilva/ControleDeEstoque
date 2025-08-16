from flask import request, jsonify
from flask import Flask
from flask_cors import CORS
from database import session

from controllers import (
    consulta_lotes,
    cadastrar_usuario,
    login_usuario,
    listar_fornecedores,
    listar_fornecedor_id,
    delete_fornecedor,
    update_fornecedor,
    create_fornecedor,
    listar_clientes,
    listar_cliente_id,
    delete_cliente,
    update_cliente,
    create_cliente,
    create_categoria,
    listar_categorias,
    obter_categoria,
    atualizar_categoria,
    deletar_categoria,
    buscar_id_user,
    create_produto,
    get_produtos_com_fornecedores_categorias,
    get_produto_por_id,
    get_produtos_por_fornecedor,
    get_produtos_por_categoria,
    get_produtos_por_status,
    delete_produto,
    update_produto,
    get_produtos_por_lote,
    criar_venda,
    listar_vendas,
    listar_vendas_por_cliente,
    listar_vendas_por_produto,
    listar_vendas_por_data,
    deletar_venda,
    realizar_entrada_estoque,
    buscar_estoque,
    realizar_descarte_estoque
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

## ============== [ Rotas de Produto ] ==============

# Rota para criar produto
@app.route('/produtos/cadastro', methods=['POST'])
def post_produto():
    usuario_id = buscar_id_user()
    return create_produto(usuario_id)

# Rota para listar produtos
@app.route('/produtos', methods=['GET'])
def get_produtos():
    return get_produtos_com_fornecedores_categorias()

# Rota para listar produtos por fornecedor
@app.route('/produtos/fornecedor/<int:fornecedor_id>', methods=['GET'])
def route_get_produtos_por_fornecedor(fornecedor_id):
    return get_produtos_por_fornecedor(fornecedor_id)

# Rota para listar produtos por categoria
@app.route('/produtos/categoria/<int:categoria_id>', methods=['GET'])
def route_get_produtos_por_categoria(categoria_id):
    return get_produtos_por_categoria(categoria_id)

# Rota para listar produtos por status
@app.route('/produtos/status/<string:status>', methods=['GET'])
def route_get_produtos_por_status(status):
    return get_produtos_por_status(status)

# Rota para deletar produtos
@app.route('/produtos/<int:id>', methods=['DELETE'])
def route_del_produto(id):
    return delete_produto(id)

# Rota para atualizar produtos
@app.route('/produtos/<int:id>', methods=['PUT'])
def route_update_produto(id):
    data = request.json
    if not data:
        return jsonify({'erro': 'Dados não fornecidos'}), 400
    return update_produto(id, data)

# Rota para listar produtos por lote
@app.route('/produtos/lote/<int:lote_id>', methods=['GET'])
def route_get_produtos_por_lote(lote_id):
    return get_produtos_por_lote(lote_id)

## ============== [ Rotas de Vendas ] ==============

# Rota para criar venda
@app.route('/vendas', methods=['POST'])
def post_venda():
    usuario_id = buscar_id_user()
    return criar_venda(usuario_id)

# Rota para listar vendas
@app.route('/vendas', methods=['GET'])
def get_vendas():
    return listar_vendas()

# Rota para listar vendas por cliente
@app.route('/vendas/cliente/<int:cliente_id>', methods=['GET'])
def get_vendas_por_cliente(cliente_id):
    return listar_vendas_por_cliente(cliente_id)

# Rota para listar vendas por produto
@app.route('/vendas/produto/<int:produto_id>', methods=['GET'])
def get_vendas_por_produto(produto_id):
    return listar_vendas_por_produto(produto_id)

# Rota para listar vendas por data
@app.route('/vendas/data/<string:data>', methods=['GET'])
def get_vendas_por_data(data):
    return listar_vendas_por_data(data)

# Rota para deletar venda
@app.route('/vendas/<int:venda_id>', methods=['DELETE'])
def delete_venda(venda_id):
    return deletar_venda(venda_id)

## ============== [ Rotas de Estoque ] ==============

# Rota para realizar a entrada no estoque
@app.route('/estoque/entrada', methods=['POST'])
def post_entrada_estoque(): 
    usuario_id = buscar_id_user()
    return realizar_entrada_estoque(usuario_id)

# Rota para realizar a busca do estoque
@app.route('/estoque', methods=['GET'])
def get_estoque():
    return buscar_estoque()

# Rota para realizar descarte de estoque
@app.route('/estoque/descarte', methods=['POST'])
def post_descarte_estoque():
    usuario_id = buscar_id_user()
    return realizar_descarte_estoque(usuario_id)

## ============== [ Rotas de Lote ] ==============

# Rota para listar os lotes
@app.route('/estoque/listar-lotes', methods=['GET'])
def get_lotes():
    usuario_id = buscar_id_user()
    return consulta_lotes(usuario_id)

if __name__ == "__main__":
   app.run(debug=True)
