import { FastifyInstance } from "fastify";
import {
    createAutorTypeorm,
    findAutorAllTypeorm,
    findAutorIdTypeorm,
    findSearchAutorTypeorm,
    removeAutorTypeorm,
    updateAutorTypeorm
} from "./crud";

export async function AutorTypeormRoutes(app: FastifyInstance) {
    app.post('/autor-typeorm/create', createAutorTypeorm);
    app.post('/autor-typeorm/update/:id_autor', updateAutorTypeorm);
    app.post('/autor-typeorm/remove/:id_autor', removeAutorTypeorm);

    app.get('/autor-typeorm/all', findAutorAllTypeorm);
    app.get('/autor-typeorm/:id', findAutorIdTypeorm);
    app.get('/autor-typeorm/search/:nome', findSearchAutorTypeorm);
}