import prisma from 'prisma/index'

interface Photo {
	title: string
	url: string
	userId: string
}

export const createPhotoOnDB = async (data: Photo) => {
	return await prisma.photo.create({
		data,
	})
}
