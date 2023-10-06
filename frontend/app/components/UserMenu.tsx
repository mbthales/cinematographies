'use client'

import { useState } from 'react'

export default function UserMenu({ username }: { username: string }) {
	const [isDropdownOpen, setIsDropdownOpen] = useState(false)

	const handleLogout = async () => {
		const url = '/api/logout'
		const res = await fetch(url, {
			method: 'POST',
		})

		await res.json()

		window.location.href = '/'
	}

	return (
		<div className="relative">
			<p
				onClick={() => setIsDropdownOpen(!isDropdownOpen)}
				className="text-xs font-text text-secondary cursor-pointer hover:text-accent hover:underline"
			>
				{username}
			</p>
			{isDropdownOpen && (
				<ul className="absolute top-5 w-full flex justify-center">
					<li
						onClick={() => handleLogout()}
						className="text-[0.6rem] text-opacity-60 font-text text-secondary mx-auto text-center cursor-pointer"
					>
						Logout
					</li>
				</ul>
			)}
		</div>
	)
}
