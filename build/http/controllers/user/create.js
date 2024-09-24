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

// src/http/controllers/user/create.ts
var create_exports = {};
__export(create_exports, {
  create: () => create,
  findOne: () => findOne,
  signin: () => signin
});
module.exports = __toCommonJS(create_exports);

// src/entities/usuario.entities.ts
var import_typeorm = require("typeorm");
var Usuario = class {
  constructor(email, senha) {
    this.email = email;
    this.senha = senha;
  }
};
__decorateClass([
  (0, import_typeorm.PrimaryColumn)({
    name: "email",
    type: "varchar"
  })
], Usuario.prototype, "email", 2);
__decorateClass([
  (0, import_typeorm.Column)({
    name: "senha",
    type: "varchar"
  })
], Usuario.prototype, "senha", 2);
Usuario = __decorateClass([
  (0, import_typeorm.Entity)({
    name: "usuario"
  })
], Usuario);

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

// src/entities/post.entities.ts
var import_typeorm3 = require("typeorm");
var Post = class {
  constructor() {
  }
};
__decorateClass([
  (0, import_typeorm3.PrimaryGeneratedColumn)("increment", {
    name: "id_post"
  })
], Post.prototype, "id_post", 2);
__decorateClass([
  (0, import_typeorm3.Column)({
    name: "titulo",
    type: "varchar"
  })
], Post.prototype, "titulo", 2);
__decorateClass([
  (0, import_typeorm3.Column)({
    name: "conteudo",
    type: "varchar"
  })
], Post.prototype, "conteudo", 2);
__decorateClass([
  (0, import_typeorm3.Column)({
    name: "dt_criacao",
    type: "timestamp without time zone",
    default: () => "CURRENT_TIMESTAMP"
  })
], Post.prototype, "dtCriacao", 2);
__decorateClass([
  (0, import_typeorm3.Column)({
    name: "dt_modificacao",
    type: "timestamp without time zone",
    default: () => "CURRENT_TIMESTAMP"
  })
], Post.prototype, "dtModificacao", 2);
__decorateClass([
  (0, import_typeorm3.Column)({
    name: "id_autor",
    type: "int"
  })
], Post.prototype, "id_autor", 2);
Post = __decorateClass([
  (0, import_typeorm3.Entity)({
    name: "post"
  })
], Post);

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

// src/repositories/typeorm/usuario.repository.ts
var UsuarioRepository = class {
  constructor() {
    this.repo = appDataBase.getRepository(Usuario);
  }
  async createUsuario(usuario) {
    return this.repo.save(usuario);
  }
  async findByUsername(email) {
    return this.repo.findOne({
      where: { email }
    });
  }
};

// src/user-cases/usuario-use-case.ts
var CreateUsuarioUseCase = class {
  constructor(repo) {
    this.repo = repo;
  }
  async handler(user) {
    return this.repo.createUsuario(user);
  }
};
var FindOneUsuarioUseCase = class {
  constructor(repo) {
    this.repo = repo;
  }
  async handler(email) {
    return this.repo.findByUsername(email);
  }
};

// src/user-cases/factory/make-crud-usuario-use-case.ts
function MakeCreateUsuarioUseCase() {
  const repo = new UsuarioRepository();
  const createUsuarioUseCase = new CreateUsuarioUseCase(repo);
  return createUsuarioUseCase;
}
function MakeFindOneUsuarioUseCase() {
  const repo = new UsuarioRepository();
  const findOneUsuarioUseCase = new FindOneUsuarioUseCase(repo);
  return findOneUsuarioUseCase;
}

// src/http/controllers/user/create.ts
var import_bcryptjs = require("bcryptjs");
var import_zod2 = require("zod");
async function create(req, rep) {
  const registerBodySchema = import_zod2.z.object({
    email: import_zod2.z.string().email({ message: "Email is required" }),
    senha: import_zod2.z.string()
  });
  const { email, senha } = registerBodySchema.parse(req.body);
  const hashedPassword = await (0, import_bcryptjs.hash)(senha, 8);
  const userWithHashPassword = { email, senha: hashedPassword };
  const createUsuarioUseCase = MakeCreateUsuarioUseCase();
  const user = await createUsuarioUseCase.handler(userWithHashPassword);
  return rep.code(201).send({ username: user?.email });
}
async function findOne(req, rep) {
  const resgisterParameterSchema = import_zod2.z.object({
    email: import_zod2.z.string().email({ message: "Email is required" })
  });
  const { email } = resgisterParameterSchema.parse(req.params);
  const findOneUsuarioUseCase = MakeFindOneUsuarioUseCase();
  const user = await findOneUsuarioUseCase.handler(email);
  return rep.code(201).send({ username: user?.email });
}
async function signin(req, rep) {
  const resgisterParameterSchema = import_zod2.z.object({
    email: import_zod2.z.string().email({ message: "Email is required" })
  });
  const { email } = resgisterParameterSchema.parse(req.params);
  const findOneUsuarioUseCase = MakeFindOneUsuarioUseCase();
  const user = await findOneUsuarioUseCase.handler(email);
  return rep.code(201).send({ username: user?.email });
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  create,
  findOne,
  signin
});
