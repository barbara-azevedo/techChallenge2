import { FastifyInstance } from "fastify";
import { createPost, removePost, updatePost } from "./crud";
import { findPostAll, findPostId, findSearchPost } from "./find";

export async function postRoutes(app:FastifyInstance) {
    app.get('/post/all', findPostAll);
    app.get('/post/:id', findPostId);
    app.get('/post/search/:search', findSearchPost);
    app.post('/post/create', createPost);
    app.post('/post/update/:id', updatePost);
    app.post('/post/remove/:id', removePost);
}