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
        <h2 className="h-2 fs-2 d-inline-block mb-5">What is Seoul Startups Club?</h2>
        <p className="parag text-black mx-auto mb-5" style={{ maxWidth: '39ch' }}>
          Seoul Startups Club (SSC) is Korea’s leading startup community founded by successful
          entrepreneurs who have firsthand experience in navigating the startup ecosystem.
        </p>
        <p className="parag text-black mx-auto" style={{ maxWidth: '45ch' }}>
          We understand the challenges and lack of support system that comes with starting a
          business in Korea. <br /> That's why we established SSC- a resourceful community
          where like-minded Korean and non-Korean entrepreneurs exchange ideas, collaborate,
          innovate, and receive guidance needed to overcome challenges.
        </p>

        <img src={genPublicImgSrc('/img/union.png')} width={22} className="absolute" />
        <img src={genPublicImgSrc('/img/union.png')} width={22} className="absolute" />
      </div>
    </section>
  );
};

export default About;
