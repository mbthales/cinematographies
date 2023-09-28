import Fastify from 'fastify'
import cookie from '@fastify/cookie'
import multipart from '@fastify/multipart'

import { registerRoute, loginRoute, deleteAccountRoute } from 'routes/auth'
import { addPhotoRoute, getAllPhotos } from 'routes/photo'

const app = Fastify()

app.register(cookie)
app.register(multipart, { attachFieldsToBody: true })

registerRoute(app)
loginRoute(app)
deleteAccountRoute(app)
addPhotoRoute(app)
getAllPhotos(app)

app.listen({ port: 3000 }, (err, address) => {
	if (err) {
		console.error(err)
		process.exit(1)
	}
	console.log(`Server listening at ${address}...`)
})
