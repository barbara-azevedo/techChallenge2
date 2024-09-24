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

// src/http/middleware/jwt-validate.ts
var jwt_validate_exports = {};
__export(jwt_validate_exports, {
  validateJwt: () => validateJwt
});
module.exports = __toCommonJS(jwt_validate_exports);
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
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  validateJwt
});
