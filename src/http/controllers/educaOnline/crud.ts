
import { EducaOnline } from "@/entities/educa.online.entities";
import { EducaOnlineRepo } from "@/repositories/educa.repo";
import { CreateEducaOnlineUseCase, UpdateEducaOnlineUseCase } from "@/user-cases/crud-post";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

const dto: EducaOnline = new EducaOnline();

export async function create(req: FastifyRequest, rep: FastifyReply) {

    const registerBodySchema = z.object({
        titulo: z.string(),
        post: z.string(),
        nomeArquivo: z.string(),
        arquivo: z.any()
    });

    const { titulo, post, nomeArquivo, arquivo }  = registerBodySchema.parse(req.body);
    try {
            
        const eoRepo = new EducaOnlineRepo();
        const createEducaOnlineUseCase = new CreateEducaOnlineUseCase(eoRepo);
            
        const eo = await createEducaOnlineUseCase.handler(
            { titulo, post, nomeArquivo, arquivo }
        );
                
        dto.id = eo?.id;
        dto.arquivo = arquivo;
        dto.nomeArquivo = nomeArquivo;
        dto.titulo = titulo;
        dto.post = post;
        dto.dtCriacao = eo?.dtCriacao;
        dto.dtModificacao = eo?.dtModificacao;
        return rep.code(201).send(dto);
        
    } catch (error) {
        console.error(error);
        throw new Error('Internal server error');
    }
    
}

export async function update(req: FastifyRequest, rep: FastifyReply) {

    const resgisterParameterSchema = z.object({
        id: z.coerce.number()
    });

    const registerBodySchema = z.object({
        titulo: z.string(),
        post: z.string(),
        nomeArquivo: z.string(),
        arquivo: z.any()
    });

    const { titulo, post, nomeArquivo, arquivo } = registerBodySchema.parse(req.body);
   
    const { id } = resgisterParameterSchema.parse(req.params);
   
    try {
        const eoRepo = new EducaOnlineRepo();
        const updateEducaOnlineUseCase = new UpdateEducaOnlineUseCase(eoRepo);

        const eo = await updateEducaOnlineUseCase.handler(
            { id, titulo, post, nomeArquivo, arquivo }
        );
        
        return rep.code(201).send(eo);
    } catch (error) {
        console.error(error);
        throw new Error('Internal server error');
    }

}