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

// src/repositories/autor.repository.ts
var autor_repository_exports = {};
__export(autor_repository_exports, {
  AutorRepository: () => AutorRepository
});
module.exports = __toCommonJS(autor_repository_exports);

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

// src/repositories/autor.repository.ts
var AutorRepository = class {
  async update({ id_autor, nome }) {
    const result = await database.clientInstance?.query(
      `UPDATE "autor" set nome=$1, dt_modificacao=$2 WHERE "autor".id_autor = $3`,
      [nome, /* @__PURE__ */ new Date(), id_autor]
    );
    return result?.rows[0];
  }
  async createAutor({ nome }) {
    const result = await database.clientInstance?.query(
      `INSERT INTO "autor" (nome, dt_criacao, dt_modificacao) 
                VALUES ($1,$2,$3) RETURNING *`,
      [nome, /* @__PURE__ */ new Date(), /* @__PURE__ */ new Date()]
    );
    return result?.rows[0];
  }
  async remove(id) {
    const result = await database.clientInstance?.query(
      `DELETE FROM "autor" WHERE "autor".id_autor = $1`,
      [id]
    );
    return result?.rows[0];
  }
  //----------------------------------FINDs
  async findAllAutor() {
    const result = await database.clientInstance?.query(
      `SELECT * FROM "autor" ORDER BY "autor".id_autor`,
      []
    );
    return result?.rows;
  }
  async findAutorId(autorId) {
    const result = await database.clientInstance?.query(
      `SELECT * FROM "autor" WHERE "autor".id_autor = $1`,
      [autorId]
    );
    return result?.rows[0];
  }
  async findAutorSearchNome(search) {
    const result = await database.clientInstance?.query(
      `SELECT * FROM "autor" WHERE "autor".nome like '%'||$1||'%'`,
      [search]
    );
    return result?.rows;
  }
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  AutorRepository
});
