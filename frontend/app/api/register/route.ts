import type { NextRequest } from 'next/server'

export async function POST(req: NextRequest) {
	try {
		const url = 'http://127.0.0.1:3000/register'
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

		return Response.json(data, { status: res.status })
	} catch (err) {
		console.log(err)
		return Response.json({ error: 'Internal Server Error' }, { status: 500 })
	}
}
