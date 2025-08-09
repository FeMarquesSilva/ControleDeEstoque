import pyrebase
from config.firebase import firebaseConfig

firebase = pyrebase.initialize_app(firebaseConfig)
auth = firebase.auth()

user = auth.create_user_with_email_and_password("teste@testes,com", "12345")