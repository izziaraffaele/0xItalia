import Fuse from 'fuse.js';
import { SEARCH } from './config';

const INDEX: Record<string, () => Promise<any>> = {
  projects: () => require('./generated/fuse/projects.json'),
};

type IndexedResource = keyof typeof INDEX;

export async function createIndex<T = unknown>(
  resource: IndexedResource,
  data: T[],
  options: Fuse.IFuseOptions<T> = {}
) {
  // Load and deserialize index
  const index = await INDEX[resource]();
  const parsedIndex = Fuse.parseIndex<T>(index);

  // initialize Fuse with the index
  const fuseOptions = {
    ...SEARCH.options,
    ...(SEARCH.collections as any)[resource].options,
    ...options,
  };

  return new Fuse(data, fuseOptions, parsedIndex);
}
