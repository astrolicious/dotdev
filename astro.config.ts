import cloudflare from '@astrojs/cloudflare';
import mdx from '@astrojs/mdx';

import tailwindcss from '@tailwindcss/vite';
import { defineConfig } from 'astro/config';

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
	// setting `server` as a workaround for https://github.com/withastro/astro/issues/15296
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
