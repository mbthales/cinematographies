import 'dotenv/config'

import {
	createUserOnDB,
	deleteUserByUsernameOnDB,
	findUserByUsernameOnDB,
} from 'repositories/user'
import { createToken } from 'utils/jwt'
import { hashPassword } from 'utils/bcrypt'

import type { FastifyReply, FastifyRequest } from 'fastify'
import type { RegisterUserI, LoginUserI } from 'types/user'
import { deleteUserLikedPhotoOnDB } from 'repositories/like'
import { deleteUserPhotosOnDB } from 'repositories/photo'

export const registerController = async (
	req: FastifyRequest,
	reply: FastifyReply
) => {
	try {
		const { username, email, password } = req.body as RegisterUserI

		const hashedPassword = await hashPassword(password)

		const user = await createUserOnDB({
			username,
			email,
			password: hashedPassword,
		})

		reply.status(201).send({ message: 'User Created Successfully', user })
	} catch (err) {
		console.log(err)
		reply.code(500).send({ error: 'Internal Server Error' })
	}
}

export const loginController = async (
	req: FastifyRequest,
	reply: FastifyReply
) => {
	const { username, userId } = req.body as LoginUserI

	const jwtSecret = process.env.JWT_SECRET as string
	const token = await createToken(username, userId, jwtSecret)

	reply
		.cookie('token', token, {
			maxAge: 2592000000, //30 days
			sameSite: 'none',
			secure: true,
		})
		.send({ message: 'User Logged In Successfully' })
}

export const deleteAccountController = async (
	req: FastifyRequest,
	reply: FastifyReply
) => {
	try {
		const { username } = req.params as { username: string }
		const user = await findUserByUsernameOnDB(username)
		const userId = user?.id as string

		await deleteUserLikedPhotoOnDB(userId)
		await deleteUserPhotosOnDB(userId)
		await deleteUserByUsernameOnDB(username)

		reply.send({ message: 'User Deleted Successfully' })
	} catch (err) {
		console.log(err)
		reply.code(500).send({ error: 'Internal Server Error' })
	}
}
