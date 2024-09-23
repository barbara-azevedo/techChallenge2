import { Autor2 } from "@/entities/autor.entities.typeorm";
import { IAutor } from "@/entities/models/autor.interface.typeorm";
import { IPost } from "@/entities/models/post.interface.typeorm";
import { Post2 } from "@/entities/post.entities.typeorm";
import { appDataBase } from "@/lib/typeorm/typeorm";
import { Repository } from "typeorm";
import { IPostTypeormRepository } from "../post.repository.interface.typeorm";

export class PostTypeormRepository implements IPostTypeormRepository {
    private repo: Repository<Post2>
    constructor() {
        this.repo = appDataBase.getRepository(Post2);
    }
   
    createPostTypeorm(post: IPost): Promise<IPost & IAutor | undefined> {
        post.dtCriacao = new Date();
        post.dtModificacao = new Date();
        return this.repo.save(post);
    }

    update(post: Post2): Promise<(Post2 & Autor2) | undefined> {
        return this.repo.save(post);
    }
}