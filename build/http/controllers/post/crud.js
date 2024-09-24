"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
var __decorateClass = (decorators, target, key, kind) => {
  var result = kind > 1 ? void 0 : kind ? __getOwnPropDesc(target, key) : target;
  for (var i = decorators.length - 1, decorator; i >= 0; i--)
    if (decorator = decorators[i])
      result = (kind ? decorator(target, key, result) : decorator(result)) || result;
  if (kind && result) __defProp(target, key, result);
  return result;
};

// src/http/controllers/post/crud.ts
var crud_exports = {};
__export(crud_exports, {
  createPost: () => createPost,
  findAllPost: () => findAllPost,
  findOnePost: () => findOnePost,
  findSearchPost: () => findSearchPost,
  removePost: () => removePost,
  updatePost: () => updatePost
});
module.exports = __toCommonJS(crud_exports);

// src/entities/post.entities.ts
var import_typeorm = require("typeorm");
var Post = class {
  constructor() {
  }
};
__decorateClass([
  (0, import_typeorm.PrimaryGeneratedColumn)("increment", {
    name: "id_post"
  })
], Post.prototype, "id_post", 2);
__decorateClass([
  (0, import_typeorm.Column)({
    name: "titulo",
    type: "varchar"
  })
], Post.prototype, "titulo", 2);
__decorateClass([
  (0, import_typeorm.Column)({
    name: "conteudo",
    type: "varchar"
  })
], Post.prototype, "conteudo", 2);
__decorateClass([
  (0, import_typeorm.Column)({
    name: "dt_criacao",
    type: "timestamp without time zone",
    default: () => "CURRENT_TIMESTAMP"
  })
], Post.prototype, "dtCriacao", 2);
__decorateClass([
  (0, import_typeorm.Column)({
    name: "dt_modificacao",
    type: "timestamp without time zone",
    default: () => "CURRENT_TIMESTAMP"
  })
], Post.prototype, "dtModificacao", 2);
__decorateClass([
  (0, import_typeorm.Column)({
    name: "id_autor",
    type: "int"
  })
], Post.prototype, "id_autor", 2);
Post = __decorateClass([
  (0, import_typeorm.Entity)({
    name: "post"
  })
], Post);

// src/lib/typeorm/typeorm.ts
var import_typeorm4 = require("typeorm");

// src/entities/autor.entities.ts
var import_typeorm2 = require("typeorm");
var Autor = class {
  constructor() {
  }
};
__decorateClass([
  (0, import_typeorm2.PrimaryGeneratedColumn)("increment", {
    name: "id_autor"
  })
], Autor.prototype, "id_autor", 2);
__decorateClass([
  (0, import_typeorm2.Column)({
    name: "nome",
    type: "varchar"
  })
], Autor.prototype, "nome", 2);
__decorateClass([
  (0, import_typeorm2.Column)({
    name: "dt_criacao",
    type: "timestamp without time zone",
    default: () => "CURRENT_TIMESTAMP"
  })
], Autor.prototype, "dtCriacao", 2);
__decorateClass([
  (0, import_typeorm2.Column)({
    name: "dt_modificacao",
    type: "timestamp without time zone",
    default: () => "CURRENT_TIMESTAMP"
  })
], Autor.prototype, "dtModificacao", 2);
Autor = __decorateClass([
  (0, import_typeorm2.Entity)({
    name: "autor"
  })
], Autor);

// src/entities/usuario.entities.ts
var import_typeorm3 = require("typeorm");
var Usuario = class {
  constructor(email, senha) {
    this.email = email;
    this.senha = senha;
  }
};
__decorateClass([
  (0, import_typeorm3.PrimaryColumn)({
    name: "email",
    type: "varchar"
  })
], Usuario.prototype, "email", 2);
__decorateClass([
  (0, import_typeorm3.Column)({
    name: "senha",
    type: "varchar"
  })
], Usuario.prototype, "senha", 2);
Usuario = __decorateClass([
  (0, import_typeorm3.Entity)({
    name: "usuario"
  })
], Usuario);

