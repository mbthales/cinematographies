import prisma from 'prisma/index'

import type { RegisterUserI } from 'types/user'

export const createUserOnDB = async (data: RegisterUserI) => {
	return await prisma.user.create({ data })
}

export const findUserByIdOnDB = async (id: string) => {
	return await prisma.user.findUnique({ where: { id } })
}

export const findUserByUsernameOnDB = async (username: string) => {
	return await prisma.user.findUnique({ where: { username } })
}

export const deleteUserByUsernameOnDB = async (username: string) => {
	return await prisma.user.delete({ where: { username } })
}
