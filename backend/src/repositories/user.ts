import prisma from 'prisma/index'

import type { RegisterUser } from 'types/auth'

export const createUserOnDB = async (data: RegisterUser) => {
	return await prisma.user.create({ data })
}

export const findUserByUsernameOnDB = async (username: string) => {
	return await prisma.user.findUnique({ where: { username } })
}
