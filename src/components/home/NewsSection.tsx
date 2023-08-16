import cls from 'classnames';
import SectionTitle from '../section-title/SectionTitle';
import styles from './NewsSection.module.scss';
import { genPublicImgSrc } from '../../utils/url-utils';
import { Link } from 'react-router-dom';
import { Icon } from '@iconify/react';
import NewsGrid from '../shared/news/NewsGrid';
import { NEWS_ITEMS } from '../../data/news-items';

const NewsSection = () => {
  return (
    <section className={styles.section}>
      <div className="container app-container d-flex flex-column text-center">
        <SectionTitle
          title="News"
          layout="end"
          responsive
          options={
            <Link
              to="/news"
              className="d-flex align-items-center btn-text-pry fs-5 family-raleway gap-2"
            >
              See all
              <button
                className="btn btn-circle border-pry"
                style={{ width: '1.7rem', height: '1.7rem', borderColor: '#7600ff' }}
              >
                <Icon icon="grommet-icons:form-next" color="#7600ff" />
              </button>
            </Link>
          }
        />
        <NewsGrid articles={NEWS_ITEMS} />
      </div>
    </section>
  );
};

export default NewsSection;
