import { defineConfig } from 'astro/config';
import cloudflare from '@astrojs/cloudflare';

import tailwindcss from '@tailwindcss/vite';

import mdx from '@astrojs/mdx';

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
	prefetch: {
		prefetchAll: false,
		defaultStrategy: 'hover',
	},
	experimental: {
		clientPrerender: true,
	},
	integrations: [mdx()],
	output: 'static',
	adapter: cloudflare({
		imageService: 'cloudflare-binding',
	}),
	vite: {
		build: {
			minify: false,
			cssMinify: false,
		},

		plugins: [tailwindcss()],
	},
});
