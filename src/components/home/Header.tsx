import React from 'react';

import cls from 'classnames';
import { genPublicImgSrc } from '../../utils/url-utils';

import { Icon } from '@iconify/react';

import styles from './Header.module.scss';

const Header = () => {
  return (
    <header className={cls(styles.header, 'bg-pry-lightest py-3')}>
      <div className={cls(styles.container, 'container d-flex flex-center gap-5 pt-5')}>
        <div className="textbox ms-auto">
          <h1 className="h-1--main mb-5" style={{ minWidth: '16ch', maxWidth: '20ch' }}>
            <span className="h-2 fs-2 d-inline-block mb-3">Seoul Startups Club</span>
            <br />
            Empowering Entrepreneurs in Korea on their Journey to Startup Success
          </h1>
          <button className="btn btn-pry btn-curved btn--lg d-flex gap-3 pe-4">
            <Icon icon="ri:kakao-talk-fill" width={35} />
            Join our community of active members
          </button>
        </div>

        <div className={styles.imgBox}>
          <figure>
            <img src={genPublicImgSrc('/img/hero-img1.png')} alt="" />
          </figure>
          <figure>
            <img src={genPublicImgSrc('/img/hero-img3.png')} alt="" />
          </figure>
          <figure>
            <img src={genPublicImgSrc('/img/hero-bulb.png')} alt="" />
          </figure>
          <figure>
            <img src={genPublicImgSrc('/img/hero-rocket.png')} alt="" />
          </figure>
          <figure>
            <img src={genPublicImgSrc('/img/hero-img2.png')} alt="" />
          </figure>
        </div>
      </div>
    </header>
  );
};

export default Header;
