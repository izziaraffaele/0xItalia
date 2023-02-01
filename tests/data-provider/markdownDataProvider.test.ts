import path from 'path';
import { FsifyStructure } from 'fsify';

import { createContext, toMarkdown, readJsonFile } from '../utils';
import { Project, ProjectModel } from '../../src/data-provider';
import dataProvider from '../../src/data-provider/markdownDataProvider';

const { fsify, contentRoot } = createContext();

const projects = readJsonFile(
  path.join(__dirname, './../__fixtures__/projects.json')
);

const structure: FsifyStructure = [
  {
    type: fsify.DIRECTORY,
    name: 'projects',
    contents: projects
      .slice(0, 10)
      .map(({ slug, createdAt, ...item }: any) => ({
        type: fsify.FILE,
        name: `${slug}.md`,
        contents: toMarkdown(item),
      })),
  },
];

const RESOURCE_PATH = path.join(contentRoot, './projects');

describe('DataProvider', () => {
  it('should get a list of items', async () => {
    await fsify(structure);

    const provider = dataProvider(RESOURCE_PATH, ProjectModel);
    const result = provider.find();

    function x(v: Project) {
      return false;
    }

    expect(result.length).toBe(10);
    expect(result[0]).toMatchObject({
      ...projects[0],
      createdAt: expect.any(String),
    });
  });

  it('should get a list of filtered items', async () => {
    await fsify(structure);

    const provider = dataProvider(RESOURCE_PATH, ProjectModel);
    const result = provider.find((v) => v.slug !== projects[0].slug);

    expect(result.length).toBe(9);
    expect(result[0].slug).not.toBe(projects[0].slug);
  });

  it('should get item by slug', async () => {
    await fsify(structure);

    const provider = dataProvider(RESOURCE_PATH, ProjectModel);
    const result = provider.getBySlug(projects[0].slug);

    expect(result).toMatchObject({
      ...projects[0],
      createdAt: expect.any(String),
    });
  });
});
