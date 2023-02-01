import { Container, Stack, Box, Typography } from '@mui/material';
// next
import { GetStaticProps } from 'next';
// data-provider
import dp, { Project } from '../data-provider';
// paths
import { PATH_COLLECTIONS, PATH_PROJECTS } from '../paths';
// hooks
import useLocales from '../hooks/useLocales';
// components
import Page from '../components/Page';
import ProjectCard from '../components/ProjectCard';
// sections
import HomeProjectsList from '../sections/home/HomeProjectsList';

type PageProps = {
  data: {
    latest: Project[];
    communities: Project[];
    products: Project[];
    organizations: Project[];
  };
};

export default function Home({ data }: PageProps) {
  const { latest, communities, products, organizations } = data;
  const { translate } = useLocales();

  return (
    <Page title="Home" px={2}>
      <Container maxWidth="lg">
        <Box sx={{ mb: 5 }}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Box sx={{ flexGrow: 1, maxWidth: 800 }}>
              <Typography variant="h4" gutterBottom>
                {translate('pages.home.title')}
              </Typography>
              <Typography variant="body2">
                {translate('pages.home.description')}
              </Typography>
            </Box>
          </Box>
        </Box>

        <Stack direction="column" spacing={5}>
          <HomeProjectsList
            title={translate('pages.home.latestProjects')}
            data={latest}
            viewMore={{ href: PATH_PROJECTS.root }}
          >
            {(item) => <ProjectCard data={item} />}
          </HomeProjectsList>

          <HomeProjectsList
            title={translate('pages.home.latestCommunities')}
            data={communities}
            viewMore={{ href: PATH_COLLECTIONS.view('community') }}
          >
            {(item) => <ProjectCard data={item} />}
          </HomeProjectsList>

          <HomeProjectsList
            title={translate('pages.home.latestOrganizations')}
            data={organizations}
            viewMore={{ href: PATH_COLLECTIONS.view('organization') }}
          >
            {(item) => <ProjectCard data={item} />}
          </HomeProjectsList>

          <HomeProjectsList
            title={translate('pages.home.latestProducts')}
            data={products}
            viewMore={{ href: PATH_COLLECTIONS.view('product') }}
          >
            {(item) => <ProjectCard data={item} />}
          </HomeProjectsList>
        </Stack>
      </Container>
    </Page>
  );
}

export const getStaticProps: GetStaticProps<PageProps> = async () => {
  const projects = dp.projects
    .find()
    .sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );

  const latest = projects.slice(0, 6);
  const rest = projects.slice(6); // exclude latest projects

  const communities = rest.filter((p) => p.type === 'community').slice(0, 6);

  const products = rest.filter((p) => p.type === 'product').slice(0, 6);

  const organizations = rest
    .filter((p) => p.type === 'organization')
    .slice(0, 6);

  return {
    props: {
      data: { latest, communities, products, organizations },
    },
  };
};
