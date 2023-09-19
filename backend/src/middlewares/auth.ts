import bcrypt from 'bcrypt'

import { findUserByUsernameOnDB } from 'repositories/user'
import { registerSchema, loginSchema } from 'validators/auth'

import type { LoginUser, RegisterUser } from 'types/auth'
import type { FastifyReply, FastifyRequest } from 'fastify'

export const checkIfBodyIsValid = (
	{ url, body }: FastifyRequest,
	reply: FastifyReply,
	next: () => void
) => {
	const parsedBody =
		url === '/register'
			? registerSchema.safeParse(body)
			: loginSchema.safeParse(body)

	if (!parsedBody.success) {
		reply.code(400).send({
			error: 'Invalid Body',
			details: parsedBody.error.issues,
		})
	}

	next()
}

export const checkIfUserExists = async (
	req: FastifyRequest,
	reply: FastifyReply,
	next: () => void
) => {
	try {
		const body = req.body as RegisterUser
		const userExists = await findUserByUsernameOnDB(body.username)

		if (userExists) {
			reply.code(400).send({
				error: 'User Already Exists',
			})
		}
	} catch (err) {
		reply.code(500).send({ error: 'Internal Server Error' })
	}

	next()
}

export const checkUserCredentials = async (
	req: FastifyRequest,
	reply: FastifyReply,
	next: () => void
) => {
	try {
		const { username, password } = req.body as LoginUser
		const userExists = await findUserByUsernameOnDB(username)

		if (!userExists) {
			reply.code(400).send({
				error: 'Invalid Credentials',
			})

			return
		}

		const isPasswordValid = await bcrypt.compare(
			password,
			userExists.password
		)

		if (!isPasswordValid) {
			reply.code(400).send({
				error: 'Invalid Credentials',
			})
		}
	} catch (err) {
		reply.code(500).send({ error: 'Internal Server Error' })
	}

	next()
}
