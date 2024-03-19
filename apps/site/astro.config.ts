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
		directRenderScript: true,
	},
	integrations: [
		db(),
		simpleStackForm({
			injectMiddleware: false,
		}),
		starlight({
			title: 'Astrolicious',
			customCss: ['./src/styles/starlight.css'],
			favicon: '/favicon.png',
			components: {
				Header: './src/components/StarlightHeader.astro',
			},
		}),
		tailwind({
			applyBaseStyles: false,
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
