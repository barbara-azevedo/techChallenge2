import { personRoutes } from '@/http/controllers/person/routes';
import { fastify } from 'fastify';
import { postRoutes } from './http/controllers/post/routes';
import { userRoutes } from './http/controllers/user/routes';

export const app = fastify();

app.register(personRoutes)
app.register(userRoutes)
app.register(postRoutes)