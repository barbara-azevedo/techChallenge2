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

// src/http/controllers/post/find.ts
var find_exports = {};
__export(find_exports, {
  findPostAll: () => findPostAll,
  findPostId: () => findPostId,
  findSearchPost: () => findSearchPost
});
module.exports = __toCommonJS(find_exports);

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
  async update({ id, autor, titulo, conteudo }) {
    const result = await database.clientInstance?.query(
      `UPDATE "post" set autor=$1, titulo=$2, conteudo=$3, dt_modificacao=$4 
                WHERE "post".id = $5`,
      [autor, titulo, conteudo, /* @__PURE__ */ new Date(), id]
    );
    return result?.rows[0];
  }
  async createPost({ titulo, conteudo, autor }) {
    const result = await database.clientInstance?.query(
      `INSERT INTO "post" (titulo, conteudo, autor, dt_criacao, dt_modificacao) 
                VALUES ($1,$2,$3,$4,$5) RETURNING *`,
      [titulo, conteudo, autor, /* @__PURE__ */ new Date(), /* @__PURE__ */ new Date()]
    );
    return result?.rows[0];
  }
  async remove(id) {
    const result = await database.clientInstance?.query(
      `DELETE FROM "post" WHERE "post".id = $1`,
      [id]
    );
    return result?.rows[0];
  }
  async findPostAll() {
    const result = await database.clientInstance?.query(
      `SELECT * FROM "post"`,
      []
    );
    return result?.rows;
  }
  async findPostId(postId) {
    const result = await database.clientInstance?.query(
      `SELECT * FROM "post" WHERE "post".id = $1`,
      [postId]
    );
    return result?.rows[0];
  }
  async findPostSearch(search) {
    const result = await database.clientInstance?.query(
      `SELECT * FROM "post" WHERE "post".conteudo like '%'||$1||'%'`,
      [search]
    );
    return result?.rows;
  }
};

// src/http/controllers/post/find.ts
var import_zod2 = require("zod");
async function findPostAll(req, rep) {
  try {
    const postRepo = new PostRepository();
    const post = await postRepo.findPostAll();
    return rep.status(200).send(post);
  } catch (error) {
    console.error("error" + error);
    throw new Error(`Erro ${error}`);
  }
}
async function findPostId(req, rep) {
  const resgisterParameterSchema = import_zod2.z.object({
    id: import_zod2.z.coerce.number()
  });
  const { id } = resgisterParameterSchema.parse(req.params);
  try {
    const postRepo = new PostRepository();
    const post = await postRepo.findPostId(id);
    if (post?.id === void 0)
      return rep.status(404).send("Objeto n\xE3o encontrado");
    return rep.status(200).send(post);
  } catch (error) {
    console.error("error" + error);
    throw new Error(`Erro ${error}`);
  }
}
async function findSearchPost(req, rep) {
  const resgisterParameterSchema = import_zod2.z.object({
    search: import_zod2.z.coerce.string()
  });
  const { search } = resgisterParameterSchema.parse(req.params);
  try {
    const postRepo = new PostRepository();
    const post = await postRepo.findPostSearch(search);
    console.log(post);
    if (post === void 0 || post.length === 0)
      return rep.status(404).send("Nenhum valor encontrado");
    return rep.status(200).send(post);
  } catch (error) {
    console.error("error" + error);
    throw new Error(`Erro ${error}`);
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  findPostAll,
  findPostId,
  findSearchPost
});
