import {
	validateAuthRequestBodyMiddleware,
	validateUserExistenceMiddleware,
	validUserCredentialsMiddleware,
} from 'middlewares/user'
import {
	registerController,
	loginController,
	deleteAccountController,
} from 'controllers/user'

import type { FastifyInstance } from 'fastify'

export const userRoutes = (app: FastifyInstance) => {
	app.post(
		'/register',
		{
			preValidation: [
				validateAuthRequestBodyMiddleware,
				validateUserExistenceMiddleware,
			],
		},
		async (req, reply) => {
			await registerController(req, reply)
		}
	)

	app.post(
		'/login',
		{
			preValidation: [
				validateAuthRequestBodyMiddleware,
				validUserCredentialsMiddleware,
			],
		},
		async (req, reply) => {
			await loginController(req, reply)
		}
	)

	app.post(
		'/delete/:username',
		{
			preValidation: [validateUserExistenceMiddleware],
		},
		async (req, reply) => {
			await deleteAccountController(req, reply)
		}
	)
}
