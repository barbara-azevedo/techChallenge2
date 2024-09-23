import { FastifyInstance } from "fastify";
import { createPostTypeorm } from "./crud";

export async function postTypeormRoutes(app: FastifyInstance) {
    app.post('/post-typeorm/create', createPostTypeorm);
}