
import { PersonRepo } from '@/repositories/person.repo';
import { CreatePersonUseCase } from '@/user-cases/create-person';
import { FastifyReply, FastifyRequest } from 'fastify';
import { z } from 'zod';

export async function create(req: FastifyRequest, rep: FastifyReply) {
    const registerBodySchema = z.object({
        cpf: z.string(),
        name: z.string(),
        bith: z.coerce.date(),
        email: z.string().email(),
        usuario_id: z.coerce.number()
    });
    const {cpf, name, bith, email, usuario_id} = registerBodySchema.parse(req.body)

    try {
        const personRepo = new PersonRepo();
        const createPersonUseCase = new CreatePersonUseCase(personRepo);

        const person = await createPersonUseCase.handler({cpf, name, bith, email, usuario_id});

        return rep.code(201).send(person);

    } catch (error) {
        console.error(error);
        throw new Error('Internal server error');
    }
}