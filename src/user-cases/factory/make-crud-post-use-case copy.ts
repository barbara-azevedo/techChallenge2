import { PostRepository } from "@/repositories/typeorm/post.repository.typeorm";
import {
    CreatePostUseCase,
    FindAllPostUseCase,
    FindOnePostUseCase,
    FindSearchPostUseCase,
    RemovePostUseCase,
    UpdatePostUseCase
} from "../post.user.case";

export function MakeCreatePost() {
    const repo = new PostRepository();
    const createPostUseCase = new CreatePostUseCase(repo);
    return createPostUseCase;
}

export function MakeUpdatePost() {
    const repo = new PostRepository();
    const updatePostUseCase = new UpdatePostUseCase(repo);
    return updatePostUseCase;
}

export function MakeRemovePost() {
    const repo = new PostRepository();
    const removePostUseCase = new RemovePostUseCase(repo);
    return removePostUseCase;
}

export function MakeFindAllPost() {
    const repo = new PostRepository();
    const findAllPostUseCase = new FindAllPostUseCase(repo);
    return findAllPostUseCase;
}

export function MakeFindOnePost() {
    const repo = new PostRepository();
    const findOnePostUseCase = new FindOnePostUseCase(repo);
    return findOnePostUseCase;
}

export function MakeFindSearchPost() {
    const repo = new PostRepository();
    const findSearchPostUseCase = new FindSearchPostUseCase(repo);
    return findSearchPostUseCase;
}