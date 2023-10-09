import {
	createPhotoOnDB,
	getPhotosOnDB,
	getUserPhotosOnDB,
	updatePhotoLikesOnDB,
	getPhotoByIdOnDB,
} from 'repositories/photo'
import { findUserByIdOnDB, findUserByUsernameOnDB } from 'repositories/user'
import { createUserLikedPhotoOnDB } from 'repositories/like'
import pagination from '../utils/pagination'

import type { FastifyRequest, FastifyReply } from 'fastify'

export const createPhotoController = async (
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
		console.log(err)
		reply.code(500).send({ error: 'Internal Server Error' })
	}
}

export const getPhotosController = async (
	req: FastifyRequest,
	reply: FastifyReply
) => {
	try {
		const { offset, limit } = pagination(req)

		const photos = await getPhotosOnDB(offset, limit)
		const photosWithUsername = await Promise.all(
			photos.map(async (photo) => {
				const user = await findUserByIdOnDB(photo.userId)

				return {
					...photo,
					username: user?.username,
				}
			})
		)

		reply.code(200).send({
			photos: photosWithUsername,
		})
	} catch (err) {
		console.log(err)
		reply.code(500).send({ error: 'Internal Server Error' })
	}
}

export const getUserPhotosController = async (
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
		console.log(err)
		reply.code(500).send({ error: 'Internal Server Error' })
	}
}

export const updatePhotoLikesController = async (
	req: FastifyRequest,
	reply: FastifyReply
) => {
	try {
		const { photoId, userId } = req.params as {
			photoId: string
			userId: string
		}

		if (!photoId || !userId) {
			reply.code(400).send({ error: 'Photo id or user id are missing' })
		}

		const photo = await getPhotoByIdOnDB(photoId)

		if (!photo) {
			reply.code(404).send({ error: 'Photo not found' })
			return
		}

		await createUserLikedPhotoOnDB(photoId, userId)
		await updatePhotoLikesOnDB(photoId, photo.likes + 1)

		reply.code(200).send({
			message: 'Photo Likes Updated Successfully',
		})
	} catch (err) {
		console.log(err)
		reply.code(500).send({ error: 'Internal Server Error' })
	}
}
