import path from 'path';
import markdownDataProvider from './markdownDataProvider';
import { ProjectModel } from './models';

export * from './models';

const CONTENT_ROOT = path.join(process.cwd(), './content/');

export default {
  projects: markdownDataProvider(
    path.join(CONTENT_ROOT, './projects'),
    ProjectModel
  ),
};
