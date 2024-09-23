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

// src/user-cases/factory/make-crud-post-use-case.ts
var make_crud_post_use_case_exports = {};
__export(make_crud_post_use_case_exports, {
  MakeCrudCreatePost: () => MakeCrudCreatePost,
  MakeCrudFindAlldPost: () => MakeCrudFindAlldPost,
  MakeCrudFindIdPost: () => MakeCrudFindIdPost,
  MakeCrudFindSearchdPost: () => MakeCrudFindSearchdPost,
  MakeCrudFindSearchdPostAndAutor: () => MakeCrudFindSearchdPostAndAutor,
  MakeCrudRemoverPost: () => MakeCrudRemoverPost,
  MakeCrudUpdatePost: () => MakeCrudUpdatePost
});
module.exports = __toCommonJS(make_crud_post_use_case_exports);

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
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  MakeCrudCreatePost,
  MakeCrudFindAlldPost,
  MakeCrudFindIdPost,
  MakeCrudFindSearchdPost,
  MakeCrudFindSearchdPostAndAutor,
  MakeCrudRemoverPost,
  MakeCrudUpdatePost
});
