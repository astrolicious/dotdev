import { defineConfig } from 'astro/config';

import { resolve } from 'node:path';
import cloudflare from '@astrojs/cloudflare';
import db from '@astrojs/db';
import starlight from '@astrojs/starlight';
import tailwind from '@astrojs/tailwind';
import icon from 'astro-icon';

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
		starlight({
			title: 'Astrolicious',
			customCss: ['./src/styles/starlight.css'],
			favicon: '/favicon.png',
			components: {
				Head: './src/components/starlight/StarlightHead.astro',
				Header: './src/components/starlight/StarlightHeader.astro',
				Sidebar: './src/components/starlight/StarlightSidebar.astro',
				Footer: './src/components/starlight/StarlightFooter.astro',
			},
		}),
		tailwind({
			applyBaseStyles: false,
		}),
		icon({
			include: {
				ri: ['github-fill', 'twitter-x-fill', 'discord-fill', 'global-fill'],
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
