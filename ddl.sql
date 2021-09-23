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