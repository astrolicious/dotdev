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
		directRenderScript: false,
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
				Header: './src/components/starlight/StarlightHeader.astro',
				Sidebar: './src/components/starlight/StarlightSidebar.astro',
				Footer: './src/components/starlight/StarlightFooter.astro'
			},
		}),
		tailwind({
			applyBaseStyles: false,
		}),
		icon({
			include: {
				ri: [
					'github-fill',
					'twitter-x-fill',
					'discord-fill',
					'global-fill',
				],
				ph: ['dot-duotone'],
			},
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
		ssr: {
			external: ['node:url', 'node:child_process', 'node:path'],
		},
		build: {
			minify: false,
			cssMinify: false,
		},
	},
});
