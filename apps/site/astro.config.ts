import { defineConfig } from 'astro/config';

import cloudflare from '@astrojs/cloudflare';
import db from '@astrojs/db';
import starlight from '@astrojs/starlight';
import tailwind from '@astrojs/tailwind';
import icon from 'astro-icon';
import simpleStackForm from 'simple-stack-form';

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
		db(),
		starlight({
			title: 'Astrolicious Docs',
			pagefind: false,
		}),
		simpleStackForm({
			injectMiddleware: false,
		}),
		icon({
			include: {
				ri: ['github-line', 'twitter-x-line', 'discord-line'],
				ph: ['dot-duotone'],
			},
		}),
	],
	output: 'server',
	adapter: cloudflare({
		imageService: 'passthrough',
	}),
	vite: {
		ssr: {
			external: ['node:url', 'node:child_process', 'node:path'],
		},
		build: {
			minify: false,
			cssMinify: false,
		},
	},
});
