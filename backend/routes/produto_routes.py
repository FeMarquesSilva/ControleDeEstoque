from flask import Blueprint

from controllers import (
    create_produto,
    get_produtos_com_fornecedores_categorias,
    get_produto_por_id,
    update_produto,
    buscar_id_user
)

produtos_bp = Blueprint("produtos", __name__, url_prefix="/produtos")

# Rota para listar produtos
@produtos_bp.route("", methods=['GET'])
def get_produtos():
    usuario_id = buscar_id_user()
    return get_produtos_com_fornecedores_categorias(usuario_id)

# Rota para criar produto
@produtos_bp.route("/cadastro", methods=['POST'])
def post_produto():
    usuario_id = buscar_id_user()
    return create_produto(usuario_id)

# Rota para deletar produtos
@produtos_bp.route("/<int:id>", methods=['GET'])
def route_getByid_produto(id):
    return get_produto_por_id(id)

# Rota para atualizar produtos
@produtos_bp.route("/<int:id>", methods=['PUT'])
def route_update_produto(id):
    return update_produto(id)

