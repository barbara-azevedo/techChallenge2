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

// src/http/controllers/user/find.ts
var find_exports = {};
__export(find_exports, {
  findUser: () => findUser
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

// src/repositories/user.repo.ts
var UsuarioRepo = class {
  async create({ username, password }) {
    const result = await database.clientInstance?.query(
      `INSERT INTO "usuario" (username,pass) VALUES ($1,$2) RETURNING *`,
      [username, password]
    );
    return result?.rows[0];
  }
  async findWithPerson(userId) {
    const result = await database.clientInstance?.query(
      `SELECT * FROM "usuario" LEFT JOIN person ON "usuario".id = person.usuario_id WHERE "usuario".id = $1
            `,
      [userId]
    );
    return result?.rows[0];
  }
};

// src/user-cases/find-with-person.ts
var FindWithPersonUserCase = class {
  constructor(userRepo) {
    this.userRepo = userRepo;
  }
  async handler(userId) {
    return this.userRepo.findWithPerson(userId);
  }
};

// src/http/controllers/user/find.ts
var import_zod2 = require("zod");
async function findUser(req, rep) {
  const resgisterParameterSchema = import_zod2.z.object({
    id: import_zod2.z.coerce.number()
  });
  const { id } = resgisterParameterSchema.parse(req.params);
  try {
    const userRepo = new UsuarioRepo();
    const findWi = new FindWithPersonUserCase(userRepo);
    const user = await findWi.handler(id);
    return rep.status(200).send(user);
  } catch (error) {
    console.error("error" + error);
    throw new Error(`Erro ${error}`);
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  findUser
});
