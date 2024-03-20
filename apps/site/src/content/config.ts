import { defineCollection, z } from 'astro:content';
import { docsSchema } from '@astrojs/starlight/schema';

const blogCollection = defineCollection({
	type: 'content',
	schema: z.object({
		title: z.string(),
		draft: z.boolean(),
	}),
});

// biome-ignore lint/suspicious/noExplicitAny: <explanation>
const starlightCollection = defineCollection({ schema: docsSchema() as any });

export const collections = {
	docs: starlightCollection,
	blog: blogCollection,
};
