// @mui
import { Box, BoxProps, Chip } from '@mui/material';
import useLocales from '../../../hooks/useLocales';

// ----------------------------------------------------------------------

export type ProjectEntryTagsProps = BoxProps & {
  value?: string[];
};

export default function ProjectEntryTags({
  value,
  ...others
}: ProjectEntryTagsProps) {
  const { translate, currentLang } = useLocales();

  return (
    <Box {...others}>
      {value?.length &&
        value.map((item) => (
          <Chip
            key={item}
            label={translate('topics.' + item, item)}
            sx={{ m: 0.5 }}
          />
        ))}
    </Box>
  );
}
