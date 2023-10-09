import { authenticateUserMiddleware } from 'middlewares/user'
import {
	validatePhotoRequestBodyMiddleware,
	uploadPhotoMiddleware,
} from 'middlewares/photo'
import {
	createPhotoController,
	getPhotosController,
	getUserPhotosController,
	updatePhotoLikesController,
} from 'controllers/photo'

import type { FastifyInstance, FastifyRequest, FastifyReply } from 'fastify'

export const photoRoutes = (app: FastifyInstance) => {
	app.post(
		'/users/:username/photos',
		{
			preValidation: [
				authenticateUserMiddleware,
				validatePhotoRequestBodyMiddleware,
			],
			preHandler: uploadPhotoMiddleware,
		},
		async (req: FastifyRequest, reply: FastifyReply) => {
			await createPhotoController(req, reply)
		}
	)

	app.get('/photos', async (req: FastifyRequest, reply: FastifyReply) => {
		await getPhotosController(req, reply)
	})

	app.get(
		'/users/:username/photos',
		{
			preValidation: [authenticateUserMiddleware],
		},
		async (req: FastifyRequest, reply: FastifyReply) => {
			await getUserPhotosController(req, reply)
		}
	)

	app.patch(
		'/users/:userId/photos/:photoId/likes',
		{
			preValidation: [authenticateUserMiddleware],
		},
		async (req: FastifyRequest, reply: FastifyReply) => {
			await updatePhotoLikesController(req, reply)
		}
	)
}
