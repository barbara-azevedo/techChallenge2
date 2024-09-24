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

// src/user-cases/factory/make-crud-autor-use-case.ts
var make_crud_autor_use_case_exports = {};
__export(make_crud_autor_use_case_exports, {
  MakeCreateAutor: () => MakeCreateAutor,
  MakeFindAlldAutor: () => MakeFindAlldAutor,
  MakeFindIdAutor: () => MakeFindIdAutor,
  MakeFindSearchdAutor: () => MakeFindSearchdAutor,
  MakeRemoverAutor: () => MakeRemoverAutor,
  MakeUpdateAutor: () => MakeUpdateAutor
});
module.exports = __toCommonJS(make_crud_autor_use_case_exports);

// src/entities/autor.entities.ts
var import_typeorm = require("typeorm");
var Autor = class {
  constructor() {
  }
};
__decorateClass([
  (0, import_typeorm.PrimaryGeneratedColumn)("increment", {
    name: "id_autor"
  })
], Autor.prototype, "id_autor", 2);
__decorateClass([
  (0, import_typeorm.Column)({
    name: "nome",
    type: "varchar"
  })
], Autor.prototype, "nome", 2);
__decorateClass([
  (0, import_typeorm.Column)({
    name: "dt_criacao",
    type: "timestamp without time zone",
    default: () => "CURRENT_TIMESTAMP"
  })
], Autor.prototype, "dtCriacao", 2);
__decorateClass([
  (0, import_typeorm.Column)({
    name: "dt_modificacao",
    type: "timestamp without time zone",
    default: () => "CURRENT_TIMESTAMP"
  })
], Autor.prototype, "dtModificacao", 2);
Autor = __decorateClass([
  (0, import_typeorm.Entity)({
    name: "autor"
  })
], Autor);

// src/lib/typeorm/typeorm.ts
var import_typeorm4 = require("typeorm");

// src/entities/post.entities.ts
var import_typeorm2 = require("typeorm");
var Post = class {
  constructor() {
  }
};
__decorateClass([
  (0, import_typeorm2.PrimaryGeneratedColumn)("increment", {
    name: "id_post"
  })
], Post.prototype, "id_post", 2);
__decorateClass([
  (0, import_typeorm2.Column)({
    name: "titulo",
    type: "varchar"
  })
], Post.prototype, "titulo", 2);
__decorateClass([
  (0, import_typeorm2.Column)({
    name: "conteudo",
    type: "varchar"
  })
], Post.prototype, "conteudo", 2);
__decorateClass([
  (0, import_typeorm2.Column)({
    name: "dt_criacao",
    type: "timestamp without time zone",
    default: () => "CURRENT_TIMESTAMP"
  })
], Post.prototype, "dtCriacao", 2);
__decorateClass([
  (0, import_typeorm2.Column)({
    name: "dt_modificacao",
    type: "timestamp without time zone",
    default: () => "CURRENT_TIMESTAMP"
  })
], Post.prototype, "dtModificacao", 2);
__decorateClass([
  (0, import_typeorm2.Column)({
    name: "id_autor",
    type: "int"
  })
], Post.prototype, "id_autor", 2);
Post = __decorateClass([
  (0, import_typeorm2.Entity)({
    name: "post"
  })
], Post);

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

// src/repositories/typeorm/autor.repository.typeorm.ts
var import_typeorm6 = require("typeorm");
var AutorRepository = class {
  constructor() {
    this.repo = appDataBase.getRepository(Autor);
  }
  async createAutor(autor) {
    return this.repo.save(autor);
  }
  async updateAutor(autor) {
    return this.repo.save(autor);
  }
  async removeAutor(autor) {
    await this.repo.delete(autor);
  }
  async findAllAutor(page, limit) {
    return this.repo.find({
      skip: (page - 1) * limit,
      take: limit,
      order: {
        dtCriacao: "DESC"
      }
    });
  }
  async findOneAutor(id) {
    return this.repo.findOne({
      where: { id_autor: id }
    });
  }
  async findAutorSearchNome(nome) {
    return this.repo.find({
      where: [
        {
          nome: (0, import_typeorm6.Like)(`%${nome}%`)
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
var CreateAutorUseCase = class {
  constructor(repo) {
    this.repo = repo;
  }
  async handler(autor) {
    autor.dtCriacao = /* @__PURE__ */ new Date();
    autor.dtModificacao = /* @__PURE__ */ new Date();
    const p = await this.repo.createAutor(autor);
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
    autor.dtModificacao = /* @__PURE__ */ new Date();
    return this.repo.updateAutor(autor);
  }
};
var RemoveAutorUseCase = class {
  constructor(repo) {
    this.repo = repo;
  }
  async handler(autor) {
    await this.repo.removeAutor(autor);
  }
};
var FindAllAutorUseCase = class {
  constructor(repo) {
    this.repo = repo;
  }
  async handler(page, limit) {
    return this.repo.findAllAutor(page, limit);
  }
};
var FindOneAutorUseCase = class {
  constructor(repo) {
    this.repo = repo;
  }
  async handler(id) {
    return this.repo.findOneAutor(id);
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
function MakeCreateAutor() {
  const repo = new AutorRepository();
  const createAutorUseCase = new CreateAutorUseCase(repo);
  return createAutorUseCase;
}
function MakeUpdateAutor() {
  const repo = new AutorRepository();
  const updateAutorUseCase = new UpdateAutorUseCase(repo);
  return updateAutorUseCase;
}
function MakeRemoverAutor() {
  const repo = new AutorRepository();
  const removeAutorUseCase = new RemoveAutorUseCase(repo);
  return removeAutorUseCase;
}
function MakeFindAlldAutor() {
  const repo = new AutorRepository();
  const findAllAutorUseCase = new FindAllAutorUseCase(repo);
  return findAllAutorUseCase;
}
function MakeFindIdAutor() {
  const repo = new AutorRepository();
  const findIdAutorUseCase = new FindOneAutorUseCase(repo);
  return findIdAutorUseCase;
}
function MakeFindSearchdAutor() {
  const repo = new AutorRepository();
  const findSearchAutorUseCase = new FindSearchAutorUseCase(repo);
  return findSearchAutorUseCase;
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  MakeCreateAutor,
  MakeFindAlldAutor,
  MakeFindIdAutor,
  MakeFindSearchdAutor,
  MakeRemoverAutor,
  MakeUpdateAutor
});
