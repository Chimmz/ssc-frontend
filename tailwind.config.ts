import type { Config } from 'tailwindcss';
// import { Lato, Raleway } from 'next/font/google';

// const ralewayFont = Raleway({
//   subsets: ['latin'],
//   weight: ['100', '200', '300', '400', '500', '600', '700'],
//   style: ['normal', 'italic'],
//   display: 'swap'
// });

// const latoFont = Lato({
//   subsets: ['latin'],
//   weight: ['100', '300', '400', '700', '900'],
//   style: ['normal', 'italic'],
//   display: 'swap'
// });

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}'
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))'
      }
    }
    // fontFamily: {
    //   raleway: [ralewayFont.className, 'sans-serif'],
    //   lato: [latoFont.className, 'sans-serif']
    // }
  },
  prefix: 'tw-',
  plugins: []
};
export default config;
