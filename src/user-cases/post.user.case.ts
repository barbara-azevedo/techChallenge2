import { IPost } from "@/entities/models/post.interface";
import { IPostRepository } from "@/repositories/post.repository.interface";
import { ResourcesNotFoundErrors } from "./erros/resource-not-found-erros";

export class CreatePostUseCase {
    constructor(private repo: IPostRepository) { }
    async handler(post: IPost): Promise<IPost | undefined> {
        const p = await this.repo.createPost(post);
        if (!p)
            throw new ResourcesNotFoundErrors();
        return p;
    }
}
export class UpdatePostUseCase {
    constructor(private repo: IPostRepository) { }
    async handler(post: IPost): Promise<IPost | undefined> {
        return this.repo.updatePost(post);
    }
}

export class RemovePostUseCase {
    constructor(private repo: IPostRepository) { }
    async handler(id: number): Promise<void> {
        return this.repo.removePost(id);
    }
}

export class FindAllPostUseCase {
    constructor(private repo: IPostRepository) { }
    async handler(page: number, limit: number): Promise<IPost[] | undefined> {
        return this.repo.findAllPost(page, limit);
    }
}

export class FindOnePostUseCase {
    constructor(private repo: IPostRepository) { }
    async handler(id: number): Promise<IPost | undefined> {
        const p = await this.repo.findOnePost(id);
        if (!p) throw new ResourcesNotFoundErrors();
        return p;
    }
}

export class FindSearchPostUseCase {
    constructor(private repo: IPostRepository) { }
    async handler(search: string): Promise<IPost[] | undefined> {
        return this.repo.findSearchPost(search);
    }
}