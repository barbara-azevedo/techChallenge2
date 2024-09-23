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

// src/user-cases/post.user.case.typeorm.ts
var post_user_case_typeorm_exports = {};
__export(post_user_case_typeorm_exports, {
  CreatePostTypeormUseCase: () => CreatePostTypeormUseCase
});
module.exports = __toCommonJS(post_user_case_typeorm_exports);

// src/user-cases/erros/resource-not-found-erros.ts
var ResourcesNotFoundErrors = class extends Error {
  constructor() {
    super("Resource not found");
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
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  CreatePostTypeormUseCase
});
