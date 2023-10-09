import 'dotenv/config'

import { cloudinary } from 'lib/cloudinary'

import type { ValidatedPhotoRequestI, UploadedPhotoRequestI } from 'types/photo'
import type { FastifyRequest, FastifyReply } from 'fastify'

export const validatePhotoRequestBodyMiddleware = async (
	req: FastifyRequest,
	reply: FastifyReply,
	next: () => void
) => {
	const allowedFileTypes = [
		'image/jpeg',
		'image/jpg',
		'image/png',
		'image/webp',
	]
	const { image, title } = req.body as ValidatedPhotoRequestI
	const imageType = image.mimetype
	const titleLength = title.value.length > 10 && title.value.length < 30

	if (!image) {
		reply.code(400).send({
			error: 'Invalid Body',
			details: 'Image is Required',
		})
	}

	if (!allowedFileTypes.includes(imageType)) {
		reply.code(400).send({
			error: 'Invalid Body',
			details: '.jpg, .jpeg, .png and .webp Files are Accepted.',
		})
	}

	if (!title) {
		reply.code(400).send({
			error: 'Invalid Body',
			details: 'Title is Required',
		})
	}

	if (!titleLength) {
		reply.code(400).send({
			error: 'Invalid Body',
			details: 'Title Length Must be Between 10 and 30 Characters.',
		})
	}

	next()
}

export const uploadPhotoMiddleware = async (
	req: FastifyRequest,
	reply: FastifyReply,
	next: () => void
) => {
	try {
		const { image, title } = req.body as UploadedPhotoRequestI
		const file = await image
		const buffer = await file?.toBuffer()

		if (buffer) {
			const blobToBase64 = buffer.toString('base64')
			const base64 = `data:image/png;base64,${blobToBase64}`

			const { url } = await cloudinary.uploader.upload(base64)

			req.body = {
				title: title.value,
				url,
			}
		}
	} catch (err) {
		console.log(err)
		reply.code(500).send({ error: 'Internal Server Error' })
	}

	next()
}
