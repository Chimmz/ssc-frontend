import { useMemo } from 'react';
import cls from 'classnames';
import { genPublicImgSrc } from '../../../utils/url-utils';
import styles from './NewsItem.module.scss';
import { NewsObj } from '../../../types';
import { Link } from 'react-router-dom';
import { formatDate } from '../../../utils/date-utils';
import { boldenPatternsInText } from '../../../utils/dom-utils';

interface NewsItemProps {
  item: NewsObj;
  searchTerm?: string;
}

const NewsItem: React.FC<NewsItemProps> = ({ item, searchTerm }) => {
  return (
    <Link to={`${item._id}`} state={{ newsItem: item }}>
      <li className={styles.newsItem}>
        <figure>
          <img src={genPublicImgSrc('/img/news-img2.png')} alt="" />
        </figure>
        <article className="d-flex flex-column gap-3">
          <h4 className={cls(!searchTerm && 'fw-bold')}>{item.headline}</h4>
          <p className={cls('parag')}>{item.story}</p>
          <small className={cls(styles.date, 'text-light')}>
            {formatDate(item.createdAt)}
          </small>
        </article>
      </li>
    </Link>
  );
};

export default NewsItem;
