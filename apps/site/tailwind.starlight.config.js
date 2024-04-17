import { colors, fontFamily } from "./tailwind.config"

/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
	theme: {
		extend: {
			colors: {
				primary: colors.primary,
				accent: colors.primary,
			},
			fontFamily,
		},
	},
	plugins: [require('@astrojs/starlight-tailwind')()],
};
