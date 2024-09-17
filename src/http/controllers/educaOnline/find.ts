
import { EducaOnlineRepo } from "@/repositories/educa.repo";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export async function findId(req: FastifyRequest, rep: FastifyReply) {
    const resgisterParameterSchema = z.object({
        id: z.coerce.number()
    });

    const { id } = resgisterParameterSchema.parse(req.params);

    try {
        const eoRepo = new EducaOnlineRepo();
        const eo = await eoRepo.findEducaOnlineId(id);        
        return rep.status(200).send(eo);
    } catch (error) {
        console.error('error' + error);
        throw new Error(`Erro ${error}`);
    }
}