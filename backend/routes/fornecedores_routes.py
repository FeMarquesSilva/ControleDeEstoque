from flask import Blueprint

from controllers import (
    listar_fornecedores,
    obter_resumo_produtos_fornecedores,
    listar_fornecedores_produtos_vendas,
    listar_fornecedor_id,
    inativar_fornecedor,
    update_fornecedor,
    create_fornecedor,
    buscar_id_user
)

fornecedores_bp = Blueprint("fornecedores", __name__, url_prefix="/fornecedores")

# Rota para listar fornecedores "/fornecedores"
@fornecedores_bp.route("", methods=['GET'])
def route_lista_fornecedores():
    usuario_id = buscar_id_user()
    return listar_fornecedores(usuario_id)

# Rota para listar todos os produtos por fornecedores:
@fornecedores_bp.route("/produtos", methods=['GET'])
def route_lista_fornecedores_produtos():
    usuario_id = buscar_id_user()
    return obter_resumo_produtos_fornecedores(usuario_id)

# Rota para listar todos os produtos por fornecedores:
@fornecedores_bp.route("/produtos/vendas", methods=['GET'])
def route_lista_fornecedores_produtos_vendas():
    usuario_id = buscar_id_user()
    return listar_fornecedores_produtos_vendas(usuario_id)

# Rota para buscar fornecedor por ID
@fornecedores_bp.route("/<int:id>", methods=['GET'])
def get_fornecedor(id):
    usuario_id = buscar_id_user()
    return listar_fornecedor_id(id, usuario_id)

# Rota para deletar fornecedor pelo ID
@fornecedores_bp.route("/<int:id>", methods=['DELETE'])
def route_delete_fornecedor(id):
    return inativar_fornecedor(id)

# Rota para atualizar fornecedor pelo ID
@fornecedores_bp.route("/<int:id>", methods=['PUT'])
def upt_fornecedor(id):
    usuario_id = buscar_id_user() 
    return update_fornecedor(id, usuario_id)

# Rota para criar fornecedor
@fornecedores_bp.route("/cadastro", methods=['POST'])
def post_fornecedor():
    usuario_id = buscar_id_user()
    return create_fornecedor(usuario_id)