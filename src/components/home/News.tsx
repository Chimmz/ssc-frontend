import cls from 'classnames';
import SectionTitle from '../section-title/SectionTitle';
import styles from './News.module.scss';
import { genPublicImgSrc } from '../../utils/url-utils';
import { Link } from 'react-router-dom';
import { Icon } from '@iconify/react';
import NewsGroup from '../shared/news/NewsGroup';

const News = () => {
  return (
    <section className={styles.section}>
      <div className="container app-container d-flex flex-column text-center">
        <SectionTitle
          title="News"
          link={
            <Link to="/news" className="d-flex align-items-center gap-2">
              See all{' '}
              <button
                className="btn btn-circle border-pry"
                style={{ width: '2rem', height: '2rem', borderColor: '#7600ff' }}
              >
                <Icon icon="grommet-icons:form-next" color="#7600ff" />
              </button>
            </Link>
          }
        />
        <NewsGroup />
      </div>
    </section>
  );
};

export default News;
