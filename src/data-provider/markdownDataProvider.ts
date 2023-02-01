import fs from 'fs';
import path from 'path';
import { z } from 'zod';
import { readMarkdownFile } from '../utils/readMarkdownFile';

export default function provider<T, D extends z.ZodTypeDef, I>(
  root: string,
  schema: z.ZodType<T, D, I>
) {
  function getBySlug(slug: string) {
    const filePath = path.join(root, slug + '.md');
    const { data, content, stats } = readMarkdownFile(filePath);

    return schema.parse({
      slug,
      description: content,
      createdAt: stats.birthtime,
      ...data,
    });
  }

  function find(filter?: (value: T) => boolean) {
    const files = fs.readdirSync(root);
    const data = files.map((filename) => {
      // Remove ".md" from file name to get the slug
      const slug = filename.replace(/\.md$/, '');
      const filePath = path.join(root, filename);
      const { data, content, stats } = readMarkdownFile(filePath);

      return schema.parse({
        slug,
        description: content,
        createdAt: stats.birthtime,
        ...data,
      });
    });

    // apply filter if necessary
    return !filter ? data : data.filter(filter);
  }

  return { getBySlug, find };
}
