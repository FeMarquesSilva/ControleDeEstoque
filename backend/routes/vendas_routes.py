from flask import Blueprint

from controllers import (
    criar_venda,
    listar_vendas_com_clientes,
    listar_vendas,
    listar_vendas_total_cliente,
    listar_vendas_por_cliente,
    listar_vendas_por_produto,
    deletar_venda,
    buscar_id_user
)

vendas_bp = Blueprint("vendas", __name__, url_prefix="/vendas")

# Rota para criar venda
@vendas_bp.route("", methods=['POST'])
def post_venda():
    usuario_id = buscar_id_user()
    return criar_venda(usuario_id)

# Rota para listar vendas com clientes
@vendas_bp.route("/vendas_cliente", methods=['GET'])
def get_vendas():
    return listar_vendas_com_clientes()

# Rota para listar as vendas
@vendas_bp.route("", methods=['GET'])
def route_get_vendas():
    usuario_id = buscar_id_user()
    return listar_vendas(usuario_id)

@vendas_bp.route("/menssal_cliente", methods=['GET'])
def route_get_vendas_mensal_clientes():
    usuario_id = buscar_id_user()
    return listar_vendas_total_cliente(usuario_id)

# Rota para listar vendas por cliente
@vendas_bp.route("/cliente/<int:cliente_id>", methods=['GET'])
def get_vendas_por_cliente(cliente_id):
    return listar_vendas_por_cliente(cliente_id)

# Rota para listar vendas por produto
@vendas_bp.route("/produto/<int:produto_id>", methods=['GET'])
def get_vendas_por_produto(produto_id):
    return listar_vendas_por_produto(produto_id)

# Rota para deletar venda
@vendas_bp.route("/<int:venda_id>", methods=['DELETE'])
def delete_venda(venda_id):
    return deletar_venda(venda_id)