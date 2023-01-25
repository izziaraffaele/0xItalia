import { Box, BoxProps } from '@mui/material';

export type Ratio =
  | '4/3'
  | '3/4'
  | '6/4'
  | '4/6'
  | '16/9'
  | '9/16'
  | '21/9'
  | '9/21'
  | '1/1';

type RatioBoxProps = BoxProps & { ratio?: Ratio };

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

export default function RatioBox({
  ratio,
  sx,
  children,
  ...others
}: RatioBoxProps) {
  if (!ratio) {
    return (
      <Box {...others} sx={sx}>
        {children}
      </Box>
    );
  }
  return (
    <Box
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
      {...others}
    >
      <div className="wrapper">{children}</div>
    </Box>
  );
}
