import { fastify } from 'fastify'
import { fastifyCors } from '@fastify/cors'
import { jsonSchemaTransform, serializerCompiler, validatorCompiler, ZodTypeProvider } from 'fastify-type-provider-zod'
import fastifySwagger from '@fastify/swagger'
import fastifySwaggerUi from '@fastify/swagger-ui'
import { routes } from './routes'

const app = fastify().withTypeProvider<ZodTypeProvider>()

// Plugins
app.setValidatorCompiler(validatorCompiler)
app.setSerializerCompiler(serializerCompiler)

// Middlewares
app.register(fastifyCors, { origin: '*' })
app.register(fastifySwagger, {
  openapi: {
    info: {
      title: 'Fastify API',
      version: '1.0.0',
    },
  },
  transform: jsonSchemaTransform
})

// Routes
app.register(fastifySwaggerUi, {
  routePrefix: '/docs'
})
app.register(routes)

// Start the server
app.listen({ port: 3000 })
  .then(() => console.log('Server is running on http://localhost:3000'))
