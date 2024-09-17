import { Post } from "@/entities/post.entities";
import { PostRepository } from "@/repositories/post.repository";

export class CreatePostUseCase {
    constructor(private repo: PostRepository) { }
    async handler(post: Post): Promise<Post | undefined> {
        return this.repo.createPost(post);
    }
}

export class UpdatePostUseCase {
    constructor(private repo: PostRepository) { }
    async handler(post: Post): Promise<Post | undefined> {
        return this.repo.update(post);
    }
}

export class RemovePostUseCase {
    constructor(private repo: PostRepository) { }
    async handler(id: number): Promise<Post | undefined> {
        return this.repo.remove(id);
    }
}

export class FindAllPostUseCase {
    constructor(private repo: PostRepository) { }
    async handler(): Promise<Post[] | undefined> {
        return this.repo.findPostAll();
    }
}

export class FindIdPostUseCase {
    constructor(private repo: PostRepository) { }
    async handler(id: number): Promise<Post | undefined> {
        return this.repo.findPostId(id);
    }
}

export class FindSearchPostUseCase {
    constructor(private repo: PostRepository) { }
    async handler(search: string): Promise<Post[] | undefined> {
        return this.repo.findPostSearch(search);
    }
}