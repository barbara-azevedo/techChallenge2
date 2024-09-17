import { FastifyInstance } from "fastify";
import { create } from "./create";
import { findUser } from "./find";

export async function userRoutes(app:FastifyInstance) {
    app.get('/usuario/:id', findUser);
    app.post('/usuario', create);
}