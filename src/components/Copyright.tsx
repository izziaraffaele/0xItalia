import Typography from '@mui/material/Typography';
import MuiLink from '@mui/material/Link';

export type CopyrightProps = {
  author?: { url?: string; name?: string };
};

export default function Copyright({ author }: CopyrightProps) {
  return (
    <Typography variant="body2" color="text.secondary" align="center">
      {'made with ❤️ by '}
      <MuiLink color="inherit" href={author?.url || '#'}>
        {author?.name || 'Your website'}
      </MuiLink>
      <br />
      {/* {'Copyright © ' + new Date().getFullYear()} */}
    </Typography>
  );
}
