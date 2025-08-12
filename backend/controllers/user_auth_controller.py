from database import session
from models import Usuario
from flask import request, jsonify
from database import auth

def cadastrar_usuario():
    data = request.get_json()
    
    # Valido se nome, email e senha foram fornecidos
    if not data.get('nome') or not data.get('email') or not data.get('senha'):
        return jsonify({'erro': 'Dados incompletos'}), 400

    # Verifica se o email já está cadastrado
    if session.query(Usuario).filter_by(email=data['email']).first():
        return jsonify({'erro': 'Email já cadastrado'}), 400
    
    # Crio o usuario no Firebase e pego o UID para salvar no banco
    try:
        user = auth.create_user_with_email_and_password(data['email'], data['senha'])
        data['uid_firebase'] = user['localId']
    except Exception as e:
        return jsonify({'erro': str(e)}), 400
    
    # Verifica se o UID do Firebase já está cadastrado
    if session.query(Usuario).filter_by(uid_firebase=data.get('uid_firebase')).first():
        return jsonify({'erro': 'UID Firebase já cadastrado'}), 400

    # Criação do novo usuário
    novo_usuario = Usuario(
        nome=data['nome'], 
        email=data['email'], 
        uid_firebase=data['uid_firebase']
    )
    
    # Adiciona o novo usuário à sessão e comita
    session.add(novo_usuario)
    session.commit()
    
    return jsonify({'mensagem': 'Usuário cadastrado com sucesso'}), 201


def login_usuario():
    data = request.get_json()
    email = data.get('email')
    senha = data.get('senha')

    # Valida se email e senha foram fornecidos
    if not email or not senha:
        return jsonify({'erro': 'Email e senha obrigatórios'}), 400

    try:
        # Faz login no Firebase
        user = auth.sign_in_with_email_and_password(email, senha)
        id_token = user['idToken']

        # Busca o usuário no banco local
        usuario = session.query(Usuario).filter_by(uid_firebase=user['localId']).first()
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