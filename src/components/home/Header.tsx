import { useEffect, useState } from 'react';

import cls from 'classnames';
import { genPublicImgSrc } from '../../utils/url-utils';

import { Icon } from '@iconify/react';
import styles from './Header.module.scss';

const maxImgSequence = {
  top: 4,
  mid: 6,
  bottom: 6
};

const Header = () => {
  const [imgSeq, setImgSeq] = useState({ top: 1, mid: 1, bottom: 1 });

  useEffect(() => {
    const intervalId = setInterval(() => {
      setImgSeq(seq => {
        return {
          top: seq.top === maxImgSequence.top ? 1 : seq.top + 1,
          mid: seq.mid === maxImgSequence.mid ? 1 : seq.mid + 1,
          bottom: seq.bottom === maxImgSequence.bottom ? 1 : seq.bottom + 1
        };
      });
    }, 10000);
    return () => clearInterval(intervalId);
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

        <div className={styles.imgBox} data-testid="img-box">
          <figure>
            <img src={genPublicImgSrc(`/img/header/seq${imgSeq.top}_top.jpg`)} alt="" />
          </figure>
          <figure>
            <img src={genPublicImgSrc(`/img/header/seq${imgSeq.mid}_mid.jpg`)} alt="" />
          </figure>
          <figure>
            <img src={genPublicImgSrc('/img/hero-bulb.png')} alt="" />
          </figure>
          <figure>
            <img src={genPublicImgSrc('/img/hero-magnif.png')} alt="" />
          </figure>
          <figure>
            <img src={genPublicImgSrc(`/img/header/seq${imgSeq.bottom}_bottom.jpg`)} alt="" />
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
