from typing import List, Optional

from sqlalchemy import Column, DateTime, ForeignKeyConstraint, Index, Integer, PrimaryKeyConstraint, Table, VARCHAR
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

    #produto: Mapped[List['Produto']] = relationship('Produto', back_populates='categoria')


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

    #venda: Mapped[List['Venda']] = relationship('Venda', back_populates='cliente')


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

    #produto: Mapped[List['Produto']] = relationship('Produto', secondary='fornecedorproduto', back_populates='fornecedor')


class Usuario(Base):
    __tablename__ = 'usuario'
    __table_args__ = (
        PrimaryKeyConstraint('id', name='usuario_pk'),
        Index('index_1v1', 'email', unique=True)
    )

    id: Mapped[int] = mapped_column(Integer, primary_key=True)
    uid_firebase: Mapped[str] = mapped_column(VARCHAR(128), unique=True, nullable=False)
    nome: Mapped[str] = mapped_column(VARCHAR(100))
    email: Mapped[str] = mapped_column(VARCHAR(100))
    

    #entradaestoque: Mapped[List['Entradaestoque']] = relationship('Entradaestoque', back_populates='usuario')
    #saidaestoque: Mapped[List['Saidaestoque']] = relationship('Saidaestoque', back_populates='usuario')


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
    status: Mapped[float] = mapped_column(NUMBER(asdecimal=False))
    fornecedor_id: Mapped[int] = mapped_column(Integer)
    categoriaid: Mapped[Optional[int]] = mapped_column(Integer)
    usuario_id: Mapped[int] = mapped_column(Integer)

    #fornecedor: Mapped[List['Fornecedor']] = relationship('Fornecedor', secondary='fornecedorproduto', back_populates='produto')
    #categoria: Mapped[Optional['Categoria']] = relationship('Categoria', back_populates='produto')
    #lote: Mapped[List['Lote']] = relationship('Lote', back_populates='produto')

#Classe Venda - OK;
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

    #cliente: Mapped['Cliente'] = relationship('Cliente', back_populates='venda')


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
    

    #produto: Mapped['Produto'] = relationship('Produto', back_populates='lote')
    #entradaestoque: Mapped[List['Entradaestoque']] = relationship('Entradaestoque', back_populates='lote')
    #saidaestoque: Mapped[List['Saidaestoque']] = relationship('Saidaestoque', back_populates='lote')


t_vendaproduto = Table(
    'vendaproduto', Base.metadata,
    Column('qunatidade', Integer, nullable=False),
    Column('valorunitario', FLOAT(2), nullable=False),
    Column('valortotal', FLOAT(2), nullable=False),
    Column('produto_id', Integer, nullable=False),
    Column('venda_id', Integer, nullable=False),
    ForeignKeyConstraint(['produto_id'], ['produto.id'], name='vendaproduto_produto_fk'),
    ForeignKeyConstraint(['venda_id'], ['venda.id'], name='vendaproduto_venda_fk')
)


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

    #lote: Mapped['Lote'] = relationship('Lote', back_populates='entradaestoque')
    #usuario: Mapped['Usuario'] = relationship('Usuario', back_populates='entradaestoque')


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

    #lote: Mapped['Lote'] = relationship('Lote', back_populates='saidaestoque')
    #usuario: Mapped['Usuario'] = relationship('Usuario', back_populates='saidaestoque')