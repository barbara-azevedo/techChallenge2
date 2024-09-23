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

// src/repositories/typeorm/post.repository.typeorm.ts
var post_repository_typeorm_exports = {};
__export(post_repository_typeorm_exports, {
  PostTypeormRepository: () => PostTypeormRepository
});
module.exports = __toCommonJS(post_repository_typeorm_exports);

// src/entities/post.entities.typeorm.ts
var import_typeorm = require("typeorm");
var Post2 = class {
  constructor() {
  }
};
__decorateClass([
  (0, import_typeorm.PrimaryGeneratedColumn)("increment", {
    name: "id_post"
  })
], Post2.prototype, "id_post", 2);
__decorateClass([
  (0, import_typeorm.Column)({
    name: "titulo",
    type: "varchar"
  })
], Post2.prototype, "titulo", 2);
__decorateClass([
  (0, import_typeorm.Column)({
    name: "conteudo",
    type: "varchar"
  })
], Post2.prototype, "conteudo", 2);
__decorateClass([
  (0, import_typeorm.Column)({
    name: "dt_criacao",
    type: "timestamp without time zone",
    default: () => "CURRENT_TIMESTAMP"
  })
], Post2.prototype, "dtCriacao", 2);
__decorateClass([
  (0, import_typeorm.Column)({
    name: "dt_modificacao",
    type: "timestamp without time zone",
    default: () => "CURRENT_TIMESTAMP"
  })
], Post2.prototype, "dtModificacao", 2);
__decorateClass([
  (0, import_typeorm.Column)({
    name: "id_autor",
    type: "int"
  })
], Post2.prototype, "id_autor", 2);
Post2 = __decorateClass([
  (0, import_typeorm.Entity)({
    name: "post2"
  })
], Post2);

// src/lib/typeorm/typeorm.ts
var import_typeorm3 = require("typeorm");

// src/entities/autor.entities.typeorm.ts
var import_typeorm2 = require("typeorm");
var Autor2 = class {
  constructor() {
  }
};
__decorateClass([
  (0, import_typeorm2.PrimaryGeneratedColumn)("increment", {
    name: "id_autor"
  })
], Autor2.prototype, "id_autor", 2);
__decorateClass([
  (0, import_typeorm2.Column)({
    name: "nome",
    type: "varchar"
  })
], Autor2.prototype, "nome", 2);
__decorateClass([
  (0, import_typeorm2.Column)({
    name: "dt_criacao",
    type: "timestamp without time zone",
    default: () => "CURRENT_TIMESTAMP"
  })
], Autor2.prototype, "dtCriacao", 2);
__decorateClass([
  (0, import_typeorm2.Column)({
    name: "dt_modificacao",
    type: "timestamp without time zone",
    default: () => "CURRENT_TIMESTAMP"
  })
], Autor2.prototype, "dtModificacao", 2);
Autor2 = __decorateClass([
  (0, import_typeorm2.Entity)({
    name: "autor2"
  })
], Autor2);

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

// src/repositories/typeorm/post.repository.typeorm.ts
var PostTypeormRepository = class {
  constructor() {
    this.repo = appDataBase.getRepository(Post2);
  }
  createPostTypeorm(post) {
    post.dtCriacao = /* @__PURE__ */ new Date();
    post.dtModificacao = /* @__PURE__ */ new Date();
    return this.repo.save(post);
  }
  update(post) {
    return this.repo.save(post);
  }
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  PostTypeormRepository
});
