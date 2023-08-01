import { useEffect, useState, useMemo } from 'react';

import cls from 'classnames';
import { genPublicImgSrc } from '../../utils/url-utils';

import { Icon } from '@iconify/react';
import styles from './Header.module.scss';
import useFadingImages from '../../hooks/useFadingImages';
import { shuffle } from '../../utils/array-utils';

const TOP_PHOTOS = [
  'https://res.cloudinary.com/devletwwd/image/upload/v1690143254/SSC/Top/Seq1._Top_xq5dag.jpg',
  'https://res.cloudinary.com/devletwwd/image/upload/v1690143174/SSC/Top/seq2_top_xmjcxs.jpg',
  'https://res.cloudinary.com/devletwwd/image/upload/v1690143258/SSC/Top/seq3_top_ylu3yh.jpg',
  'https://res.cloudinary.com/devletwwd/image/upload/v1690143208/SSC/Top/seq4_top_pxnwue.jpg',
  'https://res.cloudinary.com/devletwwd/image/upload/v1690143170/SSC/Top/seq5_top_q5loqe.jpg',
  'https://res.cloudinary.com/devletwwd/image/upload/v1690143237/SSC/Top/seq6_top_x8onza.jpg'
];

const TOP_PHOTOS_LOCAL = [
  genPublicImgSrc(`/img/header/seq1_top.jpg`),
  genPublicImgSrc(`/img/header/seq2_top.jpg`),
  genPublicImgSrc(`/img/header/seq3_top.jpg`),
  genPublicImgSrc(`/img/header/seq4_top.jpg`)
];

const MIDDLE_PHOTOS = [
  'https://res.cloudinary.com/devletwwd/image/upload/v1690142859/SSC/Middle/seq1_mid_vklbfn.jpg',
  'https://res.cloudinary.com/devletwwd/image/upload/v1690142813/SSC/Middle/seq2_mid_js7avt.jpg',
  'https://res.cloudinary.com/devletwwd/image/upload/v1690142826/SSC/Middle/seq3_mid_pqp0xm.jpg',
  'https://res.cloudinary.com/devletwwd/image/upload/v1690142826/SSC/Middle/seq4_mid_jheqha.jpg',
  'https://res.cloudinary.com/devletwwd/image/upload/v1690142848/SSC/Middle/seq5_mid_o1xsbc.jpg',
  'https://res.cloudinary.com/devletwwd/image/upload/v1690142847/SSC/Middle/seq6_mid_pltbt2.jpg'
];

const MIDDLE_PHOTOS_LOCAL = [
  genPublicImgSrc(`/img/header/seq1_mid.jpg`),
  genPublicImgSrc(`/img/header/seq2_mid.jpg`),
  genPublicImgSrc(`/img/header/seq3_mid.jpg`),
  genPublicImgSrc(`/img/header/seq4_mid.jpg`),
  genPublicImgSrc(`/img/header/seq5_mid.jpg`),
  genPublicImgSrc(`/img/header/seq6_mid.jpg`)
];

const BOTTOM_PHOTOS = [
  'https://res.cloudinary.com/devletwwd/image/upload/v1690142467/SSC/seq1_bot_fwh5l3.jpg',
  'https://res.cloudinary.com/devletwwd/image/upload/v1690142440/SSC/seq2_bot_bntphz.jpg',
  'https://res.cloudinary.com/devletwwd/image/upload/v1690142444/SSC/seq3_bot_bm8bs7.jpg',
  'https://res.cloudinary.com/devletwwd/image/upload/v1690142449/SSC/seq4_bot_g7ixcq.jpg',
  'https://res.cloudinary.com/devletwwd/image/upload/v1690142450/SSC/seq5_bot_jtusov.jpg',
  'https://res.cloudinary.com/devletwwd/image/upload/v1690142437/SSC/seq6_bot_beb5pu.jpg'
];

const BOTTOM_PHOTOS_LOCAL = [
  genPublicImgSrc(`/img/header/seq1_bottom.jpg`),
  genPublicImgSrc(`/img/header/seq2_bottom.jpg`),
  genPublicImgSrc(`/img/header/seq3_bottom.jpg`),
  genPublicImgSrc(`/img/header/seq4_bottom.jpg`),
  genPublicImgSrc(`/img/header/seq5_bottom.jpg`),
  genPublicImgSrc(`/img/header/seq6_bottom.jpg`)
];

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

        <div className={styles.headerRight}>
          <div className={styles.imgBox} data-testid="img-box">
            <figure>
              {TOP_PHOTOS_LOCAL.map((imgUrl, i) => {
                const show = photosAtTop[i].isVisible;
                return (
                  <img src={imgUrl} className={cls(show ? 'fadeIn' : 'fadeOut')} alt="" />
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
                    alt=""
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
        <img src={genPublicImgSrc('/img/rocket-line.png')} alt="" />
      </figure> */}
    </header>
  );
};

export default Header;

// const separatePhotos = (photos: string[]) => {
//   let top: string[] = [],
//     mid: string[] = [],
//     bottom: string[] = [];

//   photos.forEach(ph => {
//     if (ph.toLowerCase().includes('top')) return top.push(ph);
//     if (['_mid', 'middle'].some(str => ph.toLowerCase().includes(str))) return mid.push(ph);
//     bottom.push(ph);
//   });
//   return [top, mid, bottom];
// };
