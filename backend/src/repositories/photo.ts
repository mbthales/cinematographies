import prisma from 'prisma/index'

import type { Photo } from 'types/photo'

export const createPhotoOnDB = async (data: Photo) => {
	return await prisma.photo.create({
		data,
	})
}

export const getAllPhotosOnDB = async (skip: number, take: number) => {
	return await prisma.photo.findMany({
		skip,
		take,
		orderBy: {
			createdAt: 'desc',
		},
	})
}

export const getUserPhotosOnDB = async (
	userId: string,
	skip: number,
	take: number
) => {
	return await prisma.photo.findMany({
		where: {
			userId,
		},
		skip,
		take,
		orderBy: {
			createdAt: 'desc',
		},
	})
}
