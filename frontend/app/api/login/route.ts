import { cookies } from 'next/headers'
import type { NextRequest } from 'next/server'

export async function POST(req: NextRequest) {
	try {
		const cookieStore = cookies()

		const url = 'http://127.0.0.1:3000/login'
		const body = await req.json()
		const res = await fetch(url, {
			method: 'POST',
			credentials: 'include',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(body),
		})
		const data = await res.json()

		const cookie = res.headers.getSetCookie()[0]

		if (cookie) {
			const token = cookie.split(';')[0].split('=')[1]
			cookieStore.set('token', token)
		}

		return Response.json(data, { status: res.status })
	} catch (err) {
		console.log(err)
		return Response.json({ error: 'Internal Server Error' }, { status: 500 })
	}
}
