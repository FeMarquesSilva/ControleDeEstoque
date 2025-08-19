from flask import Blueprint

from controllers import (
    realizar_entrada_estoque,
    buscar_estoque,
    buscar_estoque_resumido,
    realizar_descarte_estoque,
    realizar_saida_estoque_venda,
    buscar_id_user
)

estoque_bp = Blueprint("estoques", __name__, url_prefix="/estoque")

# Rota para realizar a entrada no estoque
@estoque_bp.route("/entrada", methods=['POST'])
def post_entrada_estoque(): 
    usuario_id = buscar_id_user()
    return realizar_entrada_estoque(usuario_id)

# Rota para realizar a busca do estoque
@estoque_bp.route("", methods=['GET'])
def get_estoque():
    usuario_id = buscar_id_user()
    return buscar_estoque(usuario_id)

# Rota para listar o estoque resumido
@estoque_bp.route("/resumido", methods=['GET'])
def get_estoque_resumido():
    usuario_id = buscar_id_user()
    return buscar_estoque_resumido(usuario_id)

# Rota para realizar descarte de estoque
@estoque_bp.route("/descarte", methods=['POST'])
def post_descarte_estoque():
    usuario_id = buscar_id_user()
    return realizar_descarte_estoque(usuario_id)

# Rota para realizar saida de estoque por venda
@estoque_bp.route("/saida_venda", methods=['POST'])
def post_saida_estoque_venda():
    usuario_id = buscar_id_user()
    return realizar_saida_estoque_venda(usuario_id)