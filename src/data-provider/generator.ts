import fs from 'fs';
import path from 'path';
import Fuse from 'fuse.js';
import matter from 'gray-matter';
import { z } from 'zod';

function parseResourceData(rootDirectory: string): Record<string, any> {
  // Get file names under /posts
  const fileNames = fs.readdirSync(rootDirectory);

  return fileNames.map((fileName) => {
    // Remove ".md" from file name to get id
    const slug = fileName.replace(/\.md$/, '');

    try {
      // Read markdown file as string
      const fullPath = path.join(rootDirectory, fileName);
      const fileContents = fs.readFileSync(fullPath, 'utf8');

      // Collect file stats
      const fileStats = fs.statSync(fullPath);

      // Use gray-matter to parse the post metadata section
      const matterResult = matter(fileContents);

      // Combine the data
      return {
        slug,
        createdAt: new Date(fileStats.birthtime),
        description: matterResult.content,
        ...matterResult.data,
      };
    } catch (e) {
      throw new Error('Error: Unable to parse file ' + fileName);
    }
  });
}
export type GeneratorProps<T> = {
  resource: string;
  path: string;
  output: string;
  model: z.ZodType<T>;
  index?: {
    path: string;
    keys: string[];
  };
};

export default async function generate<T>({
  resource,
  path: rootPath,
  output,
  model,
  index,
}: GeneratorProps<T>) {
  const rawData = parseResourceData(rootPath);

  // Parse raw json data using zod models
  const data = model.array().parse(rawData);
  // Create the output folder if necessary
  if (!fs.existsSync(path.dirname(output))) {
    fs.mkdirSync(path.dirname(output));
  }

  fs.writeFileSync(output, JSON.stringify({ [resource]: data }));

  if (index) {
    // Create the index output folder if necessary
    if (!fs.existsSync(path.dirname(index.path))) {
      fs.mkdirSync(path.dirname(index.path));
    }

    // Create Fuse.js search indexes
    const fuseIndex = Fuse.createIndex(index.keys, data).toJSON();

    // Write Fuse.js indexes
    fs.writeFileSync(index.path, JSON.stringify(fuseIndex));
  }
}
