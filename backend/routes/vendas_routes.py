from flask import Blueprint

from controllers import (
    criar_venda,
    listar_vendas,
    listar_vendas_total_cliente,
    buscar_id_user,
    listar_vendas_detalhadas
)

vendas_bp = Blueprint("vendas", __name__, url_prefix="/vendas")

# Rota para criar venda
@vendas_bp.route("", methods=['POST'])
def post_venda():
    usuario_id = buscar_id_user()
    return criar_venda(usuario_id)

# Rota para listar as vendas
@vendas_bp.route("", methods=['GET'])
def route_get_vendas():
    usuario_id = buscar_id_user()
    return listar_vendas(usuario_id)

# Rota para listar as vendas detalhada
@vendas_bp.route("/detalhada", methods=['GET'])
def route_get_vendas_detalhada():
    usuario_id = buscar_id_user()
    return listar_vendas_detalhadas(usuario_id)

@vendas_bp.route("/menssal_cliente", methods=['GET'])
def route_get_vendas_mensal_clientes():
    usuario_id = buscar_id_user()
    return listar_vendas_total_cliente(usuario_id)
