import { Theme, alpha } from '@mui/material/styles';

// ----------------------------------------------------------------------
declare module '@mui/material/Fab' {
  interface FabPropsVariantOverrides {
    soft: true;
  }
}
// ----------------------------------------------------------------------

export default function Fab(theme: Theme) {
  return {
    MuiFab: {
      defaultProps: {
        color: 'primary',
      },
      variants: [
        {
          props: { variant: 'soft' },
          style: {
            boxShadow: 'none',
            backgroundColor: alpha(theme.palette.primary.light, 0.16),
            color: theme.palette.primary.light,
            '&:hover': {
              backgroundColor: alpha(theme.palette.primary.light, 0.32),
            },
          },
        },
        {
          props: { variant: 'soft', color: 'default' },
          style: {
            boxShadow: 'none',
            backgroundColor: alpha(theme.palette.text.primary, 0.16),
            color: theme.palette.primary.light,
            '&:hover': {
              backgroundColor: alpha(theme.palette.text.primary, 0.32),
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
          boxShadow: theme.customShadows.z8,
          '&:hover': {
            boxShadow: 'none',
            backgroundColor: theme.palette.grey[400],
          },
        },
        primary: {
          boxShadow: theme.customShadows.primary,
          '&:hover': {
            backgroundColor: theme.palette.primary.dark,
          },
        },
        secondary: {
          boxShadow: theme.customShadows.secondary,
          '&:hover': {
            backgroundColor: theme.palette.secondary.dark,
          },
        },
        extended: {
          '& svg': {
            marginRight: theme.spacing(1),
          },
        },
      },
    },
  };
}
