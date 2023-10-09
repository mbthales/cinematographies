import type { FastifyRequest } from 'fastify'
import type { PhotosQueryI } from 'types/photo'

export default (req: FastifyRequest) => {
	const query = req.query as PhotosQueryI
	const page = query.page ? parseInt(query.page) : 1
	const limit = query.limit ? parseInt(query.limit) : 5
	const offset = (page - 1) * limit

	return {
		offset,
		limit,
	}
}
