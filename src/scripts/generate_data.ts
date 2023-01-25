import path from 'path';
import { ProjectModel } from '../data-provider';
import generate from '../data-provider/generator';

const CONTENT_ROOT = path.join(process.cwd(), './content/');
const OUTPUT_ROOT = path.join(process.cwd(), './src/generated');
const INDEX_ROOT = path.join(OUTPUT_ROOT, './fuse');

// generate projects data
generate({
  resource: 'projects',
  path: path.join(CONTENT_ROOT, './projects'),
  output: path.join(OUTPUT_ROOT, './data.json'),
  model: ProjectModel,
  index: {
    keys: ['name', 'tagline', 'description', 'tags', 'type'],
    path: path.join(INDEX_ROOT, './projects.json'),
  },
})
  .then(() => {
    console.log('Project data created');
  })
  .catch((e) => {
    console.error(e);
    process.exit(1);
  });
