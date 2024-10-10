# EducaOnline

EducaOnline é uma API RESTful criada com [Node.js](https://nodejs.org/) e [NestJS](https://nestjs.com/), utilizando MongoDB como banco de dados em nuvem para gerenciamento de usuários, autores e postagens. O projeto também está totalmente automatizado via GitHub Actions para integração contínua e utiliza Docker para simplificar a execução.

## Grupo de trabalho
- RM 357978 - Bárbara Azevedo de Sá
- RM 357524 - Murilo Greco Campos de Almeida
- RM 357736 - Victor Lima Fernandes
- RM 357330 - Wellington Raimundo da Silva

## Índice

- [Requisitos Funcionais](#requisitos-funcionais)
- [Instalação](#instalação)
- [Rodando o Projeto](#rodando-o-projeto)
  - [Rodando Localmente](#rodando-localmente)
  - [Rodando com Docker](#rodando-com-docker)
- [Variáveis de Ambiente](#variáveis-de-ambiente)
- [Endpoints da API](#endpoints-da-api)
- [Testes](#testes)
- [Automação com GitHub Actions](#automação-com-github-actions)
- [Desafios e Relatos](#desafios-e-relatos)
- [Conclusão](#conclusão)

## Requisitos Funcionais

A API oferece os seguintes endpoints:

- **GET /posts**: Lista todos os posts.
- **GET /posts/:id**: Busca post específico por ID.
- **POST /posts**: Cria um novo post.
- **PUT /posts/:id**: Atualiza um post existente.
- **DELETE /posts/:id**: Deleta um post por ID.
- **GET /posts/search**: Busca posts por palavras-chave.

## Instalação

Para instalar as dependências, execute o seguinte comando:

```bash
npm install
```

## Rodando o Projeto

### Rodando Localmente

Para rodar o projeto em ambiente de desenvolvimento, utilize:

```bash
npm run start:dev
```

A aplicação estará disponível em `http://localhost:3000` e será recarregada automaticamente ao detectar alterações nos arquivos fonte.

### Rodando com Docker

#### Build da Imagem

Para construir a imagem Docker do projeto, execute:

```bash
docker build . -t <nome-da-imagem>
```

#### Rodando o Container

Depois de criar a imagem, você pode rodar o container com o seguinte comando:

```bash
docker run -p <porta-externa>:3000 <nome-da-imagem>
```

### Usando Docker Compose

Para uma configuração mais simples, use o Docker Compose. Primeiro, configure o arquivo `.env` com as variáveis de ambiente (veja abaixo), depois execute:

```bash
docker-compose up
```

## Variáveis de Ambiente

Para rodar a aplicação, você precisa configurar as seguintes variáveis de ambiente, seja no arquivo `.env` ou diretamente no comando `docker run`:

```bash
DATABASE_USER=seu_usuario_mongo
DATABASE_PASSWORD=sua_senha_mongo
DATABASE_NAME=educaonline
DATABASE_HOST=seu_host_mongodb
DATABASE_PORT=27017
JWT_SECRET=sua_chave_secreta
```

## Endpoints da API

Aqui estão os principais endpoints da API:

### Autenticação de Usuário

- **POST /usuario**: Cria um novo usuário.
- **POST /usuario/signin**: Autentica o usuário e retorna um token JWT.

### Autores

- **POST /autor/create**: Cria um novo autor.
- **PUT /autor/update/:id_autor**: Atualiza os dados de um autor.
- **DELETE /autor/remove/:id_autor**: Remove um autor.
- **GET /autor/all**: Lista todos os autores.
- **GET /autor/:id**: Obtém um autor por ID.
- **GET /autor/search/:nome**: Busca autores por nome.

### Posts

- **POST /post/create**: Cria um novo post.
- **PUT /post/update/:id_post**: Atualiza um post.
- **DELETE /post/remove/:id_post**: Remove um post.
- **GET /post/all**: Lista todos os posts.
- **GET /post/:id_post**: Obtém um post por ID.
- **GET /post/search/:search**: Busca posts por conteúdo.

### Exemplo de Corpo das Requisições

#### Criar Usuário

```json
{
  "email": "teste@teste.com",
  "senha": "123456"
}
```

#### Criar Autor

```json
{
  "nome": "Nome do Autor"
}
```

#### Criar Post

```json
{
  "titulo": "Título do Post",
  "conteudo": "Conteúdo do post",
  "relationAutorId": "66fd6a8e3476dc03211b922"
}
```

## Testes

Os testes automatizados garantem que a aplicação esteja funcionando corretamente. Para rodar os testes:

```bash
npm run test
```

Os testes são executados automaticamente no pipeline do GitHub Actions antes do deploy.

## Automação com GitHub Actions

Este projeto utiliza GitHub Actions para automação de CI/CD. Sempre que um novo commit é feito na branch principal, o workflow constrói e faz o deploy da imagem Docker para o [Docker Hub](https://hub.docker.com/r/bazevedosa/fiap_tech_2).

## Desafios e Relatos

Durante o desenvolvimento, enfrentamos vários desafios, especialmente por ser nossa primeira experiência com **Node.js** e **NestJS**. A criação dos testes unitários foi um dos maiores obstáculos, devido à complexidade das ferramentas que escolhemos. 

Além disso, configurar o pipeline de integração contínua no GitHub Actions para fazer deploy automático no Docker Hub apresentou algumas dificuldades, mas conseguimos resolver os problemas com esforço conjunto.

## Conclusão

Apesar dos desafios, concluímos o projeto com sucesso, aprendendo bastante sobre novas tecnologias e ferramentas, como **Node.js**, **NestJS**, **MongoDB** e **Docker**, o que aumentou significativamente nossa expertise técnica.
