// @mui
import { itIT } from '@mui/material/locale';

export const REPOSITORY = 'https://github.com/izziaraffaele/0xItalia';

export const SEO = {
  title: 'Ecosistema blockchain',
  titleTemplate: '{title} | 0xItalia',
  description:
    'Scopri e condividi nuovi prodotti, organizzazioni, comunità ed eventi relativi al mondo blockchain e web3 in Italia.',
  keywords:
    'blockchain,italia,directory,progetti,DeFi,NFT,token,eventi,BTC,ETH',
};

export const SEARCH = {
  includeScore: true,
  minMatchCharLength: 2,
  threshold: 0.5,
};

// MULTI LANGUAGES
// Please remove `localStorage` when you change settings.
// ----------------------------------------------------------------------

const allLangs = [
  {
    label: 'Italian',
    value: 'it',
    systemValue: itIT,
  },
];

export const I18N = {
  allLangs,
  defaultLang: allLangs[0], // Italian
};
