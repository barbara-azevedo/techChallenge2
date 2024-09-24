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

// src/entities/autor.entities.ts
var autor_entities_exports = {};
__export(autor_entities_exports, {
  Autor: () => Autor
});
module.exports = __toCommonJS(autor_entities_exports);
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
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  Autor
});
