import { useMemo } from 'react';
import cls from 'classnames';
import { genPublicImgSrc } from '../../../utils/url-utils';
import styles from './NewsItem.module.scss';
import { formatDate } from '../../../utils/date-utils';
import { boldenPatternsInText } from '../../../utils/dom-utils';
import Link from 'next/link';

interface NewsItemProps {
  item: NewsObj;
  searchTerm?: string;
}

const NewsItem: React.FC<NewsItemProps> = ({ item, searchTerm }) => {
  return (
    <Link href={`${item._id}`}>
      <li className={styles.newsItem}>
        <figure>
          <img src={item.imgUrl} alt="" />
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
