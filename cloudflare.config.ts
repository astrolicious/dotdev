import { bindings, defineConfig } from 'cf/config';

export default defineConfig({
	accountId: '69e5e09fd9c27bf9e7540c12be67ab9d',
	worker: {
		name: 'website',
		compatibilityDate: '2026-11-18',
		compatibilityFlags: ['global_fetch_strictly_public'],
		entrypoint: '@astrojs/cloudflare/entrypoints/server',
		workersDev: false,
		previewUrls: false,
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
		domains: [
			'astrolicious.dev',
			'www.astrolicious.dev',
			{ hostname: 'preview.astrolicious.dev', production: false, previews: true },
		],
		env: {
			IMAGES: bindings.images({}),
			ASSETS: bindings.assets(),
		},
	},
});
