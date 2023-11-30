'use client';
import Link from 'next/link';

import cls from 'classnames';
import { NEWS_ITEMS } from '../../data/news-items';

import NewsGrid from '../shared/news/NewsGrid';
import SectionTitle from '../section-title/SectionTitle';
import { Icon } from '@iconify/react';

const NewsSection = () => {
  return (
    <section className="section-pad">
      <div className="container app-container d-flex flex-column text-center">
        <SectionTitle
          title="News"
          layout="end"
          responsive
          options={
            <Link
              href="/news"
              className="d-flex align-items-center btn-text-pry fs-5 family-raleway gap-2"
            >
              See all
              <span className="circular circular--sm border-pry">
                <Icon icon="grommet-icons:form-next" color="#7600ff" />
              </span>
            </Link>
          }
        />
        <NewsGrid articles={NEWS_ITEMS} />
      </div>
    </section>
  );
};

export default NewsSection;
