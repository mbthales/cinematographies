import Fastify from 'fastify'
import cookie from '@fastify/cookie'
import multipart from '@fastify/multipart'
import cors from '@fastify/cors'
import 'dotenv/config'

import { registerRoute, loginRoute, deleteAccountRoute } from 'routes/auth'
import { addPhotoRoute, getAllPhotos, getUserPhotos } from 'routes/photo'

const app = Fastify()

app.register(cors, {
	origin: process.env.CLIENT_URL,
	credentials: true,
})
app.register(cookie)
app.register(multipart, { attachFieldsToBody: true })

registerRoute(app)
loginRoute(app)
deleteAccountRoute(app)
addPhotoRoute(app)
getAllPhotos(app)
getUserPhotos(app)

app.listen({ port: 3000 }, (err, address) => {
	if (err) {
		console.error(err)
		process.exit(1)
	}
	console.log(`Server listening at ${address}...`)
})