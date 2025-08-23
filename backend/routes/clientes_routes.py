from flask import Blueprint

from controllers import (
    create_cliente, 
    listar_clientes, 
    listar_cliente_id, 
    update_cliente, 
    buscar_id_user
)

clientes_bp = Blueprint("clientes", __name__, url_prefix="/clientes")

@clientes_bp.route("", methods=["POST"])
def route_post_cliente():
    usuario_id = buscar_id_user()
    return create_cliente(usuario_id)

@clientes_bp.route("", methods=["GET"])
def route_get_clientes():
    usuario_id = buscar_id_user()
    return listar_clientes(usuario_id)

@clientes_bp.route("/<int:id>", methods=["GET"])
def route_get_cliente(id):
    usuario_id = buscar_id_user()
    return listar_cliente_id(id, usuario_id)

@clientes_bp.route("/<int:id>", methods=["PUT"])
def route_update_cliente(id):
    usuario_id = buscar_id_user()
    return update_cliente(usuario_id, id)