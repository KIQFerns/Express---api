-- public.clientes definition

-- Drop table

-- DROP TABLE public.clientes;

CREATE TABLE public.clientes (
	id_cliente serial4 NOT NULL,
	nome varchar(50) NULL,
	email varchar(30) NULL,
	telefone varchar(30) NULL,
	x numeric NULL,
	y numeric NULL,
	CONSTRAINT clientes_pkey PRIMARY KEY (id_cliente)
);