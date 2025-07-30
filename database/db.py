from sqlalchemy import create_engine, text
from sqlalchemy.orm import sessionmaker, scoped_session
import os

from dotenv import load_dotenv

load_dotenv()

USER = os.getenv("USER")
PASSWORD = os.getenv("PASSWORD")
HOST = os.getenv("HOST")
PORT = os.getenv("PORT")
SID = os.getenv("SID")

print("Iniciando Teste: ")
instance = f"oracle+oracledb://{USER}:{PASSWORD}@{HOST}/?service_name={SID}"
print(instance)
