import About from '../components/home/About';
import CommunitySupport from '../components/home/CommunitySupport';

import Header from '../components/home/Header';
import News from '../components/home/NewsSection';
import OurStartups from '../components/home/OurStartups';
import Layout from '../components/layout';
import ContactSection from '../components/shared/contact/Contact';

function Home() {
  return (
    <Layout>
      <Header />
      <About />
      <CommunitySupport />
      <News />
      <OurStartups />
      <ContactSection />
    </Layout>
  );
}

export default Home;
