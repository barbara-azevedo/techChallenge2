
import { PostRepository } from "@/repositories/post.repository";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export async function findPostAll(req: FastifyRequest, rep: FastifyReply) {
    try {
        const postRepo = new PostRepository();
        const post = await postRepo.findPostAll();
        return rep.status(200).send(post);
    } catch (error) {
        console.error('error' + error);
        throw new Error(`Erro ${error}`);
    }
}

export async function findPostId(req: FastifyRequest, rep: FastifyReply) {
    const resgisterParameterSchema = z.object({
        id: z.coerce.number()
    });
    const { id } = resgisterParameterSchema.parse(req.params);
    try {
        const postRepo = new PostRepository();
        const post = await postRepo.findPostId(id);
        if (post?.id === undefined)
            return rep.status(404).send("Objeto não encontrado");
        return rep.status(200).send(post);
    } catch (error) {
        console.error('error' + error);
        throw new Error(`Erro ${error}`);
    }
}

export async function findSearchPost(req: FastifyRequest, rep: FastifyReply) {
    const resgisterParameterSchema = z.object({
        search: z.coerce.string()
    });

    const { search } = resgisterParameterSchema.parse(req.params);
    try {
        const postRepo = new PostRepository();
        const post = await postRepo.findPostSearch(search)
        console.log(post);

        if (post === undefined || post.length === 0)
            return rep.status(404).send("Nenhum valor encontrado");
        return rep.status(200).send(post);
    } catch (error) {
        console.error('error' + error);
        throw new Error(`Erro ${error}`);
    }
}