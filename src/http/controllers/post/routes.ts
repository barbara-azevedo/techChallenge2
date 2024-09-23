import { FastifyInstance } from "fastify";
import { createPost, findPostAll, findPostId, findSearchPost, findSearchPostAndAutor, removePost, updatePost } from "./crud";

export async function postRoutes(app: FastifyInstance) {
    app.get('/post/all', findPostAll);
    app.get('/post/:id_post', findPostId);
    app.get('/post/search/:search', findSearchPost);
    app.get('/post_autor/search/:search', findSearchPostAndAutor);
    app.post('/post/create', createPost);
    app.post('/post/update/:id_post', updatePost);
    app.post('/post/remove/:id_post', removePost);
}