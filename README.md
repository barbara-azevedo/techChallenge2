# EducaOnline

This project was generated with [NodeJs]. 


## Requisitos funcionais:

* GET/posts: lista de posts
* GET/posts/:id - leitura de posts do ID específico
* POST/posts - criação de postagens
* PUT/posts/:id - edição de postagens
* DELETE/posts/:id - exclusão de postagens
* GET/posts/search - busca de posts  (com palavras chaves)

## Grupo de trabalho
* Bárbara Azevedo de Sá
* Murilo Greco Campos de Almeida
* Victor Lima Fernandes
* Wellington Raimundo da Silva

Nosso grupo adotou uma abordagem colaborativa para a implementação do projeto, realizando reuniões periódicas e mantendo uma comunicação ativa entre todos os membros. Isso nos permitiu alinhar atividades, compartilhar atualizações e trocar experiências de forma contínua.

Utilizamos o conhecimento adquirido na segunda fase do curso de Pós Tech, com foco em desenvolvimento backend, banco de dados e uso de Docker e containers. Para o banco de dados, optamos por utilizar o PostgreSQL, que foi fundamental para estruturar e gerenciar os dados do nosso projeto.

O processo foi desafiador, pois tivemos que nos aprofundar em novos conhecimentos e equilibrar o desenvolvimento com o alinhamento de atividades entre os integrantes. Além disso, enfrentamos o desafio de conciliar o tempo necessário para assistir às muitas horas de aulas e absorver o conteúdo extenso, sem o auxílio direto dos códigos-fonte apresentados nas aulas, o que exigiu uma maior dedicação e esforço da equipe.

    

## Development server

Run `npm start:dev` for a dev server. Navigate to `http://localhost:3000/`. The app will automatically reload if you change any of the source files.

## Build

Run `npm run build` to build the project. The build artifacts will be stored in the `build/` directory.

# Docker

## Docker Build

Dentro da pasta raiz do projeto foi criado um arquivo DockerFile que server para efetuar o builder do projeto para dentro de um container docker.
Comando para efetuar o build: "docker build . -t <nome-app>"

## Docker Run

Após efetuar o builder do projeto será necessário subir a aplicação:

Caso já tenha um banco de dados:

docker run --env DATABASE_USER=<user> --env DATABASE_HOST=<host> --env DATABASE_NAME=<name> --env DATABASE_PASSWORD=<password> --env DATABASE_PORT=<port> -p <external-port>:<internal-port> <nome-app>

Caso não possua um banco de dados basta utilizar o arquivo "docker-compose-yml" adicionar usuario e senha e rodar o comando: "docker-compose up -d", com isso será baixado uma imagem de um banco postgree e já vai inicializar.

Com o banco ativo basta subir a apliação, alterando as variaveis e rodando o comando:
docker run --name postgres --env POSTGRES_PASSWORD=<password>--env POSTGRES_USER=<username> --volume postgres:/data/postgres --publish <port>:<port> --detach postgres

## URLs
<host>:<port>/usuario                -> criar usuário
<host>:<port>/usuario/signin         -> get jwt token para acesar as Urls de POST

<host>:<port>/autor/create           -> criar novo autor - POST
<host>:<port>/autor/update/:id_autor -> alterar um autor existente pelo id - POST
<host>:<port>/autor/remove/:id_autor -> remover um autor existente pelo id - POST
<host>:<port>/autor/all'             -> listar todos os autores - GET
<host>:<port>/autor/:id'             -> listar autor existente pelo id - GET
<host>:<port>/autor/search/:nome     -> listar autor por trecho do nome - GET

<host>:<port>/post/create            -> criar novo post - POST
<host>:<port>/post/update/:id_post   -> alterar um post existente pelo id - POST
<host>:<port>/post/remove/:id_post   -> remover um post existente pelo id - POST
<host>:<port>/post/all               -> listar todos os autores - GET
<host>:<port>/post/:id_post'         -> listar post existente pelo id - GET
<host>:<port>/post/search/:search    -> listar post por trecho do post  - GET

## Body Urls

# host/usuario e host/usuario/signin
{
    "email": "teste@teste.com",
    "senha": "123456"
}

# host/autor/create
{
    "nome": "Autor teste teste"
}

# host/post/create
{
    "titulo": "Meu post",
    "conteudo": "bababababababa",
    "id_autor": 1
}

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

