// @mui
import { CssBaseline } from '@mui/material';
import {
  ThemeProvider as MUIThemeProvider,
  createTheme,
} from '@mui/material/styles';
//
import palette from './palette';
import shadows from './shadows';
import breakpoints from './breakpoints';
import typography from './typography';
import GlobalStyles from './globalStyles';
import { customShadows } from './customShadows';
import componentsOverride from './overrides';
// import theme from '../themeOriginal';

// ----------------------------------------------------------------------

const theme = createTheme({
  palette: palette.dark,
  shape: { borderRadius: 6 },
  typography,
  breakpoints,
  shadows: shadows.dark,
  customShadows: customShadows.dark,
});
theme.components = componentsOverride(theme);

export default function ThemeProvider({ children }: React.PropsWithChildren) {
  return (
    <MUIThemeProvider theme={theme}>
      <CssBaseline />
      <GlobalStyles />
      {children}
    </MUIThemeProvider>
  );
}
