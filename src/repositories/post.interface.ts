import { Post } from "@/entities/post.entities";

export interface IUPostRepository {
    update({ id, autor, titulo, conteudo }: Post): Promise<Post | undefined>
    createPost({ titulo, conteudo, autor }: Post): Promise<Post | undefined>
    remove(id : number): Promise<Post | undefined>
    findPostAll(): Promise<Post[] | undefined>
    findPostId(postId: number): Promise<Post | undefined>;
    findPostSearch(search: string): Promise<Post[] | undefined>;
}