import About from '../components/home/About';
import CommunitySupport from '../components/home/CommunitySupport';

import Header from '../components/home/Header';
import News from '../components/home/NewsSection';
import OurStartups from '../components/home/OurStartups';
import Layout from '../components/layout';
import ContactSection from '../components/shared/contact/Contact';
import ScrollToTopButton from '../components/shared/scroll-to-top/ScrollToTop';
import ScrollTop from 'react-scroll-to-top';

function Home() {
  return (
    <Layout>
      <Header />
      <About />
      <CommunitySupport />
      <News />
      <OurStartups />
      <ContactSection />
      <ScrollTop color="#7600ff" smooth />
    </Layout>
  );
}

export default Home;
