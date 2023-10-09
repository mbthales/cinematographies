export interface RegisterUserI {
	username: string
	password: string
	email: string
}

export interface LoginUserI {
	username: string
	userId: string
	password: string
}

export interface AuthenticateUserParamsI {
	username: string
	userId?: string
}
