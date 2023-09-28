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
