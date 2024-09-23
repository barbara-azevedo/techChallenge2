import { Post } from "@/entities/post.entities";
import { IPostRepository } from "@/repositories/post.interface";
import { ResourcesNotFoundErrors } from "./erros/resource-not-found-erros";

export class CreatePostUseCase {
    constructor(private repo: IPostRepository) { }
    async handler(post: Post): Promise<Post | undefined> {

        const p = await this.repo.createPost(post);
        if (!p)
            throw new ResourcesNotFoundErrors();
        return p;
    }
}

export class UpdatePostUseCase {
    constructor(private repo: IPostRepository) { }
    async handler(post: Post): Promise<Post | undefined> {
        return this.repo.update(post);
    }
}

export class RemovePostUseCase {
    constructor(private repo: IPostRepository) { }
    async handler(id: number): Promise<Post | undefined> {
        return this.repo.remove(id);
    }
}

export class FindAllPostUseCase {
    constructor(private repo: IPostRepository) { }
    async handler(): Promise<Post[] | undefined> {
        return this.repo.findPostAll();
    }
}

export class FindIdPostUseCase {
    constructor(private repo: IPostRepository) { }
    async handler(id: number): Promise<Post | undefined> {
        const p = await this.repo.findPostId(id);
        if (!p) throw new ResourcesNotFoundErrors();
        return p;
    }
}

export class FindSearchPostUseCase {
    constructor(private repo: IPostRepository) { }
    async handler(search: string): Promise<Post[] | undefined> {
        return this.repo.findPostSearch(search);
    }
}

export class FindSearchPostAndAutorUseCase {
    constructor(private repo: IPostRepository) { }
    async handler(search: string): Promise<Post[] | undefined> {
        return this.repo.findPostAndAutorSearch(search);
    }
}