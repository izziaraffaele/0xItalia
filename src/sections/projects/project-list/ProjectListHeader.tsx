// @mui
import { Box, Typography, BoxProps } from '@mui/material';
// hooks
import useLocales from '../../../hooks/useLocales';

// ----------------------------------------------------------------------

interface ProjectListHeaderProps extends Omit<BoxProps, 'title'> {
  title?: React.ReactNode;
  search?: string;
  total?: number;
  pagination?: false | { currentPage: number; perPage: number };
}

export function ProjectListHeader({
  sx,
  title,
  search = '',
  total = 0,
  pagination = false,
  ...others
}: ProjectListHeaderProps) {
  const { translate } = useLocales();

  return (
    <Box sx={{ mb: 5, ...sx }} {...others}>
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <Box sx={{ flexGrow: 1 }}>
          <Typography variant="h4" gutterBottom>
            {title}
          </Typography>
          {
            <Typography
              variant="body2"
              sx={{
                lineHeight: 2,
                display: 'flex',
                alignItems: 'center',
                color: 'text.primary',
              }}
            >
              {translate('pagination.pageInfo', { count: total })}
            </Typography>
          }
        </Box>
      </Box>
    </Box>
  );
}
