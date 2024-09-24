import { FastifyReply, FastifyRequest } from "fastify";

export async function validateJwt(req: FastifyRequest, rep: FastifyReply) {
    try {
        const routeFreList = [
            'POST-/usuario',
            'POST-/usuario/signin',
            'POST-/autor-typeorm/all',
            'POST-/autor-typeorm/:id',
            'POST-/autor-typeorm/search/:nome',
            'POST-/post/all',
            'POST-/post/:id_post',
            'POST-post/search/:search']
        const validateRoute = `${req.method}-${req.routeOptions.url}`

        if (routeFreList.includes(validateRoute)) return

        await req.jwtVerify()
    } catch (error) {
        console.log(error);
        rep.status(401).send({ message: 'Uhauthorized' })
    }
}