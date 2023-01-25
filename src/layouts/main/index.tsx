import React from 'react';
// @mui
import { styled } from '@mui/material/styles';
//
import Header from './header';
import Footer from './footer';
import { HEADER_DESKTOP, HEADER_MOBILE } from './config';
import { Divider } from '@mui/material';

// ----------------------------------------------------------------------

const StyledRoot = styled('div')({
  height: '100%',
  // overflow: 'hidden',
});

const Main = styled('div')(({ theme }) => ({
  flexGrow: 1,
  overflow: 'auto',
  minHeight: '100%',
  paddingTop: HEADER_MOBILE + 24,
  paddingBottom: theme.spacing(10),
  [theme.breakpoints.up('lg')]: {
    paddingTop: HEADER_DESKTOP + 24,
  },
}));

// ----------------------------------------------------------------------

export default function MainLayout({ children }: React.PropsWithChildren) {
  return (
    <StyledRoot>
      <Header />

      <Main>{children}</Main>
      <Divider />
      <Footer />
    </StyledRoot>
  );
}
