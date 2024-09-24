import { FastifyReply, FastifyRequest } from "fastify";

export async function validateJwt(req: FastifyRequest, rep: FastifyReply) {
    try {
        const routFreeListUsuario = [
            'POST-/usuario',
            'POST-/usuario/signin']
        const routFreeListAutor = [
            'POST-/autor/all',
            'POST-/autor/:id',
            'POST-/autor/search/:nome']
        const routFreeListPost = [
            'POST-/post/all',
            'POST-/post/:id_post',
            'POST-/post/search/:search']

        const routeFreList = [
            routFreeListUsuario,
            routFreeListAutor,
            routFreeListPost]

        const validateRoute = `${req.method}-${req.routeOptions.url}`

        if (routeFreList.includes([validateRoute])) return

        await req.jwtVerify()
    } catch (error) {
        console.log(error);
        rep.status(401).send({ message: 'Uhauthorized' })
    }
}