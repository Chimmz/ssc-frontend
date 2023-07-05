import cls from 'classnames';
import { genPublicImgSrc } from '../../../utils/url-utils';
import styles from './NewsItem.module.scss';

const NewsItem = () => {
  return (
    <li className={styles.newsItem}>
      <figure>
        <img src={genPublicImgSrc('/img/news-img2.png')} alt="" />
      </figure>
      <article className="d-flex flex-column gap-3">
        <h4 className="fw-bold">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, nisi!
        </h4>
        <p className="parag">
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Necessitatibus enim nemo
          velit iure fuga quo fugit, voluptatem ex et nobis? Lorem ipsum dolor sit amet
          consectetur, adipisicing elit.
        </p>
        <small className={cls(styles.date, 'text-light')}>May 22, 2023</small>
      </article>
    </li>
  );
};

export default NewsItem;
