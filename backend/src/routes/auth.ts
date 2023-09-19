import {
	checkIfBodyIsValid,
	checkIfUserExists,
	checkUserCredentials,
} from 'middlewares/auth'

import { registerController, loginController } from 'controllers/auth'

import type { FastifyInstance } from 'fastify'

export const registerRoute = (app: FastifyInstance) => {
	app.post(
		'/register',
		{
			preHandler: [checkIfBodyIsValid, checkIfUserExists],
		},
		async (req, reply) => {
			await registerController(req, reply)
		}
	)
}

export const loginRoute = (app: FastifyInstance) => {
	app.post(
		'/login',
		{
			preHandler: [checkIfBodyIsValid, checkUserCredentials],
		},
		async (req, reply) => {
			await loginController(req, reply)
		}
	)
}
