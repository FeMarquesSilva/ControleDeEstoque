from database import session
from models import Fornecedor, Produto, Lote, VendaProduto
from flask import request, jsonify
from sqlalchemy import func

# Função para listar fornecedores;
def listar_fornecedores(id_usuario):
    try:
        # Consulta todas os fornecedores do usuário no banco de dados;
        fornecedores = (
            session.query(Fornecedor)
            .filter(Fornecedor.usuario_id == id_usuario)
            .all()
        )
        
        # Cria uma lista de dicionários a partir dos objetos retornados;
        fornecedores_list = [{
            "id": f.id,
            "nome": f.nome,
            "cnpj": f.cnpj,
            "email": f.email,
            "contato": f.contato,
            "endereco": f.endereco,
            "status": f.status
        } for f in fornecedores]
        
        # Retonar os dados em JSON e status 200 (sucesso)
        return jsonify(fornecedores_list)
    
    except Exception as e:
        print(e)
        return jsonify({'error': str(e)}), 500
    
    finally:
        # Encerra a sessão do banco;
        session.remove()

# Lista produtos por fornecedor com a quantidade total disponível;
def obter_resumo_produtos_fornecedores(id_usuario):
    try:
        resultados = (
            session.query(
                Produto.nome.label("nome_produto"),
                Fornecedor.nome.label("nome_fornecedor"),
                func.sum(Lote.quantidade).label("quantidade_total")
            )
            .join(Fornecedor, Fornecedor.id == Produto.fornecedor_id)
            .join(Lote, Lote.produto_id == Produto.id)
            .filter(Produto.usuario_id == id_usuario)
            .group_by(Fornecedor.nome, Produto.nome)
            .order_by(Produto.nome)
            .all()
        )
        
        # Cria uma lista de dicionários a partir dos resultados da query;
        lista_produtos = [{
            "nome_produto": r.nome_produto,
            "nome_fornecedor": r.nome_fornecedor,
            "quantidade_total": r.quantidade_total
        } for r in resultados]

        # Retorna os dados em JSON;
        return jsonify(lista_produtos), 200
    
    except Exception as e:
        print(e)
        return jsonify({'error': str(e)}), 500
    
    finally:
        # Encerra a sessão do banco;
        session.remove()

# Listar total vendido dos produtos de cada fornecedor;
def listar_fornecedores_produtos_vendas(id_usuario):
    try:
        resultados = (
            session.query(
                Fornecedor.nome.label("fornecedor"),
                Produto.nome.label("produto"),
                func.sum(VendaProduto.quantidade).label("total_vendido")
            )
            .join(Produto, Produto.id == VendaProduto.produto_id)
            .join(Fornecedor, Fornecedor.id == Produto.fornecedor_id)
            .filter(Fornecedor.usuario_id == id_usuario)  # ajuste conforme seu modelo
            .group_by(Fornecedor.id, Fornecedor.nome, Produto.nome)
            .all()
        )

        resultados_list = [{
            "fornecedor": r.fornecedor,
            "produto": r.produto,
            "total_vendido": int(r.total_vendido) if r.total_vendido else 0
        } for r in resultados]
        
        return jsonify(resultados_list)
    
    except Exception as e:
        print(e)
        return jsonify({'error': str(e)}), 500
    
    finally:
        # Encerra a sessão do banco;
        session.remove()

# Função para listar fornecedor por ID;
def listar_fornecedor_id(id, id_usuario):
    try:    
        # Consulta o fornecedor solicitada pelo usuário no banco de dados;
        fornecedor = (
            session.query(Fornecedor)
            .filter(Fornecedor.id == id)
            .filter(Fornecedor.usuario_id == id_usuario)
            .first()
        )
        
        if not fornecedor:
            return jsonify({'erro': 'Fornecedor não encontrado'}), 404
        
        # Cria o dicionário com os dados do fornecedor;
        fornecedor_list = {
            'id': fornecedor.id,
            'nome': fornecedor.nome,
            'cnpj': fornecedor.cnpj,
            'email': fornecedor.email,
            'contato': fornecedor.contato,
            'endereco': fornecedor.endereco
        }
        
        # Retorna os dados em formato JSON com status 200 (sucesso);
        return jsonify(fornecedor_list), 200
        
    except Exception as e:
        print(e)
        return jsonify({'error': str(e)}), 500
    
    finally:
        # Encerra a sessão do banco;
        session.remove()
    
# Rota para criar fornecedor;
def create_fornecedor(id_usuario):
    data = request.json
    if not data:
        return jsonify({'erro': 'Dados não fornecidos'}), 400
    
    # Validação dos campos obrigatórios
    if not data.get('nome') or not data.get('cnpj') or not data.get('contato') or not data.get('endereco') or not data.get('email'):
        return jsonify({'error': 'Preencha todos os campos!'}), 400
    
    try:
        # Cria o objeto Fornecedor;
        novo_fornecedor = Fornecedor(
            nome=data.get('nome'),
            cnpj=data.get('cnpj'),
            email=data.get('email'),
            contato=data.get('contato'),
            endereco=data.get('endereco'),
            usuario_id=id_usuario
        )
        
        # Adiciona ao banco e confirma a transação;
        session.add(novo_fornecedor)
        session.commit()
        
        # Retorna mensagem de sucesso;
        return jsonify({'mensagem': 'Fornecedor criado com sucesso'}), 201
    
    except Exception as e:
        print(e)
        return jsonify({'error': str(e)}), 500
    
    finally:
        # Encerra a sessão do banco;
        session.remove()
    
# Rota para atualizar fornecedor pelo ID;
def update_fornecedor(id, id_usuario):
    data = request.get_json()
    
    if not data:
        return jsonify({'erro': 'Dados não fornecidos'}), 400
    
    try:
        fornecedor = (
            session.query(Fornecedor)
            .filter(Categoria.usuario_id == id_usuario)
            .get(id)
        )
        
        if not fornecedor:
            return jsonify({'erro': 'Fornecedor não encontrado'}), 404
        
        for key, value in data.items():
            setattr(fornecedor, key, value)
        
        session.commit()
        return jsonify({'mensagem': 'Fornecedor atualizado com sucesso'}), 200
        
    except Exception as e:
        print(e)
        return jsonify({'error': str(e)}), 500
    
    finally:
        # Encerra a sessão do banco;
        session.remove()

# Rota para inativar fornecedor pelo ID
def inativar_fornecedor(id):
    try:
        fornecedor = session.query(Fornecedor).get(id)
        
        if not fornecedor:
            session.close()
            return jsonify({'erro': 'Fornecedor não encontrado'}), 404
        
        # Apenas altera o status
        fornecedor.status = False
        session.commit()
        session.close()
        
        return jsonify({'mensagem': 'Fornecedor inativado com sucesso'}), 200
    
    except Exception as e:
        print(e)
        return jsonify({'error': str(e)}), 500
    
    finally:
        # Encerra a sessão do banco;
        session.remove()
