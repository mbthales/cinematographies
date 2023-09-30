import { Quattrocento, Lora } from 'next/font/google'

const quattrocento = Quattrocento({
	subsets: ['latin-ext'],
	weight: ['400', '700'],
	variable: '--font-quattrocento',
})
const lora = Lora({
	subsets: ['latin-ext'],
	weight: ['400'],
	variable: '--font-lora',
})

import './globals.css'

import type { Metadata } from 'next'

export const metadata: Metadata = {
	title: 'Cinematographies',
}

export default function RootLayout({
	children,
}: {
	children: React.ReactNode
}) {
	return (
		<html className="w-full h-full" lang="en">
			<body
				className={`${quattrocento.variable} ${lora.variable} font-text bg-primary w-full h-full`}
			>
				{children}
			</body>
		</html>
	)
}
