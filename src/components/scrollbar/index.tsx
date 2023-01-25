import React, { memo } from 'react';
// @mui
import { Box, SxProps } from '@mui/material';
//
import { StyledRootScrollbar, StyledScrollbar } from './style';

// ----------------------------------------------------------------------

export type ScrollbarProps = {
  sx: SxProps;
};

export const Scrollbar = memo(function ScrollbarInner({
  children,
  sx,
  ...other
}: React.PropsWithChildren<ScrollbarProps>) {
  const userAgent =
    typeof navigator === 'undefined' ? 'SSR' : navigator.userAgent;

  const isMobile =
    /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
      userAgent
    );

  if (isMobile) {
    return (
      <Box sx={{ overflowX: 'auto', ...sx }} {...other}>
        {children}
      </Box>
    );
  }

  return (
    <StyledRootScrollbar>
      <StyledScrollbar timeout={500} clickOnTrack={false} sx={sx} {...other}>
        {children}
      </StyledScrollbar>
    </StyledRootScrollbar>
  );
});
