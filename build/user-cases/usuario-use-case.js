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

// src/user-cases/usuario-use-case.ts
var usuario_use_case_exports = {};
__export(usuario_use_case_exports, {
  CreateUsuarioUseCase: () => CreateUsuarioUseCase,
  FindOneUsuarioUseCase: () => FindOneUsuarioUseCase
});
module.exports = __toCommonJS(usuario_use_case_exports);
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
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  CreateUsuarioUseCase,
  FindOneUsuarioUseCase
});
