import styles from './About.module.scss';
import cls from 'classnames';

const About = () => {
  return (
    <section className="section-pad">
      <div
        className={cls(
          styles.container,
          'container app-container d-flex flex-column text-center'
        )}
      >
        <figure className="mb-5 animation-vertical-oscillate">
          <img src="/img/rocket-colored.png" width={170} height={170} alt="" />
        </figure>
        <h2 className="h-2 fs-2 d-inline-block mb-5">What is Seoul Startups Club (SSC)?</h2>
        <p className="parag text-black mx-auto" style={{ maxWidth: '45ch' }}>
          Welcome to SSC – Seoul Startups Club, Your Gateway to Success in South Korea's
          Thriving Startup Scene!
          <br />
          <br />
          Are you ready to embark on an exhilarating journey into the heart of innovation and
          entrepreneurship? Look no further than SSC – Seoul Startups Club, the vanguard of
          South Korea's startup revolution.
          <br />
          <br />
          Crafted by accomplished entrepreneurs who have navigated the very waters you are
          about to explore, SSC is more than just a community; it's your launchpad to success.
        </p>

        <img src="/img/union.png" width={22} className="absolute" />
        <img src="/img/union.png" width={22} className="absolute" />
      </div>
    </section>
  );
};

export default About;
