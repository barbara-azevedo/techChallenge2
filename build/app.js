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

// src/app.ts
var app_exports = {};
__export(app_exports, {
  app: () => app
});
module.exports = __toCommonJS(app_exports);
var import_jwt = require("@fastify/jwt");

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

// src/app.ts
var import_fastify = require("fastify");
var import_reflect_metadata = require("reflect-metadata");

// src/http/middleware/jwt-validate.ts
async function validateJwt(req, rep) {
  try {
    const routeFreList = [
      "POST-/usuario",
      "POST-/usuario/signin",
      "POST-/autor-typeorm/all",
      "POST-/autor-typeorm/:id",
      "POST-/autor-typeorm/search/:nome",
      "POST-/post/all",
      "POST-/post/:id_post",
      "POST-post/search/:search"
    ];
    const validateRoute = `${req.method}-${req.routeOptions.url}`;
    if (routeFreList.includes(validateRoute)) return;
    await req.jwtVerify();
  } catch (error) {
    console.log(error);
    rep.status(401).send({ message: "Uhauthorized" });
  }
}

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

// src/http/controllers/autor/crud.ts
var import_zod2 = require("zod");
async function createAutor(req, rep) {
  const registerBodySchema = import_zod2.z.object({
    nome: import_zod2.z.string()
  });
  const { nome } = registerBodySchema.parse(req.body);
  const createAutorUseCase = MakeCreateAutor();
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
  const updateAutorUseCase = MakeUpdateAutor();
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
  const removeAutorUseCase = MakeRemoverAutor();
  await removeAutorUseCase.handler({ id_autor });
  return rep.code(200).send("success");
}
async function findAllAutor(req, rep) {
  const registerQuerySchema = import_zod2.z.object({
    page: import_zod2.z.coerce.number().default(1),
    limit: import_zod2.z.coerce.number().default(10)
  });
  const { page, limit } = registerQuerySchema.parse(req.query);
  const AutorRepo = MakeFindAlldAutor();
  const autor = await AutorRepo.handler(page, limit);
  return rep.status(200).send({ autor });
}
async function findOneAutor(req, rep) {
  const resgisterParameterSchema = import_zod2.z.object({
    id: import_zod2.z.coerce.number()
  });
  const { id } = resgisterParameterSchema.parse(req.params);
  const AutorRepo = MakeFindIdAutor();
  const autor = await AutorRepo.handler(id);
  return rep.status(200).send({ autor });
}
async function findSearchAutor(req, rep) {
  const resgisterParameterSchema = import_zod2.z.object({
    nome: import_zod2.z.coerce.string()
  });
  const { nome } = resgisterParameterSchema.parse(req.params);
  const AutorRepo = MakeFindSearchdAutor();
  const autor = await AutorRepo.handler(nome);
  if (autor === void 0 || autor.length === 0)
    return rep.status(404).send("Nenhum Autor encontrado");
  return rep.status(200).send({ autor });
}

// src/http/controllers/autor/routes.ts
async function autorRoutes(app2) {
  app2.post("/autor/create", { onRequest: [validateJwt] }, createAutor);
  app2.post("/autor/update/:id_autor", { onRequest: [validateJwt] }, updateAutor);
  app2.post("/autor/remove/:id_autor", { onRequest: [validateJwt] }, removeAutor);
  app2.get("/autor/all", findAllAutor);
  app2.get("/autor/:id", findOneAutor);
  app2.get("/autor/search/:nome", findSearchAutor);
}

// src/repositories/typeorm/post.repository.typeorm.ts
var import_typeorm8 = require("typeorm");
var PostRepository = class {
  constructor() {
    this.repo = appDataBase.getRepository(Post);
  }
  createPost(post) {
    post.dtCriacao = /* @__PURE__ */ new Date();
    post.dtModificacao = /* @__PURE__ */ new Date();
    return this.repo.save(post);
  }
  updatePost(post) {
    return this.repo.save(post);
  }
  async removePost(id) {
    await this.repo.delete(id);
  }
  async findAllPost(page, limit) {
    return this.repo.find({
      skip: (page - 1) * limit,
      take: limit,
      order: {
        dtCriacao: "DESC"
      }
    });
  }
  async findOnePost(id) {
    console.log("passou " + id);
    return this.repo.findOne({
      where: { id_post: id }
    });
  }
  async findSearchPost(search) {
    return this.repo.find({
      where: [
        {
          conteudo: (0, import_typeorm8.Like)(`%${search}%`)
        }
      ]
    });
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
    return this.repo.updatePost(post);
  }
};
var RemovePostUseCase = class {
  constructor(repo) {
    this.repo = repo;
  }
  async handler(id) {
    return this.repo.removePost(id);
  }
};
var FindAllPostUseCase = class {
  constructor(repo) {
    this.repo = repo;
  }
  async handler(page, limit) {
    return this.repo.findAllPost(page, limit);
  }
};
var FindOnePostUseCase = class {
  constructor(repo) {
    this.repo = repo;
  }
  async handler(id) {
    const p = await this.repo.findOnePost(id);
    if (!p) throw new ResourcesNotFoundErrors();
    return p;
  }
};
var FindSearchPostUseCase = class {
  constructor(repo) {
    this.repo = repo;
  }
  async handler(search) {
    return this.repo.findSearchPost(search);
  }
};

