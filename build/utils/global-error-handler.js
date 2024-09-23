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

// src/utils/global-error-handler.ts
var global_error_handler_exports = {};
__export(global_error_handler_exports, {
  errorHandlerMap: () => errorHandlerMap,
  globalErrorHandler: () => globalErrorHandler
});
module.exports = __toCommonJS(global_error_handler_exports);

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

// src/utils/global-error-handler.ts
var import_zod2 = require("zod");
var errorHandlerMap = {
  ZodError: (error, _, rep) => {
    return rep.status(400).send({
      message: "Validation erro",
      ...error instanceof import_zod2.ZodError && { erros: error.format() }
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
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  errorHandlerMap,
  globalErrorHandler
});
