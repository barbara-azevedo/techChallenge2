import { IAutor } from "@/entities/models/autor.interface";
import { IPost } from "@/entities/models/post.interface";

export interface IPostRepository {
    createPost(post: IPost): Promise<IPost | undefined>
    updatePost({ id_post, titulo, conteudo, id_autor }: IPost): Promise<IPost | undefined>
    removePost(id : number): Promise<void>

    findAllPost(page: number, limit: number): Promise<IPost[] & IAutor | undefined>
    findOnePost(id: number): Promise<IPost | null>;
    findSearchPost(search: string): Promise<IPost[] | undefined>;
}