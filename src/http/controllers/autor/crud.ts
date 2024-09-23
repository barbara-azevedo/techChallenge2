
import { MakeCrudCreateAutor, MakeCrudFindAlldAutor, MakeCrudFindIdAutor, MakeCrudFindSearchdAutor, MakeCrudRemoverAutor, MakeCrudUpdateAutor } from "@/user-cases/factory/make-crud-autor-use-case";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

// CRUDs PERSIST OBJECT
export async function createAutor(req: FastifyRequest, rep: FastifyReply) {
    const registerBodySchema = z.object({
        nome: z.string(),
    });
    const { nome } = registerBodySchema.parse(req.body);

    const createAutorUseCase = MakeCrudCreateAutor();
    const autor = await createAutorUseCase.handler({ nome });
    return rep.code(201).send({autor});
}

export async function updateAutor(req: FastifyRequest, rep: FastifyReply) {
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
    const updateAutorUseCase = MakeCrudUpdateAutor()

    await updateAutorUseCase.handler({ id_autor, nome });

    return rep.code(200).send('success');
}

export async function removeAutor(req: FastifyRequest, rep: FastifyReply) {
    const resgisterParameterSchema = z.object({
        id_autor: z.coerce.number()
    });
    const { id_autor } = resgisterParameterSchema.parse(req.params);

    if (id_autor === undefined || id_autor === 0) {
        return rep.code(500).send('Informe o id do autor para exclusão');
    }
    const removeAutorUseCase = MakeCrudRemoverAutor();

    const finIdAutorUseCase = MakeCrudFindIdAutor();
    const Autor = await finIdAutorUseCase.handler(id_autor);

    if (Autor?.id_autor === undefined)
        return rep.status(404).send("Objeto não encontrado");

    await removeAutorUseCase.handler(id_autor);

    return rep.code(200).send('success');

}

//------------------------- FINDs

export async function findAutorAll(req: FastifyRequest, rep: FastifyReply) {
    const AutorRepo = MakeCrudFindAlldAutor();
    const autor = await AutorRepo.handler();
    return rep.status(200).send({autor});
}

export async function findAutorId(req: FastifyRequest, rep: FastifyReply) {
    const resgisterParameterSchema = z.object({
        id: z.coerce.number()
    });
    const { id } = resgisterParameterSchema.parse(req.params);

    const AutorRepo = MakeCrudFindIdAutor();
    const autor = await AutorRepo.handler(id);
    return rep.status(200).send({autor});
}

export async function findSearchAutor(req: FastifyRequest, rep: FastifyReply) {
    const resgisterParameterSchema = z.object({
        nome: z.coerce.string()
    });

    const { nome } = resgisterParameterSchema.parse(req.params);

    const AutorRepo = MakeCrudFindSearchdAutor();
    const autor = await AutorRepo.handler(nome);

    if (autor === undefined || autor.length === 0)
        return rep.status(404).send("Nenhum Autor encontrado");

    return rep.status(200).send({autor});
}