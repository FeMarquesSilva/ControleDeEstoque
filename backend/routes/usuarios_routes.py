from flask import Blueprint, jsonify

from controllers import (
    login_usuario,
    cadastrar_usuario,
    validar_token
)

usuarios_bp = Blueprint("usuarios", __name__, url_prefix="/usuarios")

@usuarios_bp.route("/cadastrar", methods=['POST'])
def post_user():
    return cadastrar_usuario()

@usuarios_bp.route("/login", methods=['POST'])
def post_login():
    return login_usuario()

@usuarios_bp.route("/token", methods=['GET'])
def post_token():
    try:
        if validar_token():
            return jsonify({"valid": True}), 200
        else:
            return jsonify({"valid": False}), 401
    except Exception as e:
        print(f"Erro interno: {e}")
        return jsonify({"valid": False, "error": str(e)}), 500