from database import session
from models import Usuario
from flask import request, jsonify
from database import auth

def cadastrar_usuario():
    data = request.get_json()
    
    # Valida se nome, email e senha foram fornecidos;
    if not data.get('nome') or not data.get('email') or not data.get('senha'):
        return jsonify({'erro': 'Dados incompletos'}), 400

    try:
        # Verifica se o email já está cadastrado;
        if session.query(Usuario).filter_by(email=data['email']).first():
            return jsonify({'erro': 'Email já cadastrado'}), 400
            
        # Cria o usuario no Firebase e pego o UID para salvar no banco;
        user = auth.create_user_with_email_and_password(data['email'], data['senha'])
        data['uid_firebase'] = user['localId']

        # Verifica se o UID do Firebase já está cadastrado;
        if session.query(Usuario).filter_by(uid_firebase=data.get('uid_firebase')).first():
            return jsonify({'erro': 'UID Firebase já cadastrado'}), 400

        # Criação do novo usuário;
        novo_usuario = Usuario(
            nome=data['nome'], 
            email=data['email'], 
            uid_firebase=data['uid_firebase']
        )
        
        # Adiciona o novo usuário à sessão e comita;
        session.add(novo_usuario)
        session.commit()
        
        return jsonify({'mensagem': 'Usuário cadastrado com sucesso'}), 201

    except Exception as e:
        print(e)
        return jsonify({'error': str(e)}), 500

    finally:
        session.remove()


def login_usuario():
    data = request.get_json()
    email = data.get('email')
    senha = data.get('senha')

    # Valida se email e senha foram fornecidos;
    if not email or not senha:
        return jsonify({'erro': 'Email e senha obrigatórios'}), 400

    try:
        # Faz login no Firebase;
        user = auth.sign_in_with_email_and_password(email, senha)     
        id_token = user['idToken']
        
        # Busca o usuário no banco local;
        usuario = session.query(Usuario).filter_by(_uid_firebase=user['localId']).first()

        if not usuario:
            return jsonify({'erro': 'Usuário não encontrado no banco local'}), 404

        return jsonify({
            'mensagem': 'Login realizado com sucesso',
            'token': id_token,
            'user': {
                'id': usuario.id,
                'nome': usuario.nome,
                'email': usuario.email
            }
        }), 200

    except Exception as e:
        return jsonify({'erro': str(e)}), 401

    finally:
        session.remove()
        
def redefinir_senha():
    data = request.get_json()
    email = data.get('email')
    try:
        auth.send_password_reset_email(email)
        print("Email encaminhado para: ", email)
        return jsonify({'mensagem': 'e-mail de redefinição encaminhado.'}), 200
    
    except Exception as e:
        return jsonify({'erro': str(e)}), 401

    finally:
        session.remove()
        