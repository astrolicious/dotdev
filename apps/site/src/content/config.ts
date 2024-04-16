import { defineCollection, z } from 'astro:content';
import { docsSchema } from '@astrojs/starlight/schema';

const blogCollection = defineCollection({
	type: 'content',
	schema: z.object({
		title: z.string(),
		draft: z.boolean(),
		publishDate: z.coerce.date(),
	}),
});

const docsCollection = defineCollection({
	type: 'content',
	// biome-ignore lint/suspicious/noExplicitAny: type to deep for some reason
	schema: docsSchema() as any,
});

const projectsCollection = defineCollection({
	type: 'content',
	schema: z.object({
		name: z.string(),
		kind: z.enum(['integration', 'component', 'misc', 'website', 'event']),
		links: z
			.object({
				website: z.string().url(),
				github: z.string().url(),
			})
			.partial()
			.default({}),
	}),
});

export const collections = {
	blog: blogCollection,
	docs: docsCollection,
	projects: projectsCollection,
};
