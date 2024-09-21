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

// src/app.ts
var app_exports = {};
__export(app_exports, {
  app: () => app
});
module.exports = __toCommonJS(app_exports);

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
async function personRoutes(app2) {
  app2.post("/person", create);
}

// src/app.ts
var import_fastify = require("fastify");

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

// src/user-cases/post.user.case.ts
var CreatePostUseCase = class {
  constructor(repo) {
    this.repo = repo;
  }
  async handler(post) {
    return this.repo.createPost(post);
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
var FindIdPostUseCase = class {
  constructor(repo) {
    this.repo = repo;
  }
  async handler(id) {
    return this.repo.findPostId(id);
  }
};

// src/http/controllers/post/crud.ts
var import_zod3 = require("zod");
async function createPost(req, rep) {
  const registerBodySchema = import_zod3.z.object({
    titulo: import_zod3.z.string(),
    conteudo: import_zod3.z.string(),
    autor: import_zod3.z.string()
  });
  const { titulo, conteudo, autor } = registerBodySchema.parse(req.body);
  try {
    const postRepo = new PostRepository();
    const createPostUseCase = new CreatePostUseCase(postRepo);
    const p = await createPostUseCase.handler({ titulo, conteudo, autor });
    return rep.code(201).send(p);
  } catch (error) {
    console.error(error);
    throw new Error("Internal server error");
  }
}
async function updatePost(req, rep) {
  const resgisterParameterSchema = import_zod3.z.object({
    id: import_zod3.z.coerce.number()
  });
  const { id } = resgisterParameterSchema.parse(req.params);
  const registerBodySchema = import_zod3.z.object({
    autor: import_zod3.z.string(),
    titulo: import_zod3.z.string(),
    conteudo: import_zod3.z.string()
  });
  const { autor, titulo, conteudo } = registerBodySchema.parse(req.body);
  if (id === void 0 || id === 0) {
    return rep.code(500).send("Id null");
  }
  try {
    const postRepo = new PostRepository();
    const updatePostUseCase = new UpdatePostUseCase(postRepo);
    updatePostUseCase.handler({ id, autor, titulo, conteudo });
    return rep.code(200).send("success");
  } catch (error) {
    console.error(error);
    throw new Error("Internal server error");
  }
}
async function removePost(req, rep) {
  const resgisterParameterSchema = import_zod3.z.object({
    id: import_zod3.z.coerce.number()
  });
  const { id } = resgisterParameterSchema.parse(req.params);
  if (id === void 0 || id === 0) {
    return rep.code(500).send("Id null");
  }
  try {
    const postRepo = new PostRepository();
    const removePostUseCase = new RemovePostUseCase(postRepo);
    const finIdPostUseCase = new FindIdPostUseCase(postRepo);
    const post = await finIdPostUseCase.handler(id);
    if (post?.id === void 0)
      return rep.status(404).send("Objeto n\xE3o encontrado");
    removePostUseCase.handler(id);
    return rep.code(200).send("success");
  } catch (error) {
    console.error(error);
    throw new Error("Internal server error");
  }
}

// src/http/controllers/post/find.ts
var import_zod4 = require("zod");
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
  const resgisterParameterSchema = import_zod4.z.object({
    id: import_zod4.z.coerce.number()
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
  const resgisterParameterSchema = import_zod4.z.object({
    search: import_zod4.z.coerce.string()
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

// src/http/controllers/post/routes.ts
async function postRoutes(app2) {
  app2.get("/post/all", findPostAll);
  app2.get("/post/:id", findPostId);
  app2.get("/post/search/:search", findSearchPost);
  app2.post("/post/create", createPost);
  app2.post("/post/update/:id", updatePost);
  app2.post("/post/remove/:id", removePost);
}

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

// src/user-cases/create-user.ts
var CreateUsuarioUseCase = class {
  constructor(repo) {
    this.repo = repo;
  }
  async handler(user) {
    return this.repo.create(user);
  }
};

// src/http/controllers/user/create.ts
var import_zod5 = require("zod");
async function create2(req, rep) {
  const registerBodySchema = import_zod5.z.object({
    username: import_zod5.z.string(),
    password: import_zod5.z.string()
  });
  const { username, password } = registerBodySchema.parse(req.body);
  try {
    const userRepo = new UsuarioRepo();
    const createUsuarioUseCase = new CreateUsuarioUseCase(userRepo);
    const user = await createUsuarioUseCase.handler({ username, password });
    return rep.code(201).send(user);
  } catch (error) {
    console.error(error);
    throw new Error("Internal server error");
  }
}

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
var import_zod6 = require("zod");
async function findUser(req, rep) {
  const resgisterParameterSchema = import_zod6.z.object({
    id: import_zod6.z.coerce.number()
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

// src/http/controllers/user/routes.ts
async function userRoutes(app2) {
  app2.get("/usuario/:id", findUser);
  app2.post("/usuario", create2);
}

// src/app.ts
var app = (0, import_fastify.fastify)();
app.register(personRoutes);
app.register(userRoutes);
app.register(postRoutes);
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  app
});
