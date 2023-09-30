'use client'

import { useForm } from 'react-hook-form'
import { useState } from 'react'

interface Inputs {
	username: string
	password: string
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
	const onSubmit = async (data: Inputs) => {
		setError('')
		setSuccess('')
		setLoading(true)
		const res = await fetch('/api/login', {
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

		setLoading(false)
	}

	return (
		<form onSubmit={handleSubmit(onSubmit)}>
			<input {...register('username', { required: true })} type="text" />
			{errors.username && <span>This field is required</span>}
			<input {...register('password', { required: true })} type="password" />
			{errors.password && <span>This field is required</span>}
			<button
				type="submit"
				className="bg-accent px-6 py-2 text-secondary rounded-sm"
			>
				Login
			</button>
			{loading && <p className="text-secondary">Loading...</p>}
			{error && <p className="text-red-500">{error}</p>}
			{success && <p className="text-green-500">{success}</p>}
			<p className="text-secondary opacity-50">
				Doesn't have a account? Create One!
			</p>
		</form>
	)
}
