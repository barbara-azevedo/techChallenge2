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

// src/http/controllers/autor-typeorm/routes.ts
var routes_exports = {};
__export(routes_exports, {
  AutorTypeormRoutes: () => AutorTypeormRoutes
});
module.exports = __toCommonJS(routes_exports);

// src/entities/autor.entities.typeorm.ts
var import_typeorm = require("typeorm");
var Autor2 = class {
  constructor() {
  }
};
__decorateClass([
  (0, import_typeorm.PrimaryGeneratedColumn)("increment", {
    name: "id_autor"
  })
], Autor2.prototype, "id_autor", 2);
__decorateClass([
  (0, import_typeorm.Column)({
    name: "nome",
    type: "varchar"
  })
], Autor2.prototype, "nome", 2);
__decorateClass([
  (0, import_typeorm.Column)({
    name: "dt_criacao",
    type: "timestamp without time zone",
    default: () => "CURRENT_TIMESTAMP"
  })
], Autor2.prototype, "dtCriacao", 2);
__decorateClass([
  (0, import_typeorm.Column)({
    name: "dt_modificacao",
    type: "timestamp without time zone",
    default: () => "CURRENT_TIMESTAMP"
  })
], Autor2.prototype, "dtModificacao", 2);
Autor2 = __decorateClass([
  (0, import_typeorm.Entity)({
    name: "autor2"
  })
], Autor2);

// src/lib/typeorm/typeorm.ts
var import_typeorm3 = require("typeorm");

// src/entities/post.entities.typeorm.ts
var import_typeorm2 = require("typeorm");
var Post2 = class {
  constructor() {
  }
};
__decorateClass([
  (0, import_typeorm2.PrimaryGeneratedColumn)("increment", {
    name: "id_post"
  })
], Post2.prototype, "id_post", 2);
__decorateClass([
  (0, import_typeorm2.Column)({
    name: "titulo",
    type: "varchar"
  })
], Post2.prototype, "titulo", 2);
__decorateClass([
  (0, import_typeorm2.Column)({
    name: "conteudo",
    type: "varchar"
  })
], Post2.prototype, "conteudo", 2);
__decorateClass([
  (0, import_typeorm2.Column)({
    name: "dt_criacao",
    type: "timestamp without time zone",
    default: () => "CURRENT_TIMESTAMP"
  })
], Post2.prototype, "dtCriacao", 2);
__decorateClass([
  (0, import_typeorm2.Column)({
    name: "dt_modificacao",
    type: "timestamp without time zone",
    default: () => "CURRENT_TIMESTAMP"
  })
], Post2.prototype, "dtModificacao", 2);
__decorateClass([
  (0, import_typeorm2.Column)({
    name: "id_autor",
    type: "int"
  })
], Post2.prototype, "id_autor", 2);
Post2 = __decorateClass([
  (0, import_typeorm2.Entity)({
    name: "post2"
  })
], Post2);

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
var appDataBase = new import_typeorm3.DataSource({
  type: "postgres",
  host: env.DATABASE_HOST,
  port: env.DATABASE_PORT,
  username: env.DATABASE_USER,
  password: env.DATABASE_PASSWORD,
  database: env.DATABASE_NAME,
  entities: [Autor2, Post2],
  logging: env.NODE_ENV === "development"
});
appDataBase.initialize().then(() => {
  console.log("Database connected typeorm");
}).catch((error) => {
  console.error(`Erro connected typeorm: ${error}`);
});

