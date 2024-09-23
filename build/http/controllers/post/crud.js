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

// src/http/controllers/post/crud.ts
var crud_exports = {};
__export(crud_exports, {
  createPost: () => createPost,
  findPostAll: () => findPostAll,
  findPostId: () => findPostId,
  findSearchPost: () => findSearchPost,
  findSearchPostAndAutor: () => findSearchPostAndAutor,
  removePost: () => removePost,
  updatePost: () => updatePost
});
module.exports = __toCommonJS(crud_exports);

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
  DATABASE_PORT: import_zod.z.coerce.number()
});
var _env = envSchema.safeParse(process.env);
if (!_env.success) {
  console.log("Invalid enviroment variables", _env.error.format());
  throw new Error("Invalid enviroment variables");
}
var env = _env.data;

// src/lib/db/pg.ts
var import_pg = require("pg");
var CONFIG = {
  user: env.DATABASE_USER,
  host: env.DATABASE_HOST,
  database: env.DATABASE_NAME,
  password: env.DATABASE_PASSWORD,
  port: env.DATABASE_PORT
};
var db = class {
  constructor() {
    this.pool = new import_pg.Pool(CONFIG);
    this.connection();
  }
  async connection() {
    try {
      this.client = await this.pool.connect();
    } catch (error) {
      console.log(`Error connection database: ${error} `);
      throw new Error(`Error connection database: ${error} `);
    }
  }
  get clientInstance() {
    return this.client;
  }
};
var database = new db();

// src/repositories/post.repository.ts
var PostRepository = class {
  async createPost({ titulo, conteudo, id_autor }) {
    const result = await database.clientInstance?.query(
      `INSERT INTO "post" (titulo, conteudo, dt_criacao, dt_modificacao, id_autor) 
                VALUES ($1,$2,$3,$4,$5) RETURNING *`,
      [titulo, conteudo, /* @__PURE__ */ new Date(), /* @__PURE__ */ new Date(), id_autor]
    );
    return result?.rows[0];
  }
  async update({ id_post, titulo, conteudo, id_autor }) {
    const result = await database.clientInstance?.query(
      `UPDATE "post" set titulo=$1, conteudo=$2, dt_modificacao=$3, id_autor=$4 
                    WHERE "post".id_post = $5`,
      [titulo, conteudo, /* @__PURE__ */ new Date(), id_autor, id_post]
    );
    return result?.rows[0];
  }
  async remove(id_post) {
    const result = await database.clientInstance?.query(
      `DELETE FROM "post" WHERE "post".id_post = $1`,
      [id_post]
    );
    return result?.rows[0];
  }
  //------------------------------FINDs
  async findPostAll() {
    const result = await database.clientInstance?.query(
      `SELECT * FROM "post" 
                INNER JOIN "autor" ON "post".id_autor = "autor".id_autor 
                ORDER BY "post".dt_criacao DESC`
    );
    return result?.rows;
  }
  async findPostId(postId) {
    const result = await database.clientInstance?.query(
      `SELECT * FROM "post" LEFT JOIN "autor" ON "post".id_autor = "autor".id_autor 
                WHERE "post".id_post = $1`,
      [postId]
    );
    return result?.rows[0];
  }
  async findPostSearch(search) {
    const result = await database.clientInstance?.query(
      `SELECT * FROM "post" LEFT JOIN "autor" ON "post".id_autor = "autor".id_autor 
                WHERE "post".conteudo like '%'||$1||'%' ORDER BY "post".dt_criacao DESC`,
      [search]
    );
    return result?.rows;
  }
  async findPostAndAutorSearch(search) {
    const result = await database.clientInstance?.query(
      `SELECT * FROM "post" INNER JOIN "autor" ON "post".id_autor = "autor".id_autor
                WHERE "autor".nome like '%'||$1||'%' 
                ORDER BY "post".dt_criacao DESC`,
      [search]
    );
    return result?.rows;
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
    return this.repo.update(post);
  }
};
var RemovePostUseCase = class {
  constructor(repo) {
    this.repo = repo;
  }
  async handler(id) {
    return this.repo.remove(id);
  }
};
var FindAllPostUseCase = class {
  constructor(repo) {
    this.repo = repo;
  }
  async handler() {
    return this.repo.findPostAll();
  }
};
var FindIdPostUseCase = class {
  constructor(repo) {
    this.repo = repo;
  }
  async handler(id) {
    const p = await this.repo.findPostId(id);
    if (!p) throw new ResourcesNotFoundErrors();
    return p;
  }
};
var FindSearchPostUseCase = class {
  constructor(repo) {
    this.repo = repo;
  }
  async handler(search) {
    return this.repo.findPostSearch(search);
  }
};
var FindSearchPostAndAutorUseCase = class {
  constructor(repo) {
    this.repo = repo;
  }
  async handler(search) {
    return this.repo.findPostAndAutorSearch(search);
  }
};

