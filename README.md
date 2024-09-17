# EducaOnline

This project was generated with [NodeJs].

## Development server

Run `npm start:dev` for a dev server. Navigate to `http://localhost:3000/`. The app will automatically reload if you change any of the source files.

## Build

Run `npm build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Tabelas

CREATE TABLE pessoa (
id BIGSERIAL PRIMARY KEY,
cpf VARCHAR(255) NOT NULL,
nome VARCHAR(255) NOT NULL
);

CREATE table usuario (
id BIGSERIAL PRIMARY KEY,
username VARCHAR(255) NOT NULL,
pass VARCHAR(100) NOT NULL
);

ALTER TABLE pessoa
ADD COLUMN usuario_id int UNIQUE;

CREATE TABLE educa_online (
id SERIAL PRIMARY KEY,
titulo VARCHAR(100),
post VARCHAR(2000),
dt_criacao TIMESTAMP ,
dt_modificacao TIMESTAMP ,
arquivo BYTEA,
nome_arquivo VARCHAR(100)
);