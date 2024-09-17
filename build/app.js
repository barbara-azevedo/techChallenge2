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
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  app
});
