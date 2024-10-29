import { defineCollection, defineConfig } from "@content-collections/core";

const people = defineCollection({
	name: "people",
	directory: "data/people",
	include: "**/*.yaml",
	schema: (z) => ({
		name: z.string(),
		email: z.string().email(),
		occupation: z.enum(['direttivo', 'smm']).optional(),
		location: z.string(),
	}),
})

const events = defineCollection({
	name: "events",
	directory: "data/events",
	include: "**/*.yaml",
	schema: (z) => ({
		name: z.string(),
		description: z.string(),
		location: z.string().optional(),
		website: z.string().url().optional(),
		dateStart: z.string().optional(),
		dateEnd: z.string().optional(),
	}),
})

const publications = defineCollection({
	name: "publications",
	directory: "data/publications",
	include: "**/*.yaml",
	schema: (z) => ({
		Authors: z.string(),
		Title: z.string(),
		Publication: z.string(),
		Volume: z.string(),
		Number: z.string(),
		Pages: z.string(),
		Year: z.string(),
		Publisher: z.string(),
	}),
})

export default defineConfig({
	collections: [people, events, publications],
});
