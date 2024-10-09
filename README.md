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
* RM 357978 - Bárbara Azevedo de Sá
* RM 357524 - Murilo Greco Campos de Almeida
* RM 357736 - Victor Lima Fernandes
* RM 357330 - Wellington Raimundo da Silva

Nosso grupo adotou uma abordagem colaborativa para a implementação do projeto, realizando reuniões periódicas e mantendo uma comunicação ativa entre todos os membros. Isso nos permitiu alinhar atividades, compartilhar atualizações e trocar experiências de forma contínua.

Utilizamos o conhecimento adquirido na segunda fase do curso de Pós Tech, com foco em desenvolvimento backend, banco de dados e uso de Docker e containers. Para o banco de dados, optamos por utilizar o PostgreSQL, que foi fundamental para estruturar e gerenciar os dados do nosso projeto.

O processo foi desafiador, pois tivemos que nos aprofundar em novos conhecimentos e equilibrar o desenvolvimento com o alinhamento de atividades entre os integrantes. Além disso, enfrentamos o desafio de conciliar o tempo necessário para assistir às muitas horas de aulas e absorver o conteúdo extenso, sem o auxílio direto dos códigos-fonte apresentados nas aulas, o que exigiu uma maior dedicação e esforço da equipe.

## Start da aplicação

```typescript 
npm install
```

## Run development

Run `npm run start:dev` .

## Build

Run `npm run build` to build the project. The build artifacts will be stored in the `/dist` directory.

# Docker

## Docker Build

Dentro da pasta raiz do projeto foi criado um arquivo DockerFile que server para efetuar o builder do projeto para dentro de um container docker.
Comando para efetuar o build: "docker build . -t <nome-app>"

A imagem docker pode ser acessada no Docker Hub, conforme:

Docker Hub: https://hub.docker.com/r/bazevedosa/fiap_tech_2

Comando para fazer download da imagem Docker: docker pull bazevedosa/fiap_tech_2

## Docker Run

- Após baixar a imagem basta subir a aplicação com o comando:

docker run -p <external-port>:3000 <nome-app>

## Git Actions

Este projeto está automatizado por meio do Git Actions. O workflow será acionado após cada novo commit na feito na branch disponibilizada no worlflow ou conforme acionado manualmente nos Actions. 
Ao acionar o workflow, a imagem Docker será construída e atualizada no repositório Docker Hub. 

## API REST / RESTFUL

<host>:<port>/usuario                -> criar usuário
<host>:<port>/usuario/signin         -> get jwt token para acesar as Urls de POST

- URLs representam os endpoints da API.

- POST   <host>:<port>/usuario                -> criar usuário
- POST   <host>:<port>/usuario/signin         -> get jwt token para acesar as Urls

- POST   <host>:<port>/autor/create           -> criar novo autor 
- PUT    <host>:<port>/autor/update/:id_autor -> alterar um autor existente pelo id
- DELETE <host>:<port>/autor/remove/:id_autor -> remover um autor existente pelo id 
- GET    <host>:<port>/autor/all'             -> listar todos os autores 
- GET    <host>:<port>/autor/:id'             -> listar autor existente pelo id 
- GET    <host>:<port>/autor/search/:nome     -> listar autor por trecho do nome 

- POST   <host>:<port>/post/create            -> criar novo post 
- PUT    <host>:<port>/post/update/:id_post   -> alterar um post existente pelo id 
- DELETE <host>:<port>/post/remove/:id_post   -> remover um post existente pelo id 
- GET    <host>:<port>/post/all               -> listar todos os autores 
- GET    <host>:<port>/post/:id_post'         -> listar post existente pelo id 
- GET    <host>:<port>/post/search/:search    -> listar post por trecho do post  

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
    "relationAutorId": "66fd6a8e3476dc03211b922"
}

# Tests

- Os teste automatizados foram efetuados e está rodando dentro do Dockerfile caso ocorra algum erro vai garantir que a aplicação não suba até que seja corrigido o problema

# Danco de Dados

- Para essa aplição estamos utilizando MONGODB, o mesmo está em nuvem e vai amarzenar os dados de usuário / autor / post

# Relatos

- Foi muito dificil para criar esse projeto uma vez que todos nos não trabalhamos com nodejs, a curva ficou mas facil para uns que outros, a parte de criar os testes unitarios chegou a ser o maior desafio uma vez que criamos o projeto em nodejs com nest sempre ficou algum detalhe para ajustar.
- Subir o projeto em um workflow do git para efetuar o deploy no docker também foi complicado pois sempre dava falha na geração da imagem e quando conseguimos fazer funcionar ainda faltava algum argumento para rodar corretamente, mas conseguimos vencer os desafios.

# Conlusão

- Conseguimos interagir e criar um problema em nodejs aumentando nosso leque de conhecimentos e agregando novas tecnologias para uso em nosso dia a dia.