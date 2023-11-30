import type { Metadata } from 'next';
import Script from 'next/script';

import fonts from './fonts';
import { usePathname } from 'next/navigation';

import BootstrapClient from '@/components/helpers/BootstrapClient';
import Nav from '@/components/layout/Nav';
import Footer from '@/components/layout/Footer';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../sass/main.scss';
import ContactSection from '@/components/shared/contact/Contact';
// import './globals.css';

export const metadata: Metadata = {
  title: 'Seoul Startups Club',
  description: 'Seoul Startups Club'
};

const RootLayout = function (props: { children: React.ReactNode }) {
  // const pathname = usePathname();
  return (
    <html lang="en" className={fonts.lato}>
      <body>
        <Nav theme="pry-light" />
        <main className="flex-grow-1">{props.children}</main>

        <ContactSection className="mt-5" />
        <Footer />

        <BootstrapClient />
        <Script async src="https://www.googletagmanager.com/gtag/js?id=G-NY8960S9D7" />
        <Script>
          <script>
            {`window.dataLayer = window.dataLayer || [];
              function gtag() {
                dataLayer.push(arguments)
              }
              gtag('js', new Date());
              gtag('config', 'G-NY8960S9D7');`}
          </script>
        </Script>
      </body>
    </html>
  );
};

export default RootLayout;
