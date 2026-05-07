import { defineCollection, z } from 'astro:content';

const langSchema = z.enum(['en', 'es']);

const caseStudies = defineCollection({
  type: 'content',
  schema: z.object({
    lang: langSchema,
    title: z.string(),
    summary: z.string(),
    industry: z.string(),
    role: z.string(),
    year: z.number(),
    duration: z.string().optional(),
    tags: z.array(z.string()).default([]),
    stack: z.array(z.string()).default([]),
    boundedContexts: z.array(z.string()).default([]),
    metrics: z
      .array(
        z.object({
          value: z.string(),
          label: z.string(),
        }),
      )
      .default([]),
    featured: z.boolean().default(false),
    draft: z.boolean().default(false),
  }),
});

export const collections = {
  'case-studies': caseStudies,
};
