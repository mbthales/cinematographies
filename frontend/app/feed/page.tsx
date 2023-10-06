import { cookies } from 'next/headers'
import { createDecoder } from 'fast-jwt'

import UserMenu from 'components/UserMenu'

export default function Feed() {
	const cookieStore = cookies()
	const token = cookieStore.get('token')?.value
	const decoder = createDecoder()
	const username = decoder(token as string).username

	return (
		<div className="flex justify-around items-center p-6">
			<h1 className="text-2xl font-heading align-center text-secondary">
				Feed
			</h1>

			<UserMenu username={username} />
		</div>
	)
}
