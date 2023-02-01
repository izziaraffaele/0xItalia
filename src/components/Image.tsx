import { useMemo } from 'react';
import NextImage, { ImageProps as NextImageProps } from 'next/image';
// @mui
import { Theme } from '@mui/material/styles';
import { Box, SxProps } from '@mui/material';
import uniqueId from 'lodash/uniqueId';
// ----------------------------------------------------------------------

export type ImageRato =
  | '4/3'
  | '3/4'
  | '6/4'
  | '4/6'
  | '16/9'
  | '9/16'
  | '21/9'
  | '9/21'
  | '1/1';

const shimmer = (w: number, h: number, id = uniqueId()) => `
<svg height="${h}" viewBox="0 0 512 512" width="${w}" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
  <radialGradient id="a" cx="50%" cy="46.801102%" r="95.497112%">
    <stop offset="0" stop-color="#fff" stop-opacity="0"/>
    <stop offset="1" stop-color="#919eab" stop-opacity=".48"/>
  </radialGradient>
  <path d="m88 86h512v512h-512z" fill="url(#a)" fill-rule="evenodd" transform="translate(-88 -86)"/>
</svg>
`;

const toBase64 = (str: string) =>
  typeof window === 'undefined'
    ? Buffer.from(str).toString('base64')
    : window.btoa(str);

type ImageProps = NextImageProps & {
  sx?: SxProps<Theme>;
  ratio?: ImageRato;
  wrapperClassName?: string;
};

export default function Image({
  ratio,
  wrapperClassName,
  sx,
  title = '',
  src = '',
  ...others
}: ImageProps) {
  const { width = 0, height = 0, quality } = others;

  const blurDataURL = useMemo<string>(
    () =>
      `data:image/svg+xml;base64,${toBase64(
        shimmer(width as number, height as number)
      )}`,
    []
  );

  if (ratio) {
    return (
      <Box
        component="span"
        sx={{
          width: 1,
          lineHeight: 0,
          display: 'block',
          overflow: 'hidden',
          position: 'relative',
          pt: getRatio(ratio),
          '& .wrapper': {
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            lineHeight: 0,
            position: 'absolute',
            backgroundSize: 'cover !important',
          },
          ...sx,
        }}
      >
        <NextImage
          width={width}
          height={height}
          quality={quality}
          title={title}
          src={src}
          placeholder={blurDataURL ? 'blur' : undefined}
          blurDataURL={blurDataURL}
          {...others}
        />
      </Box>
    );
  }
  return (
    <Box
      component="span"
      sx={{
        lineHeight: 1,
        display: 'block',
        overflow: 'hidden',
        '& .wrapper': {
          width: 1,
          height: 1,
          backgroundSize: 'cover !important',
        },
        ...sx,
      }}
    >
      <NextImage
        width={width}
        height={height}
        quality={quality}
        title={title}
        src={src}
        placeholder={blurDataURL ? 'blur' : undefined}
        blurDataURL={blurDataURL}
        {...others}
      />
    </Box>
  );
}

// ----------------------------------------------------------------------

function getRatio(ratio = '1/1') {
  return {
    '4/3': 'calc(100% / 4 * 3)',
    '3/4': 'calc(100% / 3 * 4)',
    '6/4': 'calc(100% / 6 * 4)',
    '4/6': 'calc(100% / 4 * 6)',
    '16/9': 'calc(100% / 16 * 9)',
    '9/16': 'calc(100% / 9 * 16)',
    '21/9': 'calc(100% / 21 * 9)',
    '9/21': 'calc(100% / 9 * 21)',
    '1/1': '100%',
  }[ratio];
}
