import fs from 'fs';
import os from 'os';
import fsify from 'fsify';
import omit from 'lodash/omit';
import YAML from 'yamljs';

export function createContext() {
  const contentRoot = os.tmpdir();

  const fsifyinstance = fsify({
    cwd: contentRoot,
    persistent: false,
    force: true,
  });

  return { fsify: fsifyinstance, contentRoot };
}

export function readJsonFile(path: string) {
  return JSON.parse(fs.readFileSync(path, 'utf-8').toString());
}

export function toMarkdown(data: Record<string, any>, bodyKey = 'description') {
  let markdown = '';

  markdown += '---\n';
  markdown += YAML.stringify(omit(data, bodyKey));
  markdown += '---\n';
  markdown += data[bodyKey];

  return markdown;
}
