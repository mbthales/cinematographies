export interface RegisterUserI {
	username: string
	password: string
	email: string
}

export interface LoginUserI {
	username: string
	password: string
}

export interface AuthenticateUserParamsI {
	username: string
	userId?: string
}
