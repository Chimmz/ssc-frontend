import React from 'react';

import cls from 'classnames';
import { genPublicImgSrc } from '../../utils/url-utils';

import { Icon } from '@iconify/react';

import styles from './Header.module.scss';

const Header = () => {
  return (
    <header className={cls(styles.header, 'bg-pry-lightest py-3')}>
      <div
        className={cls(
          styles.container,
          'container app-container d-flex flex-center gap-1 pt-5'
        )}
      >
        <div className="textbox ms-auto">
          <h1 className="h-1--main mb-5" style={{ minWidth: '16ch', maxWidth: '20ch' }}>
            <span className="h-2 fs-2 d-inline-block mb-3">Seoul Startups Club</span>
            <br />
            Empowering Entrepreneurs in Korea on their Journey to Startup Success
          </h1>

          <button
            className={cls(styles.btnJoin, 'btn btn-pry btn-curved btn--lg p-4 gap-3')}
            data-chatroom-password="Chat room password: 1234"
          >
            <span className={styles.talkIcon}>
              <Icon icon="ri:kakao-talk-fill" width={45} />
            </span>
            <span className="fw-bold fs-5">Join our community of active members</span>
          </button>
        </div>

        <div className={styles.imgBox}>
          <figure>
            <img src={genPublicImgSrc('/img/hero-img4.png')} alt="" />
          </figure>
          <figure>
            <img src={genPublicImgSrc('/img/hero-img3.png')} alt="" />
          </figure>
          <figure>
            <img src={genPublicImgSrc('/img/hero-bulb.png')} alt="" />
          </figure>
          <figure>
            <img src={genPublicImgSrc('/img/hero-magnif.png')} alt="" />
          </figure>
          <figure>
            <img src={genPublicImgSrc('/img/hero-img2.png')} alt="" />
          </figure>
          {/* <figure className="position-absolute">
            <img src={genPublicImgSrc('/img/hero-flyingrocket.png')} alt="" />
          </figure> */}
        </div>
      </div>
    </header>
  );
};

export default Header;
