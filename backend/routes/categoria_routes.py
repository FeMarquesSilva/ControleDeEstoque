from flask import Blueprint

from controllers import (
    create_categoria,
    listar_categorias,
    obter_categoria,
    obter_categoria,
    atualizar_categoria,
    buscar_id_user
)

categorias_bp = Blueprint("categorias", __name__, url_prefix="/categorias")

# Rota para listar categorias
@categorias_bp.route("", methods=['GET'])
def route_listar_categorias():
    usuario_id = buscar_id_user()
    return listar_categorias(usuario_id)

# Rota para obter categoria por ID
@categorias_bp.route("/<int:id>", methods=['GET'])
def route_obter_categoria(id):
    usuario_id = buscar_id_user()
    return obter_categoria(id, usuario_id)

# Rota para criar categoria
@categorias_bp.route("", methods=['POST'])
def route_criar_categoria():
    usuario_id = buscar_id_user()
    return create_categoria(usuario_id)

# Rota para atualizar categoria por ID
@categorias_bp.route("/<int:id>", methods=['PUT'])
def route_atualizar_categoria(id):
    return atualizar_categoria(id)