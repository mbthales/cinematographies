import type { MultipartFile } from '@fastify/multipart'

export interface ValidatedPhotoRequestI {
	image: {
		mimetype: string
	}
	title: {
		value: string
	}
}

export interface UploadedPhotoRequestI {
	image: Promise<MultipartFile>
	title: {
		value: string
	}
}

export interface PhotosQueryI {
	page: string
	limit: string
}

export interface PhotoI {
	title: string
	url: string
	userId: string
}
