import prisma from 'prisma/index'

import type { PhotoI } from 'types/photo'

export const createPhotoOnDB = async (data: PhotoI) => {
	return await prisma.photo.create({
		data,
	})
}

export const getPhotosOnDB = async (skip: number, take: number) => {
	return await prisma.photo.findMany({
		skip,
		take,
		orderBy: {
			createdAt: 'desc',
		},
	})
}

export const getPhotoByIdOnDB = async (id: string) => {
	return await prisma.photo.findUnique({
		where: {
			id,
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

export const updatePhotoLikesOnDB = async (id: string, likes: number) => {
	return await prisma.photo.update({
		where: {
			id,
		},
		data: {
			likes,
		},
	})
}

export const deleteUserPhotosOnDB = async (userId: string) => {
	await prisma.photo.deleteMany({
		where: {
			userId,
		},
	})
}
