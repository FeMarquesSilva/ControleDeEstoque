from flask import request, jsonify
from flask import Flask
from flask_cors import CORS
from database import session

from routes import (
    clientes_bp,
    fornecedores_bp,
    produtos_bp,
    categorias_bp,
    vendas_bp,
    estoque_bp,
    usuarios_bp,
    lotes_bp
)

# Instanciando o app flask;
app = Flask(__name__)

# Permitir somente o localhost:3000 e o 5000;
CORS(app, resources={r"/*": {"origins": ["http://localhost:3000", "http://127.0.0.1:5000"]}})

## ============== [ Rotas Blueprints ] ============== ##

app.register_blueprint(clientes_bp) # Clientes;
app.register_blueprint(fornecedores_bp) # Fornecedores;
app.register_blueprint(produtos_bp) # Produtos;
app.register_blueprint(categorias_bp) # Categorias;
app.register_blueprint(vendas_bp) # Vendas;
app.register_blueprint(estoque_bp) # Estoque;
app.register_blueprint(usuarios_bp) # Usuários;
app.register_blueprint(lotes_bp) # Lotes;

if __name__ == "__main__":
   app.run(debug=True)
