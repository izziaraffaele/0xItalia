import { z } from 'zod';
// @mui
import { Container, Stack } from '@mui/material';
// next
import { GetStaticProps } from 'next';
// hooks
import { useSearchController, useSearchInput } from '../../hooks/useSearch';
import useLocales from '../../hooks/useLocales';
// data-provider
import { collection, Project } from '../../data-provider';
// components
import Page from '../../components/Page';
// sections
import {
  ProjectListGrid,
  ProjectListHeader,
} from '../../sections/projects/project-list';
import { useRouter } from 'next/router';

// ----------------------------------------------------------------------

const PageParamsSchema = z.object({
  type: z.string().nullish(),
  search: z.preprocess((v) => v || '', z.string()),
});

// ----------------------------------------------------------------------

type PageParams = z.infer<typeof PageParamsSchema>;

type PageProps = {
  params: PageParams;
  data: { projects: Project[] };
};

export default function ProjectsIndex({ data, params }: PageProps) {
  const { query } = useRouter();

  const searchInput = useSearchInput({ defaultValue: params.search });

  const { results, total, loading } = useSearchController({
    collection: 'projects',
    data: data.projects,
    input: searchInput,
    filter: {
      type: query.type && String(query.type),
    },
  });

  const entries = !loading ? results : undefined;
  const { translate } = useLocales();

  return (
    <Page
      title={translate('pages.projects.title', {
        context: query.type,
      })}
      px={2}
    >
      <Container maxWidth="lg">
        <ProjectListHeader
          title={
            searchInput !== ''
              ? translate('pages.projects.currentSearch', {
                  input: searchInput,
                })
              : translate('pages.projects.searchTitle', {
                  context: query.type,
                })
          }
          search={searchInput}
          total={total}
        />
        <Stack direction="column" spacing={5}>
          <ProjectListGrid data={entries} />
        </Stack>
      </Container>
    </Page>
  );
}

export const getStaticProps: GetStaticProps<PageProps> = async (context) => {
  const projects = collection('projects').sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );

  const params = PageParamsSchema.safeParse(context);

  return {
    props: {
      params: params.success ? params.data : { search: '' },
      data: { projects },
    },
  };
};
