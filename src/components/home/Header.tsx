import React, { useEffect, useState } from 'react';

import cls from 'classnames';
import { genPublicImgSrc } from '../../utils/url-utils';

import { Icon } from '@iconify/react';

import styles from './Header.module.scss';

// https://www.instagram.com/seoulstartupsclub/
// https://www.linkedin.com/groups/14133660/

const Header = () => {
  const [seq, setSeq] = useState(1);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setSeq(seq => seq + 1);
    }, 5000);
    return clearInterval(intervalId);
  }, []);

  return (
    <header className={cls(styles.header, 'bg-pry-lightest py-3')}>
      <div
        className={cls(
          styles.container,
          'container app-container d-flex flex-center gap-1 pt-5'
        )}
      >
        <div className={cls(styles.textbox, 'ms-auto')}>
          <h1 className="h-1--main mb-5" style={{ maxWidth: '20ch' }}>
            <span className="fs-1 color-pry d-inline-block mb-3">Seoul Startups Club</span>
            <br />
            Empowering Entrepreneurs in Korea on their Journey to Startup Success
          </h1>

          <a
            href="https://open.kakao.com/o/gJd7Vgzd"
            target="_blank"
            className={cls(styles.btnJoin, 'btn btn-pry btn-curved btn--lg p-4 gap-3')}
            data-chatroom-password="Chat room password: 2023"
          >
            <span className={styles.talkIcon}>
              <Icon icon="ri:kakao-talk-fill" width={45} />
            </span>
            <span className="fw-bold fs-5">Join our community of active members</span>
          </a>
        </div>

        <div className={styles.imgBox}>
          <figure>
            <img src={genPublicImgSrc(`/img/header/seq${seq}_top.jpg`)} alt="" />
          </figure>
          <figure>
            <img src={genPublicImgSrc(`/img/header/seq${seq}_mid.jpg`)} alt="" />
          </figure>
          <figure>
            <img src={genPublicImgSrc('/img/hero-bulb.png')} alt="" />
          </figure>
          <figure>
            <img src={genPublicImgSrc('/img/hero-magnif.png')} alt="" />
          </figure>
          <figure>
            <img src={genPublicImgSrc(`/img/header/seq${seq}_bottom.jpg`)} alt="" />
          </figure>
        </div>
      </div>

      <figure className="position-absolute">
        <img src={genPublicImgSrc('/img/rocket-line.png')} alt="" />
      </figure>
    </header>
  );
};

export default Header;
