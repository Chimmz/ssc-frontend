import { useEffect, useState, useMemo } from 'react';

import cls from 'classnames';
import { genPublicImgSrc } from '../../utils/url-utils';

import { Icon } from '@iconify/react';
import styles from './Header.module.scss';
import useFadingImages from '../../hooks/useFadingImages';
import { shuffle } from '../../utils/array-utils';

const TOP_PHOTOS_LOCAL = [
  genPublicImgSrc(`/img/header/seq1_top.webp`),
  genPublicImgSrc(`/img/header/seq2_top.webp`),
  genPublicImgSrc(`/img/header/seq3_top.webp`),
  genPublicImgSrc(`/img/header/seq4_top.webp`)
];

const MIDDLE_PHOTOS_LOCAL = [
  genPublicImgSrc(`/img/header/seq1_mid.webp`),
  genPublicImgSrc(`/img/header/seq2_mid.webp`),
  genPublicImgSrc(`/img/header/seq3_mid.webp`),
  genPublicImgSrc(`/img/header/seq4_mid.webp`),
  genPublicImgSrc(`/img/header/seq5_mid.webp`),
  genPublicImgSrc(`/img/header/seq6_mid.webp`)
];

const BOTTOM_PHOTOS_LOCAL = [
  genPublicImgSrc(`/img/header/seq1_bot.webp`),
  genPublicImgSrc(`/img/header/seq2_bot.webp`),
  genPublicImgSrc(`/img/header/seq3_bot.webp`),
  genPublicImgSrc(`/img/header/seq4_bot.webp`),
  genPublicImgSrc(`/img/header/seq5_bot.webp`),
  genPublicImgSrc(`/img/header/seq6_bot.webp`)
];

const CHAT_ROOM_PASSWORD = 'Community Password: 2023';

const Header = () => {
  const photosAtTop = useFadingImages(TOP_PHOTOS_LOCAL.length, 12000);
  const photosAtMiddle = useFadingImages(MIDDLE_PHOTOS_LOCAL.length, 7000);
  const photosAtBottom = useFadingImages(BOTTOM_PHOTOS_LOCAL.length, 10000);

  return (
    <header className={cls(styles.header, 'bg-pry-lightest py-3')}>
      <div
        className={cls(
          styles.container,
          'container app-container d-flex flex-center gap-1 pt-5'
        )}
      >
        <div className={cls(styles.headerLeft, 'ms-auto')}>
          <h1 className="h-1--main mb-5" style={{ maxWidth: '20ch' }}>
            <span className="fs-1 color-pry d-inline-block mb-3">Seoul Startups Club</span>
            <br />
            Empowering Entrepreneurs on their Journey to Success
          </h1>

          <a
            href="https://open.kakao.com/o/gJd7Vgzd"
            target="_blank"
            className={cls(styles.btnJoin, 'btn btn-pry btn-curved btn--lg p-4 gap-3')}
            data-chatroom-password={CHAT_ROOM_PASSWORD}
          >
            <span className={styles.talkIcon}>
              <Icon icon="ri:kakao-talk-fill" width={45} />
            </span>
            <span className="fw-bold fs-5">Join our community of active members</span>
          </a>
        </div>

        <div className={styles.headerRight}>
          <div className={styles.imgBox} data-testid="img-box">
            <figure>
              {TOP_PHOTOS_LOCAL.map((imgUrl, i) => {
                const show = photosAtTop[i].isVisible;
                return (
                  <img
                    key={imgUrl}
                    src={imgUrl}
                    className={cls(show ? 'fadeIn' : 'fadeOut')}
                    alt=""
                  />
                );
              })}
            </figure>
            <figure>
              {MIDDLE_PHOTOS_LOCAL.map((imgUrl, i) => {
                const show = photosAtMiddle[i].isVisible;
                return (
                  <img
                    src={imgUrl}
                    className={cls(show ? styles.fadeIn : styles.fadeOut)}
                    alt=""
                    key={imgUrl}
                  />
                );
              })}
            </figure>
            <figure>
              <img src={genPublicImgSrc('/img/hero-bulb.png')} alt="" />
            </figure>
            <figure>
              <img src={genPublicImgSrc('/img/hero-magnif.png')} alt="" />
            </figure>
            <figure>
              {BOTTOM_PHOTOS_LOCAL.map((imgUrl, i) => {
                const show = photosAtBottom[i].isVisible;
                return (
                  <img
                    src={imgUrl}
                    className={cls(show ? styles.fadeIn : styles.fadeOut)}
                    style={{ objectPosition: 'center' }}
                    alt=""
                    key={imgUrl}
                  />
                );
              })}
            </figure>
          </div>
          <div className={cls(styles.social, 'd-flex align-items-center gap-4 mt-3')}>
            <span className="d-block circular bg-pry-dark">
              <Icon icon="ooui:next-ltr" color="#fff" />
            </span>
            <a
              href="https://www.instagram.com/seoulstartupsclub/"
              target="_blank"
              className="circular bg-pry"
              rel="noreferrer"
            >
              <Icon icon="mdi:instagram" color="#fff" />
            </a>
            <a
              href="https://www.linkedin.com/groups/14133660/"
              target="_blank"
              className="circular bg-pry"
              rel="noreferrer"
            >
              <Icon icon="uil:linkedin" color="#fff" />
            </a>
            <small className="d-block fw-bold color-pry-dark family-raleway w-max-content">
              Connect with our community on social media
            </small>
          </div>
        </div>
      </div>

      {/* <figure className="position-absolute">
        <img src={genPublicImgSrc('/img/rocket-path.svg')} alt="" />
      </figure> */}
    </header>
  );
};

export default Header;
