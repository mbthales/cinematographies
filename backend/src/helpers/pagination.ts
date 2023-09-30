import type { FastifyRequest } from 'fastify'
import type { ReqQueryGetPhotos } from 'types/photo'

export default (req: FastifyRequest) => {
	const query = req.query as ReqQueryGetPhotos
	const page = query.page ? parseInt(query.page, 10) : 1
	const limit = query.limit ? parseInt(query.limit, 10) : 10
	const offset = (page - 1) * limit

	return {
		offset,
		limit,
	}
}
