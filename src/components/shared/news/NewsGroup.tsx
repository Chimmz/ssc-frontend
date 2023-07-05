import cls from 'classnames';
import { genPublicImgSrc } from '../../../utils/url-utils';
import styles from './NewsGroup.module.scss';

const NewsGroup: React.FC = () => {
  return (
    <div className={cls(styles.newsUpdates, 'my-5')}>
      <article className="">
        <figure>
          <img src={genPublicImgSrc('/img/hero-img2.png')} alt="" />{' '}
          <figcaption className="fs-3 text-start">
            Lorem ipsum dolor sit amet consectetur adipisicing.
            <br />
            <small className="fs-5">May 23, 2023</small>
          </figcaption>
        </figure>
      </article>
      <article className="">
        <figure>
          <img src={genPublicImgSrc('/img/hero-img1.png')} alt="" />{' '}
          <figcaption className="fs-3 text-start">
            Lorem ipsum dolor sit amet consectetur adipisicing.
            <br />
            <small className="fs-5">May 23, 2023</small>
          </figcaption>
        </figure>
      </article>
      <article className="">
        <figure>
          <img src={genPublicImgSrc('/img/hero-img3.png')} alt="" />{' '}
          <figcaption className="fs-3 text-start">
            Lorem ipsum dolor sit amet consectetur adipisicing.
            <br />
            <small className="fs-5">May 23, 2023</small>
          </figcaption>
        </figure>
      </article>
      <article className="">
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
  );
};

export default NewsGroup;
