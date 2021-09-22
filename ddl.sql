DROP TABLE IF EXISTS USUARIO;
DROP TABLE IF EXISTS EVENTO;
DROP TABLE IF EXISTS CLIENTE;

CREATE TABLE USUARIO (
    ID int not null auto_increment,
    NOME varchar(50),
    USUARIO varchar(50) not null unique,
    SENHA varchar(100) not null ,
PRIMARY KEY (ID)
);
 
CREATE TABLE CLIENTE (
    ID int not null auto_increment,
    NOME varchar(100) not null,
    CPF varchar(20) not null unique,
    RG varchar(20),
    CEP varchar(15),
    LOGRADOURO varchar(100),
    NUMERO varchar(10),
    COMPLEMENTO varchar(20),
    BAIRRO varchar(50),
    CIDADE varchar(50),
    ESTADO varchar(2),
    EMAIL varchar(100),
    TEL_CELULAR varchar(15),
    TEL_FIXO varchar(15),
PRIMARY KEY (ID)
);

 
CREATE TABLE EVENTO /*(mandar por e-mail a confirmação do evento)*/ (
    ID int not null auto_increment,
    ID_CLIENTE int,
    NOME_EVENTO varchar(100),
    DATA_INICIO datetime,
    DATA_FIM datetime,
    LISTA_CONVIDADOS varchar(4000),
PRIMARY KEY (ID),
CONSTRAINT FK_EventoCliente FOREIGN KEY (ID_CLIENTE) REFERENCES CLIENTE(ID)
);


INSERT INTO usuario (NOME, USUARIO, SENHA) VALUES ('Administrador', 'admin', '12345');