import fs from 'fs';
import path from 'path';
import { Project } from './models';

type Store = { projects: Project[] };

const DATA_PATH = path.join(process.cwd(), './src/generated/data.json');

let data: Store | null = null;

export function collection<K extends keyof Store>(resource: K): Store[K] {
  if (data) {
    return data[resource];
  }

  const rawData = fs.readFileSync(DATA_PATH).toString();
  data = JSON.parse(rawData) as Store;

  return data[resource];
}
