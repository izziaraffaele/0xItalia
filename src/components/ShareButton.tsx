import { useState } from 'react';
// @mui
import { FabProps, SpeedDial, SpeedDialAction } from '@mui/material';
import ShareIcon from '@mui/icons-material/Share';
import FacebookIcon from '@mui/icons-material/Facebook';
import RedditIcon from '@mui/icons-material/Reddit';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import TwitterIcon from '@mui/icons-material/Twitter';
// hooks
import { useResponsive } from '../hooks/useResponsive';
import {
  useShareContent,
  UseShareContentProps,
  Sharable,
} from '../hooks/useShare';
// utils../utils/getShareUrl
import { getShareUrl } from '../utils/getShareUrl';

const SOCIALS = [
  {
    name: 'Facebook',
    icon: <FacebookIcon sx={{ color: '#1877F2' }} />,
    url: (data: Sharable) => getShareUrl('facebook', { u: data.url || '#' }),
  },
  {
    name: 'Reddit',
    icon: <RedditIcon sx={{ color: '#f94503' }} />,
    url: (data: Sharable) =>
      getShareUrl('reddit', { title: data.title || '', url: data.url || '#' }),
  },
  {
    name: 'Linkedin',
    icon: <LinkedInIcon sx={{ color: '#006097' }} />,
    url: (data: Sharable) => getShareUrl('linkedin', { url: data.url || '#' }),
  },
  {
    name: 'Twitter',
    icon: <TwitterIcon sx={{ color: '#1C9CEA' }} />,
    url: (data: Sharable) =>
      getShareUrl('twitter', { text: data.title || '', url: data.url || '#' }),
  },
];

export type ShareButtonProps = UseShareContentProps;

const isBrowser = typeof document !== 'undefined';

export default function ShareButton({ content, fallback }: ShareButtonProps) {
  const isDesktop = useResponsive('up', 'sm');
  const [open, setOpen] = useState(false);

  const defaultFallback = () => {
    setOpen(true);
  };

  const { share } = useShareContent({
    content,
    fallback: fallback || defaultFallback,
  });

  const canonical = isBrowser
    ? document?.querySelector<any>('link[rel=canonical]')
    : '';

  const shareUrl = canonical
    ? canonical.href
    : isBrowser && document?.location.href;

  return (
    <SpeedDial
      FabProps={{
        size: isDesktop ? 'large' : 'small',
        color: 'default',
        sx: (theme) => ({
          boxShadow: theme.shadows[10],
        }),
      }}
      direction={isDesktop ? 'left' : 'up'}
      ariaLabel="Share post"
      icon={<ShareIcon />}
      sx={{ '& .MuiSpeedDial-fab': { width: 48, height: 48 } }}
      open={open}
      onOpen={() => share()}
      onClose={() => setOpen(false)}
    >
      {SOCIALS.map((social) => (
        <SpeedDialAction
          key={social.name}
          icon={social.icon}
          tooltipTitle={social.name}
          tooltipPlacement="top"
          FabProps={
            {
              color: 'default',
              href: social.url({ ...content, url: shareUrl }),
              target: '_blank',
              onClick: (e) => {
                e.preventDefault();
                window.open(
                  social.url({ ...content, url: shareUrl }),
                  '_blank',
                  `height=450,width=550,toolbar=0,location=0,menubar=0,directories=0,scrollbars=0`
                );
              },
            } as FabProps
          }
        />
      ))}
    </SpeedDial>
  );
}
