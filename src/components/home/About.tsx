import { Icon } from '@iconify/react';
import { genPublicImgSrc } from '../../utils/url-utils';

import styles from './About.module.scss';
import cls from 'classnames';

const About = () => {
  return (
    <section className={styles.section}>
      <div
        className={cls(
          styles.container,
          'container app-container d-flex flex-column text-center'
        )}
      >
        <figure className="mb-5 animation-vertical-oscillate">
          <img
            src={genPublicImgSrc('/img/rocket-colored.png')}
            width={170}
            height={170}
            alt=""
          />
        </figure>
        <h2 className="h-2 fs-2 d-inline-block mb-5">What is Seoul Startups Club (SSC)?</h2>
        <p className="parag text-black mx-auto mb-5" style={{ maxWidth: '45ch' }}>
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
        {/* <p className="parag text-black mx-auto" style={{ maxWidth: '45ch' }}>
          We understand the challenges and lack of support system that comes with starting a
          business in Korea. <br /> That's why we established SSC- a resourceful community
          where like-minded Korean and non-Korean entrepreneurs exchange ideas, collaborate,
          innovate, and receive guidance needed to overcome challenges.
        </p> */}

        <img src={genPublicImgSrc('/img/union.png')} width={22} className="absolute" />
        <img src={genPublicImgSrc('/img/union.png')} width={22} className="absolute" />
      </div>
    </section>
  );
};

export default About;