// src/user-cases/factory/make-crud-post-use-case copy.ts
function MakeCreatePost() {
  const repo = new PostRepository();
  const createPostUseCase = new CreatePostUseCase(repo);
  return createPostUseCase;
}
function MakeUpdatePost() {
  const repo = new PostRepository();
  const updatePostUseCase = new UpdatePostUseCase(repo);
  return updatePostUseCase;
}
function MakeRemovePost() {
  const repo = new PostRepository();
  const removePostUseCase = new RemovePostUseCase(repo);
  return removePostUseCase;
}
function MakeFindAllPost() {
  const repo = new PostRepository();
  const findAllPostUseCase = new FindAllPostUseCase(repo);
  return findAllPostUseCase;
}
function MakeFindOnePost() {
  const repo = new PostRepository();
  const findOnePostUseCase = new FindOnePostUseCase(repo);
  return findOnePostUseCase;
}
function MakeFindSearchPost() {
  const repo = new PostRepository();
  const findSearchPostUseCase = new FindSearchPostUseCase(repo);
  return findSearchPostUseCase;
}

// src/http/controllers/post/crud.ts
var import_zod3 = require("zod");
async function createPost(req, rep) {
  const registerBodySchema = import_zod3.z.object({
    titulo: import_zod3.z.string(),
    conteudo: import_zod3.z.string(),
    id_autor: import_zod3.z.coerce.number()
  });
  const { titulo, conteudo, id_autor } = registerBodySchema.parse(req.body);
  const createPostUseCase = MakeCreatePost();
  const p = await createPostUseCase.handler({ titulo, conteudo, id_autor });
  return rep.code(201).send(p);
}
async function updatePost(req, rep) {
  const resgisterParameterSchema = import_zod3.z.object({
    id_post: import_zod3.z.coerce.number()
  });
  const { id_post } = resgisterParameterSchema.parse(req.params);
  console.log(id_post);
  const registerBodySchema = import_zod3.z.object({
    titulo: import_zod3.z.string(),
    conteudo: import_zod3.z.string(),
    id_autor: import_zod3.z.coerce.number()
  });
  const { titulo, conteudo, id_autor } = registerBodySchema.parse(req.body);
  if (id_post === void 0 || id_post === 0) {
    return rep.code(400).send("Informe o id do post para altera\xE7\xE3o");
  }
  const updatePostUseCase = MakeUpdatePost();
  const a = await updatePostUseCase.handler({ id_post, titulo, conteudo, id_autor });
  return rep.code(200).send(a);
}
async function removePost(req, rep) {
  const resgisterParameterSchema = import_zod3.z.object({
    id_post: import_zod3.z.coerce.number()
  });
  const { id_post } = resgisterParameterSchema.parse(req.params);
  if (id_post === void 0 || id_post === 0) {
    return rep.code(500).send("Informe o id do post para exclus\xE3o");
  }
  const removePostUseCase = MakeRemovePost();
  const finIdPostUseCase = MakeFindOnePost();
  const post = await finIdPostUseCase.handler(id_post);
  if (post?.id_post === void 0)
    return rep.status(404).send("Objeto n\xE3o encontrado");
  removePostUseCase.handler(id_post);
  return rep.code(200).send("success");
}
async function findAllPost(req, rep) {
  const registerQuerySchema = import_zod3.z.object({
    page: import_zod3.z.coerce.number().default(1),
    limit: import_zod3.z.coerce.number().default(10)
  });
  const { page, limit } = registerQuerySchema.parse(req.query);
  const postRepo = MakeFindAllPost();
  const post = await postRepo.handler(page, limit);
  return rep.status(200).send({ post });
}
async function findOnePost(req, rep) {
  const resgisterParameterSchema = import_zod3.z.object({
    id_post: import_zod3.z.coerce.number()
  });
  const { id_post } = resgisterParameterSchema.parse(req.params);
  const postRepo = MakeFindOnePost();
  const post = await postRepo.handler(id_post);
  return rep.status(200).send({ post });
}
async function findSearchPost(req, rep) {
  const resgisterParameterSchema = import_zod3.z.object({
    search: import_zod3.z.coerce.string()
  });
  const { search } = resgisterParameterSchema.parse(req.params);
  const postRepo = MakeFindSearchPost();
  const post = await postRepo.handler(search);
  if (post === void 0 || post.length === 0)
    return rep.status(404).send("Nenhum valor encontrado");
  return rep.status(200).send({ post });
}

