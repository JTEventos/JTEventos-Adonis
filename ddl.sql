drop table if exists usuarios;
drop table if exists eventos;
drop table if exists clientes;

create table usuarios (
    id int not null auto_increment,
    nome varchar(50),
    usuario varchar(50) not null unique,
    senha varchar(100) not null,
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
    email varchar(100) not null,
    tel_celular varchar(15) not null,
    tel_fixo varchar(15),
primary key (id)
);
 
create table eventos (
    id int not null auto_increment,
    id_cliente int not null,
    nome_evento varchar(100) not null,
    data_inicio datetime not null,
    data_fim datetime not null,
    lista_convidados varchar(4000),
primary key (id),
constraint fk_eventocliente foreign key (id_cliente) references clientes(id)
);

insert into usuarios (nome, usuario, senha) values ('Administrador', 'admin', '12345');