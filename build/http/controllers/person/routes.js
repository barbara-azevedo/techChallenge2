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

// src/http/controllers/person/routes.ts
var routes_exports = {};
__export(routes_exports, {
  personRoutes: () => personRoutes
});
module.exports = __toCommonJS(routes_exports);

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

// src/repositories/person.repo.ts
var PersonRepo = class {
  async create({
    cpf,
    name,
    bith,
    email,
    usuario_id
  }) {
    const result = await database.clientInstance?.query(
      `
            INSERT INTO "person" (cpf, name, bith, email, usuario_id) 
            VALUES 
            ($1,$2,$3,$4,$5) RETURNING *`,
      [
        cpf,
        name,
        bith,
        email,
        usuario_id
      ]
    );
    return result?.rows[0];
  }
  async findWithPerson(userId) {
    const result = await database.clientInstance?.query(
      `
            SELECT * FORM usuario
            LEFT JOIN person ON usuario.id = person.usuario_id
            WHERE usuario.id = $1
            `,
      [userId]
    );
    return result?.rows[0];
  }
};

// src/user-cases/create-person.ts
var CreatePersonUseCase = class {
  constructor(repo) {
    this.repo = repo;
  }
  handler(person) {
    return this.repo.create(person);
  }
};

// src/http/controllers/person/create.ts
var import_zod2 = require("zod");
async function create(req, rep) {
  const registerBodySchema = import_zod2.z.object({
    cpf: import_zod2.z.string(),
    name: import_zod2.z.string(),
    bith: import_zod2.z.coerce.date(),
    email: import_zod2.z.string().email(),
    usuario_id: import_zod2.z.coerce.number()
  });
  const { cpf, name, bith, email, usuario_id } = registerBodySchema.parse(req.body);
  try {
    const personRepo = new PersonRepo();
    const createPersonUseCase = new CreatePersonUseCase(personRepo);
    const person = await createPersonUseCase.handler({ cpf, name, bith, email, usuario_id });
    return rep.code(201).send(person);
  } catch (error) {
    console.error(error);
    throw new Error("Internal server error");
  }
}

// src/http/controllers/person/routes.ts
async function personRoutes(app) {
  app.post("/person", create);
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  personRoutes
});
