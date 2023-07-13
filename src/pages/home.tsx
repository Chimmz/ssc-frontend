import About from '../components/home/About';
import CommunitySupport from '../components/home/CommunitySupport';
import Contact from '../components/home/Contact';
import Header from '../components/home/Header';
import News from '../components/home/NewsSection';
import OurStartups from '../components/home/OurStartups';
import Layout from '../components/layout';
import Footer from '../components/layout/Footer';
import Nav from '../components/layout/Nav';

function Home() {
  return (
    <Layout>
      <Header />
      <About />
      <CommunitySupport />
      <News />
      <OurStartups />
      <Contact />
    </Layout>
  );
}

export default Home;
