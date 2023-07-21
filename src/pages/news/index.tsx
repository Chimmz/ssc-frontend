import { FC, useEffect, useState } from 'react';

import useInput from '../../hooks/useInput';
import useScrollToTop from '../../hooks/useScrollToTop';

import Layout from '../../components/layout';
import TextField from '../../components/ui/text-field/TextField';
import NewsGroup from '../../components/shared/news/NewsGrid';
import NewsList from '../../components/shared/news/NewsList';
import SectionTitle from '../../components/section-title/SectionTitle';
import ContactSection from '../../components/shared/contact/Contact';
import api from '../../library/api';
import useRequest from '../../hooks/useRequest';
import { NewsObj } from '../../types';
import useDelayedActionOnTextInput from '../../hooks/useDelayedActionOnTextInput';
import { Icon } from '@iconify/react';
import usePagination from '../../hooks/usePagination';
import Pagination from '../../components/shared/pagination/Pagination';
import Paginators from '../../components/shared/pagination/Paginators';

const NEWS_PER_PAGE = 4;

const NewsPage: FC = () => {
  const [news, setNews] = useState<NewsObj[] | undefined>();
  const { inputValue: searchTerm, onChange: handleChangeSearchTerm } = useInput({ init: '' });
  const handleInputKeyUp = useDelayedActionOnTextInput(() => search());

  const { page, setPage, setPageData } = usePagination<NewsObj>();

  const {
    send: sendNewsReq,
    loading: isGettingNews,
    response
  } = useRequest<{ status: 'SUCCESS' | 'fail'; results?: number; news?: NewsObj[] }>();

  const search = () => {
    const req = api.getAllNews({ query: searchTerm, page, limit: NEWS_PER_PAGE });
    sendNewsReq(req);
  };

  useEffect(() => {
    if (!news?.length) search();
  }, []);

  useEffect(() => {
    if (response?.status === 'SUCCESS') setNews(response.news);
  }, [response]);

  const handlePageChange = (pg: number) => {};

  return (
    <Layout navStyles={{ backgroundColor: '#fff' }}>
      <section className="section-pad-top section-pad-bottom-lg">
        <div className="container app-container d-flex flex-column">
          <SectionTitle title="News" line={false} />
          <div
            className="justify-self-end ms-auto d-flex align-items-center position-relative"
            style={{ width: 'max(20%, 150px)' }}
          >
            <TextField
              value={searchTerm}
              onChange={handleChangeSearchTerm}
              onKeyUp={handleInputKeyUp}
              placeholder="Search"
              className="justify-self-end ms-auto"
              inputClassName="underline"
            />
            <span className="position-absolute" style={{ right: 0, bottom: '10px' }}>
              <Icon icon="fluent:search-32-regular" color="#7600ff" width={20} />
            </span>
          </div>
          {!searchTerm ? <NewsGroup /> : null}
          <NewsList items={news} />

          {/* <Pagination currentPage={page} totalPages={10} className="mt-6" /> */}
          <Paginators
            currentPage={page}
            onPageChange={handlePageChange}
            pageCount={10}
            className="mt-6"
          />
        </div>
      </section>
      <ContactSection className="mt-5" />
    </Layout>
  );
};

export default NewsPage;
