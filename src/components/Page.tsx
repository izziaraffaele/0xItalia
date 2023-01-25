import Head from 'next/head';
import { forwardRef, ReactNode } from 'react';
// @mui
import { Box, BoxProps } from '@mui/material';
// utils
import getSeoMetadata from '../utils/getSeoMetadata';
// ----------------------------------------------------------------------

interface Props extends BoxProps {
  children: ReactNode;
  meta?: ReactNode;
  title: string;
  description?: string;
}

const Page = forwardRef<HTMLDivElement, Props>(
  ({ children, title = '', description, meta, ...other }, ref) => {
    const metadata = getSeoMetadata(title, description);

    return (
      <>
        <Head>
          <title>{metadata.title}</title>
          <meta name="description" content={metadata.description} />
          <meta name="keywords" content={metadata.keywords} />
        </Head>

        <Box ref={ref} {...other}>
          {children}
        </Box>
      </>
    );
  }
);

export default Page;
