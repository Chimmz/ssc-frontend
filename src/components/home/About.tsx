import { Icon } from '@iconify/react';
import { genPublicImgSrc } from '../../utils/url-utils';

import styles from './About.module.scss';

const About = () => {
  return (
    <section className={styles.section}>
      <div className="container d-flex flex-column text-center">
        <figure className="mb-5">
          <img src={genPublicImgSrc('/img/rocket-colored.png')} alt="" />
        </figure>
        <h2 className="h-2 fs-2 d-inline-block mb-5">What is Seoul Startups Club?</h2>
        <p className="parag mx-auto">
          Seoul Startups Club (SSC) is Korea’s leading startup community founded by successful
          entrepreneurs who have firsthand experience in navigating the startup ecosystem.
          <br /> <br />
          We understand the challenges and lack of support system that comes with starting a
          business in Korea. That's why we established SSC- a resourceful community where
          like-minded Korean and non-Korean entrepreneurs exchange ideas, collaborate,
          innovate, and receive guidance needed to overcome challenges.
        </p>
      </div>
    </section>
  );
};

export default About;
