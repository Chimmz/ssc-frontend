import About from '@/components/home/About';
import CommunitySupport from '@/components/home/CommunitySupport';
import FeaturedStartups from '@/components/home/FeaturedStartups';
import Header from '@/components/home/Header';
import NewsSection from '@/components/home/NewsSection';
import Image from 'next/image';

export default function Home() {
  return (
    <>
      <Header />
      <About />
      <CommunitySupport />
      <NewsSection />
      <FeaturedStartups />
      {/* <ScrollTopButton color="#7600ff" smooth />  */}
    </>
  );
}
