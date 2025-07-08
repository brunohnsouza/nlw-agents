import { fastifyCors } from '@fastify/cors'
import { fastify } from 'fastify'
import {
    serializerCompiler,
    validatorCompiler,
    type ZodTypeProvider,
} from 'fastify-type-provider-zod'
import { env } from './env.ts'
import { getRoomsRoute } from './http/routes/get-rooms.ts'

const server = fastify().withTypeProvider<ZodTypeProvider>()

server.register(fastifyCors, {
    origin: 'http://localhost:5173',
})

server.setSerializerCompiler(serializerCompiler)
server.setValidatorCompiler(validatorCompiler)

// Routes
server.register(getRoomsRoute)

server.listen({ port: env.PORT }).then(() => {
    // biome-ignore lint/suspicious/noConsole: needed for server startup log
    console.log(`Server is running on http://localhost:${env.PORT}`)
})
