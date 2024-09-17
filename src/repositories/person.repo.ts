import { Person } from "@/entities/person.entities";
import { database } from "@/lib/db/pg";

export class PersonRepo {
    public async create({
        cpf,
        name,
        bith,
        email,
        usuario_id,
    }: Person): Promise<Person | undefined> {
        const result = await database.clientInstance?.query<Person>(
            `
            INSERT INTO "person" (cpf, name, bith, email, usuario_id) 
            VALUES 
            ($1,$2,$3,$4,$5) RETURNING *`,
            [
                cpf,
                name,
                bith,
                email,
                usuario_id
            ]);

        return result?.rows[0]
    }

    public async findWithPerson(userId: number) {
        const result = await database.clientInstance?.query(
            `
            SELECT * FORM usuario
            LEFT JOIN person ON usuario.id = person.usuario_id
            WHERE usuario.id = $1
            `, [userId]
        );
        return result?.rows[0]
    }
}