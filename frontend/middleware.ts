import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'

import type { NextRequest } from 'next/server'

export function middleware({ nextUrl }: NextRequest) {
	const pathname = nextUrl.pathname

	const cookieStore = cookies()
	const token = cookieStore.get('token')?.value

	if (!token && pathname !== '/') {
		return NextResponse.redirect(new URL('/', nextUrl))
	}

	if (token && pathname === '/') {
		return NextResponse.redirect(new URL('/feed', nextUrl))
	}
}

export const config = {
	matcher: ['/', '/feed'],
}
