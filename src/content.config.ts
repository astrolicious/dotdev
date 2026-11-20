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

export const collections = {
	blog: blogCollection,
};
