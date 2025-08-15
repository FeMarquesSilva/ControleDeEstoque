from typing import List, Optional
from sqlalchemy import Column, DateTime, ForeignKeyConstraint, Index, Integer, Boolean, PrimaryKeyConstraint, Table, VARCHAR, ForeignKey
from sqlalchemy.dialects.oracle import FLOAT, NUMBER
from sqlalchemy.orm import DeclarativeBase, Mapped, mapped_column, relationship
import datetime

class Base(DeclarativeBase):
    pass

class Categoria(Base):
    __tablename__ = 'categoria'
    __table_args__ = (
        ForeignKeyConstraint(['usuario_id'], ['usuario.id'], name='categoria_usuario_fk'),
        PrimaryKeyConstraint('id', name='categoria_pk'),
    )

    id: Mapped[int] = mapped_column(Integer, primary_key=True)
    nome: Mapped[str] = mapped_column(VARCHAR(100))
    descricao: Mapped[str] = mapped_column(VARCHAR(100))
    usuario_id: Mapped[int] = mapped_column(Integer)

class Cliente(Base):
    __tablename__ = 'cliente'
    __table_args__ = (
        PrimaryKeyConstraint('id', name='cliente_pk'),
    )

    id: Mapped[int] = mapped_column(Integer, primary_key=True)
    endereco: Mapped[str] = mapped_column(VARCHAR(100))
    nome: Mapped[str] = mapped_column(VARCHAR(50))
    cnpj: Mapped[str] = mapped_column(VARCHAR(14))
    telefone: Mapped[str] = mapped_column(VARCHAR(11))
    email: Mapped[str] = mapped_column(VARCHAR(50))
    usuario_id: Mapped[int] = mapped_column(Integer)

class Fornecedor(Base):
    __tablename__ = 'fornecedor'
    __table_args__ = (
        ForeignKeyConstraint(['usuario_id'], ['usuario.id'], name='fornecedor_usuario_fk'),
        PrimaryKeyConstraint('id', name='fornecedor_pk'),
    )

    id: Mapped[int] = mapped_column(Integer, primary_key=True)
    nome: Mapped[str] = mapped_column(VARCHAR(50))
    cnpj: Mapped[str] = mapped_column(VARCHAR(14))
    contato: Mapped[str] = mapped_column(VARCHAR(11))
    endereco: Mapped[str] = mapped_column(VARCHAR(100))
    email: Mapped[str] = mapped_column(VARCHAR(50))
    usuario_id: Mapped[int] = mapped_column(Integer)
    status: Mapped[bool] = mapped_column(Boolean, default=True, nullable=False)

    # Agregação: Fornecedor → Produto
    produtos = relationship("Produto", back_populates="fornecedor", cascade="save-update, merge")

# Classe para representar o usuario com encapsulamento
class Usuario(Base):
    __tablename__ = 'usuario'
    __table_args__ = (
        PrimaryKeyConstraint('id', name='usuario_pk'),
        Index('index_1v1', 'email', unique=True)
    )

    _id: Mapped[int] = mapped_column("id", Integer, primary_key=True)
    _uid_firebase: Mapped[str] = mapped_column("uid_firebase", VARCHAR(128), unique=True, nullable=False)
    _nome: Mapped[str] = mapped_column("nome", VARCHAR(100))
    _email: Mapped[str] = mapped_column("email", VARCHAR(100))

    def __init__(self, uid_firebase: str, nome: str, email: str):
        self._uid_firebase = uid_firebase
        self._nome = nome
        self._email = email

    @property
    def id(self) -> int:
        return self._id

    @property
    def uid_firebase(self) -> str:
        return self._uid_firebase

    @uid_firebase.setter
    def uid_firebase(self, value: str):
        if not value.strip():
            raise ValueError("UID Firebase não pode ser vazio.")
        self._uid_firebase = value.strip()

    @property
    def nome(self) -> str:
        return self._nome

    @nome.setter
    def nome(self, value: str):
        if not value.strip():
            raise ValueError("O nome não pode ser vazio.")
        self._nome = value.strip()

    @property
    def email(self) -> str:
        return self._email

    @email.setter
    def email(self, value: str):
        if "@" not in value or "." not in value:
            raise ValueError("E-mail inválido.")
        self._email = value.lower().strip()

class Produto(Base):
    __tablename__ = 'produto'
    __table_args__ = (
        ForeignKeyConstraint(['categoriaid'], ['categoria.id'], name='produto_categoria_fk'),
        PrimaryKeyConstraint('id', name='produto_pk'),
        Index('index_1', 'sku', unique=True)
    )

    id: Mapped[int] = mapped_column(Integer, primary_key=True)
    nome: Mapped[str] = mapped_column(VARCHAR(100))
    descricao: Mapped[str] = mapped_column(VARCHAR(100))
    sku: Mapped[str] = mapped_column(VARCHAR(50))
    unidademedida: Mapped[str] = mapped_column(VARCHAR(10))
    status: Mapped[bool] = mapped_column(Boolean)
    fornecedor_id: Mapped[int] = mapped_column(Integer)
    categoriaid: Mapped[Optional[int]] = mapped_column(Integer)
    usuario_id: Mapped[int] = mapped_column(Integer)

    fornecedor = relationship("Fornecedor", back_populates="produtos")

