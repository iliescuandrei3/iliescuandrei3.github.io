import { defineCollection } from "astro:content";
import { z } from "astro/zod"
import { glob } from "astro/loaders";

const bio = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/bio' }),
  schema: z.object({
    name: z.string(),
    username: z.string(),
  }),
});

const experience = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/experience' }),
  schema: z.object({
    role: z.string(),
    company: z.string(),
    startDate: z.string(),
    endDate: z.string(),
    location: z.string(),
    logo: z.string(),
    order: z.number().default(0)
  }),
});

const projects = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/projects' }),
  schema: z.object({
    name: z.string(),
    category: z.string(),
    tags: z.array(z.string()),
    summary: z.string(),
    image: z.string().optional(),
    githubUrl: z.url().optional(),
    projectUrl: z.url().optional(),
    order: z.number().default(0),
  }),
});

export const collections = {
  bio, experience, projects
};