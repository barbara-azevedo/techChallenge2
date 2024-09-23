import { PostTypeormRepository } from "@/repositories/typeorm/post.repository.typeorm";
import { CreatePostTypeormUseCase } from "../post.user.case.typeorm";

export function MakeCrudCreatePosTypeorm() {
    const repo = new PostTypeormRepository();
    const createPostUseCase = new CreatePostTypeormUseCase(repo);
    return createPostUseCase;
}

