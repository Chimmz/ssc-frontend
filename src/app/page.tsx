import About from '@/components/home/About';
import CommunitySupport from '@/components/home/CommunitySupport';
import FeaturedStartups from '@/components/home/FeaturedStartups';
import Header from '@/components/home/Header';
import NewsSection from '@/components/home/NewsSection';
import Footer from '@/components/layout/Footer';
import Nav from '@/components/layout/Nav';
import BtnScrollToTop from '@/components/shared/BtnScrollToTop';
import ContactSection from '@/components/shared/contact/Contact';
import Image from 'next/image';

export default function Home() {
  return (
    <>
      <Nav theme="pry-light" />
      <main className="flex-grow-1">
        <Header />
        <About />
        <CommunitySupport />
        <NewsSection />
        <FeaturedStartups />
        <ContactSection className="mt-5" />
      </main>
      <Footer />
      <BtnScrollToTop />
    </>
  );
}
