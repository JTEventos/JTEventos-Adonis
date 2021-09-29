drop table if exists usuarios;
drop table if exists eventos;
drop table if exists clientes;

create table usuarios (
    id int not null auto_increment,
    nome varchar(50),
    usuario varchar(50) not null unique,
    senha varchar(100) not null ,
primary key (id)
);
 
create table clientes (
    id int not null auto_increment,
    nome varchar(100) not null,
    cpf varchar(20) not null unique,
    rg varchar(20),
    cep varchar(15),
    logradouro varchar(100),
    numero varchar(10),
    complemento varchar(20),
    bairro varchar(50),
    cidade varchar(50),
    estado varchar(2),
    email varchar(100),
    tel_celular varchar(15),
    tel_fixo varchar(15),
primary key (id)
);

 
create table eventos /*(mandar por e-mail a confirmação do evento)*/ (
    id int not null auto_increment,
    id_cliente int,
    nome_evento varchar(100),
    data_inicio datetime,
    data_fim datetime,
    lista_convidados varchar(4000),
primary key (id),
constraint fk_eventocliente foreign key (id_cliente) references clientes(id)
);

insert into usuarios (nome, usuario, senha) values ('Administrador', 'admin', '12345');

INSERT INTO clientes (id, nome, cpf, rg, cep, logradouro, numero, complemento, bairro, cidade, estado, email, tel_celular, tel_fixo) VALUES (1, 'Jonas Araujo', '00000000001', '0000000000', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO clientes (id, nome, cpf, rg, cep, logradouro, numero, complemento, bairro, cidade, estado, email, tel_celular, tel_fixo) VALUES (2, 'Thiago', '00000000002', '0000000000', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL);

INSERT INTO eventos (id_cliente, nome_evento, data_inicio, data_fim, lista_convidados) VALUES (1, 'Evento 11111111111111111111', '2021-09-22 00:00:00', '2021-09-22 00:00:00', NULL);
INSERT INTO eventos (id_cliente, nome_evento, data_inicio, data_fim, lista_convidados) VALUES (2, 'Evento 2', '2021-09-22 00:00:00', '2021-09-22 00:00:00', NULL);