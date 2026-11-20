import cloudflare from '@astrojs/cloudflare';
import mdx from '@astrojs/mdx';

import tailwindcss from '@tailwindcss/vite';
import { defineConfig, fontProviders } from 'astro/config';

export default defineConfig({
	build: {
		inlineStylesheets: 'auto',
	},
	scopedStyleStrategy: 'attribute',
	base: '/',
	devToolbar: {
		enabled: true,
	},
	site: 'https://astrolicious.dev/',
	fonts: [
		{
			provider: fontProviders.fontsource(),
			name: 'Inter',
			cssVariable: '--font-inter',
			weights: ['100 900'],
			subsets: ['latin', 'latin-ext'],
		},
		{
			provider: fontProviders.fontsource(),
			name: 'Dosis',
			cssVariable: '--font-dosis',
			weights: ['200 800'],
			subsets: ['latin', 'latin-ext'],
		},
	],
	prefetch: {
		prefetchAll: false,
		defaultStrategy: 'hover',
	},
	experimental: {
		clientPrerender: true,
	},
	session: false,
	markdown: {
		shikiConfig: {
			theme: 'github-dark-high-contrast',
		},
	},
	integrations: [mdx()],
	// setting `server` as a workaround for https://github.com/withastro/astro/issues/15296
	output: 'static',
	adapter: cloudflare({
		imageService: { build: 'compile', runtime: 'cloudflare-binding' },
	}),
	vite: {
		plugins: [tailwindcss()],
	},
});
