import { Autor } from "@/entities/autor.entities";
import { database } from "@/lib/db/pg";
import { IAutorRepository } from "./autor.interface";

export class AutorRepository implements IAutorRepository {

    public async update({ id_autor, nome }: Autor): Promise<Autor | undefined> {
        const result = await database.clientInstance?.query<Autor>(
            `UPDATE "autor" set nome=$1, dt_modificacao=$2 WHERE "autor".id_autor = $3`,
            [nome, new Date(), id_autor]);
        return result?.rows[0]
    }

    public async createAutor({ nome }: Autor): Promise<Autor | undefined> {
        const result = await database.clientInstance?.query<Autor>(
            `INSERT INTO "autor" (nome, dt_criacao, dt_modificacao) 
                VALUES ($1,$2,$3) RETURNING *`,
            [nome, new Date(), new Date()]);
        return result?.rows[0]
    }

    public async remove(id: number): Promise<Autor | undefined> {
        const result = await database.clientInstance?.query<Autor>(
            `DELETE FROM "autor" WHERE "autor".id_autor = $1`, [id]);
        return result?.rows[0]
    }

    //----------------------------------FINDs

    public async findAllAutor(): Promise<Autor[] | undefined> {
        const result = await database.clientInstance?.query(
            `SELECT * FROM "autor" ORDER BY "autor".id_autor`, [],
        );
        return result?.rows
    }

    public async findAutorId(autorId: number): Promise<Autor | undefined> {
        const result = await database.clientInstance?.query(
            `SELECT * FROM "autor" WHERE "autor".id_autor = $1`, [autorId],
        );
        return result?.rows[0]
    }

    public async findAutorSearchNome(search: string): Promise<Autor[] | undefined> {
        const result = await database.clientInstance?.query(
            `SELECT * FROM "autor" WHERE "autor".nome like '%'||$1||'%'`, [search],
        );
        return result?.rows
    }

}