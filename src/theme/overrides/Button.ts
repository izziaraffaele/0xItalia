import { alpha, Theme } from '@mui/material/styles';

// ----------------------------------------------------------------------
declare module '@mui/material/Button' {
  interface ButtonPropsVariantOverrides {
    soft: true;
  }
}
// ----------------------------------------------------------------------

export default function Button(theme: Theme) {
  return {
    MuiButton: {
      variants: [
        {
          props: { variant: 'soft' },
          style: {
            backgroundColor: alpha(theme.palette.primary.light, 0.16),
            color: theme.palette.primary.light,
            '&:hover': {
              backgroundColor: alpha(theme.palette.primary.light, 0.32),
            },
          },
        },
        {
          props: { variant: 'soft', color: 'secondary' },
          style: {
            backgroundColor: alpha(theme.palette.secondary.light, 0.16),
            color: theme.palette.secondary.light,
            '&:hover': {
              backgroundColor: alpha(theme.palette.secondary.light, 0.32),
            },
          },
        },
      ],
      styleOverrides: {
        root: {
          '&:first-letter': {
            textTransform: 'uppercase',
          },
          '&:hover': {
            boxShadow: 'none',
          },
        },
        sizeLarge: {
          height: 48,
        },
        containedInherit: {
          color: theme.palette.grey[800],
          boxShadow: theme.customShadows.z8,
          '&:hover': {
            backgroundColor: theme.palette.grey[400],
          },
        },
        containedPrimary: {
          boxShadow: theme.customShadows.primary,
        },
        containedSecondary: {
          boxShadow: theme.customShadows.secondary,
        },
        outlinedInherit: {
          border: `1px solid ${alpha(theme.palette.grey[500], 0.32)}`,
          '&:hover': {
            backgroundColor: theme.palette.action.hover,
          },
        },
        textInherit: {
          '&:hover': {
            backgroundColor: theme.palette.action.hover,
          },
        },
      },
    },
  };
}
