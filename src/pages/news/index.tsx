import { FC, useEffect, useState, useMemo } from 'react';

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
import ThreeDotsSpinner from '../../components/ui/loader/ThreeDotsSpinner';
import { boldenPatternsInText, scrollToElement } from '../../utils/dom-utils';

const NEWS_PER_PAGE = 4;

const NewsPage: FC = () => {
  const [news, setNews] = useState<NewsObj[] | undefined>();

  const { inputValue: searchTerm, onChange: handleChangeSearchTerm } = useInput({ init: '' });
  const { page, goPrevPage, goNextPage, setPage, setPageData } = usePagination<NewsObj>();
  const handleInputKeyUp = useDelayedActionOnTextInput(() => search());

  const {
    send: sendNewsReq,
    loading: loadingNews,
    response
  } = useRequest<{
    status: 'SUCCESS' | 'fail';
    results?: number;
    total?: number;
    news?: NewsObj[];
  }>();

  const search = () => {
    const req = api.getAllNews({ query: searchTerm, page, limit: NEWS_PER_PAGE });
    sendNewsReq(req);
  };

  useEffect(() => {
    if (response?.news) {
      setNews(response.news);
      scrollToElement('#news');
    }
  }, [response]);

  useEffect(() => {
    search();
  }, [page]);

  useEffect(() => {
    setPage(1);
  }, [searchTerm]);

  const newsBoldened = useMemo(() => {
    if (response?.news && searchTerm)
      return response?.news?.map(item => ({
        ...item,
        headline: boldenPatternsInText(item.headline as string, searchTerm),
        story: boldenPatternsInText(item.story as string, searchTerm)
      }));
  }, [response]);

  const handlePageChange = (pg: number) => {
    // console.log(pg);
    setPage(pg);
  };

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

          {/* <ThreeDotsSpinner show={loadingNews} size="lg" text="Loading..." className="my-8" /> */}

          <NewsList items={newsBoldened || news} searchTerm={searchTerm} />

          {!response?.news?.length ? (
            <div className="bg-light rounded-2 border text-center p-3">No results</div>
          ) : null}

          {response?.news?.length ? (
            <Pagination
              currentPage={page}
              onChangePage={handlePageChange}
              totalPages={Math.ceil(response.total! / NEWS_PER_PAGE)}
              className="mt-6"
            />
          ) : null}
        </div>
      </section>
      <ContactSection className="mt-5" />
    </Layout>
  );
};

export default NewsPage;
