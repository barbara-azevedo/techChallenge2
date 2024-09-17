import { FastifyInstance } from "fastify";
import { create, update } from "./crud";
import { findId } from "./find";

export async function educaOnlineRoutes(app:FastifyInstance) {
    app.get('/educaonline/:id', findId);
    app.post('/educaonline', create);
    app.post('/educaonline/alter/:id', update);
}