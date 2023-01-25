declare module 'fsify' {
  export type FsifyOptions = {
    cwd?: string;
    persistent?: boolean;
    force?: boolean;
  };

  export type FsifyNodeType = 'file' | 'directory';

  export type FsifyNode = {
    type: FsifyNodeType;
    name: string;
    contents: string | FsifyNode[];
  };

  export interface FsifyFile extends FsifyNode {
    type: 'file';
    encoding?: string;
    mode?: number;
    flag?: string;
  }

  export interface FsifyDirectory extends FsifyNode {
    type: 'directory';
    mode?: string;
  }

  export type FsifyStructure = (FsifyFile | FsifyDirectory)[];

  export type FsifyInstance = {
    (structure: FsifyStructure): Promise<FsifyStructure>;
    DIRECTORY: 'directory';
    FILE: 'file';
    cleanup: () => string[];
  };

  function fsify(options: FsifyOptions): FsifyInstance;

  export default fsify;
}
