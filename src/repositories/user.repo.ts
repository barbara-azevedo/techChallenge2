
import { Person } from "@/entities/person.entities";
import { Usuario } from "@/entities/usuario.entities";
import { database } from "@/lib/db/pg";

export class UsuarioRepo {
    public async create({ username, password }: Usuario): Promise<Usuario | undefined> {
        const result = await database.clientInstance?.query<Usuario>(
            `INSERT INTO "usuario" (username,password) VALUES ($1,$2) RETURNING *`,
            [username, password]);

        return result?.rows[0]
    }

    public async findWithPerson(userId: number): Promise<Usuario & Person | undefined> {

        const result = await database.clientInstance?.query(
            `SELECT * FROM "usuario" LEFT JOIN person ON "usuario".id = person.usuario_id WHERE "usuario".id = $1
            `, [userId],
        );
        return result?.rows[0]
    }
}