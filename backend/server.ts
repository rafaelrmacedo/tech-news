import 'dotenv/config'
import fastify from 'fastify'
import cors from '@fastify/cors'
import { userRoutes } from './routes/user';
import fastifyMultipart from '@fastify/multipart';

export const server = fastify()

server.register(fastifyMultipart)
server.register(userRoutes)
 
server.register(cors, {
  origin: true,
})

server
  .listen({
    port: 3333,
  })
  .then(() => {
    console.log('HTTP server running on port http://localhost:3333')
  })