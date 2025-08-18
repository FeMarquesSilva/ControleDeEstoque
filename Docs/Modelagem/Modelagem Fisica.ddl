-- Gerado por Oracle SQL Developer Data Modeler 24.3.1.351.0831
--   em:        2025-08-18 19:08:06 GMT-03:00
--   site:      Oracle Database 21c
--   tipo:      Oracle Database 21c



-- predefined type, no DDL - MDSYS.SDO_GEOMETRY

-- predefined type, no DDL - XMLTYPE

CREATE TABLE Categoria 
    ( 
     ID        INTEGER  NOT NULL , 
     Nome      VARCHAR2 (100)  NOT NULL , 
     Descricao VARCHAR2 (100)  NOT NULL 
    ) 
;

ALTER TABLE Categoria 
    ADD CONSTRAINT Categoria_PK PRIMARY KEY ( ID ) ;

CREATE TABLE Cliente 
    ( 
     Id         INTEGER  NOT NULL , 
     Endereco   VARCHAR2 (100)  NOT NULL , 
     Nome       VARCHAR2 (50)  NOT NULL , 
     CNPJ       VARCHAR2 (14)  NOT NULL , 
     Telefone   VARCHAR2 (11)  NOT NULL , 
     Email      VARCHAR2 (50)  NOT NULL , 
     Usuario_ID INTEGER  NOT NULL 
    ) 
;

ALTER TABLE Cliente 
    ADD CONSTRAINT Cliente_PK PRIMARY KEY ( Id ) ;

CREATE TABLE EntradaEstoque 
    ( 
     ID          INTEGER  NOT NULL , 
     Quantidade  INTEGER  NOT NULL , 
     DataEntrada DATE  NOT NULL , 
     Usuario_ID  INTEGER  NOT NULL , 
     Lote_ID     INTEGER  NOT NULL 
    ) 
;

ALTER TABLE EntradaEstoque 
    ADD CONSTRAINT EntradaEstoque_PK PRIMARY KEY ( ID ) ;

CREATE TABLE Fornecedor 
    ( 
     id         INTEGER  NOT NULL , 
     nome       VARCHAR2 (50)  NOT NULL , 
     cnpj       VARCHAR2 (14)  NOT NULL , 
     contato    VARCHAR2 (11)  NOT NULL , 
     endereco   VARCHAR2 (100)  NOT NULL , 
     email      VARCHAR2 (50)  NOT NULL , 
     Usuario_ID INTEGER  NOT NULL , 
     status     NUMBER  NOT NULL 
    ) 
;

ALTER TABLE Fornecedor 
    ADD CONSTRAINT Fornecedor_PK PRIMARY KEY ( id ) ;

CREATE TABLE Lote 
    ( 
     ID          INTEGER  NOT NULL , 
     Numero_Lote VARCHAR2 (50) , 
     Validade    DATE , 
     Quantidade  INTEGER , 
     Produto_ID  INTEGER  NOT NULL 
    ) 
;

ALTER TABLE Lote 
    ADD CONSTRAINT Lote_PK PRIMARY KEY ( ID ) ;

CREATE TABLE Produto 
    ( 
     ID            INTEGER  NOT NULL , 
     Nome          VARCHAR2 (100)  NOT NULL , 
     Descricao     VARCHAR2 (100)  NOT NULL , 
     SKU           VARCHAR2 (50)  NOT NULL , 
     CategoriaID   INTEGER , 
     UnidadeMedida VARCHAR2 (10)  NOT NULL , 
     Status        NUMBER  NOT NULL , 
     Fornecedor_ID INTEGER  NOT NULL , 
     Usuario_ID    INTEGER  NOT NULL , 
     Categoria_ID  INTEGER  NOT NULL 
    ) 
;

ALTER TABLE Produto 
    ADD CONSTRAINT Produto_PK PRIMARY KEY ( ID ) ;

ALTER TABLE Produto 
    ADD CONSTRAINT INDEX_1 UNIQUE ( SKU ) ;

