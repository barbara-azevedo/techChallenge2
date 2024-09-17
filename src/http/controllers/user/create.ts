import { UsuarioRepo } from "@/repositories/user.repo";
import { CreateUsuarioUseCase } from "@/user-cases/create-user";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export async function create(req: FastifyRequest, rep: FastifyReply) {
    const registerBodySchema = z.object({
        username: z.string(),
        password: z.string()
    });
    const {username, password} = registerBodySchema.parse(req.body);

    
    try {
        const userRepo = new UsuarioRepo();
        const createUsuarioUseCase = new CreateUsuarioUseCase(userRepo);

       const user = await createUsuarioUseCase.handler({username, password});

        return rep.code(201).send(user);

    } catch (error) {
        console.error(error);
        throw new Error('Internal server error');
    }

}