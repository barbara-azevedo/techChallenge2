import { DataSource } from "typeorm";

import { Autor } from "@/entities/autor.entities";
import { Post } from "@/entities/post.entities";
import { Usuario } from "@/entities/usuario.entities";
import { env } from "env";

export const appDataBase = new DataSource({
    type: 'postgres',
    host: env.DATABASE_HOST,
    port: env.DATABASE_PORT,
    username: env.DATABASE_USER,
    password: env.DATABASE_PASSWORD,
    database: env.DATABASE_NAME,
    entities: [Autor, Post, Usuario],
    logging: env.NODE_ENV === 'development',
});

appDataBase.initialize().then(() => {
    console.log('Database connected typeorm');
}).catch((error) => {
    console.error(`Erro connected typeorm: ${error}`);

})