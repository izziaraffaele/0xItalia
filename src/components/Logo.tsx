import { forwardRef } from 'react';
// @mui
import { Box, BoxProps } from '@mui/material';
// components
import Link from './Link';
// ----------------------------------------------------------------------

export type LogoProps = BoxProps & {
  disabledLink?: boolean;
};

const Logo = forwardRef(
  ({ disabledLink = false, sx, ...other }: LogoProps, ref) => {
    const logo = (
      <Box
        ref={ref}
        component="img"
        src="/logo.png"
        sx={{ height: 40, cursor: 'pointer', p: 1, ...sx }}
        {...other}
      />
    );

    if (disabledLink) {
      return <>{logo}</>;
    }

    return (
      <Link href="/" sx={{ display: 'contents' }}>
        {logo}
      </Link>
    );
  }
);

export default Logo;
