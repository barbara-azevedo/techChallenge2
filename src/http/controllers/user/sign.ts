import { InvalidCrendtialsError } from "@/user-cases/erros/invalid-creadential-error";
import { MakeSignUserCase } from "@/user-cases/factory/make-sign-use-case";
import { compare } from "bcryptjs";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export async function siginin(req: FastifyRequest, rep: FastifyReply) {

    const registerBodySchema = z.object({
        email: z.string(),
        senha: z.string()
    });

    const { email, senha } = registerBodySchema.parse(req.body);

    const signinUseCase = MakeSignUserCase();

    const user = await signinUseCase.handler(email);

    const doesPasswordMath = await compare(senha, user.senha);

    if (!doesPasswordMath)
        throw new InvalidCrendtialsError()

    const token = await rep.jwtSign({ email })

    return rep.status(200).send({ token });
}