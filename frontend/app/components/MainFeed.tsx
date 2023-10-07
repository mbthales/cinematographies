import Image from 'next/image'

interface DataPhotos {
	photos: {
		id: number
		title: string
		url: string
	}[]
}

async function getPhotos() {
	const url = 'http://localhost:3000/photos?page=1&limit=5'
	const res = await fetch(url)

	if (!res.ok) {
		throw new Error('Failed to fetch data')
	}

	return res.json()
}

export default async function MainFeed() {
	const { photos }: DataPhotos = await getPhotos()

	return (
		<div className="flex flex-col items-center mt-8">
			{photos.map((photo) => (
				<div key={photo.id} className="mb-8">
					<Image
						src={photo.url}
						width={300}
						height={300}
						alt={photo.title}
					/>
					<figcaption className="text-secondary font-text text-xs mt-2 text-center">
						{photo.title}
					</figcaption>
				</div>
			))}
		</div>
	)
}
