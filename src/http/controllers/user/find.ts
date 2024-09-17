
import { UsuarioRepo } from "@/repositories/user.repo";
import { FindWithPersonUserCase } from "@/user-cases/find-with-person";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export async function findUser(req: FastifyRequest, rep: FastifyReply) {
    const resgisterParameterSchema = z.object({
        id: z.coerce.number()
    });

    const { id } = resgisterParameterSchema.parse(req.params);

    try {
        const userRepo = new UsuarioRepo();
        const findWi = new FindWithPersonUserCase(userRepo);
        const user = await findWi.handler(id);
        
        return rep.status(200).send(user);
    } catch (error) {
        console.error('error' + error);
        throw new Error(`Erro ${error}`);
    }
}