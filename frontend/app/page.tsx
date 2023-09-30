import AuthBox from 'components/AuthBox'

export default function Home() {
	return (
		<main className="w-full h-full flex flex-col items-center justify-center">
			<div>
				<h1 className="text-4xl font-heading align-center text-secondary">
					Cinematographies
				</h1>
				<AuthBox />
			</div>
		</main>
	)
}
