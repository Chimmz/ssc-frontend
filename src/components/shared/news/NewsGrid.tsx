import cls from 'classnames';
import styles from './NewsGrid.module.scss';
import { NewsObj } from '../../../types';
import { formatDate } from '../../../utils/date-utils';
import { Link } from 'react-router-dom';

const NewsGrid: React.FC<{ readonly articles: NewsObj[] | undefined }> = props => {
  return (
    <div className={cls(styles.newsUpdates, 'my-5')}>
      {props.articles?.slice(0, 4).map(a => (
        <Link to={`/news/${a._id}`} className={styles.newsItem} key={a._id}>
          <figure>
            <img src={a.imgUrl} alt="" />
            <figcaption className="fs-3 family-raleway text-start">
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
