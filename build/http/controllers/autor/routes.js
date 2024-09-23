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

// src/http/controllers/autor/routes.ts
var routes_exports = {};
__export(routes_exports, {
  AutorRoutes: () => AutorRoutes
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

// src/user-cases/erros/resource-not-found-erros.ts
var ResourcesNotFoundErrors = class extends Error {
  constructor() {
    super("Resource not found");
  }
};

// src/user-cases/autor.user.case.ts
var CreateAutorUseCase = class {
  constructor(repo) {
    this.repo = repo;
  }
  async handler(Autor) {
    const p = await this.repo.createAutor(Autor);
    if (!p)
      throw new ResourcesNotFoundErrors();
    return p;
  }
};
var UpdateAutorUseCase = class {
  constructor(repo) {
    this.repo = repo;
  }
  async handler(autor) {
    return this.repo.update(autor);
  }
};
var RemoveAutorUseCase = class {
  constructor(repo) {
    this.repo = repo;
  }
  async handler(id) {
    return this.repo.remove(id);
  }
};
var FindAllAutorUseCase = class {
  constructor(repo) {
    this.repo = repo;
  }
  async handler() {
    return this.repo.findAllAutor();
  }
};
var FindIdAutorUseCase = class {
  constructor(repo) {
    this.repo = repo;
  }
  async handler(id_autor) {
    const p = await this.repo.findAutorId(id_autor);
    if (!p) throw new ResourcesNotFoundErrors();
    return p;
  }
};
var FindSearchAutorUseCase = class {
  constructor(repo) {
    this.repo = repo;
  }
  async handler(search) {
    return this.repo.findAutorSearchNome(search);
  }
};

// src/user-cases/factory/make-crud-autor-use-case.ts
function MakeCrudCreateAutor() {
  const repo = new AutorRepository();
  const createAutorUseCase = new CreateAutorUseCase(repo);
  return createAutorUseCase;
}
function MakeCrudUpdateAutor() {
  const repo = new AutorRepository();
  const updateAutorUseCase = new UpdateAutorUseCase(repo);
  return updateAutorUseCase;
}
function MakeCrudRemoverAutor() {
  const repo = new AutorRepository();
  const removeAutorUseCase = new RemoveAutorUseCase(repo);
  return removeAutorUseCase;
}
function MakeCrudFindIdAutor() {
  const repo = new AutorRepository();
  const findIdAutorUseCase = new FindIdAutorUseCase(repo);
  return findIdAutorUseCase;
}
function MakeCrudFindAlldAutor() {
  const repo = new AutorRepository();
  const findAllAutorUseCase = new FindAllAutorUseCase(repo);
  return findAllAutorUseCase;
}
function MakeCrudFindSearchdAutor() {
  const repo = new AutorRepository();
  const findSearchAutorUseCase = new FindSearchAutorUseCase(repo);
  return findSearchAutorUseCase;
}

// src/http/controllers/autor/crud.ts
var import_zod2 = require("zod");
async function createAutor(req, rep) {
  const registerBodySchema = import_zod2.z.object({
    nome: import_zod2.z.string()
  });
  const { nome } = registerBodySchema.parse(req.body);
  const createAutorUseCase = MakeCrudCreateAutor();
  const autor = await createAutorUseCase.handler({ nome });
  return rep.code(201).send({ autor });
}
async function updateAutor(req, rep) {
  const resgisterParameterSchema = import_zod2.z.object({
    id_autor: import_zod2.z.coerce.number()
  });
  const { id_autor } = resgisterParameterSchema.parse(req.params);
  const registerBodySchema = import_zod2.z.object({
    nome: import_zod2.z.string()
  });
  const { nome } = registerBodySchema.parse(req.body);
  if (id_autor === void 0 || id_autor === 0) {
    return rep.code(400).send("Informe o id do autor para altera\xE7\xE3o");
  }
  const updateAutorUseCase = MakeCrudUpdateAutor();
  await updateAutorUseCase.handler({ id_autor, nome });
  return rep.code(200).send("success");
}
async function removeAutor(req, rep) {
  const resgisterParameterSchema = import_zod2.z.object({
    id_autor: import_zod2.z.coerce.number()
  });
  const { id_autor } = resgisterParameterSchema.parse(req.params);
  if (id_autor === void 0 || id_autor === 0) {
    return rep.code(500).send("Informe o id do autor para exclus\xE3o");
  }
  const removeAutorUseCase = MakeCrudRemoverAutor();
  const finIdAutorUseCase = MakeCrudFindIdAutor();
  const Autor = await finIdAutorUseCase.handler(id_autor);
  if (Autor?.id_autor === void 0)
    return rep.status(404).send("Objeto n\xE3o encontrado");
  await removeAutorUseCase.handler(id_autor);
  return rep.code(200).send("success");
}
async function findAutorAll(req, rep) {
  const AutorRepo = MakeCrudFindAlldAutor();
  const autor = await AutorRepo.handler();
  return rep.status(200).send({ autor });
}
async function findAutorId(req, rep) {
  const resgisterParameterSchema = import_zod2.z.object({
    id: import_zod2.z.coerce.number()
  });
  const { id } = resgisterParameterSchema.parse(req.params);
  const AutorRepo = MakeCrudFindIdAutor();
  const autor = await AutorRepo.handler(id);
  return rep.status(200).send({ autor });
}
async function findSearchAutor(req, rep) {
  const resgisterParameterSchema = import_zod2.z.object({
    nome: import_zod2.z.coerce.string()
  });
  const { nome } = resgisterParameterSchema.parse(req.params);
  const AutorRepo = MakeCrudFindSearchdAutor();
  const autor = await AutorRepo.handler(nome);
  if (autor === void 0 || autor.length === 0)
    return rep.status(404).send("Nenhum Autor encontrado");
  return rep.status(200).send({ autor });
}

// src/http/controllers/autor/routes.ts
async function AutorRoutes(app) {
  app.get("/autor/all", findAutorAll);
  app.get("/autor/:id", findAutorId);
  app.get("/autor/search/:nome", findSearchAutor);
  app.post("/autor/create", createAutor);
  app.post("/autor/update/:id_autor", updateAutor);
  app.post("/autor/remove/:id_autor", removeAutor);
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  AutorRoutes
});
