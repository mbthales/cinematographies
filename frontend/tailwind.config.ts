import type { Config } from 'tailwindcss'

const config: Config = {
	content: [
		'./pages/**/*.{js,ts,jsx,tsx,mdx}',
		'./components/**/*.{js,ts,jsx,tsx,mdx}',
		'./app/**/*.{js,ts,jsx,tsx,mdx}',
	],
	theme: {
		extend: {
			fontFamily: {
				heading: ['var(--font-quattrocento)'],
				text: ['var(--font-lora)'],
			},
			colors: {
				primary: '#303646',
				secondary: '#e8edef',
				accent: '#386782',
			},
		},
	},
	plugins: [],
}
export default config
