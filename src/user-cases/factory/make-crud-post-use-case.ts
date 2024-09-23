import { PostRepository } from "@/repositories/post.repository";
import {
    CreatePostUseCase, FindAllPostUseCase,
    FindIdPostUseCase, FindSearchPostAndAutorUseCase,
    FindSearchPostUseCase, RemovePostUseCase, UpdatePostUseCase
} from "../post.user.case";

export function MakeCrudCreatePost() {
    const repo = new PostRepository();
    const createPostUseCase = new CreatePostUseCase(repo);

    return createPostUseCase;
}

export function MakeCrudUpdatePost() {
    const repo = new PostRepository();
    const updatePostUseCase = new UpdatePostUseCase(repo);
    return updatePostUseCase;
}

export function MakeCrudRemoverPost() {
    const repo = new PostRepository();
    const removePostUseCase = new RemovePostUseCase(repo);
    return removePostUseCase;
}

export function MakeCrudFindIdPost() {
    const repo = new PostRepository();
    const findIdPostUseCase = new FindIdPostUseCase(repo);
    return findIdPostUseCase;
}

export function MakeCrudFindAlldPost() {
    const repo = new PostRepository();
    const findAllPostUseCase = new FindAllPostUseCase(repo);
    return findAllPostUseCase;
}

export function MakeCrudFindSearchdPost() {
    const repo = new PostRepository();
    const findSearchPostUseCase = new FindSearchPostUseCase(repo);
    return findSearchPostUseCase;
}

export function MakeCrudFindSearchdPostAndAutor() {
    const repo = new PostRepository();
    const findSearchPostAndAutorUseCase = new FindSearchPostAndAutorUseCase(repo);
    return findSearchPostAndAutorUseCase;
}