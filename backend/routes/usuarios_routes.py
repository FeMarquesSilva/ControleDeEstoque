from flask import Blueprint

from controllers import (
    login_usuario,
    cadastrar_usuario
)

usuarios_bp = Blueprint("usuarios", __name__, url_prefix="/usuarios")

@usuarios_bp.route("/cadastrar", methods=['POST'])
def post_user():
    return cadastrar_usuario()

@usuarios_bp.route("/login", methods=['POST'])
def post_login():
    return login_usuario()