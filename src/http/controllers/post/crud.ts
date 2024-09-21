
import { MakeCrudCreatePost, MakeCrudFindAlldPost, MakeCrudFindIdPost, MakeCrudFindSearchdPost, MakeCrudRemoverPost, MakeCrudUpdatePost } from "@/user-cases/factory/make-crud-post-use-case";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

// CRUDs PERSIST OBJECT
export async function createPost(req: FastifyRequest, rep: FastifyReply) {
    const registerBodySchema = z.object({
        titulo: z.string(),
        conteudo: z.string(),
        autor: z.string()
    });
    const { titulo, conteudo, autor } = registerBodySchema.parse(req.body);

    const createPostUseCase = MakeCrudCreatePost();
    const p = await createPostUseCase.handler({ titulo, conteudo, autor });
    return rep.code(201).send(p);
}

export async function updatePost(req: FastifyRequest, rep: FastifyReply) {
    const resgisterParameterSchema = z.object({
        id: z.coerce.number()
    });
    const { id } = resgisterParameterSchema.parse(req.params);

    const registerBodySchema = z.object({
        autor: z.string(),
        titulo: z.string(),
        conteudo: z.string()
    });
    const { autor, titulo, conteudo } = registerBodySchema.parse(req.body);

    if (id === undefined || id === 0) {
        return rep.code(400).send('Id null');
    }
    const updatePostUseCase = MakeCrudUpdatePost()
    updatePostUseCase.handler({ id, autor, titulo, conteudo });
    return rep.code(200).send('success');
}

export async function removePost(req: FastifyRequest, rep: FastifyReply) {
    const resgisterParameterSchema = z.object({
        id: z.coerce.number()
    });
    const { id } = resgisterParameterSchema.parse(req.params);

    if (id === undefined || id === 0) {
        return rep.code(500).send('Id null');
    }
    const removePostUseCase = MakeCrudRemoverPost();

    const finIdPostUseCase = MakeCrudFindIdPost();
    const post = await finIdPostUseCase.handler(id);

    if (post?.id === undefined)
        return rep.status(404).send("Objeto não encontrado");

    removePostUseCase.handler(id);
    return rep.code(200).send('success');

}

// CRUDs FIND
export async function findPostAll(req: FastifyRequest, rep: FastifyReply) {
    const postRepo = MakeCrudFindAlldPost();
    const post = await postRepo.handler();
    return rep.status(200).send(post);
}

export async function findPostId(req: FastifyRequest, rep: FastifyReply) {
    const resgisterParameterSchema = z.object({
        id: z.coerce.number()
    });
    const { id } = resgisterParameterSchema.parse(req.params);

    const postRepo = MakeCrudFindIdPost();
    const post = await postRepo.handler(id);
    return rep.status(200).send(post);
}

export async function findSearchPost(req: FastifyRequest, rep: FastifyReply) {
    const resgisterParameterSchema = z.object({
        search: z.coerce.string()
    });

    const { search } = resgisterParameterSchema.parse(req.params);

    const postRepo = MakeCrudFindSearchdPost();
    const post = await postRepo.handler(search);

    if (post === undefined || post.length === 0)
        return rep.status(404).send("Nenhum valor encontrado");
    return rep.status(200).send(post);
}