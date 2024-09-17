# EducaOnline

This project was generated with [NodeJs].

## Development server

Run `npm start:dev` for a dev server. Navigate to `http://localhost:3000/`. The app will automatically reload if you change any of the source files.

## Build

Run `npm build` to build the project. The build artifacts will be stored in the `build/` directory.

## Docker Run

docker run --name postgres --env POSTGRES_PASSWORD=<password>--env POSTGRES_USER=<username> --volume postgres:/data/postgres --publish 5432:5432 --detach postgres

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

CREATE TABLE post (
id SERIAL PRIMARY KEY,
autor VARCHAR(100),
titulo VARCHAR(100),
conteudo VARCHAR(2000),
dt_criacao TIMESTAMP ,
dt_modificacao TIMESTAMP
);
