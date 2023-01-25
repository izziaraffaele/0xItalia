// ----------------------------------------------------------------------
export * from './NavSection';
export { default as NavSection } from './NavSection';

export function isExternalLink(path: string) {
  return path.includes('http');
}

export function getActive(path: string, pathname: string, asPath: string) {
  const checkPath = path.startsWith('#');

  return (
    (!checkPath && pathname.includes(path)) ||
    (!checkPath && asPath.includes(path))
  );
}
