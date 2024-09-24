# EducaOnline

This project was generated with [NodeJs].

## Development server

Run `npm start:dev` for a dev server. Navigate to `http://localhost:3000/`. The app will automatically reload if you change any of the source files.

## Build

Run `npm run build` to build the project. The build artifacts will be stored in the `build/` directory.

## Docker

# Docker Build

Dentro da pasta raiz do projeto foi criado um arquivo DockerFile que server para efetuar o builder do projeto para dentro de um container docker.
Comando para efetuar o build: "docker build . -t <nome-app>"

# Docker Run

Após efetuar o builder do projeto será necessário subir a aplicação:

Caso já tenha um banco de dados:

docker run --env DATABASE_USER=<user> --env DATABASE_HOST=<host> --env DATABASE_NAME=<name> --env DATABASE_PASSWORD=<password> --env DATABASE_PORT=<port> -p <external-port>:<internal-port> <nome-app>

Caso não possua um banco de dados basta utilizar o arquivo "docker-compose-yml" adicionar usuario e senha e rodar o comando: "docker-compose up -d", com isso será baixado uma imagem de um banco postgree e já vai inicializar.

Com o banco ativo basta subir a apliação, alterando as variaveis e rodando o comando:
docker run --name postgres --env POSTGRES_PASSWORD=<password>--env POSTGRES_USER=<username> --volume postgres:/data/postgres --publish <port>:<port> --detach postgres

## URLs
<host>:<port>/post/all

## Tabelas

CREATE table usuario (
email VARCHAR(255) NOT NULL PRIMARY KEY,
senha VARCHAR(255) NOT NULL
);

CREATE TABLE autor (
id_autor SERIAL NOT NULL PRIMARY KEY,
nome VARCHAR(100),
dt_criacao TIMESTAMP ,
dt_modificacao TIMESTAMP
);

CREATE TABLE post (
id_post SERIAL NOT NULL PRIMARY KEY,
titulo VARCHAR(100),
conteudo TEXT,
dt_criacao TIMESTAMP ,
dt_modificacao TIMESTAMP,
id_autor SERIAL,
FOREIGN KEY (id_autor) REFERENCES autor (id_autor)
);

