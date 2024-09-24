import { FastifyInstance } from "fastify";
import { create } from "./create";
import { siginin } from "./sign";

export async function userRoutes(app:FastifyInstance) {
    app.post('/usuario', create);
    app.post('/usuario/signin', siginin);
}