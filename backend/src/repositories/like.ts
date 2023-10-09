import prisma from 'prisma/index'

export const createUserLikedPhotoOnDB = async (
	photoId: string,
	userId: string
) => {
	await prisma.like.create({
		data: {
			userId,
			photoId,
		},
	})
}

export const deleteUserLikedPhotoOnDB = async (userId: string) => {
	await prisma.like.deleteMany({
		where: {
			userId,
		},
	})
}
