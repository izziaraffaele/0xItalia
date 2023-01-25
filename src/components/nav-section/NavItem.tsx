import { forwardRef } from 'react';
// @mui
import {
  Box,
  Tooltip,
  ListItemButton,
  ListItemButtonProps,
  ListItemText,
  ListItemIcon,
} from '@mui/material';
import { styled, alpha } from '@mui/material/styles';
import InfoIcon from '@mui/icons-material/Info';
// hooks
import useLocales from '../../hooks/useLocales';

// ----------------------------------------------------------------------
export type NavItemData = {
  title: string;
  path: string;
  icon?: React.ReactElement;
  info?: React.ReactElement;
  caption?: string;
  disabled?: boolean;
  roles?: string[];
  children?: any;
};

export type NavItemProps = ListItemButtonProps & {
  item: NavItemData;
  depth: number;
  open: boolean;
  active: boolean;
  isCollapse?: boolean;
};

export interface ListItemStyleProps extends ListItemButtonProps {
  open: boolean;
  active: boolean;
  depth: number;
}

export const ListItemStyle = styled(ListItemButton, {
  shouldForwardProp: (prop) => prop !== 'active' && prop !== 'open',
})<ListItemStyleProps>(({ active, depth, open, theme }) => {
  const activeStyle = {
    // color: theme.palette.text.primary,
    color: theme.palette.primary.main,
    backgroundColor: 'transparent',
  };

  const activeSubStyle = {
    boxShadow: 'none',
    color: theme.palette.primary.main,
    backgroundColor: alpha(
      theme.palette.primary.main,
      theme.palette.action.selectedOpacity
    ),
  };

  const hoverStyle = {
    color: theme.palette.text.primary,
    backgroundColor: 'transparent',
    ...(depth > 1 && {
      backgroundColor: theme.palette.action.hover,
      boxShadow: `inset 0 0 1px 1px ${theme.palette.divider}`,
    }),
  };

  return {
    margin: theme.spacing(0, 0.5),
    padding: theme.spacing(0, 1),
    color: theme.palette.text.secondary,
    borderRadius: theme.shape.borderRadius,
    '&:hover': hoverStyle,
    // Active item
    ...(active && {
      ...activeStyle,
      '&:hover': { ...activeStyle },
    }),
    // Active item sub
    ...(active &&
      depth !== 1 && {
        ...activeSubStyle,
        '&:hover': { ...activeSubStyle },
      }),
    // Sub item
    ...(depth && {
      ...(depth > 1 && {
        width: '100%',
        margin: 0,
        paddingRight: 0,
        paddingLeft: theme.spacing(1),
      }),
    }),
    // Open
    ...(open && !active && hoverStyle),
  };
});

const NavItem = forwardRef<HTMLDivElement & HTMLAnchorElement, NavItemProps>(
  ({ item, depth, active, open, ...other }, ref) => {
    const { title, icon, info, disabled, caption } = item;
    const { translate } = useLocales();

    return (
      <ListItemStyle
        ref={ref}
        open={open}
        depth={depth}
        active={active}
        disabled={disabled}
        {...other}
      >
        {icon && (
          <ListItemIcon
            sx={{
              mr: 1,
              flexShrink: 0,
            }}
          >
            {icon}
          </ListItemIcon>
        )}

        <ListItemText
          primary={translate(title, title)}
          primaryTypographyProps={{
            noWrap: true,
            variant: active ? 'subtitle2' : 'body2',
          }}
          secondary={translate(info, info)}
          secondaryTypographyProps={{
            variant: 'caption',
            sx: { textTransform: 'none' },
          }}
        />

        {caption && (
          <Tooltip title={translate(caption, caption)} arrow>
            <Box component="span" sx={{ ml: 0.5, lineHeight: 0 }}>
              <InfoIcon />
            </Box>
          </Tooltip>
        )}
      </ListItemStyle>
    );
  }
);

export default NavItem;