// env/index.ts
var import_config = require("dotenv/config");
var import_zod = require("zod");
var envSchema = import_zod.z.object({
  NODE_ENV: import_zod.z.enum(["development", "production", "test"]).default("development"),
  PORT: import_zod.z.coerce.number().default(3e3),
  DATABASE_USER: import_zod.z.string(),
  DATABASE_HOST: import_zod.z.string(),
  DATABASE_NAME: import_zod.z.string(),
  DATABASE_PASSWORD: import_zod.z.string(),
  DATABASE_PORT: import_zod.z.coerce.number(),
  SECRET_JWT: import_zod.z.string()
});
var _env = envSchema.safeParse(process.env);
if (!_env.success) {
  console.log("Invalid enviroment variables", _env.error.format());
  throw new Error("Invalid enviroment variables");
}
var env = _env.data;

// src/lib/typeorm/typeorm.ts
var appDataBase = new import_typeorm4.DataSource({
  type: "postgres",
  host: env.DATABASE_HOST,
  port: env.DATABASE_PORT,
  username: env.DATABASE_USER,
  password: env.DATABASE_PASSWORD,
  database: env.DATABASE_NAME,
  entities: [Autor, Post, Usuario],
  logging: env.NODE_ENV === "development"
});
appDataBase.initialize().then(() => {
  console.log("Database connected typeorm");
}).catch((error) => {
  console.error(`Erro connected typeorm: ${error}`);
});

// src/repositories/typeorm/post.repository.typeorm.ts
var import_typeorm6 = require("typeorm");
var PostRepository = class {
  constructor() {
    this.repo = appDataBase.getRepository(Post);
  }
  createPost(post) {
    post.dtCriacao = /* @__PURE__ */ new Date();
    post.dtModificacao = /* @__PURE__ */ new Date();
    return this.repo.save(post);
  }
  updatePost(post) {
    return this.repo.save(post);
  }
  async removePost(id) {
    await this.repo.delete(id);
  }
  async findAllPost(page, limit) {
    return this.repo.find({
      skip: (page - 1) * limit,
      take: limit,
      order: {
        dtCriacao: "DESC"
      }
    });
  }
  async findOnePost(id) {
    console.log("passou " + id);
    return this.repo.findOne({
      where: { id_post: id }
    });
  }
  async findSearchPost(search) {
    return this.repo.find({
      where: [
        {
          conteudo: (0, import_typeorm6.Like)(`%${search}%`)
        }
      ]
    });
  }
};

// src/user-cases/erros/resource-not-found-erros.ts
var ResourcesNotFoundErrors = class extends Error {
  constructor() {
    super("Resource not found");
  }
};

// src/user-cases/post.user.case.ts
var CreatePostUseCase = class {
  constructor(repo) {
    this.repo = repo;
  }
  async handler(post) {
    const p = await this.repo.createPost(post);
    if (!p)
      throw new ResourcesNotFoundErrors();
    return p;
  }
};
var UpdatePostUseCase = class {
  constructor(repo) {
    this.repo = repo;
  }
  async handler(post) {
    return this.repo.updatePost(post);
  }
};
var RemovePostUseCase = class {
  constructor(repo) {
    this.repo = repo;
  }
  async handler(id) {
    return this.repo.removePost(id);
  }
};
var FindAllPostUseCase = class {
  constructor(repo) {
    this.repo = repo;
  }
  async handler(page, limit) {
    return this.repo.findAllPost(page, limit);
  }
};
var FindOnePostUseCase = class {
  constructor(repo) {
    this.repo = repo;
  }
  async handler(id) {
    const p = await this.repo.findOnePost(id);
    if (!p) throw new ResourcesNotFoundErrors();
    return p;
  }
};
var FindSearchPostUseCase = class {
  constructor(repo) {
    this.repo = repo;
  }
  async handler(search) {
    return this.repo.findSearchPost(search);
  }
};

