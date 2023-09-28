import { MultipartFile } from '@fastify/multipart'

export interface ReqValidatedPhoto {
	image: {
		mimetype: string
	}
	title: {
		value: string
	}
}

export interface ReqUploadedPhoto {
	image: Promise<MultipartFile>
	title: {
		value: string
	}
}

export interface ReqQueryGetPhotos {
	page: string
	limit: string
}

export interface Photo {
	title: string
	url: string
	userId: string
}
