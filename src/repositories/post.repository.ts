import { Post } from "@/entities/post.entities";
import { database } from "@/lib/db/pg";
import { IPostRepository } from "./post.interface";

export class PostRepository implements IPostRepository {

    public async update({ id, autor, titulo, conteudo }: Post): Promise<Post | undefined> {
        const result = await database.clientInstance?.query<Post>(
            `UPDATE "post" set autor=$1, titulo=$2, conteudo=$3, dt_modificacao=$4 
                WHERE "post".id = $5`,
            [autor, titulo, conteudo, new Date(), id]);
        return result?.rows[0]
    }

    public async createPost({ titulo, conteudo, autor }: Post): Promise<Post | undefined> {
        const result = await database.clientInstance?.query<Post>(
            `INSERT INTO "post" (titulo, conteudo, autor, dt_criacao, dt_modificacao) 
                VALUES ($1,$2,$3,$4,$5) RETURNING *`,
            [titulo, conteudo, autor, new Date(), new Date()]);
        return result?.rows[0]
    }

    public async remove(id: number): Promise<Post | undefined> {
        const result = await database.clientInstance?.query<Post>(
            `DELETE FROM "post" WHERE "post".id = $1`, [id]);
        return result?.rows[0]
    }

    public async findPostAll(): Promise<Post[] | undefined> {
        const result = await database.clientInstance?.query(
            `SELECT * FROM "post"`, [],
        );
        return result?.rows
    }

    public async findPostId(postId: number): Promise<Post | undefined> {
        const result = await database.clientInstance?.query(
            `SELECT * FROM "post" WHERE "post".id = $1`, [postId],
        );
        return result?.rows[0]
    }

    public async findPostSearch(search: string): Promise<Post[] | undefined> {
        const result = await database.clientInstance?.query(
            `SELECT * FROM "post" WHERE "post".conteudo like '%'||$1||'%'`, [search],
        );
        return result?.rows
    }

}