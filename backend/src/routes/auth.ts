import {
	checkIfBodyIsValid,
	checkIfUserExists,
	checkUserCredentials,
} from 'middlewares/auth'

import {
	registerController,
	loginController,
	deleteAccountController,
} from 'controllers/auth'

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

export const deleteAccountRoute = (app: FastifyInstance) => {
	app.post(
		'/delete/:username',
		{
			preHandler: [checkIfUserExists],
		},
		async (req, reply) => {
			await deleteAccountController(req, reply)
		}
	)
}
