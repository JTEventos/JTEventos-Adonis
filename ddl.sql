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
    cep varchar(15) not null,
    logradouro varchar(100) not null,
    numero varchar(10) not null,
    complemento varchar(20),
    bairro varchar(50) not null,
    cidade varchar(50) not null,
    estado varchar(2) not null,
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

INSERT INTO clientes (id, nome, cpf, cep, logradouro, numero, complemento, bairro, cidade, estado, email, tel_celular, tel_fixo) VALUES (1, 'Jonas Araujo', '00000000001', '91000000', 'Avenida', '123', 'Casa', 'Bairro', 'Cidade', 'SC', NULL, NULL, NULL);
INSERT INTO clientes (id, nome, cpf, cep, logradouro, numero, complemento, bairro, cidade, estado, email, tel_celular, tel_fixo) VALUES (2, 'Thiago', '00000000002', '91000001', 'Rua', '321', 'Apartamento', 'Bairro', 'Cidade', 'RS', NULL, NULL, NULL);

INSERT INTO eventos (id_cliente, nome_evento, data_inicio, data_fim, lista_convidados) VALUES (1, 'Evento 1', '2021-09-22 00:00:00', '2021-09-22 00:00:00', NULL);
INSERT INTO eventos (id_cliente, nome_evento, data_inicio, data_fim, lista_convidados) VALUES (2, 'Evento 2', '2021-09-22 00:00:00', '2021-09-22 00:00:00', NULL);