// ----------------------------------------------------------------------

function path(root: string, sublink: string) {
  return `${root}${sublink}`;
}

const ROOTS_PROJECTS = '/projects';
const ROOTS_COLLECTIONS = '/collections';

// ----------------------------------------------------------------------

/**
 * Projects paths
 */
export const PATH_PROJECTS = {
  root: ROOTS_PROJECTS,
  view: (slug: string) => path(ROOTS_PROJECTS, `/${slug}`),
};

/**
 * Collections path
 *
 * These paths are temporary mapped to root projects path.
 * /collections/community -> /projects?type=community
 *
 * @see next-rewrites.config.js
 */
export const PATH_COLLECTIONS = {
  view: (slug: string) => path(ROOTS_COLLECTIONS, `/${slug}`),
};
