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

// src/user-cases/autor.user.case.typeorm.ts
var autor_user_case_typeorm_exports = {};
__export(autor_user_case_typeorm_exports, {
  CreateAutorUseCase: () => CreateAutorUseCase,
  FindAllAutorUseCase: () => FindAllAutorUseCase,
  FindOneAutorUseCase: () => FindOneAutorUseCase,
  FindSearchAutorUseCase: () => FindSearchAutorUseCase,
  RemoveAutorUseCase: () => RemoveAutorUseCase,
  UpdateAutorUseCase: () => UpdateAutorUseCase
});
module.exports = __toCommonJS(autor_user_case_typeorm_exports);

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
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  CreateAutorUseCase,
  FindAllAutorUseCase,
  FindOneAutorUseCase,
  FindSearchAutorUseCase,
  RemoveAutorUseCase,
  UpdateAutorUseCase
});
