import type { Metadata } from 'next';
import Script from 'next/script';

import fonts from './fonts';
import { usePathname } from 'next/navigation';

import Nav from '@/components/layout/Nav';
import Footer from '@/components/layout/Footer';
import BootstrapClient from '@/components/helpers/BootstrapClient';
import ContactSection from '@/components/shared/contact/Contact';
import AuthProvider from '@/providers/AuthProvider';

import 'bootstrap/dist/css/bootstrap.min.css';
import '../sass/main.scss';
import './globals.css';

export const metadata: Metadata = {
  title: 'Seoul Startups Club',
  description: 'Seoul Startups Club'
};

const RootLayout = function (props: { children: React.ReactNode }) {
  // const pathname = usePathname();
  return (
    <AuthProvider>
      <html lang="en" className={fonts.lato} suppressHydrationWarning>
        <body>
          {/* <Nav theme="pry-light" />
          <main className="flex-grow-1">{props.children}</main>

          <ContactSection className="mt-5" />
          <Footer /> */}
          <main>{props.children}</main>

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
    </AuthProvider>
  );
};

export default RootLayout;
