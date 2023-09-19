import Fastify from 'fastify'
import cookie from '@fastify/cookie'

import { registerRoute, loginRoute } from 'routes/auth'

const app = Fastify()

app.register(cookie)

registerRoute(app)
loginRoute(app)

app.listen({ port: 3000 }, (err, address) => {
	if (err) {
		console.error(err)
		process.exit(1)
	}
	console.log(`Server listening at ${address}...`)
})
