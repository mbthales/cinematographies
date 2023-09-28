import type { FastifyRequest, FastifyReply } from 'fastify'

import { createPhotoOnDB } from 'repositories/photo'
import { findUserByUsernameOnDB } from 'repositories/user'

export const createPostWithPhoto = async (
	req: FastifyRequest,
	reply: FastifyReply
) => {
	try {
		const { title, url } = req.body as { title: string; url: string }
		const { username } = req.params as { username: string }

		const user = await findUserByUsernameOnDB(username)

		const photo = await createPhotoOnDB({
			title,
			url,
			userId: user?.id as string,
		})

		reply.code(201).send({
			message: 'Photo Created Successfully',
			photo,
		})
	} catch (err) {
		reply.code(500).send({ error: 'Internal Server Error' })
	}
}
