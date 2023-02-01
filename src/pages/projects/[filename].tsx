import isEmpty from 'lodash/isEmpty';
// @mui
import { Container, Button, Divider, Box, Card, Stack } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
// next
import type { GetStaticProps, GetStaticPaths } from 'next';
// data-provider
import dp, { Project } from '../../data-provider';
// hooks
import useLocales from '../../hooks/useLocales';
// paths
import { PATH_PROJECTS } from '../../paths';
// components
import Page from '../../components/Page';
import Markdown from '../../components/Markdown';
// sections
import {
  ProjectEntryHero,
  ProjectEntryTags,
} from '../../sections/projects/project-entry';

type PageProps = {
  data: { project: Project };
};

export default function ProjectPage({ data }: PageProps) {
  const { project } = data;
  const { translate } = useLocales();

  return (
    <Page title={project.name} description={project.tagline}>
      <Box
        sx={{
          py: 3,
          color: 'text.secondary',
        }}
      >
        <Container>
          <Button
            variant="text"
            color="inherit"
            href={PATH_PROJECTS.root}
            startIcon={
              <ArrowBackIcon color="inherit" sx={{ verticalAlign: 'center' }} />
            }
            sx={{ textTransform: 'none' }}
          >
            {translate('pages.projectEntry.back')}
          </Button>
        </Container>
      </Box>
      <Container maxWidth="lg">
        <Card>
          <ProjectEntryHero data={project} />
          <Stack spacing={3} sx={{ p: { xs: 3, md: 5 } }}>
            <Markdown children={project.description || ''} />
            {!isEmpty(project.topics) && (
              <Box>
                <Divider sx={{ mb: 2.5 }} />
                <ProjectEntryTags value={project.topics} />
              </Box>
            )}
          </Stack>
        </Card>
      </Container>
    </Page>
  );
}

export const getStaticProps: GetStaticProps<PageProps> = async ({ params }) => {
  const project = params?.filename
    ? dp.projects.getBySlug(String(params.filename))
    : null;

  if (!project) {
    return { notFound: true };
  }

  return {
    props: {
      data: { project },
    },
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = dp.projects.find().map((item) => ({
    params: { filename: item.slug },
  }));

  return {
    paths,
    fallback: false,
  };
};
