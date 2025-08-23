from database import session
from models import Usuario
from flask import request
from database import auth

#Função utilizada para buscar o id do usuario atual comparando com o UID do firebase;
def buscar_id_user():
    token = request.headers.get('Authorization')
    if not token:
        return None

    if token.startswith("Bearer "):
        token = token.split(" ")[1]

    try:
        info = auth.get_account_info(token)
        uid_firebase = info['users'][0]['localId']

        usuario = session.query(Usuario).filter_by(_uid_firebase=uid_firebase).first()
        return usuario.id if usuario else None

    except Exception as e:
        print(f"Erro ao validar token: {e}")
        return None

    finally:
        session.remove()
        
def validar_token():
    usuario_id = buscar_id_user()
    if usuario_id == None:
        return False
    else:
        return True