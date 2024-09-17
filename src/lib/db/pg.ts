import { env } from 'env';
import { Pool, PoolClient } from 'pg';

const CONFIG = {
    user: env.DATABASE_USER,
    host: env.DATABASE_HOST,
    database: env.DATABASE_NAME,
    password: env.DATABASE_PASSWORD,
    port: env.DATABASE_PORT
}

class db {

    private pool: Pool;
    private client: PoolClient | undefined;

    constructor() {
        this.pool = new Pool(CONFIG)
        this.connection()
    }

    private async connection() {
        try {
            this.client = await this.pool.connect();
        } catch (error) {
            console.log(`Error connection database: ${error} `);
            throw new Error(`Error connection database: ${error} `);
        }
    }
    
    get clientInstance() {
        return this.client;
    }
}

export const database = new db();