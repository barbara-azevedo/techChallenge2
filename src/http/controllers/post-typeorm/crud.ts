
import { MakeCrudCreatePosTypeorm } from "@/user-cases/factory/make-crud-post2-use-case copy";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

// CRUDs PERSIST OBJECT
export async function createPostTypeorm(req: FastifyRequest, rep: FastifyReply) {
    const registerBodySchema = z.object({
        titulo: z.string(),
        conteudo: z.string(),
        id_autor: z.coerce.number()
    });
    const { titulo, conteudo, id_autor } = registerBodySchema.parse(req.body);
    
    const createPostUseCase = MakeCrudCreatePosTypeorm();    
    const p = await createPostUseCase.handler({ titulo, conteudo, id_autor });
    return rep.code(201).send(p);
}
