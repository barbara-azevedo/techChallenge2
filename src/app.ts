import { fastify } from 'fastify';
import "reflect-metadata";
import { AutorTypeormRoutes } from './http/controllers/autor-typeorm/routes';
import { AutorRoutes } from './http/controllers/autor/routes';
import { postTypeormRoutes } from './http/controllers/post-typeorm/routes';
import { postRoutes } from './http/controllers/post/routes';
import "./lib/typeorm/typeorm";
import { globalErrorHandler } from './utils/global-error-handler';

export const app = fastify();

app.register(postRoutes)
app.register(AutorRoutes)
app.register(AutorTypeormRoutes)
app.register(postTypeormRoutes)

app.setErrorHandler(globalErrorHandler)