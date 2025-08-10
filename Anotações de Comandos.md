## Comandos GIT (GitHub)

- Clonar Repositório:
1. git clone <link do repositório>

- Atualizar arquivos e subir para o respositório:
1. git add <nome do arquivo> ou . para adicionar todos os arquivos
2. git commit -m "<mensagem de commit>"
3. git push

- Puxar as ultimas atualizações do repositório caso haja:
1. git pull

- Verificar status do repositório:
1. git status
2. git log

### Branchs

- Verificar as branchs existentes:
1. git branch

- Criar uma branch nova:
1. git branch <nome da branch>

- Acessar uma branch existente:
2. git checkout <nome da branch> 

- Mergir uma branch para a branch principal:
1. git checkout <nome da branch principal> 'Acessar a branch primeiro
2. git merge <nome da branch a ser mergir> "Geralmente main"

- Deletar uma branch:
1. git branch -d <nome da branch>

## Python

- Criar ambiente virtual:
1. python -m venv <nome do ambiente virtual>

- Acessar o ambiente criado:
1. <nome do ambiente virtual>\Scripts\activate (Windows)

- Sair do ambiente virtual:
1. deactivate

- Instalar os requeriments (Dependencias):
1. pip install -r requirements.txt

- Listar as dependencias:
1. pip list

### Bibliotecas Sugeridas (Professores):

Yup / formik //Validação de formulário
Flask_login