import { defineConfig } from 'astro/config';

import cloudflare from '@astrojs/cloudflare';
import starlight from '@astrojs/starlight';
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
		optimizeHoistedScript: true,
	},
	integrations: [
		tailwind({
			applyBaseStyles: false,
			nesting: true,
		}),
		starlight({
			title: 'Astrolicious Docs',
			pagefind: false,
		}),
	],
	output: 'server',
	adapter: cloudflare({
		imageService: 'passthrough',
	}),
	vite: {
		ssr: {
			external: ['node:url', 'node:child_process'],
		},
		build: {
			minify: false,
			cssMinify: false,
		},
	},
});