// src/repositories/typeorm/autor.repository.typeorm.ts
var import_typeorm5 = require("typeorm");
var AutorTypeormRepository = class {
  constructor() {
    this.repo = appDataBase.getRepository(Autor2);
  }
  async createAutorTypeorm(autor) {
    return this.repo.save(autor);
  }
  async updateAutorTypeorm(autor) {
    return this.repo.save(autor);
  }
  async removeAutorTypeorm(autor) {
    await this.repo.delete(autor);
  }
  async findAllAutorTypeorm(page, limit) {
    return this.repo.find({
      skip: (page - 1) * limit,
      take: limit,
      order: {
        dtCriacao: "DESC"
      }
    });
  }
  async findOneAutorTypeorm(id) {
    return this.repo.findOne({
      where: { id_autor: id }
    });
  }
  async findAutorSearchNomeTypeorm(nome) {
    return this.repo.find({
      where: [
        {
          nome: (0, import_typeorm5.Like)(`%${nome}%`)
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

// src/user-cases/autor.user.case.typeorm.ts
var CreateAutorTypeormUseCase = class {
  constructor(repo) {
    this.repo = repo;
  }
  async handler(autor) {
    autor.dtCriacao = /* @__PURE__ */ new Date();
    autor.dtModificacao = /* @__PURE__ */ new Date();
    const p = await this.repo.createAutorTypeorm(autor);
    if (!p)
      throw new ResourcesNotFoundErrors();
    return p;
  }
};
var UpdateAutorTypeormUseCase = class {
  constructor(repo) {
    this.repo = repo;
  }
  async handler(autor) {
    autor.dtModificacao = /* @__PURE__ */ new Date();
    return this.repo.updateAutorTypeorm(autor);
  }
};
var RemoveAutorTypeormUseCase = class {
  constructor(repo) {
    this.repo = repo;
  }
  async handler(autor) {
    await this.repo.removeAutorTypeorm(autor);
  }
};
var FindAllAutorTypeormUseCase = class {
  constructor(repo) {
    this.repo = repo;
  }
  async handler(page, limit) {
    return this.repo.findAllAutorTypeorm(page, limit);
  }
};
var FindOneAutorTypeormUseCase = class {
  constructor(repo) {
    this.repo = repo;
  }
  async handler(id) {
    return this.repo.findOneAutorTypeorm(id);
  }
};
var FindSearchAutorTypeormUseCase = class {
  constructor(repo) {
    this.repo = repo;
  }
  async handler(search) {
    return this.repo.findAutorSearchNomeTypeorm(search);
  }
};

// src/user-cases/factory/make-crud-autor2-use-case.ts
function MakeCrudCreateAutorTypeorm() {
  const repo = new AutorTypeormRepository();
  const createAutorUseCase = new CreateAutorTypeormUseCase(repo);
  return createAutorUseCase;
}
function MakeCrudUpdateAutorTypeorm() {
  const repo = new AutorTypeormRepository();
  const updateAutorUseCase = new UpdateAutorTypeormUseCase(repo);
  return updateAutorUseCase;
}
function MakeCrudRemoverAutorTypeorm() {
  const repo = new AutorTypeormRepository();
  const removeAutorUseCase = new RemoveAutorTypeormUseCase(repo);
  return removeAutorUseCase;
}
function MakeCrudFindAlldAutorTypeorm() {
  const repo = new AutorTypeormRepository();
  const findAllAutorUseCase = new FindAllAutorTypeormUseCase(repo);
  return findAllAutorUseCase;
}
function MakeCrudFindIdAutorTypeorm() {
  const repo = new AutorTypeormRepository();
  const findIdAutorUseCase = new FindOneAutorTypeormUseCase(repo);
  return findIdAutorUseCase;
}
function MakeCrudFindSearchdAutorTypeorm() {
  const repo = new AutorTypeormRepository();
  const findSearchAutorUseCase = new FindSearchAutorTypeormUseCase(repo);
  return findSearchAutorUseCase;
}

// src/http/controllers/autor-typeorm/crud.ts
var import_zod2 = require("zod");
async function createAutorTypeorm(req, rep) {
  const registerBodySchema = import_zod2.z.object({
    nome: import_zod2.z.string()
  });
  const { nome } = registerBodySchema.parse(req.body);
  const createAutorUseCase = MakeCrudCreateAutorTypeorm();
  const autor = await createAutorUseCase.handler({ nome });
  return rep.code(201).send({ autor });
}
async function updateAutorTypeorm(req, rep) {
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
  const updateAutorUseCase = MakeCrudUpdateAutorTypeorm();
  await updateAutorUseCase.handler({ id_autor, nome });
  return rep.code(200).send("success");
}
async function removeAutorTypeorm(req, rep) {
  const resgisterParameterSchema = import_zod2.z.object({
    id_autor: import_zod2.z.coerce.number()
  });
  const { id_autor } = resgisterParameterSchema.parse(req.params);
  if (id_autor === void 0 || id_autor === 0) {
    return rep.code(500).send("Informe o id do autor para exclus\xE3o");
  }
  const removeAutorUseCase = MakeCrudRemoverAutorTypeorm();
  await removeAutorUseCase.handler({ id_autor });
  return rep.code(200).send("success");
}
async function findAutorAllTypeorm(req, rep) {
  const registerQuerySchema = import_zod2.z.object({
    page: import_zod2.z.coerce.number().default(1),
    limit: import_zod2.z.coerce.number().default(10)
  });
  const { page, limit } = registerQuerySchema.parse(req.query);
  console.log(req.params);
  const AutorRepo = MakeCrudFindAlldAutorTypeorm();
  const autor = await AutorRepo.handler(page, limit);
  return rep.status(200).send({ autor });
}
async function findAutorIdTypeorm(req, rep) {
  const resgisterParameterSchema = import_zod2.z.object({
    id: import_zod2.z.coerce.number()
  });
  const { id } = resgisterParameterSchema.parse(req.params);
  const AutorRepo = MakeCrudFindIdAutorTypeorm();
  const autor = await AutorRepo.handler(id);
  return rep.status(200).send({ autor });
}
async function findSearchAutorTypeorm(req, rep) {
  const resgisterParameterSchema = import_zod2.z.object({
    nome: import_zod2.z.coerce.string()
  });
  const { nome } = resgisterParameterSchema.parse(req.params);
  const AutorRepo = MakeCrudFindSearchdAutorTypeorm();
  const autor = await AutorRepo.handler(nome);
  if (autor === void 0 || autor.length === 0)
    return rep.status(404).send("Nenhum Autor encontrado");
  return rep.status(200).send({ autor });
}

// src/http/controllers/autor-typeorm/routes.ts
async function AutorTypeormRoutes(app) {
  app.post("/autor-typeorm/create", createAutorTypeorm);
  app.post("/autor-typeorm/update/:id_autor", updateAutorTypeorm);
  app.post("/autor-typeorm/remove/:id_autor", removeAutorTypeorm);
  app.get("/autor-typeorm/all", findAutorAllTypeorm);
  app.get("/autor-typeorm/:id", findAutorIdTypeorm);
  app.get("/autor-typeorm/search/:nome", findSearchAutorTypeorm);
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  AutorTypeormRoutes
});
