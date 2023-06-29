import About from '../components/home/About';
import CommunitySupport from '../components/home/CommunitySupport';
import Header from '../components/home/Header';
import News from '../components/home/News';
import Nav from '../components/layout/Nav';

function Home() {
  return (
    <>
      <Nav />
      <Header />
      <About />
      <CommunitySupport />
      <News />
    </>
  );
}

export default Home;
