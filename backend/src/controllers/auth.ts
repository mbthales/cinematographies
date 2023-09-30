import bcrypt from 'bcrypt'
import { createSigner } from 'fast-jwt'
import 'dotenv/config'

import { createUserOnDB, deleteUserByUsernameOnDB } from 'repositories/user'

import type { FastifyReply, FastifyRequest } from 'fastify'
import type { RegisterUser, LoginUser } from 'types/auth'

export const registerController = async (
	req: FastifyRequest,
	reply: FastifyReply
) => {
	try {
		const { username, email, password } = req.body as RegisterUser

		const hashedPassword = await bcrypt.hash(password, 10)

		const user = await createUserOnDB({
			username,
			email,
			password: hashedPassword,
		})

		reply.status(201).send({ message: 'User Created Successfully', user })
	} catch (err) {
		reply.code(500).send({ error: 'Internal Server Error' })
	}
}

export const loginController = async (
	req: FastifyRequest,
	reply: FastifyReply
) => {
	const { username } = req.body as LoginUser

	const jwtSecret = process.env.JWT_SECRET as string
	const sign = createSigner({ key: jwtSecret, expiresIn: 2592000000 }) // 30 days
	const token = sign({ username })

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

		await deleteUserByUsernameOnDB(username)

		reply.send({ message: 'User Deleted Successfully' })
	} catch (err) {
		reply.code(500).send({ error: 'Internal Server Error' })
	}
}