import { findUserByIdOnDB, findUserByUsernameOnDB } from 'repositories/user'
import { registerSchema, loginSchema } from 'validators/auth'
import { verifyToken } from 'utils/jwt'
import { comparePassword } from 'utils/bcrypt'

import type {
	AuthenticateUserParamsI,
	LoginUserI,
	RegisterUserI,
} from 'types/user'
import type { FastifyReply, FastifyRequest } from 'fastify'

export const validateAuthRequestBodyMiddleware = (
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

export const validateUserExistenceMiddleware = async (
	req: FastifyRequest,
	reply: FastifyReply,
	next: () => void
) => {
	try {
		const param = req.params as { username: string }
		const body = req.body as RegisterUserI
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
		console.log(err)
		reply.code(500).send({ error: 'Internal Server Error' })
	}

	next()
}

export const validUserCredentialsMiddleware = async (
	req: FastifyRequest,
	reply: FastifyReply,
	next: () => void
) => {
	try {
		const { username, password } = req.body as LoginUserI
		const userExists = await findUserByUsernameOnDB(username)

		if (!userExists) {
			reply.code(400).send({
				error: 'Invalid Credentials',
			})

			return
		}

		const isPasswordValid = await comparePassword(
			password,
			userExists.password
		)

		if (!isPasswordValid) {
			reply.code(400).send({
				error: 'Invalid Credentials',
			})
		}

		req.body = {
			username,
			password,
			userId: userExists.id,
		}
	} catch (err) {
		console.log(err)
		reply.code(500).send({ error: 'Internal Server Error' })
	}

	next()
}

export const authenticateUserMiddleware = async (
	req: FastifyRequest,
	reply: FastifyReply,
	next: () => void
) => {
	const token = req.cookies.token
	const jwtSecret = process.env.JWT_SECRET as string

	if (!token) {
		reply.code(401).send({
			error: 'Unauthorized',
		})

		return
	}

	try {
		const validToken = await verifyToken(token, jwtSecret)
		const { userId, username } = req.params as AuthenticateUserParamsI

		if (userId) {
			const user = await findUserByIdOnDB(userId)

			if (!user) {
				reply.code(401).send({
					error: 'Unauthorized',
				})

				return
			}

			if (user.username !== validToken.username) {
				reply.code(401).send({
					error: 'Unauthorized',
				})
			}

			next()
		} else if (username !== validToken.username) {
			reply.code(401).send({
				error: 'Unauthorized',
			})
		}
	} catch (err) {
		console.log(err)
		reply.code(401).send({
			error: 'Invalid Token',
		})
	}
}
