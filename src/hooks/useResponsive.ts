// @mui
import { Breakpoint } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';

// ----------------------------------------------------------------------

type Query = 'up' | 'down' | 'between' | 'only';
type Start = Breakpoint | number;
type End = Breakpoint | number;

export function useResponsive(query: Query, start?: Start, end?: End) {
  const theme = useTheme();

  const mediaUp = useMediaQuery(theme.breakpoints.up(start as Start));

  const mediaDown = useMediaQuery(theme.breakpoints.down(start as Start));

  const mediaBetween = useMediaQuery(
    theme.breakpoints.between(start as Start, end as End)
  );

  const mediaOnly = useMediaQuery(theme.breakpoints.only(start as Breakpoint));

  if (query === 'up') {
    return mediaUp;
  }

  if (query === 'down') {
    return mediaDown;
  }

  if (query === 'between') {
    return mediaBetween;
  }

  return mediaOnly;
}

// ----------------------------------------------------------------------

export function useWidth() {
  const theme = useTheme();

  const keys = [...theme.breakpoints.keys].reverse();

  return (
    keys.reduce((output, key) => {
      // eslint-disable-next-line react-hooks/rules-of-hooks
      const matches = useMediaQuery(theme.breakpoints.up(key));

      return !output && matches ? key : output;
    }, null as Breakpoint | null) || 'xs'
  );
}
