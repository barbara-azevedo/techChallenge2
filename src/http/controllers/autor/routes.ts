import { FastifyInstance } from "fastify";
import {
    createAutor,
    findAutorAll,
    findAutorId,
    findSearchAutor,
    removeAutor,
    updateAutor
} from "./crud";

export async function AutorRoutes(app: FastifyInstance) {
    app.get('/autor/all', findAutorAll);
    app.get('/autor/:id', findAutorId);
    app.get('/autor/search/:nome', findSearchAutor);
    app.post('/autor/create', createAutor);
    app.post('/autor/update/:id_autor', updateAutor);
    app.post('/autor/remove/:id_autor', removeAutor);
}