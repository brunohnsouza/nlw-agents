import { fastifyCors } from '@fastify/cors'
import { fastify } from 'fastify'
import { fastifyMultipart } from "@fastify/multipart"
import {
    serializerCompiler,
    validatorCompiler,
    type ZodTypeProvider,
} from 'fastify-type-provider-zod'
import { env } from './env.ts'
import { getRoomsRoute } from './http/routes/get-rooms.ts'
import { createRoomRoute } from './http/routes/create-room.ts'
import { getRoomQuestionsRoute } from './http/routes/get-room-questions.ts'
import { createQuestionRoute } from './http/routes/create-question.ts'
import { uploadAudioRoute } from './http/routes/upload-audio.ts'

const server = fastify().withTypeProvider<ZodTypeProvider>()

server.register(fastifyCors, {
    origin: 'http://localhost:5173',
})

server.register(fastifyMultipart)

server.setSerializerCompiler(serializerCompiler)
server.setValidatorCompiler(validatorCompiler)

// Helth check
server.get('/health', async () => {
    return { status: 'ok' }
})

// Routes
server.register(getRoomsRoute)
server.register(createRoomRoute)
server.register(getRoomQuestionsRoute)
server.register(createQuestionRoute)
server.register(uploadAudioRoute)

server.listen({ port: env.PORT }).then(() => {
    // biome-ignore lint/suspicious/noConsole: needed for server startup log
    console.log(`Server is running on port ${env.PORT}`)
})
