import z from 'zod'

export const registerSchema = z.object({
	username: z.string().trim().toLowerCase().min(3).max(15),
	password: z.string().trim().min(6).max(10),
	email: z.string().trim().email(),
})

export const loginSchema = z.object({
	username: z.string().trim().toLowerCase().min(3).max(15),
	password: z.string().min(6).max(10),
})
