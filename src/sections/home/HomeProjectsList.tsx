import { useMemo } from 'react';
import NextLink from 'next/link';
// @mui
import { Grid, Box, StackProps, Typography, Button } from '@mui/material';
// hooks
import useLocales from '../../hooks/useLocales';
// components
import CardSkeleton from '../../components/CardSkeleton';

export type HomeProjectsListProps<T> = Omit<StackProps, 'children'> & {
  title?: React.ReactNode;
  data?: T[];
  viewMore?: false | { href: string; label?: string };
  children: (item: T, index: number) => React.ReactNode;
};

export default function HomeProjectsList<T>(props: HomeProjectsListProps<T>) {
  const { data, children, title, viewMore = false, ...others } = props;

  const entries = useMemo(() => data || [...Array(12)], [data]);
  const { translate } = useLocales();

  return (
    <Box component="section" {...others}>
      <Typography variant="h4" gutterBottom>
        {title}
      </Typography>
      <Grid container spacing={2}>
        {entries.map((item, index) => (
          <Grid
            key={index}
            item
            xs={12}
            sm={6}
            // md={(index === 0 && 6) || 3}
          >
            {item ? children(item, index) : <CardSkeleton />}
          </Grid>
        ))}
      </Grid>

      {viewMore && (
        <Box mt={2}>
          <NextLink href={viewMore.href} legacyBehavior passHref>
            <Button component="a" variant="text" fullWidth>
              {viewMore.label || translate('pagination.showAll')}
            </Button>
          </NextLink>
        </Box>
      )}
    </Box>
  );
}
