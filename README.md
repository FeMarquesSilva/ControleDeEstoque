# ControleDeEstoque
*Projeto desenvolvido na PUC para a Coamo - Projeto de Desenvolvimento de Software.*

### Comentarios Importantes
- O projeto foi desenvolvido em Python, utilizando react com typeScript e Chakra ui
- Para rodar o projeto, é necessário possuir python em sua maquina, versão =< 12
- Para rodar o projeto, é necessário possuir node.js em sua maquina, versão >= 6.9.0
- Cire um arquivo .env dentro do backend e do frontend.

- No arquivo .env do backend, adicione e configure as seguintes variáveis:
 -USER=""
 -PASSWORD=""
 -HOST=""
 -PORT=""
 -SID=""
 -FIREBASE_API_KEY=""
 -FIREBASE_AUTH_DOMAIN=""
 -FIREBASE_PROJECT_ID=""
 -FIREBASE_DATABASE_URL=""
 -FIREBASE_STORAGE_BUCKET=""
 -FIREBASE_MESSAGING_SENDER_ID=""
 -FIREBASE_APP_ID=1:""

- No arquivo .env do frontend, adicione e configure as seguintes variáveis:
-REACT_APP_NEXT_PUBLIC_API_URL=""

## Modo de Utilizar
1. Clone o repositório.
2. Acesse a pasta "backend" com o comando "cd ./backend".
3. Crie um ambiente virtual de python com o comando "python -m venv (nome do ambiente)"
4. Instale as dependências com o comando `pip install -r requirements.txt`.
5. Rode o backend com o coando "python app.py" ainda no ambiente virutal.
6. Acesse a pasta "frontend" com o comando "cd ./frontend".
7. Instale as dependências com o comando `npm install`.
8. Rode o frontend com o comando `npm start`.
9. Acesse o site em http://localhost:3000.

## Tecnologias Utilizadas
**Backend:**
- flask 2.3.3                # Framework web para criar APIs e aplicações Python;
- flask-cors 6.0.1           # Suporte a CORS para Flask (acesso de domínios diferentes);
- SQLAlchemy 2.0.23          # ORM para interação com bancos de dados;
- python-dotenv 1.0.0        # Carrega variáveis de ambiente de um arquivo .env;
- oracledb 3.3.0             # Driver oficial Python para Oracle Database;
- Pyrebase4 4.8.0            # Cliente Python para o Firebase;
- firebase 4.0.1             # SDK não-oficial para acessar Firebase;

**Frontend**
- @chakra-ui/react 3.23.0     # Biblioteca de componentes React com foco em acessibilidade, design system e estilo pronto
- react 18.0.0                # Biblioteca principal para criação de interfaces declarativas
- react-dom 18.0.0            # Responsável por renderizar componentes React no DOM do navegador
- react-router-dom 6.4.3      # Sistema de rotas para navegação entre páginas no React
- axios 1.11.0                # Cliente HTTP para realizar requisições a APIs
- dotenv 17.2.1               # Carrega variáveis de ambiente a partir de um arquivo .env no frontend
- lucide-react 0.536.0        # Conjunto de ícones em SVG otimizados para uso com React
- @emotion/react 11.10.4      # Biblioteca para estilizar componentes React