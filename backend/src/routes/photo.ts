import type { FastifyInstance, FastifyRequest, FastifyReply } from 'fastify'

import { checkIfUserIsAuthenticated } from 'middlewares/auth'
import { checkIfBodyIsValid, uploadPhoto } from 'middlewares/photo'

import { createPostWithPhoto } from 'controllers/photo'

export const addPhotoRoute = (app: FastifyInstance) => {
	app.post(
		'/add-photo/:username',
		{
			preValidation: [checkIfUserIsAuthenticated, checkIfBodyIsValid],
			preHandler: uploadPhoto,
		},
		async (req: FastifyRequest, reply: FastifyReply) => {
			await createPostWithPhoto(req, reply)
		}
	)
}
