import {
	createPhotoOnDB,
	getAllPhotosOnDB,
	getUserPhotosOnDB,
} from 'repositories/photo'
import { findUserByUsernameOnDB } from 'repositories/user'
import pagination from 'helpers/pagination'

import type { FastifyRequest, FastifyReply } from 'fastify'

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
	try {
		const { offset, limit } = pagination(req)

		const photos = await getAllPhotosOnDB(offset, limit)

		reply.code(200).send({
			photos,
		})
	} catch (err) {
		reply.code(500).send({ error: 'Internal Server Error' })
	}
}

export const fetchUserPhotos = async (
	req: FastifyRequest,
	reply: FastifyReply
) => {
	try {
		const { offset, limit } = pagination(req)
		const { username } = req.params as { username: string }

		const user = await findUserByUsernameOnDB(username)
		const userId = user?.id as string
		const photos = await getUserPhotosOnDB(userId, offset, limit)

		reply.code(200).send({
			photos,
		})
	} catch (err) {
		reply.code(500).send({ error: 'Internal Server Error' })
	}
}
