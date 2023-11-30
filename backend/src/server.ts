import 'dotenv/config'
import fastify from 'fastify'
import cors from '@fastify/cors'
import { userRoutes } from './routes/user';
import fastifyMultipart from '@fastify/multipart';
import { emailRoutes } from './routes/email';

export const server = fastify()

server.register(fastifyMultipart)
 
server.register(cors, {
  origin: true,
})

server.register(userRoutes)
server.register(emailRoutes)

server
  .listen({
    port: 3334,
    host: '0.0.0.0'
  })
  .then(() => {
    console.log('HTTP server running on http://157.230.228.49:3334');
  })
  .catch((err) => {
    console.error('Error starting server:', err);
  });