CREATE TABLE SaidaEstoque 
    ( 
     ID         INTEGER  NOT NULL , 
     Qunatidade INTEGER  NOT NULL , 
     DataSaida  DATE  NOT NULL , 
     Motivo     VARCHAR2 (30)  NOT NULL , 
     Usuario_ID INTEGER  NOT NULL , 
     Lote_ID    INTEGER  NOT NULL 
    ) 
;

ALTER TABLE SaidaEstoque 
    ADD CONSTRAINT SaidaEstoque_PK PRIMARY KEY ( ID ) ;

CREATE TABLE Usuario 
    ( 
     ID           INTEGER  NOT NULL , 
     "UID"        VARCHAR2 (128)  NOT NULL , 
     Nome         VARCHAR2 (100)  NOT NULL , 
     Email        VARCHAR2 (100)  NOT NULL , 
     Categoria_ID INTEGER  NOT NULL , 
     Lote_ID      INTEGER  NOT NULL , 
     Venda_Id     INTEGER  NOT NULL 
    ) 
;

ALTER TABLE Usuario 
    ADD CONSTRAINT Usuario_PK PRIMARY KEY ( ID ) ;

ALTER TABLE Usuario 
    ADD CONSTRAINT INDEX_1v1 UNIQUE ( Email ) ;

CREATE TABLE Venda 
    ( 
     Id         INTEGER  NOT NULL , 
     DataVenda  DATE  NOT NULL , 
     NumeroNF   INTEGER  NOT NULL , 
     Cliente_Id INTEGER  NOT NULL 
    ) 
;

ALTER TABLE Venda 
    ADD CONSTRAINT Venda_PK PRIMARY KEY ( Id ) ;

CREATE TABLE VendaProduto 
    ( 
     Qunatidade    INTEGER  NOT NULL , 
     ValorUnitario FLOAT (2)  NOT NULL , 
     ValorTotal    FLOAT (2)  NOT NULL , 
     Produto_ID    INTEGER  NOT NULL , 
     Venda_Id      INTEGER  NOT NULL , 
     Status        VARCHAR2 
--  ERROR: VARCHAR2 size not specified 
                     NOT NULL 
    ) 
;

ALTER TABLE Cliente 
    ADD CONSTRAINT Cliente_Usuario_FK FOREIGN KEY 
    ( 
     Usuario_ID
    ) 
    REFERENCES Usuario 
    ( 
     ID
    ) 
;

ALTER TABLE EntradaEstoque 
    ADD CONSTRAINT EntradaEstoque_Lote_FK FOREIGN KEY 
    ( 
     Lote_ID
    ) 
    REFERENCES Lote 
    ( 
     ID
    ) 
;

ALTER TABLE EntradaEstoque 
    ADD CONSTRAINT EntradaEstoque_Usuario_FK FOREIGN KEY 
    ( 
     Usuario_ID
    ) 
    REFERENCES Usuario 
    ( 
     ID
    ) 
;

ALTER TABLE Fornecedor 
    ADD CONSTRAINT Fornecedor_Usuario_FK FOREIGN KEY 
    ( 
     Usuario_ID
    ) 
    REFERENCES Usuario 
    ( 
     ID
    ) 
;

ALTER TABLE Lote 
    ADD CONSTRAINT Lote_Produto_FK FOREIGN KEY 
    ( 
     Produto_ID
    ) 
    REFERENCES Produto 
    ( 
     ID
    ) 
;

ALTER TABLE Produto 
    ADD CONSTRAINT Produto_Categoria_FK FOREIGN KEY 
    ( 
     Categoria_ID
    ) 
    REFERENCES Categoria 
    ( 
     ID
    ) 
;

ALTER TABLE Produto 
    ADD CONSTRAINT Produto_Fornecedor_FK FOREIGN KEY 
    ( 
     Fornecedor_ID
    ) 
    REFERENCES Fornecedor 
    ( 
     id
    ) 
