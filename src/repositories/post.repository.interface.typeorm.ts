import { Autor2 } from "@/entities/autor.entities.typeorm";
import { IPost } from "@/entities/models/post.interface.typeorm";
import { Post2 } from "@/entities/post.entities.typeorm";

export interface IPostTypeormRepository {
    createPostTypeorm(post: IPost): Promise<IPost | undefined>
    update({ id_post, titulo, conteudo, id_autor }: Post2): Promise<Post2 & Autor2 | undefined>
}