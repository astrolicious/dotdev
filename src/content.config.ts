import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const blogCollection = defineCollection({
	loader: glob({ pattern: '**/*.(md|mdx)', base: './src/data/blog' }),
	schema: z.object({
		title: z.string(),
		draft: z.boolean(),
		publishDate: z.union([z.number(), z.string(), z.date()]).pipe(z.coerce.date()),
		authors: z.array(
			z.object({
				name: z.string(),
				url: z.string().url(),
			})
		),
	}),
});

const projectsCollection = defineCollection({
	loader: glob({ pattern: '**/*.(md|mdx)', base: './src/data/projects' }),
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
	projects: projectsCollection,
};
