"use strict";

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
var import_zod = require("zod");
async function create(req, rep) {
  const registerBodySchema = import_zod.z.object({
    cpf: import_zod.z.string(),
    name: import_zod.z.string(),
    bith: import_zod.z.date(),
    email: import_zod.z.string().email()
  });
  const { cpf, name, bith, email } = registerBodySchema.parse(req.body);
  try {
    const personRepo = new (void 0)();
    const createPersonUseCase = new CreatePersonUseCase(personRepo);
    await createPersonUseCase.handler({ cpf, name, bith, email });
    return rep.code(201).send();
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
var app = (0, import_fastify.fastify)();
app.register(personRoutes);

// env/index.ts
var import_config = require("dotenv/config");
var import_zod2 = require("zod");
var envSchema = import_zod2.z.object({
  NODE_ENV: import_zod2.z.enum(["development", "production", "test"]).default("development"),
  PORT: import_zod2.z.coerce.number().default(3e3)
});
var _env = envSchema.safeParse(process.env);
if (!_env.success) {
  console.log("Invalid enviroment variables", _env.error.format());
  throw new Error("Invalid enviroment variables");
}
var env = _env.data;

// src/server.ts
app.listen({
  host: "0.0.0.0",
  port: env.PORT
}).then(() => console.log("servidor rodando on http://localhost:3000"));
