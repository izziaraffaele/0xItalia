import type { NavSectionProps } from '../../components/nav-section';
// paths
import { PATH_COLLECTIONS } from '../../paths';

export const NAV_CONFIG: NavSectionProps['navConfig'] = [
  {
    title: 'navbar.project.title',
    path: '/',
    children: [
      {
        title: 'navbar.project.children.community.title',
        path: PATH_COLLECTIONS.view('community'),
        info: 'navbar.project.children.community.info',
      },
      {
        title: 'navbar.project.children.product.title',
        path: PATH_COLLECTIONS.view('product'),
        info: 'navbar.project.children.product.info',
      },
      {
        title: 'navbar.project.children.organization.title',
        path: PATH_COLLECTIONS.view('organization'),
        info: 'navbar.project.children.organization.info',
      },
    ],
  },
  // {
  //   title: 'Eventi',
  //   path: PATH_EVENTS.root,
  // },
];

export const HEADER_MOBILE = 64;

export const HEADER_DESKTOP = 92;
