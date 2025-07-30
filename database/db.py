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

instance = f"oracle+oracledb://{USER}:{PASSWORD}@{HOST}/?service_name={SID}"

engine = create_engine(instance, echo=True)
session = scoped_session(sessionmaker(bind=engine))

clientes = session.execute(text("SELECT * FROM CLIENTE"))

print(clientes)

#oracle+oracledb://ControleEstoque:oracle@localhost/?service_name=XEPDB1