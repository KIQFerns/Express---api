CREATE DATABASE desafio;

\ c desafio;

CREATE TABLE clientes (
    id_cliente serial PRIMARY KEY,
    nome VARCHAR (50),
    email VARCHAR (20),
    telefone VARCHAR (10)
);