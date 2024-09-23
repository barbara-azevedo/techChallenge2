import { Autor } from "@/entities/autor.entities";
import { Post } from "@/entities/post.entities";
import { database } from "@/lib/db/pg";
import { IPostRepository } from "./post.interface";

export class PostRepository implements IPostRepository {

    public async createPost({ titulo, conteudo, id_autor }: Post): Promise<Post & Autor | undefined> {
        const result = await database.clientInstance?.query<Post>(
            `INSERT INTO "post" (titulo, conteudo, dt_criacao, dt_modificacao, id_autor) 
                VALUES ($1,$2,$3,$4,$5) RETURNING *`,
            [titulo, conteudo, new Date(), new Date(), id_autor]);
        return result?.rows[0]
    }

    public async update({ id_post, titulo, conteudo, id_autor }: Post): Promise<Post & Autor | undefined> {
        const result = await database.clientInstance?.query<Post>(
            `UPDATE "post" set titulo=$1, conteudo=$2, dt_modificacao=$3, id_autor=$4 
                    WHERE "post".id_post = $5`,
            [titulo, conteudo, new Date(), id_autor, id_post]);
        return result?.rows[0]
    }

    public async remove(id_post: number): Promise<Post | undefined> {
        const result = await database.clientInstance?.query<Post>(
            `DELETE FROM "post" WHERE "post".id_post = $1`, [id_post]);
        return result?.rows[0]
    }

    //------------------------------FINDs

    public async findPostAll(): Promise<Post[] | undefined> {
        const result = await database.clientInstance?.query(
            `SELECT * FROM "post" 
                INNER JOIN "autor" ON "post".id_autor = "autor".id_autor 
                ORDER BY "post".dt_criacao DESC`,
        );
        return result?.rows
    }

    public async findPostId(postId: number): Promise<Post & Autor | undefined> {
        const result = await database.clientInstance?.query(
            `SELECT * FROM "post" LEFT JOIN "autor" ON "post".id_autor = "autor".id_autor 
                WHERE "post".id_post = $1`, [postId],
        );
        return result?.rows[0]
    }

    public async findPostSearch(search: string): Promise<Post[] & Autor | undefined> {
        const result = await database.clientInstance?.query(
            `SELECT * FROM "post" LEFT JOIN "autor" ON "post".id_autor = "autor".id_autor 
                WHERE "post".conteudo like '%'||$1||'%' ORDER BY "post".dt_criacao DESC`, [search],
        );
        return result?.rows
    }

    public async findPostAndAutorSearch(search: string): Promise<(Post[] & Autor) | undefined> {
        const result = await database.clientInstance?.query(
            `SELECT * FROM "post" INNER JOIN "autor" ON "post".id_autor = "autor".id_autor
                WHERE "autor".nome like '%'||$1||'%' 
                ORDER BY "post".dt_criacao DESC`, [search],
        );
        return result?.rows
    }

}