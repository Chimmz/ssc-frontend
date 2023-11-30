import cls from 'classnames';
import { formatDate } from '../../../utils/date-utils';
import Link from 'next/link';
import styles from './NewsGrid.module.scss';

const NewsGrid: React.FC<{ readonly articles: NewsObj[] | undefined }> = props => {
  return (
    <div className={cls(styles.newsUpdates, 'mt-5')}>
      {props.articles?.slice(0, 4).map(a => (
        <Link href={`/news/${a._id}`} className={cls(styles.newsItem, 'border')} key={a._id}>
          <figure>
            <img src={a.imgUrl} alt="" style={{ objectPosition: '50% 35%' }} />
            <figcaption className="family-raleway text-start">
              {a.headline}
              <br />
              <small className="fs-5">{formatDate(a.createdAt)}</small>
            </figcaption>
          </figure>
        </Link>
      ))}
    </div>
  );
};

export default NewsGrid;
