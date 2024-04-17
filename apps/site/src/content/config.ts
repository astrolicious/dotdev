import { defineCollection, z } from 'astro:content';
import { docsSchema } from '@astrojs/starlight/schema';

const blogCollection = defineCollection({
	type: 'content',
	schema: z.object({
		title: z.string(),
		draft: z.boolean(),
		publishDate: z.union([z.number(), z.string(), z.date()]).pipe(z.coerce.date()),
	}),
});

const docsCollection = defineCollection({
	type: 'content',
	// biome-ignore lint/suspicious/noExplicitAny: https://github.com/withastro/starlight/issues/1612
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
