from flask import Blueprint

from controllers import (
    consulta_lotes
)

lotes_bp = Blueprint("lotes", __name__, url_prefix="/lotes")

# Rota para listar os lotes
@lotes_bp.route("/listar-lotes", methods=['GET'])
def get_lotes():
    usuario_id = buscar_id_user()
    return consulta_lotes(usuario_id)