import { personRoutes } from '@/http/controllers/person/routes';
import { fastify } from 'fastify';
import { educaOnlineRoutes } from './http/controllers/educaOnline/routes';
import { userRoutes } from './http/controllers/user/routes';

export const app = fastify();

app.register(personRoutes)
app.register(userRoutes)
app.register(educaOnlineRoutes);