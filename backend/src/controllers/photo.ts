import { createPhotoOnDB, getAllPhotosFromDB } from 'repositories/photo'
import { findUserByUsernameOnDB } from 'repositories/user'

import type { FastifyRequest, FastifyReply } from 'fastify'
import type { ReqQueryGetPhotos } from 'types/photo'

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

export const fetchAllPhotos = async (
	req: FastifyRequest,
	reply: FastifyReply
) => {
	const query = req.query as ReqQueryGetPhotos
	const page = query.page ? parseInt(query.page, 10) : 1
	const limit = query.limit ? parseInt(query.limit, 10) : 10
	const offset = (page - 1) * limit

	const photos = await getAllPhotosFromDB(offset, limit)

	reply.code(200).send({
		photos,
	})
}