;

ALTER TABLE Produto 
    ADD CONSTRAINT Produto_Usuario_FK FOREIGN KEY 
    ( 
     Usuario_ID
    ) 
    REFERENCES Usuario 
    ( 
     ID
    ) 
;

ALTER TABLE SaidaEstoque 
    ADD CONSTRAINT SaidaEstoque_Lote_FK FOREIGN KEY 
    ( 
     Lote_ID
    ) 
    REFERENCES Lote 
    ( 
     ID
    ) 
;

ALTER TABLE SaidaEstoque 
    ADD CONSTRAINT SaidaEstoque_Usuario_FK FOREIGN KEY 
    ( 
     Usuario_ID
    ) 
    REFERENCES Usuario 
    ( 
     ID
    ) 
;

ALTER TABLE Usuario 
    ADD CONSTRAINT Usuario_Categoria_FK FOREIGN KEY 
    ( 
     Categoria_ID
    ) 
    REFERENCES Categoria 
    ( 
     ID
    ) 
;

ALTER TABLE Usuario 
    ADD CONSTRAINT Usuario_Lote_FK FOREIGN KEY 
    ( 
     Lote_ID
    ) 
    REFERENCES Lote 
    ( 
     ID
    ) 
;

ALTER TABLE Usuario 
    ADD CONSTRAINT Usuario_Venda_FK FOREIGN KEY 
    ( 
     Venda_Id
    ) 
    REFERENCES Venda 
    ( 
     Id
    ) 
;

ALTER TABLE Venda 
    ADD CONSTRAINT Venda_Cliente_FK FOREIGN KEY 
    ( 
     Cliente_Id
    ) 
    REFERENCES Cliente 
    ( 
     Id
    ) 
;

ALTER TABLE VendaProduto 
    ADD CONSTRAINT VendaProduto_Produto_FK FOREIGN KEY 
    ( 
     Produto_ID
    ) 
    REFERENCES Produto 
    ( 
     ID
    ) 
;

ALTER TABLE VendaProduto 
    ADD CONSTRAINT VendaProduto_Venda_FK FOREIGN KEY 
    ( 
     Venda_Id
    ) 
    REFERENCES Venda 
    ( 
     Id
    ) 
;

CREATE SEQUENCE Categoria_ID_SEQ 
START WITH 1 
    NOCACHE 
    ORDER ;

CREATE OR REPLACE TRIGGER Categoria_ID_TRG 
BEFORE INSERT ON Categoria 
FOR EACH ROW 
WHEN (NEW.ID IS NULL) 
BEGIN 
    :NEW.ID := Categoria_ID_SEQ.NEXTVAL; 
END;
/

CREATE SEQUENCE Cliente_Id_SEQ 
START WITH 1 
    NOCACHE 
    ORDER ;

CREATE OR REPLACE TRIGGER Cliente_Id_TRG 
BEFORE INSERT ON Cliente 
FOR EACH ROW 
WHEN (NEW.Id IS NULL) 
BEGIN 
    :NEW.Id := Cliente_Id_SEQ.NEXTVAL; 
END;
/

CREATE SEQUENCE EntradaEstoque_ID_SEQ 
START WITH 1 
    NOCACHE 
    ORDER ;

CREATE OR REPLACE TRIGGER EntradaEstoque_ID_TRG 
BEFORE INSERT ON EntradaEstoque 
FOR EACH ROW 
WHEN (NEW.ID IS NULL) 
BEGIN 
    :NEW.ID := EntradaEstoque_ID_SEQ.NEXTVAL; 
END;
/

CREATE SEQUENCE Fornecedor_id_SEQ 
START WITH 1 
    NOCACHE 
    ORDER ;

CREATE OR REPLACE TRIGGER Fornecedor_id_TRG 
BEFORE INSERT ON Fornecedor 
FOR EACH ROW 
WHEN (NEW.id IS NULL) 
BEGIN 
    :NEW.id := Fornecedor_id_SEQ.NEXTVAL; 
