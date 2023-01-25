// @mui
import { styled } from '@mui/material/styles';
import { Box, AppBar, Toolbar, useTheme } from '@mui/material';
// hooks
import useLocales from '../../../hooks/useLocales';
// utils
import { bgBlur } from '../../../utils/cssStyles';
// components
import Logo from '../../../components/Logo';
import { NavSection } from '../../../components/nav-section';
//
import Searchbar from './Searchbar';
import AddProjectPopup from './AddProjectPopup';
import { HEADER_DESKTOP, HEADER_MOBILE, NAV_CONFIG } from '../config';

// ----------------------------------------------------------------------

const StyledRoot = styled(AppBar)(({ theme }) => ({
  ...(bgBlur({ color: theme.palette.background.default }) as any),
  boxShadow: 'none',
  borderBottom: '1px solid ' + theme.palette.background.paper,
}));

const StyledToolbar = styled(Toolbar)(({ theme }) => ({
  minHeight: HEADER_MOBILE,
  ['@media (orientation: landscape)']: {
    minHeight: HEADER_MOBILE,
  },
  [theme.breakpoints.up('lg')]: {
    minHeight: HEADER_DESKTOP,
    padding: theme.spacing(0, 5),
    ['@media (orientation: landscape)']: {
      minHeight: HEADER_MOBILE,
    },
  },
}));

// ----------------------------------------------------------------------

export default function Header() {
  const theme = useTheme();
  const { translate } = useLocales();

  return (
    <StyledRoot>
      <StyledToolbar>
        <Logo
          sx={{
            mr: 1,
            [theme.breakpoints.up('sm')]: {
              mr: 2.5,
            },
            [theme.breakpoints.up('lg')]: {
              mr: 5,
            },
          }}
        />
        <Searchbar
          sx={{
            mr: 2.5,
            [theme.breakpoints.up('lg')]: {
              mr: 5,
            },
          }}
        />
        {/* <Box
          sx={(theme) => ({
            mr: 2.5,
            [theme.breakpoints.up('lg')]: {
              mr: 5,
            },
          })}
        >
          <NavSection
            navConfig={NAV_CONFIG}
            sx={{
              display: 'none',
              [theme.breakpoints.up('md')]: {
                display: 'flex',
              },
            }}
          />
        </Box> */}
        <Box sx={{ flex: 1 }} />
        <AddProjectPopup />
      </StyledToolbar>
    </StyledRoot>
  );
}