// src/http/controllers/post/routes.ts
async function postRoutes(app2) {
  app2.get("/post/all", findAllPost);
  app2.get("/post/:id_post", findOnePost);
  app2.get("/post/search/:search", findSearchPost);
  app2.post("/post/create", { onRequest: [validateJwt] }, createPost);
  app2.post("/post/update/:id_post", { onRequest: [validateJwt] }, updatePost);
  app2.post("/post/remove/:id_post", { onRequest: [validateJwt] }, removePost);
}

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

// src/user-cases/factory/make-crud-usuario-use-case.ts
function MakeCreateUsuarioUseCase() {
  const repo = new UsuarioRepository();
  const createUsuarioUseCase = new CreateUsuarioUseCase(repo);
  return createUsuarioUseCase;
}

// src/http/controllers/user/create.ts
var import_bcryptjs = require("bcryptjs");
var import_zod4 = require("zod");
async function create(req, rep) {
  const registerBodySchema = import_zod4.z.object({
    email: import_zod4.z.string().email({ message: "Email is required" }),
    senha: import_zod4.z.string()
  });
  const { email, senha } = registerBodySchema.parse(req.body);
  const hashedPassword = await (0, import_bcryptjs.hash)(senha, 8);
  const userWithHashPassword = { email, senha: hashedPassword };
  const createUsuarioUseCase = MakeCreateUsuarioUseCase();
  const user = await createUsuarioUseCase.handler(userWithHashPassword);
  return rep.code(201).send({ username: user?.email });
}

// src/user-cases/erros/invalid-creadential-error.ts
var InvalidCrendtialsError = class extends Error {
  constructor() {
    super("username or password incorrect");
  }
};

// src/user-cases/sign-use-case.ts
var SigninUseCase = class {
  constructor(repo) {
    this.repo = repo;
  }
  async handler(email) {
    const user = await this.repo.findByUsername(email);
    if (!user)
      throw new InvalidCrendtialsError();
    return user;
  }
};

// src/user-cases/factory/make-sign-use-case.ts
function MakeSignUserCase() {
  const repo = new UsuarioRepository();
  const findOneUsuarioUseCase = new SigninUseCase(repo);
  return findOneUsuarioUseCase;
}

// src/http/controllers/user/sign.ts
var import_bcryptjs2 = require("bcryptjs");
var import_zod5 = require("zod");
async function siginin(req, rep) {
  const registerBodySchema = import_zod5.z.object({
    email: import_zod5.z.string(),
    senha: import_zod5.z.string()
  });
  const { email, senha } = registerBodySchema.parse(req.body);
  const signinUseCase = MakeSignUserCase();
  const user = await signinUseCase.handler(email);
  const doesPasswordMath = await (0, import_bcryptjs2.compare)(senha, user.senha);
  if (!doesPasswordMath)
    throw new InvalidCrendtialsError();
  const token = await rep.jwtSign({ email });
  return rep.status(200).send({ token });
}

// src/http/controllers/user/routes.ts
async function userRoutes(app2) {
  app2.post("/usuario", create);
  app2.post("/usuario/signin", siginin);
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
  },
  InvalidCrendtialsError: (error, _, rep) => {
    return rep.status(401).send({ message: error.message });
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
app.register(import_jwt.fastifyJwt, {
  secret: env.SECRET_JWT,
  sign: { expiresIn: "5m" }
});
app.register(postRoutes);
app.register(autorRoutes);
app.register(userRoutes);
app.setErrorHandler(globalErrorHandler);
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  app
});
