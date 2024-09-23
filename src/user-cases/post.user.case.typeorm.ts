import { Post2 } from "@/entities/post.entities.typeorm";
import { IPostTypeormRepository } from "@/repositories/post.repository.interface.typeorm";
import { ResourcesNotFoundErrors } from "./erros/resource-not-found-erros";

export class CreatePostTypeormUseCase {
    constructor(private repo: IPostTypeormRepository) { }
    async handler(post: Post2): Promise<Post2 | undefined> {
        const p = await this.repo.createPostTypeorm(post);
        if (!p)
            throw new ResourcesNotFoundErrors();
        return p;
    }
}
