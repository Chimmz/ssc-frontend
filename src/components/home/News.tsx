import cls from 'classnames';
import SectionTitle from '../section-title/SectionTitle';
import styles from './News.module.scss';
import { genPublicImgSrc } from '../../utils/url-utils';

const News = () => {
  return (
    <section className={styles.section}>
      <div className="container d-flex flex-column text-center">
        <SectionTitle title="News" />
        <div className={cls(styles.newsUpdates, 'mt-5')}>
          <article className="rounded overflow-hidden">
            <figure>
              <img src={genPublicImgSrc('/img/hero-img2.png')} alt="" />{' '}
              <figcaption className="fs-3 text-start">
                Lorem ipsum dolor sit amet consectetur adipisicing.
                <br />
                <small className="fs-5">May 23, 2023</small>
              </figcaption>
            </figure>
          </article>
          <article className="rounded overflow-hidden">
            <figure>
              <img src={genPublicImgSrc('/img/hero-img1.png')} alt="" />{' '}
              <figcaption className="fs-3 text-start">
                Lorem ipsum dolor sit amet consectetur adipisicing.
                <br />
                <small className="fs-5">May 23, 2023</small>
              </figcaption>
            </figure>
          </article>
          <article className="rounded overflow-hidden">
            <figure>
              <img src={genPublicImgSrc('/img/hero-img3.png')} alt="" />{' '}
              <figcaption className="fs-3 text-start">
                Lorem ipsum dolor sit amet consectetur adipisicing.
                <br />
                <small className="fs-5">May 23, 2023</small>
              </figcaption>
            </figure>
          </article>
          <article className="rounded overflow-hidden">
            <figure>
              <img src={genPublicImgSrc('/img/hero-img2.png')} alt="" />{' '}
              <figcaption className="fs-3 text-start">
                Lorem ipsum dolor sit amet consectetur adipisicing.
                <br />
                <small className="fs-5">May 23, 2023</small>
              </figcaption>
            </figure>
          </article>
        </div>
      </div>
    </section>
  );
};

export default News;
