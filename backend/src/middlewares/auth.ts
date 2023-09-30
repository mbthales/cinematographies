import bcrypt from 'bcrypt'

import { findUserByUsernameOnDB } from 'repositories/user'
import { registerSchema, loginSchema } from 'validators/auth'

import type { LoginUser, RegisterUser } from 'types/auth'
import type { FastifyReply, FastifyRequest } from 'fastify'

import { createVerifier } from 'fast-jwt'

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
		const param = req.params as { username: string }
		const body = req.body as RegisterUser
		const username = param.username || body.username
		const userExists = await findUserByUsernameOnDB(username)

		if (param.username) {
			if (!userExists) {
				reply.code(404).send({
					message: 'User Does Not Exist',
				})

				return
			}

			return
		}

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

export const checkIfUserIsAuthenticated = (
	req: FastifyRequest,
	reply: FastifyReply,
	next: () => void
) => {
	const token = req.cookies.token
	const jwtSecret = process.env.JWT_SECRET as string
	const verify = createVerifier({ key: jwtSecret })

	if (!token) {
		reply.code(401).send({
			error: 'Unauthorized',
		})

		return
	}

	try {
		const verifyToken = verify(token) as {
			username: string
		}
		const reqParam = req.params as { username: string }

		if (reqParam.username !== verifyToken.username) {
			reply.code(401).send({
				error: 'Unauthorized',
			})

			return
		}
	} catch (err) {
		reply.code(401).send({
			error: 'Invalid Token',
		})

		return
	}

	next()
}
