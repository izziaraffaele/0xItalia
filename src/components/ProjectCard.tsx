import { Stack, Box, Typography, Card, CardActionArea } from '@mui/material';
import NextLink from 'next/link';
import useLocales from '../hooks/useLocales';
// models
import { Project } from '../data-provider';
// paths
import { PATH_PROJECTS } from '../paths';
//
import Image from './Image';
import Label from './Label';

export type ProjectCardProps = {
  data: Project;
};

export default function ProjectCard({ data }: ProjectCardProps) {
  const { name, type, tagline, image, topics, slug } = data;
  const { translate } = useLocales();

  return (
    <Card>
      <NextLink href={PATH_PROJECTS.view(slug)} passHref legacyBehavior>
        <CardActionArea sx={{ p: 3 }} title={name}>
          <Stack direction="row" alignItems="center" spacing={2}>
            <Box
              sx={{
                width: 80,
                height: 80,
                flexShrink: 0,
                display: 'flex',
                borderRadius: 1.5,
                alignItems: 'center',
                justifyContent: 'center',
                // bgcolor: 'background.neutral',
                overflow: 'hidden',
              }}
            >
              {image && <Image src={image} alt={name} width={80} height={80} />}
            </Box>

            <Box sx={{ flexGrow: 1, minWidth: 160 }}>
              <Box>
                <Typography variant="subtitle2">{name}</Typography>
                <Typography variant="body2" noWrap>
                  {tagline}
                </Typography>
              </Box>
              <Stack
                direction="row"
                alignItems="center"
                spacing={1}
                sx={{ mt: 0.5, color: 'text.secondary' }}
              >
                <Typography variant="caption">
                  <Label variant="outlined" sx={{ fontWeight: 500 }}>
                    {translate('categories.' + type, type)}
                  </Label>
                </Typography>
                <Stack direction="row" alignItems="center" spacing={1}>
                  {topics &&
                    topics.map((topic) => (
                      <Typography key={topic} variant="caption">
                        {translate('topics.' + topic, topic)}
                      </Typography>
                    ))}
                </Stack>
              </Stack>
            </Box>

            {/* <Stack alignItems="flex-end" sx={{ pr: 3 }}>
        <Rating
          readOnly
          size="small"
          precision={0.5}
          name="reviews"
          value={rating}
        />
        <Typography variant="caption" sx={{ mt: 0.5, color: 'text.secondary' }}>
          {fShortenNumber(review)}&nbsp;reviews
        </Typography>
      </Stack> */}
          </Stack>
        </CardActionArea>
      </NextLink>
    </Card>
  );
}
