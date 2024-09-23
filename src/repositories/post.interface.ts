import { Autor } from "@/entities/autor.entities";
import { Post } from "@/entities/post.entities";

export interface IPostRepository {
    update({ id_post, titulo, conteudo, id_autor }: Post): Promise<Post & Autor | undefined>
    createPost({ titulo, conteudo, id_autor }: Post): Promise<Post & Autor | undefined>
    remove(id : number): Promise<Post | undefined>
    findPostAll(): Promise<Post[] & Autor | undefined>
    findPostId(postId: number): Promise<Post & Autor | undefined>;
    findPostSearch(search: string): Promise<Post[] & Autor | undefined>;
    findPostAndAutorSearch(search: string): Promise<Post[] & Autor | undefined>;
}