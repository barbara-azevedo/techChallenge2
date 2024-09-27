
import { fastifyJwt } from '@fastify/jwt';

import { env } from 'env';
import { fastify } from 'fastify';
import "reflect-metadata";
import { autorRoutes } from './http/controllers/autor/routes';
import { postRoutes } from './http/controllers/post/routes';
import { userRoutes } from './http/controllers/user/routes';
import "./lib/typeorm/typeorm";
import { globalErrorHandler } from './utils/global-error-handler';

export const app = fastify();

app.register(fastifyJwt, {
    secret: env.SECRET_JWT,
    sign: { expiresIn: '1h' }
})

app.register(postRoutes)
app.register(autorRoutes)
app.register(userRoutes)

app.setErrorHandler(globalErrorHandler)