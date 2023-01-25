import { Button, Container, Typography } from '@mui/material';
import { Box, Stack } from '@mui/material';
import { styled } from '@mui/material/styles';
// hooks
import useLocales from '../../../hooks/useLocales';
// components
import Logo from '../../../components/Logo';
import Copyright from '../../../components/Copyright';

const StyledRoot = styled(Box)(({ theme }) => ({
  color: theme.palette.text.secondary,
  padding: theme.spacing(2, 3),

  [theme.breakpoints.up('lg')]: {
    padding: theme.spacing(3, 5),
  },
}));

export default function Footer() {
  const { translate } = useLocales();

  return (
    <StyledRoot>
      <Container maxWidth="sm">
        <Stack direction="column" alignItems="center" spacing={5}>
          {/* <Stack direction="row" alignItems="center" spacing={2}>
            <Button
              size="small"
              href="https://forms.gle/5qXRqTPPgsiSbETj6"
              variant="text"
              color="inherit"
            >
              {translate('action.contact')}
            </Button>
            <Button
              size="small"
              href="https://forms.gle/5qXRqTPPgsiSbETj6"
              variant="text"
              color="inherit"
            >
              {translate('action.addProject')}
            </Button>
          </Stack> */}
          <Box>
            <Logo sx={{ mb: 1, mx: 'auto', p: 1 }} />
            <Typography variant="body2" textAlign="center" sx={{ mb: 5 }}>
              Scopri e condividi nuovi prodotti, organizzazioni, comunità ed
              eventi relativi al mondo blockchain e web3 in Italia.
            </Typography>
            <Copyright
              author={{
                name: 'Izzia Raffaele',
                url: 'https://twitter.com/izziaraffaele',
              }}
            />
          </Box>
        </Stack>
      </Container>
    </StyledRoot>
  );
}
