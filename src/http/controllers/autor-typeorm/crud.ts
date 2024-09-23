
import { MakeCrudCreateAutorTypeorm, MakeCrudFindAlldAutorTypeorm, MakeCrudFindIdAutorTypeorm, MakeCrudFindSearchdAutorTypeorm, MakeCrudRemoverAutorTypeorm, MakeCrudUpdateAutorTypeorm } from "@/user-cases/factory/make-crud-autor2-use-case";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

// CRUDs PERSIST OBJECT
export async function createAutorTypeorm(req: FastifyRequest, rep: FastifyReply) {
    const registerBodySchema = z.object({
        nome: z.string(),
    });
    const { nome } = registerBodySchema.parse(req.body);
    const createAutorUseCase = MakeCrudCreateAutorTypeorm()
    const autor = await createAutorUseCase.handler({ nome });
    return rep.code(201).send({ autor });
}

export async function updateAutorTypeorm(req: FastifyRequest, rep: FastifyReply) {
    const resgisterParameterSchema = z.object({
        id_autor: z.coerce.number()
    });
    const { id_autor } = resgisterParameterSchema.parse(req.params);
    const registerBodySchema = z.object({
        nome: z.string(),
    });
    const { nome } = registerBodySchema.parse(req.body);
    if (id_autor === undefined || id_autor === 0) {
        return rep.code(400).send('Informe o id do autor para alteração');
    }
    const updateAutorUseCase = MakeCrudUpdateAutorTypeorm()
    await updateAutorUseCase.handler({ id_autor, nome });

    return rep.code(200).send('success');
}

export async function removeAutorTypeorm(req: FastifyRequest, rep: FastifyReply) {
    const resgisterParameterSchema = z.object({
        id_autor: z.coerce.number()
    });

    const { id_autor } = resgisterParameterSchema.parse(req.params);

    if (id_autor === undefined || id_autor === 0) {
        return rep.code(500).send('Informe o id do autor para exclusão');
    }
    const removeAutorUseCase = MakeCrudRemoverAutorTypeorm();
    await removeAutorUseCase.handler({ id_autor });

    return rep.code(200).send('success');
}

//------------------------- FINDs

export async function findAutorAllTypeorm(req: FastifyRequest, rep: FastifyReply) {

    const registerQuerySchema = z.object({
        page: z.coerce.number().default(1),
        limit: z.coerce.number().default(10)
    });
    
    const { page, limit } = registerQuerySchema.parse(req.query);
    console.log(req.params);

    const AutorRepo = MakeCrudFindAlldAutorTypeorm();
    const autor = await AutorRepo.handler(page, limit);
    return rep.status(200).send({ autor });
}

export async function findAutorIdTypeorm(req: FastifyRequest, rep: FastifyReply) {
    const resgisterParameterSchema = z.object({
        id: z.coerce.number()
    });
    const { id } = resgisterParameterSchema.parse(req.params);
    const AutorRepo = MakeCrudFindIdAutorTypeorm();
    const autor = await AutorRepo.handler(id);
    return rep.status(200).send({ autor });
}

export async function findSearchAutorTypeorm(req: FastifyRequest, rep: FastifyReply) {
    const resgisterParameterSchema = z.object({
        nome: z.coerce.string()
    });
    const { nome } = resgisterParameterSchema.parse(req.params);
    const AutorRepo = MakeCrudFindSearchdAutorTypeorm();
    const autor = await AutorRepo.handler(nome);
    if (autor === undefined || autor.length === 0)
        return rep.status(404).send("Nenhum Autor encontrado");

    return rep.status(200).send({ autor });
}