// src/user-cases/factory/make-crud-post-use-case copy.ts
function MakeCreatePost() {
  const repo = new PostRepository();
  const createPostUseCase = new CreatePostUseCase(repo);
  return createPostUseCase;
}
function MakeUpdatePost() {
  const repo = new PostRepository();
  const updatePostUseCase = new UpdatePostUseCase(repo);
  return updatePostUseCase;
}
function MakeRemovePost() {
  const repo = new PostRepository();
  const removePostUseCase = new RemovePostUseCase(repo);
  return removePostUseCase;
}
function MakeFindAllPost() {
  const repo = new PostRepository();
  const findAllPostUseCase = new FindAllPostUseCase(repo);
  return findAllPostUseCase;
}
function MakeFindOnePost() {
  const repo = new PostRepository();
  const findOnePostUseCase = new FindOnePostUseCase(repo);
  return findOnePostUseCase;
}
function MakeFindSearchPost() {
  const repo = new PostRepository();
  const findSearchPostUseCase = new FindSearchPostUseCase(repo);
  return findSearchPostUseCase;
}

// src/http/controllers/post/crud.ts
var import_zod2 = require("zod");
async function createPost(req, rep) {
  const registerBodySchema = import_zod2.z.object({
    titulo: import_zod2.z.string(),
    conteudo: import_zod2.z.string(),
    id_autor: import_zod2.z.coerce.number()
  });
  const { titulo, conteudo, id_autor } = registerBodySchema.parse(req.body);
  const createPostUseCase = MakeCreatePost();
  const p = await createPostUseCase.handler({ titulo, conteudo, id_autor });
  return rep.code(201).send(p);
}
async function updatePost(req, rep) {
  const resgisterParameterSchema = import_zod2.z.object({
    id_post: import_zod2.z.coerce.number()
  });
  const { id_post } = resgisterParameterSchema.parse(req.params);
  console.log(id_post);
  const registerBodySchema = import_zod2.z.object({
    titulo: import_zod2.z.string(),
    conteudo: import_zod2.z.string(),
    id_autor: import_zod2.z.coerce.number()
  });
  const { titulo, conteudo, id_autor } = registerBodySchema.parse(req.body);
  if (id_post === void 0 || id_post === 0) {
    return rep.code(400).send("Informe o id do post para altera\xE7\xE3o");
  }
  const updatePostUseCase = MakeUpdatePost();
  const a = await updatePostUseCase.handler({ id_post, titulo, conteudo, id_autor });
  return rep.code(200).send(a);
}
async function removePost(req, rep) {
  const resgisterParameterSchema = import_zod2.z.object({
    id_post: import_zod2.z.coerce.number()
  });
  const { id_post } = resgisterParameterSchema.parse(req.params);
  if (id_post === void 0 || id_post === 0) {
    return rep.code(500).send("Informe o id do post para exclus\xE3o");
  }
  const removePostUseCase = MakeRemovePost();
  const finIdPostUseCase = MakeFindOnePost();
  const post = await finIdPostUseCase.handler(id_post);
  if (post?.id_post === void 0)
    return rep.status(404).send("Objeto n\xE3o encontrado");
  removePostUseCase.handler(id_post);
  return rep.code(200).send("success");
}
async function findAllPost(req, rep) {
  const registerQuerySchema = import_zod2.z.object({
    page: import_zod2.z.coerce.number().default(1),
    limit: import_zod2.z.coerce.number().default(10)
  });
  const { page, limit } = registerQuerySchema.parse(req.query);
  const postRepo = MakeFindAllPost();
  const post = await postRepo.handler(page, limit);
  return rep.status(200).send({ post });
}
async function findOnePost(req, rep) {
  const resgisterParameterSchema = import_zod2.z.object({
    id_post: import_zod2.z.coerce.number()
  });
  const { id_post } = resgisterParameterSchema.parse(req.params);
  const postRepo = MakeFindOnePost();
  const post = await postRepo.handler(id_post);
  return rep.status(200).send({ post });
}
async function findSearchPost(req, rep) {
  const resgisterParameterSchema = import_zod2.z.object({
    search: import_zod2.z.coerce.string()
  });
  const { search } = resgisterParameterSchema.parse(req.params);
  const postRepo = MakeFindSearchPost();
  const post = await postRepo.handler(search);
  if (post === void 0 || post.length === 0)
    return rep.status(404).send("Nenhum valor encontrado");
  return rep.status(200).send({ post });
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  createPost,
  findAllPost,
  findOnePost,
  findSearchPost,
  removePost,
  updatePost
});
