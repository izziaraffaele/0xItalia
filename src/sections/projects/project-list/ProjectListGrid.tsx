import { useMemo } from 'react';
// @mui
import { Grid, GridProps } from '@mui/material';
// components
import CardSkeleton from '../../../components/CardSkeleton';
import ProjectCard from '../../../components/ProjectCard';

export type ProjectListGridProps<T> = Omit<GridProps, 'children'> & {
  data?: T[];
};

export function ProjectListGrid<T>(props: ProjectListGridProps<T>) {
  const { data, ...others } = props;

  const entries = useMemo(() => data || [...Array(12)], [data]);

  return (
    <Grid container spacing={3} {...others}>
      {entries.map((item, index) => (
        <Grid
          key={index}
          item
          xs={12}
          sm={6}
          // md={(index === 0 && 6) || 3}
        >
          {item ? <ProjectCard data={item} /> : <CardSkeleton />}
        </Grid>
      ))}
    </Grid>
  );
}
