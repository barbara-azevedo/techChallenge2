
import { PostRepository } from "@/repositories/post.repository";
import { CreatePostUseCase, FindIdPostUseCase, RemovePostUseCase, UpdatePostUseCase } from "@/user-cases/post.user.case";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export async function createPost(req: FastifyRequest, rep: FastifyReply) {
    const registerBodySchema = z.object({
        titulo: z.string(),
        conteudo: z.string(),
        autor: z.string()
    });
    const { titulo, conteudo, autor } = registerBodySchema.parse(req.body);
    try {
        const postRepo = new PostRepository();
        const createPostUseCase = new CreatePostUseCase(postRepo);
        const p = await createPostUseCase.handler({ titulo, conteudo, autor });
        return rep.code(201).send(p);
    } catch (error) {
        console.error(error);
        throw new Error('Internal server error');
    }
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
        return rep.code(500).send('Id null');
    }

    try {
        const postRepo = new PostRepository();
        const updatePostUseCase = new UpdatePostUseCase(postRepo);
        updatePostUseCase.handler({ id, autor, titulo, conteudo });
        return rep.code(200).send('success');
    } catch (error) {
        console.error(error);
        throw new Error('Internal server error');
    }
}

export async function removePost(req: FastifyRequest, rep: FastifyReply) {
    const resgisterParameterSchema = z.object({
        id: z.coerce.number()
    });
    const { id } = resgisterParameterSchema.parse(req.params);

    if (id === undefined || id === 0) {
        return rep.code(500).send('Id null');
    }

    try {
        const postRepo = new PostRepository();
        const removePostUseCase = new RemovePostUseCase(postRepo);

        const finIdPostUseCase = new FindIdPostUseCase(postRepo);
        const post = await finIdPostUseCase.handler(id);

        if (post?.id === undefined)
            return rep.status(404).send("Objeto não encontrado");

        removePostUseCase.handler(id);
        return rep.code(200).send('success');
    } catch (error) {
        console.error(error);
        throw new Error('Internal server error');
    }
}