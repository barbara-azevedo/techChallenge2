import { EducaOnline } from "@/entities/educa.online.entities";
import { database } from "@/lib/db/pg";

export class EducaOnlineRepo {
    public async create({ titulo, post, nomeArquivo, arquivo }: EducaOnline): Promise<EducaOnline | undefined> {

        const result = await database.clientInstance?.query<EducaOnline>(

            `INSERT INTO "educa_online" (titulo, post, dt_criacao, dt_modificacao, nome_arquivo, arquivo) 
                VALUES ($1,$2,$3,$4,$5,$6) RETURNING *`,
            [titulo, post, new Date(), new Date(), nomeArquivo, arquivo]);
                       
        return result?.rows[0]
    }

    public async update({ id, titulo, post, nomeArquivo, arquivo }: EducaOnline): Promise<EducaOnline | undefined> {
        const result = await database.clientInstance?.query<EducaOnline>(
            `UPDATE "educa_online" set titulo=$1, post=$2, dt_modificacao=$3, nome_arquivo=$4, arquivo=$5 
                WHERE "educa_online".id = $6`,
            [titulo, post, new Date(), nomeArquivo, arquivo, id]);

        return result?.rows[0]
    }

    public async findEducaOnlineId(postId: number): Promise<EducaOnline | undefined> {

        const result = await database.clientInstance?.query(
            `SELECT * FROM "educa_online" WHERE "educa_online".id = $1
            `, [postId],
        );
        return result?.rows[0]
    }

}