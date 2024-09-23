import { env } from "env";
import { FastifyReply, FastifyRequest } from "fastify";
import { ZodError } from "zod";

interface ErroHandlerMap {
    [key: string]: (
        error: Error | ZodError,
        req: FastifyRequest,
        rep: FastifyReply
    ) => void
}

export const errorHandlerMap: ErroHandlerMap = {
    ZodError: (error, _, rep) => {
        return rep
            .status(400)
            .send({
                message: "Validation erro",
                ...(error instanceof ZodError && { erros: error.format() })
            });
    },
    ResourcesNotFoundErrors: (error, _, rep) => {
        return rep.status(400).send(error.message);
    }
}

export const globalErrorHandler = (
    error: Error,
    _: FastifyRequest,
    rep: FastifyReply
) => {
    const handler = errorHandlerMap[error.constructor.name]

    if (handler) return handler(error, _, rep)

    if (env.NODE_ENV === 'development') {
        console.error(error);
    }

    if (error.stack != undefined
        && error.stack.includes('insert or update on table "post"') 
        && error.stack.includes('post_id_autor_fkey'))
        return rep.status(400).send({
            Error: '23503',
            message: 'Autor não encontrado'
        });

    if (error.stack != undefined
        && error.stack.includes('update or delete on table "autor"'))
        return rep.status(400).send({
            Error: '23503',
            message: 'Existe post(s) atrelado a esse Autor'
        });

    return rep.status(500).send({ message: error.message });
}
