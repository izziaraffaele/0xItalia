import fs from 'fs';
import matter from 'gray-matter';
import memoize from 'lodash/memoize';

export const readMarkdownFile = memoize((path: string) => {
  const content = fs.readFileSync(path, 'utf-8');
  const result = matter(content);

  return { ...result, stats: fs.statSync(path) };
});
