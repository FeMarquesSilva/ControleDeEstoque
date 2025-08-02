from flask import Flask
from flask_cors import CORS

from database import session
from models import Cliente
from controllers import listar_clientes

app = Flask(__name__)
CORS(app)  # Permite CORS para todas rotas e origens

# Rota para listar clientes "/clientes"
@app.route('/clientes', methods=['GET'])
def get_clientes():
    return listar_clientes()  

if __name__ == "__main__":
    app.run(debug=True)