class Venda(Base):
    __tablename__ = 'venda'
    __table_args__ = (
        ForeignKeyConstraint(['cliente_id'], ['cliente.id'], name='venda_cliente_fk'),
        ForeignKeyConstraint(['usuario_id'], ['usuario.id'], name='venda_usuario_fk'),
        PrimaryKeyConstraint('id', name='venda_pk')
    )

    id: Mapped[int] = mapped_column(Integer, primary_key=True)
    datavenda: Mapped[datetime.datetime] = mapped_column(DateTime)
    numeronf: Mapped[int] = mapped_column(Integer)
    cliente_id: Mapped[int] = mapped_column(Integer)
    usuario_id: Mapped[int] = mapped_column(Integer)

    # Composição: Venda → VendaProduto
    itens = relationship("VendaProduto", back_populates="venda", cascade="all, delete-orphan")

t_fornecedorproduto = Table(
    'fornecedorproduto', Base.metadata,
    Column('fornecedor_id', Integer, nullable=False),
    Column('produto_id', Integer, nullable=False),
    ForeignKeyConstraint(['fornecedor_id'], ['fornecedor.id'], name='fornecedorproduto_fornecedor_fk'),
    ForeignKeyConstraint(['produto_id'], ['produto.id'], name='fornecedorproduto_produto_fk')
)

class Lote(Base):
    __tablename__ = 'lote'
    __table_args__ = (
        ForeignKeyConstraint(['produto_id'], ['produto.id'], name='lote_produto_fk'),
        ForeignKeyConstraint(['usuario_id'], ['usuario.id'], name='lote_usuario_fk'),
        PrimaryKeyConstraint('id', name='lote_pk') 
    )

    id: Mapped[int] = mapped_column(Integer, primary_key=True)
    produto_id: Mapped[int] = mapped_column(Integer)
    numero_lote: Mapped[Optional[str]] = mapped_column(VARCHAR(50))
    validade: Mapped[Optional[datetime.datetime]] = mapped_column(DateTime)
    quantidade: Mapped[Optional[int]] = mapped_column(Integer)
    usuario_id: Mapped[int] = mapped_column(Integer)
    
t_vendaproduto = Table(
    'vendaproduto', Base.metadata,
    Column('produto_id', Integer, ForeignKey('produto.id'), primary_key=True),
    Column('venda_id', Integer, ForeignKey('venda.id'), primary_key=True),
    Column('quantidade', Integer, nullable=False),
    Column('valorunitario', FLOAT(2), nullable=False),
    Column('valortotal', FLOAT(2), nullable=False)
)

class VendaProduto(Base):
    __table__ = t_vendaproduto

    produto = relationship("Produto")
    venda = relationship("Venda", back_populates="itens")

class Entradaestoque(Base):
    __tablename__ = 'entradaestoque'
    __table_args__ = (
        ForeignKeyConstraint(['lote_id'], ['lote.id'], name='entradaestoque_lote_fk'),
        ForeignKeyConstraint(['usuario_id'], ['usuario.id'], name='entradaestoque_usuario_fk'),
        PrimaryKeyConstraint('id', name='entradaestoque_pk')
    )

    id: Mapped[int] = mapped_column(Integer, primary_key=True)
    quantidade: Mapped[int] = mapped_column(Integer)
    dataentrada: Mapped[datetime.datetime] = mapped_column(DateTime)
    validade: Mapped[datetime.datetime] = mapped_column(DateTime)
    usuario_id: Mapped[int] = mapped_column(Integer)
    lote_id: Mapped[int] = mapped_column(Integer)

class Saidaestoque(Base):
    __tablename__ = 'saidaestoque'
    __table_args__ = (
        ForeignKeyConstraint(['lote_id'], ['lote.id'], name='saidaestoque_lote_fk'),
        ForeignKeyConstraint(['usuario_id'], ['usuario.id'], name='saidaestoque_usuario_fk'),
        PrimaryKeyConstraint('id', name='saidaestoque_pk')
    )

    id: Mapped[int] = mapped_column(Integer, primary_key=True)
    qunatidade: Mapped[int] = mapped_column(Integer)
    datasaida: Mapped[datetime.datetime] = mapped_column(DateTime)
    motivo: Mapped[str] = mapped_column(VARCHAR(30))
    usuario_id: Mapped[int] = mapped_column(Integer)
    lote_id: Mapped[int] = mapped_column(Integer)