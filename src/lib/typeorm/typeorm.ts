import { DataSource } from "typeorm";

import { Autor2 } from "@/entities/autor.entities.typeorm";
import { Post2 } from "@/entities/post.entities.typeorm";
import { env } from "env";

export const appDataBase = new DataSource({
    type: 'postgres',
    host: env.DATABASE_HOST,
    port: env.DATABASE_PORT,
    username: env.DATABASE_USER,
    password: env.DATABASE_PASSWORD,
    database: env.DATABASE_NAME,
    entities: [Autor2, Post2],
    logging: env.NODE_ENV === 'development',
});

appDataBase.initialize().then(() => {
    console.log('Database connected typeorm');
}).catch((error) => {
    console.error(`Erro connected typeorm: ${error}`);

})