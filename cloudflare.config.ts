import { bindings, defineConfig } from 'cf/config';

export default defineConfig({
	worker: {
		name: 'website',
		compatibilityDate: '2025-12-17',
		compatibilityFlags: ['global_fetch_strictly_public'],
		entrypoint: '@astrojs/cloudflare/entrypoints/server',
		previewUrls: true,
		observability: {
			logs: {
				enabled: true,
				headSamplingRate: 1,
				invocationLogs: true,
				persist: true,
			},
			traces: {
				enabled: true,
				headSamplingRate: 1,
			},
		},
		domains: ['astrolicious.dev', 'www.astrolicious.dev'],
		env: {
			SESSION: bindings.kv({}),
			IMAGES: bindings.images({}),
			ASSETS: bindings.assets(),
		},
	},
});
