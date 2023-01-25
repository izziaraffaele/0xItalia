import { memo } from 'react';
// @mui
import { Stack, BoxProps } from '@mui/material';
//
import NavList from './NavList';
import type { NavItemData } from './NavItem';

// ----------------------------------------------------------------------

export interface NavSectionProps extends BoxProps {
  isCollapse?: boolean;
  navConfig: NavItemData[];
}

const hideScrollbar = {
  msOverflowStyle: 'none',
  scrollbarWidth: 'none',
  overflowY: 'scroll',
  '&::-webkit-scrollbar': {
    display: 'none',
  },
} as const;

function NavSection({ navConfig, sx, ...others }: NavSectionProps) {
  return (
    <Stack direction="row" sx={{ px: 0.5, ...sx }} {...others}>
      <Stack direction="row" sx={{ ...hideScrollbar, py: 1 }}>
        {navConfig.map((list) => (
          <NavList
            key={list.title + list.path}
            data={list}
            depth={1}
            hasChildren={!!list.children}
          />
        ))}
      </Stack>
    </Stack>
  );
}

export default memo(NavSection);
