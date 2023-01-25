import { Public_Sans } from '@next/font/google';

// If loading a variable font, you don't need to specify the font weight
export const publicSans = Public_Sans({
  subsets: ['latin'],
  fallback: ['sans-serif'],
});
