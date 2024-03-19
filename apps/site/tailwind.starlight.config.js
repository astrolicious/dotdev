/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
	theme: {
		extend: {
			colors: {
				'neon-pink': '#FF439D',
			},
		},
	},
	plugins: [
		require('@astrojs/starlight-tailwind')(),
		require('@tailwindcss/typography'),
		require('@tailwindcss/forms'),
	],
};