// src/user-cases/factory/make-crud-post-use-case.ts
function MakeCrudCreatePost() {
  const repo = new PostRepository();
  const createPostUseCase = new CreatePostUseCase(repo);
  return createPostUseCase;
}
function MakeCrudUpdatePost() {
  const repo = new PostRepository();
  const updatePostUseCase = new UpdatePostUseCase(repo);
  return updatePostUseCase;
}
function MakeCrudRemoverPost() {
  const repo = new PostRepository();
  const removePostUseCase = new RemovePostUseCase(repo);
  return removePostUseCase;
}
function MakeCrudFindIdPost() {
  const repo = new PostRepository();
  const findIdPostUseCase = new FindIdPostUseCase(repo);
  return findIdPostUseCase;
}
function MakeCrudFindAlldPost() {
  const repo = new PostRepository();
  const findAllPostUseCase = new FindAllPostUseCase(repo);
  return findAllPostUseCase;
}
function MakeCrudFindSearchdPost() {
  const repo = new PostRepository();
  const findSearchPostUseCase = new FindSearchPostUseCase(repo);
  return findSearchPostUseCase;
}
function MakeCrudFindSearchdPostAndAutor() {
  const repo = new PostRepository();
  const findSearchPostAndAutorUseCase = new FindSearchPostAndAutorUseCase(repo);
  return findSearchPostAndAutorUseCase;
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
  const createPostUseCase = MakeCrudCreatePost();
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
  const updatePostUseCase = MakeCrudUpdatePost();
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
  const removePostUseCase = MakeCrudRemoverPost();
  const finIdPostUseCase = MakeCrudFindIdPost();
  const post = await finIdPostUseCase.handler(id_post);
  if (post?.id_post === void 0)
    return rep.status(404).send("Objeto n\xE3o encontrado");
  removePostUseCase.handler(id_post);
  return rep.code(200).send("success");
}
async function findPostAll(req, rep) {
  const postRepo = MakeCrudFindAlldPost();
  const post = await postRepo.handler();
  return rep.status(200).send({ post });
}
async function findPostId(req, rep) {
  const resgisterParameterSchema = import_zod2.z.object({
    id_post: import_zod2.z.coerce.number()
  });
  const { id_post } = resgisterParameterSchema.parse(req.params);
  const postRepo = MakeCrudFindIdPost();
  const post = await postRepo.handler(id_post);
  return rep.status(200).send({ post });
}
async function findSearchPost(req, rep) {
  const resgisterParameterSchema = import_zod2.z.object({
    search: import_zod2.z.coerce.string()
  });
  const { search } = resgisterParameterSchema.parse(req.params);
  const postRepo = MakeCrudFindSearchdPost();
  const post = await postRepo.handler(search);
  if (post === void 0 || post.length === 0)
    return rep.status(404).send("Nenhum valor encontrado");
  return rep.status(200).send({ post });
}
async function findSearchPostAndAutor(req, rep) {
  const resgisterParameterSchema = import_zod2.z.object({
    search: import_zod2.z.coerce.string()
  });
  const { search } = resgisterParameterSchema.parse(req.params);
  const postRepo = MakeCrudFindSearchdPostAndAutor();
  const post = await postRepo.handler(search);
  if (post === void 0 || post.length === 0)
    return rep.status(404).send("Nenhum valor encontrado");
  return rep.status(200).send({ post });
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  createPost,
  findPostAll,
  findPostId,
  findSearchPost,
  findSearchPostAndAutor,
  removePost,
  updatePost
});
