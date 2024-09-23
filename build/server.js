"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __decorateClass = (decorators, target, key, kind) => {
  var result = kind > 1 ? void 0 : kind ? __getOwnPropDesc(target, key) : target;
  for (var i = decorators.length - 1, decorator; i >= 0; i--)
    if (decorator = decorators[i])
      result = (kind ? decorator(target, key, result) : decorator(result)) || result;
  if (kind && result) __defProp(target, key, result);
  return result;
};

// src/app.ts
var import_fastify = require("fastify");
var import_reflect_metadata = require("reflect-metadata");

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

// src/repositories/typeorm/autor.repository.typeorm.ts
var AutorTypeormRepository = class {
  constructor() {
    this.repo = appDataBase.getRepository(Autor2);
  }
  createAutorTypeorm(autor) {
    return this.repo.save(autor);
  }
  updateAutorTypeorm(autor) {
    return this.repo.save(autor);
  }
  removeAutorTypeorm(autor) {
    return this.repo.remove(autor);
  }
  findAllAutorTypeorm() {
    return this.repo.find({
      order: {
        dtCriacao: "DESC"
      }
    });
  }
  findOneAutorTypeorm(id) {
    return this.repo.findOne(
      {
        where: { id_autor: id }
      }
    );
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
    return this.repo.removeAutorTypeorm(autor);
  }
};
var FindAllAutorTypeormUseCase = class {
  constructor(repo) {
    this.repo = repo;
  }
  async handler() {
    return this.repo.findAllAutorTypeorm();
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
  const AutorRepo = MakeCrudFindAlldAutorTypeorm();
  const autor = await AutorRepo.handler();
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

// src/http/controllers/autor-typeorm/routes.ts
async function AutorTypeormRoutes(app2) {
  app2.post("/autor-typeorm/create", createAutorTypeorm);
  app2.post("/autor-typeorm/update/:id_autor", updateAutorTypeorm);
  app2.post("/autor-typeorm/remove/:id_autor", removeAutorTypeorm);
  app2.get("/autor-typeorm/all", findAutorAllTypeorm);
  app2.get("/autor-typeorm/:id", findAutorIdTypeorm);
}

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
var import_zod3 = require("zod");
async function createAutor(req, rep) {
  const registerBodySchema = import_zod3.z.object({
    nome: import_zod3.z.string()
  });
  const { nome } = registerBodySchema.parse(req.body);
  const createAutorUseCase = MakeCrudCreateAutor();
  const autor = await createAutorUseCase.handler({ nome });
  return rep.code(201).send({ autor });
}
async function updateAutor(req, rep) {
  const resgisterParameterSchema = import_zod3.z.object({
    id_autor: import_zod3.z.coerce.number()
  });
  const { id_autor } = resgisterParameterSchema.parse(req.params);
  const registerBodySchema = import_zod3.z.object({
    nome: import_zod3.z.string()
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
  const resgisterParameterSchema = import_zod3.z.object({
    id_autor: import_zod3.z.coerce.number()
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
  const resgisterParameterSchema = import_zod3.z.object({
    id: import_zod3.z.coerce.number()
  });
  const { id } = resgisterParameterSchema.parse(req.params);
  const AutorRepo = MakeCrudFindIdAutor();
  const autor = await AutorRepo.handler(id);
  return rep.status(200).send({ autor });
}
async function findSearchAutor(req, rep) {
  const resgisterParameterSchema = import_zod3.z.object({
    nome: import_zod3.z.coerce.string()
  });
  const { nome } = resgisterParameterSchema.parse(req.params);
  const AutorRepo = MakeCrudFindSearchdAutor();
  const autor = await AutorRepo.handler(nome);
  if (autor === void 0 || autor.length === 0)
    return rep.status(404).send("Nenhum Autor encontrado");
  return rep.status(200).send({ autor });
}

// src/http/controllers/autor/routes.ts
async function AutorRoutes(app2) {
  app2.get("/autor/all", findAutorAll);
  app2.get("/autor/:id", findAutorId);
  app2.get("/autor/search/:nome", findSearchAutor);
  app2.post("/autor/create", createAutor);
  app2.post("/autor/update/:id_autor", updateAutor);
  app2.post("/autor/remove/:id_autor", removeAutor);
}

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

// src/user-cases/post.user.case.typeorm.ts
var CreatePostTypeormUseCase = class {
  constructor(repo) {
    this.repo = repo;
  }
  async handler(post) {
    const p = await this.repo.createPostTypeorm(post);
    if (!p)
      throw new ResourcesNotFoundErrors();
    return p;
  }
};

// src/user-cases/factory/make-crud-post2-use-case copy.ts
function MakeCrudCreatePosTypeorm() {
  const repo = new PostTypeormRepository();
  const createPostUseCase = new CreatePostTypeormUseCase(repo);
  return createPostUseCase;
}

// src/http/controllers/post-typeorm/crud.ts
var import_zod4 = require("zod");
async function createPostTypeorm(req, rep) {
  const registerBodySchema = import_zod4.z.object({
    titulo: import_zod4.z.string(),
    conteudo: import_zod4.z.string(),
    id_autor: import_zod4.z.coerce.number()
  });
  const { titulo, conteudo, id_autor } = registerBodySchema.parse(req.body);
  const createPostUseCase = MakeCrudCreatePosTypeorm();
  const p = await createPostUseCase.handler({ titulo, conteudo, id_autor });
  return rep.code(201).send(p);
}

// src/http/controllers/post-typeorm/routes.ts
async function postTypeormRoutes(app2) {
  app2.post("/post-typeorm/create", createPostTypeorm);
}

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

// src/http/controllers/post/crud.ts
var import_zod5 = require("zod");
async function createPost(req, rep) {
  const registerBodySchema = import_zod5.z.object({
    titulo: import_zod5.z.string(),
    conteudo: import_zod5.z.string(),
    id_autor: import_zod5.z.coerce.number()
  });
  const { titulo, conteudo, id_autor } = registerBodySchema.parse(req.body);
  const createPostUseCase = MakeCrudCreatePost();
  const p = await createPostUseCase.handler({ titulo, conteudo, id_autor });
  return rep.code(201).send(p);
}
async function updatePost(req, rep) {
  const resgisterParameterSchema = import_zod5.z.object({
    id_post: import_zod5.z.coerce.number()
  });
  const { id_post } = resgisterParameterSchema.parse(req.params);
  console.log(id_post);
  const registerBodySchema = import_zod5.z.object({
    titulo: import_zod5.z.string(),
    conteudo: import_zod5.z.string(),
    id_autor: import_zod5.z.coerce.number()
  });
  const { titulo, conteudo, id_autor } = registerBodySchema.parse(req.body);
  if (id_post === void 0 || id_post === 0) {
    return rep.code(400).send("Informe o id do post para altera\xE7\xE3o");
  }
  const updatePostUseCase = MakeCrudUpdatePost();
  const a = await updatePostUseCase.handler({ id_post, titulo, conteudo, id_autor });
  return rep.code(200).send(a);
}
async function removePost(req, rep) {
  const resgisterParameterSchema = import_zod5.z.object({
    id_post: import_zod5.z.coerce.number()
  });
  const { id_post } = resgisterParameterSchema.parse(req.params);
  if (id_post === void 0 || id_post === 0) {
    return rep.code(500).send("Informe o id do post para exclus\xE3o");
  }
  const removePostUseCase = MakeCrudRemoverPost();
  const finIdPostUseCase = MakeCrudFindIdPost();
  const post = await finIdPostUseCase.handler(id_post);
  if (post?.id_post === void 0)
    return rep.status(404).send("Objeto n\xE3o encontrado");
  removePostUseCase.handler(id_post);
  return rep.code(200).send("success");
}
async function findPostAll(req, rep) {
  const postRepo = MakeCrudFindAlldPost();
  const post = await postRepo.handler();
  return rep.status(200).send({ post });
}
async function findPostId(req, rep) {
  const resgisterParameterSchema = import_zod5.z.object({
    id_post: import_zod5.z.coerce.number()
  });
  const { id_post } = resgisterParameterSchema.parse(req.params);
  const postRepo = MakeCrudFindIdPost();
  const post = await postRepo.handler(id_post);
  return rep.status(200).send({ post });
}
async function findSearchPost(req, rep) {
  const resgisterParameterSchema = import_zod5.z.object({
    search: import_zod5.z.coerce.string()
  });
  const { search } = resgisterParameterSchema.parse(req.params);
  const postRepo = MakeCrudFindSearchdPost();
  const post = await postRepo.handler(search);
  if (post === void 0 || post.length === 0)
    return rep.status(404).send("Nenhum valor encontrado");
  return rep.status(200).send({ post });
}
async function findSearchPostAndAutor(req, rep) {
  const resgisterParameterSchema = import_zod5.z.object({
    search: import_zod5.z.coerce.string()
  });
  const { search } = resgisterParameterSchema.parse(req.params);
  const postRepo = MakeCrudFindSearchdPostAndAutor();
  const post = await postRepo.handler(search);
  if (post === void 0 || post.length === 0)
    return rep.status(404).send("Nenhum valor encontrado");
  return rep.status(200).send({ post });
}

// src/http/controllers/post/routes.ts
async function postRoutes(app2) {
  app2.get("/post/all", findPostAll);
  app2.get("/post/:id_post", findPostId);
  app2.get("/post/search/:search", findSearchPost);
  app2.get("/post_autor/search/:search", findSearchPostAndAutor);
  app2.post("/post/create", createPost);
  app2.post("/post/update/:id_post", updatePost);
  app2.post("/post/remove/:id_post", removePost);
}

// src/utils/global-error-handler.ts
var import_zod6 = require("zod");
var errorHandlerMap = {
  ZodError: (error, _, rep) => {
    return rep.status(400).send({
      message: "Validation erro",
      ...error instanceof import_zod6.ZodError && { erros: error.format() }
    });
  },
  ResourcesNotFoundErrors: (error, _, rep) => {
    return rep.status(400).send(error.message);
  }
};
var globalErrorHandler = (error, _, rep) => {
  const handler = errorHandlerMap[error.constructor.name];
  if (handler) return handler(error, _, rep);
  if (env.NODE_ENV === "development") {
    console.error(error);
  }
  if (error.stack != void 0 && error.stack.includes('insert or update on table "post"') && error.stack.includes("post_id_autor_fkey"))
    return rep.status(400).send({
      Error: "23503",
      message: "Autor n\xE3o encontrado"
    });
  if (error.stack != void 0 && error.stack.includes('update or delete on table "autor"'))
    return rep.status(400).send({
      Error: "23503",
      message: "Existe post(s) atrelado a esse Autor"
    });
  return rep.status(500).send({ message: error.message });
};

// src/app.ts
var app = (0, import_fastify.fastify)();
app.register(postRoutes);
app.register(AutorRoutes);
app.register(AutorTypeormRoutes);
app.register(postTypeormRoutes);
app.setErrorHandler(globalErrorHandler);

// src/server.ts
app.listen({
  host: "0.0.0.0",
  port: env.PORT
}).then(() => console.log(`servidor rodando on http://localhost:${env.PORT}`));
