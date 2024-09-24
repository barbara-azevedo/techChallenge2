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

// src/user-cases/post.user.case.ts
var post_user_case_exports = {};
__export(post_user_case_exports, {
  CreatePostUseCase: () => CreatePostUseCase,
  FindAllPostUseCase: () => FindAllPostUseCase,
  FindOnePostUseCase: () => FindOnePostUseCase,
  FindSearchPostUseCase: () => FindSearchPostUseCase,
  RemovePostUseCase: () => RemovePostUseCase,
  UpdatePostUseCase: () => UpdatePostUseCase
});
module.exports = __toCommonJS(post_user_case_exports);

// src/user-cases/erros/resource-not-found-erros.ts
var ResourcesNotFoundErrors = class extends Error {
  constructor() {
    super("Resource not found");
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
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  CreatePostUseCase,
  FindAllPostUseCase,
  FindOnePostUseCase,
  FindSearchPostUseCase,
  RemovePostUseCase,
  UpdatePostUseCase
});
