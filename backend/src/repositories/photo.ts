import prisma from 'prisma/index'

import type { Photo } from 'types/photo'

export const createPhotoOnDB = async (data: Photo) => {
	return await prisma.photo.create({
		data,
	})
}

export const getAllPhotosFromDB = async (skip: number, take: number) => {
	return await prisma.photo.findMany({
		skip,
		take,
		orderBy: {
			createdAt: 'desc',
		},
	})
}