END;
/

CREATE SEQUENCE Lote_ID_SEQ 
START WITH 1 
    NOCACHE 
    ORDER ;

CREATE OR REPLACE TRIGGER Lote_ID_TRG 
BEFORE INSERT ON Lote 
FOR EACH ROW 
WHEN (NEW.ID IS NULL) 
BEGIN 
    :NEW.ID := Lote_ID_SEQ.NEXTVAL; 
END;
/

CREATE SEQUENCE Produto_ID_SEQ 
START WITH 1 
    NOCACHE 
    ORDER ;

CREATE OR REPLACE TRIGGER Produto_ID_TRG 
BEFORE INSERT ON Produto 
FOR EACH ROW 
WHEN (NEW.ID IS NULL) 
BEGIN 
    :NEW.ID := Produto_ID_SEQ.NEXTVAL; 
END;
/

CREATE SEQUENCE SaidaEstoque_ID_SEQ 
START WITH 1 
    NOCACHE 
    ORDER ;

CREATE OR REPLACE TRIGGER SaidaEstoque_ID_TRG 
BEFORE INSERT ON SaidaEstoque 
FOR EACH ROW 
WHEN (NEW.ID IS NULL) 
BEGIN 
    :NEW.ID := SaidaEstoque_ID_SEQ.NEXTVAL; 
END;
/

CREATE SEQUENCE Usuario_ID_SEQ 
START WITH 1 
    NOCACHE 
    ORDER ;

CREATE OR REPLACE TRIGGER Usuario_ID_TRG 
BEFORE INSERT ON Usuario 
FOR EACH ROW 
WHEN (NEW.ID IS NULL) 
BEGIN 
    :NEW.ID := Usuario_ID_SEQ.NEXTVAL; 
END;
/

CREATE SEQUENCE Venda_Id_SEQ 
START WITH 1 
    NOCACHE 
    ORDER ;

CREATE OR REPLACE TRIGGER Venda_Id_TRG 
BEFORE INSERT ON Venda 
FOR EACH ROW 
WHEN (NEW.Id IS NULL) 
BEGIN 
    :NEW.Id := Venda_Id_SEQ.NEXTVAL; 
END;
/



-- Relatório do Resumo do Oracle SQL Developer Data Modeler: 
-- 
-- CREATE TABLE                            10
-- CREATE INDEX                             0
-- ALTER TABLE                             27
-- CREATE VIEW                              0
-- ALTER VIEW                               0
-- CREATE PACKAGE                           0
-- CREATE PACKAGE BODY                      0
-- CREATE PROCEDURE                         0
-- CREATE FUNCTION                          0
-- CREATE TRIGGER                           9
-- ALTER TRIGGER                            0
-- CREATE COLLECTION TYPE                   0
-- CREATE STRUCTURED TYPE                   0
-- CREATE STRUCTURED TYPE BODY              0
-- CREATE CLUSTER                           0
-- CREATE CONTEXT                           0
-- CREATE DATABASE                          0
-- CREATE DIMENSION                         0
-- CREATE DIRECTORY                         0
-- CREATE DISK GROUP                        0
-- CREATE ROLE                              0
-- CREATE ROLLBACK SEGMENT                  0
-- CREATE SEQUENCE                          9
-- CREATE MATERIALIZED VIEW                 0
-- CREATE MATERIALIZED VIEW LOG             0
-- CREATE SYNONYM                           0
-- CREATE TABLESPACE                        0
-- CREATE USER                              0
-- 
-- DROP TABLESPACE                          0
-- DROP DATABASE                            0
-- 
-- REDACTION POLICY                         0
-- 
-- ORDS DROP SCHEMA                         0
-- ORDS ENABLE SCHEMA                       0
-- ORDS ENABLE OBJECT                       0
-- 
-- ERRORS                                   1
-- WARNINGS                                 0
