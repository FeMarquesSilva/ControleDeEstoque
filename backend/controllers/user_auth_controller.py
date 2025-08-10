from database import session
from models import User
from flask import request, jsonify
from database import auth

def cadastrar_usuario():
    data = request.get_json()
    if not data or not all(key in data for key in ('nome', 'email', 'senha')):
        return jsonify({'erro': 'Dados incompletos'}), 400
    
    # Verifica se o email já está cadastrado
    if session.query(User).filter_by(email=data['email']).first():
        return jsonify({'erro': 'Email já cadastrado'}), 400
    
    #Crio o usuario no firebase e pego o UID para salvar no banco:
    try:
        user = auth.create_user_with_email_and_password(data['email'], data['senha'])
        data['uid_firebase'] = user['localId']
    except Exception as e:
        return jsonify({'erro': str(e)}), 400
    
    # Verifica se o UID do Firebase já está cadastrado
    if session.query(User).filter_by(uid_firebase=data.get('uid_firebase')).first():
        return jsonify({'erro': 'UID Firebase já cadastrado'}), 400

    # Criação do novo usuário
    novo_usuario = User(nome=data['nome'], email=data['email'], uid_firebase=data['uid_firebase'])
    
    # Adiciona o novo usuário à sessão e comita
    session.add(novo_usuario)
    session.commit()
    
    return jsonify({'mensagem': 'Usuário cadastrado com sucesso'}), 201