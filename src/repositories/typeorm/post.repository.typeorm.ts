import { IAutor } from "@/entities/models/autor.interface";
import { IPost } from "@/entities/models/post.interface";
import { Post } from "@/entities/post.entities";
import { appDataBase } from "@/lib/typeorm/typeorm";
import { Like, Repository } from "typeorm";
import { IPostRepository } from "../post.repository.interface";


export class PostRepository implements IPostRepository {
    private repo: Repository<IPost>
    constructor() {
        this.repo = appDataBase.getRepository(Post);
    }

    createPost(post: IPost): Promise<IPost | undefined> {
        post.dtCriacao = new Date();
        post.dtModificacao = new Date();
        return this.repo.save(post);
    }

    updatePost(post: IPost): Promise<(IPost) | undefined> {
        post.dtModificacao = new Date();
        return this.repo.save(post);
    }

    async removePost(id: number): Promise<void> {
        await this.repo.delete(id);
    }

    async findAllPost(page: number, limit: number): Promise<(IPost[] & IAutor) | undefined> {
          return this.repo.find({
            skip: (page - 1) * limit,
            take: limit,
            order: {
                dtCriacao: "DESC",
            }
        });
    }

    async findOnePost(id: number): Promise<(IPost) | null> {
        return this.repo.findOne({
            where: { id_post: id }
        })
    }

    async findSearchPost(search: string): Promise<(IPost[]) | undefined> {
        return this.repo.find({
            where: [
                {
                    conteudo: Like(`%${search}%`)
                },
            ],
        });
    }

}