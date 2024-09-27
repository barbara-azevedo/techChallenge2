
import { MakeCreatePost, MakeFindAllPost, MakeFindOnePost, MakeFindSearchPost, MakeRemovePost, MakeUpdatePost } from "@/user-cases/factory/make-crud-post-use-case copy";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

/*
* * Metodos de Persistencia de Objetos **
*/
export async function createPost(req: FastifyRequest, rep: FastifyReply) {
    const registerBodySchema = z.object({
        titulo: z.string(),
        conteudo: z.string(),
        id_autor: z.coerce.number()
    });
    const { titulo, conteudo, id_autor } = registerBodySchema.parse(req.body);

    const createPostUseCase = MakeCreatePost();
    const p = await createPostUseCase.handler({ titulo, conteudo, id_autor });
    return rep.code(201).send(p);
}

export async function updatePost(req: FastifyRequest, rep: FastifyReply) {
    const resgisterParameterSchema = z.object({
        id_post: z.coerce.number()
    });
    const { id_post } = resgisterParameterSchema.parse(req.params);

    const registerBodySchema = z.object({
        titulo: z.string(),
        conteudo: z.string(),
        id_autor: z.coerce.number()
    });
    const { titulo, conteudo, id_autor } = registerBodySchema.parse(req.body);

    if (id_post === undefined || id_post === 0) {
        return rep.code(400).send('Informe o id do post para alteração');
    }

    const findOnePost = MakeFindOnePost();

    await findOnePost.handler(id_post);

    const updatePostUseCase = MakeUpdatePost();
    const a = await updatePostUseCase.handler({ id_post, titulo, conteudo, id_autor });
    return rep.code(200).send(a);
}

export async function removePost(req: FastifyRequest, rep: FastifyReply) {
    const resgisterParameterSchema = z.object({
        id_post: z.coerce.number()
    });
    const { id_post } = resgisterParameterSchema.parse(req.params);

    if (id_post === undefined || id_post === 0) {
        return rep.code(404).send('Informe o id do post para exclusão');
    }
    const removePostUseCase = MakeRemovePost();

    const finIdPostUseCase = MakeFindOnePost()
    const post = await finIdPostUseCase.handler(id_post);

    if (post?.id_post === undefined)
        return rep.status(404).send("Objeto não encontrado");

    removePostUseCase.handler(id_post);
    return rep.code(200).send('success');

}

/*
* * Metodos de Consulta de Objetos **
*/
export async function findAllPost(req: FastifyRequest, rep: FastifyReply) {

    const registerQuerySchema = z.object({
        page: z.coerce.number().default(1),
        limit: z.coerce.number().default(10)
    });

    const { page, limit } = registerQuerySchema.parse(req.query);
    const postRepo = MakeFindAllPost();
    const post = await postRepo.handler(page, limit);

    return rep.status(200).send({ post });
}

export async function findOnePost(req: FastifyRequest, rep: FastifyReply) {
    const resgisterParameterSchema = z.object({
        id_post: z.coerce.number()
    });
    const { id_post } = resgisterParameterSchema.parse(req.params);

    const postRepo = MakeFindOnePost();
    const post = await postRepo.handler(id_post);
    return rep.status(200).send({ post });
}

export async function findSearchPost(req: FastifyRequest, rep: FastifyReply) {
    const resgisterParameterSchema = z.object({
        search: z.coerce.string()
    });

    const { search } = resgisterParameterSchema.parse(req.params);

    const postRepo = MakeFindSearchPost();
    const post = await postRepo.handler(search);

    if (post === undefined || post.length === 0)
        return rep.status(404).send("Nenhum valor encontrado");
    return rep.status(200).send({ post });
}