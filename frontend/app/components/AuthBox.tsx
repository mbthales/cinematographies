'use client'

import { useForm } from 'react-hook-form'
import { useState } from 'react'
import { useRouter } from 'next/navigation'

interface Inputs {
	username: string
	password: string
	email?: string
}

export default function AuthBox() {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<Inputs>()

	const [error, setError] = useState('')
	const [success, setSuccess] = useState('')
	const [loading, setLoading] = useState(false)
	const [authType, setAuthType] = useState('Login')

	const { push } = useRouter()

	const onSubmit = async (data: Inputs) => {
		setError('')
		setSuccess('')
		setLoading(true)

		const url = authType === 'Login' ? '/api/login' : '/api/register'

		const res = await fetch(url, {
			method: 'POST',
			credentials: 'include',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(data),
		})
		const resData = await res.json()

		if (resData.error) {
			setError(resData.error)
		} else {
			setSuccess(resData.message)
		}

		if (!resData.error && authType === 'Register') {
			setAuthType('Login')
			setSuccess('')
		}

		if (!resData.error && authType === 'Login') {
			push('/feed')
		}

		setLoading(false)
	}

	return (
		<form
			className="flex flex-col mt-10 items-center"
			onSubmit={handleSubmit(onSubmit)}
		>
			<label className="flex flex-col mt-2">
				<span className="text-secondary text-xs mb-1 self-start">
					Username
				</span>
				<input
					className="rounded-sm max-w-[12rem] text-primary p-1 text-xs outline-none bg-secondary focus:border-accent focus:border-2"
					{...register('username', { required: true })}
					type="text"
				/>
				{errors.username && (
					<span className="text-secondary text-opacity-40 text-[0.6rem] mt-2">
						This field is required
					</span>
				)}
			</label>
			{authType === 'Register' && (
				<label className="flex flex-col mt-2">
					<span className="text-secondary text-xs mb-1 self-start">
						Email
					</span>
					<input
						className="rounded-sm max-w-[12rem] text-primary p-1 text-xs outline-none bg-secondary focus:border-accent focus:border-2"
						{...register('email', { required: true })}
						type="email"
					/>
					{errors.email && (
						<span className="text-secondary text-opacity-40 text-[0.6rem] mt-2">
							This field is required
						</span>
					)}
				</label>
			)}
			<label className="flex flex-col mt-2">
				<span className="text-secondary text-xs mb-1">Password</span>
				<input
					className="rounded-sm max-w-[12rem] text-primary p-1 text-xs outline-none bg-secondary focus:border-accent focus:border-2"
					{...register('password', { required: true })}
					type="password"
				/>
				{errors.password && (
					<span className="text-secondary text-opacity-40 text-[0.6rem] mt-2">
						This field is required
					</span>
				)}
			</label>
			<button
				type="submit"
				className="bg-accent px-6 py-2 mt-6 mb-4 text-secondary rounded-sm text-sm max-w-xs
				hover:shadow-accent hover:shadow-sm"
			>
				{authType}
			</button>
			{loading && <p className="text-secondary text-xs mb-6">Loading...</p>}
			{error && <p className="text-red-400 text-xs mb-6">{error}</p>}
			{success && <p className="text-green-400 text-xs mb-6">{success}</p>}
			{authType === 'Login' && (
				<p className="text-xs text-secondary text-opacity-50">
					Doesn't have a account?{' '}
					<span
						onClick={() => setAuthType('Register')}
						className="hover:cursor-pointer hover:underline hover:text-accent"
					>
						Create One!
					</span>
				</p>
			)}
			{authType === 'Register' && (
				<p className="text-xs text-secondary text-opacity-50">
					Already have a account?{' '}
					<span
						onClick={() => setAuthType('Login')}
						className="hover:cursor-pointer hover:underline hover:text-accent"
					>
						Login!
					</span>
				</p>
			)}
		</form>
	)
}
