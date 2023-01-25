import path from 'path';
import { FsifyStructure } from 'fsify';
import Fuse from 'fuse.js';
import { ZodError } from 'zod';

import { createContext, toMarkdown, readJsonFile } from '../utils';
import { ProjectModel } from '../../src/data-provider';
import generate from '../../src/data-provider/generator';

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

const OUTPUT_PATH = path.join(contentRoot, './generated/data.json');
const INDEX_PATH = path.join(contentRoot, './generated/fuse');

describe('data provider generator', () => {
  it('should include resource data in the output file', async () => {
    await fsify(structure);
    const RESOURCE_PATH = path.join(contentRoot, './projects');

    await generate({
      resource: 'projects',
      path: RESOURCE_PATH,
      output: OUTPUT_PATH,
      model: ProjectModel,
    });

    const result = readJsonFile(OUTPUT_PATH);

    expect(result.projects.length).toBe(10);
    expect(result.projects[0]).toMatchObject({
      ...projects[0],
      createdAt: expect.any(String),
    });
  });

  it('should create fuse index', async () => {
    const createIndexMock = jest.spyOn(Fuse, 'createIndex');

    await fsify(structure);

    const RESOURCE_PATH = path.join(contentRoot, './projects');
    const RESOURCE_INDEX_PATH = path.join(INDEX_PATH, './projects.json');

    const keys = ['name', 'tagline', 'description', 'slug'];

    await generate({
      resource: 'projects',
      path: RESOURCE_PATH,
      output: OUTPUT_PATH,
      model: ProjectModel,
      index: {
        keys,
        path: RESOURCE_INDEX_PATH,
      },
    });

    const data = readJsonFile(OUTPUT_PATH);
    const result = readJsonFile(RESOURCE_INDEX_PATH);

    expect(result).toBeTruthy();
    expect(createIndexMock).toHaveBeenCalledWith(
      keys,
      data.projects.map((item: any) => ({
        ...item,
        createdAt: expect.any(Date),
      }))
    );
  });

  it('should fail with wrong data structure', async () => {
    const invalidStructure = [
      {
        type: fsify.DIRECTORY,
        name: 'invalid-projects',
        contents: [
          ...(structure[0].contents as any[]),
          {
            type: fsify.FILE,
            name: `invalid.md`,
            contents: toMarkdown({ invalid: true }),
          },
        ],
      },
    ];

    await fsify(invalidStructure);

    const RESOURCE_PATH = path.join(contentRoot, './invalid-projects');

    await expect(
      generate({
        resource: 'projects',
        path: RESOURCE_PATH,
        output: OUTPUT_PATH,
        model: ProjectModel,
      })
    ).rejects.toBeInstanceOf(ZodError);
  });
});
