import { validateJwt } from "@/http/middleware/jwt-validate";
import { FastifyInstance } from "fastify";
import {
    createAutor,
    findAllAutor,
    findOneAutor,
    findSearchAutor,
    removeAutor,
    updateAutor
} from "./crud";


export async function autorRoutes(app: FastifyInstance) {
    app.post('/autor/create', { onRequest: [validateJwt] }, createAutor);
    app.post('/autor/update/:id_autor', { onRequest: [validateJwt] }, updateAutor);
    app.post('/autor/remove/:id_autor', { onRequest: [validateJwt] }, removeAutor);

    app.get('/autor/all', findAllAutor);
    app.get('/autor/:id', findOneAutor);
    app.get('/autor/search/:nome', findSearchAutor);
}