import { defineCollection, defineConfig } from "@content-collections/core";
import { compileMarkdown } from "@content-collections/markdown";

const people = defineCollection({
  name: "people",
  directory: "data/people",
  include: "**/*.yaml",
  schema: (z) => ({
    name: z.string(),
    email: z.string().email().optional(),
    occupation: z.optional(z.enum(["direttivo", "smm", "comitato", ""])),
    location: z.string(),
    level: z.enum(["young", "senior"]),
  }),
});

const events = defineCollection({
  name: "events",
  directory: "data/events",
  include: "**/*.md",
  schema: (z) => ({
    name: z.string(),
    description: z.string(),
    long_description: z.string().optional(),
    location: z.string().optional(),
    website: z.string().url().optional(),
    carouselImages: z.array(z.string()).optional(),
    logo: z.string().optional(),
    dateStart: z.string().date(),
    dateEnd: z.string().date().optional(),
  }),
  transform: async (event, context) => {
    const html = await compileMarkdown(context, event);
    return {
      ...event,
      id: event._meta.fileName.split(".")[0],
      html,
    };
  },
});

const publications = defineCollection({
  name: "publications",
  directory: "data/publications",
  include: "**/*.md",
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
});

export default defineConfig({
  collections: [people, events, publications],
});
