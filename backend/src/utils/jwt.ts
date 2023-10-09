import { createVerifier, createSigner } from 'fast-jwt'

export const verifyToken = async (token: string, jwtSecret: string) => {
	try {
		const verify = createVerifier({ key: jwtSecret })
		const verifyToken = verify(token) as {
			username: string
		}
		return verifyToken
	} catch (err) {
		console.log(err)
		throw new Error('Invalid Token')
	}
}

export const createToken = async (username: string, jwtSecret: string) => {
	const sign = createSigner({ key: jwtSecret, expiresIn: 2592000000 }) // 30 days
	return sign({ username })
}
