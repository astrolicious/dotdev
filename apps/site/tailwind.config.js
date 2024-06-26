export const colors = {
	primary: {
		50: '#FEF6FA',
		100: '#FCEDF5',
		200: '#F9D7E8',
		300: '#F5C1DB',
		400: '#F0A3C9',
		500: '#EB80B5',
		600: '#E34F99',
		700: '#AE1C66',
		800: '#8D1752',
		900: '#6E1240',
		950: '#4B0C2B',
	},
};

export const fontFamily = {
	sans: ['"Inter Variable"'],
	heading: ['"Dosis Variable"'],
};

/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
	theme: {
		extend: {
			colors,
			fontFamily,
		},
	},
	plugins: [require('@tailwindcss/typography'), require('@tailwindcss/forms')],
};
