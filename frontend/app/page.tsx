import AuthBox from 'components/AuthBox'

export default function Home() {
	return (
		<main className="w-full h-full flex flex-col align-middle">
			<h1 className="text-4xl font-heading align-center text-secondary mt-56">
				Cinematographies
			</h1>
			<AuthBox />
		</main>
	)
}
