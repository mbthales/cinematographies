import type { NextRequest } from 'next/server'
import { cookies } from 'next/headers'

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
	// const cookieStore = cookies()
	// const token = cookieStore.get('token')
	// console.log(token)
	// console.log(request.nextUrl)
}

// // See "Matching Paths" below to learn more
// // export const config = {
// // 	matcher: '/about/:path*',
// // }
