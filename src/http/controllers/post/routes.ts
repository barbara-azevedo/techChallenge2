import { validateJwt } from "@/http/middleware/jwt-validate";
import { FastifyInstance } from "fastify";
import { createPost, findAllPost, findOnePost, findSearchPost, removePost, updatePost } from "./crud";

export async function postRoutes(app: FastifyInstance) {
    app.get('/post/all', findAllPost);
    app.get('/post/:id_post', findOnePost);
    app.get('/post/search/:search', findSearchPost);

    app.post('/post/create', { onRequest: [validateJwt] }, createPost);
    app.put('/post/update/:id_post', { onRequest: [validateJwt] }, updatePost);
    app.delete('/post/remove/:id_post', { onRequest: [validateJwt] }, removePost);
}