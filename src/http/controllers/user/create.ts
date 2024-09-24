import { MakeCreateUsuarioUseCase, MakeFindOneUsuarioUseCase } from "@/user-cases/factory/make-crud-usuario-use-case";
import { hash } from "bcryptjs";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export async function create(req: FastifyRequest, rep: FastifyReply) {
    const registerBodySchema = z.object({
        email: z.string().email({message:"Email is required"}),
        senha: z.string()
    });
    const { email, senha } = registerBodySchema.parse(req.body);

    const hashedPassword = await hash(senha, 8);

    const userWithHashPassword = { email, senha: hashedPassword };

    const createUsuarioUseCase = MakeCreateUsuarioUseCase();

    const user = await createUsuarioUseCase.handler(userWithHashPassword);

    return rep.code(201).send({ username: user?.email });

}

export async function findOne(req: FastifyRequest, rep: FastifyReply) {
    const resgisterParameterSchema = z.object({
        email: z.string().email({message:"Email is required"}),
    });
    const { email } = resgisterParameterSchema.parse(req.params);

    const findOneUsuarioUseCase = MakeFindOneUsuarioUseCase();

    const user = await findOneUsuarioUseCase.handler(email);

    return rep.code(201).send({ username: user?.email });

}

export async function signin(req: FastifyRequest, rep: FastifyReply) {
    const resgisterParameterSchema = z.object({
        email: z.string().email({message:"Email is required"}),
    });
    const { email } = resgisterParameterSchema.parse(req.params);

    const findOneUsuarioUseCase = MakeFindOneUsuarioUseCase();

    const user = await findOneUsuarioUseCase.handler(email);

    return rep.code(201).send({ username: user?.email });

}