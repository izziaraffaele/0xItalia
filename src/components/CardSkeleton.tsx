// @mui
import { Box, Skeleton } from '@mui/material';

// ----------------------------------------------------------------------

export default function EntryCardSkeleton() {
  return (
    <Skeleton
      variant="rectangular"
      width="100%"
      sx={{ height: 120, borderRadius: 2 }}
    />
  );
}
