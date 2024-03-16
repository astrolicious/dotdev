import { column, defineDb, defineTable } from 'astro:db';

const Submission = defineTable({
	columns: {
		id: column.number({ primaryKey: true }),
		integration_url: column.text(),
		author_url: column.text(),
		is_author: column.boolean(),
		message: column.text({ optional: true }),
	},
});

export default defineDb({
	tables: {
		Submission,
	},
});
