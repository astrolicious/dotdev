import { defineConfig } from 'astro/config';

import { resolve } from 'node:path';
import cloudflare from '@astrojs/cloudflare';
import tailwind from '@astrojs/tailwind';

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
		globalRoutePriority: true,
		directRenderScript: true,
	},
	integrations: [
		tailwind({
			applyBaseStyles: false,
		}),
	],
	output: 'hybrid',
	adapter: cloudflare({
		imageService: 'passthrough',
		routes: {
			extend: {
				exclude: [{ pattern: '/pagefind/*' }],
			},
		},
	}),
	vite: {
		resolve: {
			alias: {
				'~': resolve(import.meta.dirname, './src'),
			},
		},
		ssr: {
			external: ['node:url', 'node:child_process', 'node:path', 'node:fs'],
		},
		build: {
			minify: false,
			cssMinify: false,
		},
	},
});
