import { Lato, Raleway } from 'next/font/google';

const raleway = Raleway({
  subsets: ['latin'],
  weight: ['100', '200', '300', '400', '500', '600', '700'],
  style: ['normal', 'italic'],
  display: 'swap'
});

const lato = Lato({
  subsets: ['latin'],
  weight: ['100', '300', '400', '700', '900'],
  style: ['normal', 'italic'],
  display: 'swap'
});

const fonts = { lato: lato.className, raleway: raleway.className };

export default fonts;
