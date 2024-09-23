
import {
    MakeCrudCreatePost, MakeCrudFindAlldPost, MakeCrudFindIdPost, MakeCrudFindSearchdPost,
    MakeCrudFindSearchdPostAndAutor,
    MakeCrudRemoverPost, MakeCrudUpdatePost
} from "@/user-cases/factory/make-crud-post-use-case";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

// CRUDs PERSIST OBJECT
export async function createPost(req: FastifyRequest, rep: FastifyReply) {
    const registerBodySchema = z.object({
        titulo: z.string(),
        conteudo: z.string(),
        id_autor: z.coerce.number()
    });
    const { titulo, conteudo, id_autor } = registerBodySchema.parse(req.body);
    const createPostUseCase = MakeCrudCreatePost();
    const p = await createPostUseCase.handler({ titulo, conteudo, id_autor });
    return rep.code(201).send(p);
}

export async function updatePost(req: FastifyRequest, rep: FastifyReply) {
    const resgisterParameterSchema = z.object({
        id_post: z.coerce.number()
    });
    const { id_post } = resgisterParameterSchema.parse(req.params);
    console.log(id_post);
    
    const registerBodySchema = z.object({
        titulo: z.string(),
        conteudo: z.string(),
        id_autor: z.coerce.number()
    });
    const { titulo, conteudo, id_autor } = registerBodySchema.parse(req.body);

    if (id_post === undefined || id_post === 0) {
        return rep.code(400).send('Informe o id do post para alteração');
    }
    const updatePostUseCase = MakeCrudUpdatePost()
    const a = await updatePostUseCase.handler({ id_post, titulo, conteudo, id_autor });
    return rep.code(200).send(a);
}

export async function removePost(req: FastifyRequest, rep: FastifyReply) {
    const resgisterParameterSchema = z.object({
        id_post: z.coerce.number()
    });
    const { id_post } = resgisterParameterSchema.parse(req.params);

    if (id_post === undefined || id_post === 0) {
        return rep.code(500).send('Informe o id do post para exclusão');
    }
    const removePostUseCase = MakeCrudRemoverPost();

    const finIdPostUseCase = MakeCrudFindIdPost();
    const post = await finIdPostUseCase.handler(id_post);

    if (post?.id_post === undefined)
        return rep.status(404).send("Objeto não encontrado");

    removePostUseCase.handler(id_post);
    return rep.code(200).send('success');

}

// CRUDs FIND
export async function findPostAll(req: FastifyRequest, rep: FastifyReply) {
    const postRepo = MakeCrudFindAlldPost();
    const post = await postRepo.handler();    
    return rep.status(200).send({post});
}

export async function findPostId(req: FastifyRequest, rep: FastifyReply) {
    const resgisterParameterSchema = z.object({
        id_post: z.coerce.number()
    });
    const { id_post } = resgisterParameterSchema.parse(req.params);

    const postRepo = MakeCrudFindIdPost();
    const post = await postRepo.handler(id_post);
    return rep.status(200).send({post});
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
    return rep.status(200).send({post});
}

export async function findSearchPostAndAutor(req: FastifyRequest, rep: FastifyReply) {
    const resgisterParameterSchema = z.object({
        search: z.coerce.string()
    });

    const { search } = resgisterParameterSchema.parse(req.params);

    const postRepo = MakeCrudFindSearchdPostAndAutor();
    const post = await postRepo.handler(search);

    if (post === undefined || post.length === 0)
        return rep.status(404).send("Nenhum valor encontrado");
    return rep.status(200).send({post});
}

