import About from '../components/home/About';
import CommunitySupport from '../components/home/CommunitySupport';

import Header from '../components/home/Header';
import NewsSection from '../components/home/NewsSection';
import FeaturedStartups from '../components/home/FeaturedStartups';
import Layout from '../components/layout';
import ContactSection from '../components/shared/contact/Contact';
import ScrollTop from 'react-scroll-to-top';

function Home() {
  return (
    <Layout>
      <Header />
      <About />
      <CommunitySupport />
      <NewsSection />
      <FeaturedStartups />
      <ContactSection />
      <ScrollTop color="#7600ff" smooth />
    </Layout>
  );
}

export default Home;
