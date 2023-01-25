// @mui
import { alpha, styled, useTheme } from '@mui/material/styles';
import { Box, Button, Typography, Stack, IconButton } from '@mui/material';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import InstagramIcon from '@mui/icons-material/Instagram';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import YouTubeIcon from '@mui/icons-material/YouTube';
import TelegramIcon from '@mui/icons-material/Telegram';
import LaunchIcon from '@mui/icons-material/Launch';
// hooks
import useLocales from '../../../hooks/useLocales';
import { useResponsive } from '../../../hooks/useResponsive';
// data-provider
import { Project, SocialNetwork } from '../../../data-provider';
// components
import Image from '../../../components/Image';
import ShareButton from '../../../components/ShareButton';
import Label from '../../../components/Label';
import RatioBox from '../../../components/RatioBox';

// ----------------------------------------------------------------------
const SOCIALS: Record<
  string,
  { name: string; icon: React.ReactNode; baseUrl: string }
> = {
  facebook: {
    name: 'Facebook',
    icon: <FacebookIcon sx={{ color: '#1877F2' }} />,
    baseUrl: 'https://facebook.com/',
  },
  instagram: {
    name: 'Instagram',
    icon: <InstagramIcon sx={{ color: '#D7336D' }} />,
    baseUrl: 'https://instagram.com/',
  },
  linkedin: {
    name: 'Linkedin',
    icon: <LinkedInIcon sx={{ color: '#006097' }} />,
    baseUrl: 'https://linkedin.com/in/',
  },
  twitter: {
    name: 'Twitter',
    icon: <TwitterIcon sx={{ color: '#1C9CEA' }} />,
    baseUrl: 'https://twitter.com/',
  },
  medium: {
    name: 'Medium',
    icon: null,
    baseUrl: 'https://medium.com/',
  },
  mirror: {
    name: 'Mirror.xyz',
    icon: null,
    baseUrl: 'https://medium.com/',
  },
  youtube: {
    name: 'YouTube',
    icon: <YouTubeIcon sx={{ color: '#ff0000' }} />,
    baseUrl: 'https://www.youtube.com/channel/',
  },
  telegram: {
    name: 'Telegram',
    icon: <TelegramIcon sx={{ color: '#1c93e3' }} />,
    baseUrl: 'https://t.me/',
  },
};

const RootStyle = styled(Box)(({ theme }) => ({
  position: 'relative',
}));

const OverlayStyle = styled('div')(({ theme }) => ({
  top: 0,
  right: 0,
  bottom: 0,
  left: 0,
  zIndex: 9,
  position: 'absolute',
  backgroundColor: alpha(theme.palette.grey[900], 0.6),
  overflow: 'hidden',
  '& img': {
    position: 'absolute',
    top: '-50%',
    right: '-30%',
    width: 800,
    height: 800,
    objectFit: 'contain',
    [theme.breakpoints.up('md')]: {
      top: '-30%',
      right: '-30%',
    },
  },
}));

const TitleStyle = styled('div')(({ theme }) => ({
  top: 0,
  zIndex: 10,
  width: '100%',
  position: 'absolute',
  padding: theme.spacing(3),
  paddingRight: theme.spacing(10),
  [theme.breakpoints.up('lg')]: {
    padding: theme.spacing(10),
    paddingRight: theme.spacing(19),
  },
}));

const FooterStyle = styled('div')(({ theme }) => ({
  bottom: 0,
  zIndex: 10,
  width: '100%',
  display: 'flex',
  position: 'absolute',
  alignItems: 'flex-end',
  paddingLeft: theme.spacing(3),
  paddingRight: theme.spacing(2),
  paddingBottom: theme.spacing(3),
  justifyContent: 'space-between',
  [theme.breakpoints.up('sm')]: {
    alignItems: 'center',
    paddingRight: theme.spacing(3),
  },
  [theme.breakpoints.up('lg')]: {
    padding: theme.spacing(10),
  },
}));

// ----------------------------------------------------------------------

export type ProjectEntryHeroProps = {
  data: Project;
};

export default function ProjectEntryHero({ data }: ProjectEntryHeroProps) {
  const { name, image, tagline, type, url, socialNetworks } = data;

  const { translate } = useLocales();
  const theme = useTheme();
  const isDesktop = useResponsive('up', 'sm');
  return (
    <RootStyle>
      <TitleStyle>
        <Box
          sx={{
            width: 80,
            height: 80,
            flexShrink: 0,
            display: 'flex',
            borderRadius: 1.5,
            alignItems: 'center',
            justifyContent: 'center',
            // bgcolor: 'background.neutral',
            overflow: 'hidden',
            mb: 2.5,
            boxShadow: theme.customShadows.z8,
          }}
        >
          {image && <Image src={image} alt={name} width={80} height={80} />}
        </Box>
        <Box>
          <Stack direction="row" alignItems="center" spacing={2}>
            <Typography component="h1" variant="h2">
              {name}
            </Typography>
            <Label> {translate('categories.' + type)}</Label>
          </Stack>

          <Typography
            variant="subtitle1"
            sx={{
              // color: 'grey.500',
              fontWeight: 500,
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              display: '-webkit-box',
              WebkitLineClamp: '2',
              WebkitBoxOrient: 'vertical',
            }}
          >
            {tagline}
          </Typography>
        </Box>
      </TitleStyle>

      <FooterStyle>
        <Stack direction="row" spacing={2} flex={1}>
          <Button
            component="a"
            variant="outlined"
            color="inherit"
            size="large"
            href={url}
            target="__blank"
            endIcon={<LaunchIcon />}
            sx={{ borderRadius: 24, textTransform: 'none' }}
          >
            {translate('action.goToWebsite')}
          </Button>
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="flex-start"
            sx={(theme) => ({
              display: 'none',
              [theme.breakpoints.up('sm')]: { display: 'flex' },
            })}
          >
            {Object.keys(socialNetworks).map((platform) => (
              <IconButton
                key={platform}
                href={
                  SOCIALS[platform]?.baseUrl +
                  socialNetworks[platform as SocialNetwork]
                }
              >
                {SOCIALS[platform]?.icon}
              </IconButton>
            ))}
          </Stack>
        </Stack>

        <ShareButton content={{ title: name, description: tagline }} />
      </FooterStyle>

      <OverlayStyle>
        <img src="/assets/bg_card.svg" />
      </OverlayStyle>
      <RatioBox
        ratio={isDesktop ? '21/9' : '4/3'}
        sx={{
          minHeight: 320,
          bgcolor: alpha(theme.palette.primary.dark, 1),
        }}
      />
    </RootStyle>
  );
}
