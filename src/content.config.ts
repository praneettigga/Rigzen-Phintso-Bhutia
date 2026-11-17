import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const projects = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/projects' }),
  schema: ({ image }) => {
    const figure = z.object({
      src: image(),
      caption: z.string(),
      /** full = edge to edge, wide = container, tall = narrow portrait column */
      size: z.enum(['full', 'wide', 'tall']).optional(),
    });
    return z.object({
      order: z.number(),
      title: z.string(),
      tibetan: z.string().optional(),
      wylie: z.string().optional(),
      meaning: z.string().optional(),
      typology: z.string(),
      location: z.string().optional(),
      year: z.string(),
      deck: z.string(),
      intro: z.array(z.string()),
      cover: image(),
      hero: figure,
      layout: z.enum(['liner', 'sheets', 'gallery']).default('liner'),
      chapters: z
        .array(
          z.object({
            heading: z.string(),
            body: z.string().optional(),
            /** stack | pair | trio | panorama | split (text beside one tall image) */
            layout: z.enum(['stack', 'pair', 'trio', 'panorama', 'split']).default('stack'),
            figures: z.array(figure).default([]),
          }),
        )
        .default([]),
    });
  },
});

export const collections = { projects };
