'use client';
import { FC, useEffect, useState, useMemo } from 'react';

import useInput from '../../hooks/useInput';
import useScrollToTop from '../../hooks/useScrollToTop';

import Layout from '../../components/layout';
import TextField from '../../components/ui/text-field/TextField';
import NewsGrid from '../../components/shared/news/NewsGrid';
import NewsList from '../../components/shared/news/NewsList';
import SectionTitle from '../../components/section-title/SectionTitle';
import ContactSection from '../../components/shared/contact/Contact';
import api from '../../library/api';
import useRequest from '../../hooks/useRequest';
import useDelayedActionOnTextInput from '../../hooks/useDelayedActionOnTextInput';
import { Icon } from '@iconify/react';
import usePagination from '../../hooks/usePagination';
import Pagination from '../../components/shared/pagination/Pagination';
import Paginators from '../../components/shared/pagination/Paginators';
import ThreeDotsSpinner from '../../components/ui/loader/ThreeDotsSpinner';
import { boldenPatternsInText, scrollToElement } from '../../utils/dom-utils';
import { genPublicImgSrc } from '../../utils/url-utils';
import { NEWS_ITEMS } from '../../data/news-items';
import styles from './index.module.scss';
import cls from 'classnames';
import TextSearch from '../../components/ui/text-field/TextSearch';

const NEWS_PER_PAGE = 4;

const NewsPage: FC = () => {
  const [articles, setArticles] = useState<NewsObj[] | undefined>(NEWS_ITEMS);

  const {
    inputValue: searchTerm,
    onChange: handleChangeSearchTerm,
    clearInput: clearSearchTerm
  } = useInput({ init: '' });

  const { page, goPrevPage, goNextPage, setPage, setPageData } = usePagination<NewsObj>();
  // const handleInputKeyUp = useDelayedActionOnTextInput(() => search());

  const {
    sendReq: sendNewsReq,
    response,
    setResponse
  } = useRequest<{
    status: 'SUCCESS' | 'fail';
    results?: number;
    total?: number;
    articles?: NewsObj[];
  }>();

  const search = () => {
    if (!searchTerm.length) {
      setArticles(NEWS_ITEMS);
      setResponse(undefined);
      return;
    }
    const pattern = searchTerm.trim().toLowerCase();

    const results = articles?.filter(a => {
      return ([a.headline, a.story] as string[]).some(
        str => str.toLowerCase().search(pattern) !== -1
      );
    });
    setResponse({
      status: 'SUCCESS',
      articles: results,
      results: results?.length,
      total: NEWS_ITEMS.length
    });
    console.log(results?.map(r => r.headline));
  };

  // const search = () => {
  //   const req = api.getAllNews({ query: searchTerm, page, limit: NEWS_PER_PAGE });
  //   sendNewsReq(req);
  // };

  useEffect(() => {
    if (response?.articles) {
      setArticles(response.articles);
      if (page !== 1) scrollToElement('#news');
    }
  }, [response]);

  useEffect(() => {
    search();
  }, [searchTerm]);

  const newsBoldened = useMemo(() => {
    if (response?.articles && searchTerm.trim().length)
      return response?.articles?.map(art => ({
        ...art,
        headline: boldenPatternsInText(art.headline as string, searchTerm.trim()),
        story: boldenPatternsInText(art.story as string, searchTerm.trim())
      }));
  }, [response]);

  const handlePageChange = (pg: number) => pg !== 0 && setPage(pg);

  const articlesToPreview = useMemo(() => articles?.slice(0, 4), []); // Change this deps when API is done
  const articlesToShowFully = useMemo(() => articles?.slice(4, articles.length), []);

  return (
    <section className="section-pad mb-8">
      <div className="container app-container d-flex flex-column">
        <SectionTitle title="News" line={false} />

        <div className={cls(styles.pageOptions, 'gap-4 mb-5')}>
          <button className="btn btn-pry btn--lg" disabled>
            <Icon icon="jam:write" /> Post an Article
          </button>
          <TextSearch
            className="justify-self-end ms-auto d-flex align-items-center position-relative"
            inputValue={searchTerm}
            onChange={handleChangeSearchTerm}
            clearInput={clearSearchTerm}
            onSubmit={search}
          />
        </div>
        {!searchTerm ? <NewsGrid articles={articlesToPreview} /> : null}

        {/* <ThreeDotsSpinner show={loadingNews} size="lg" text="Loading..." className="my-8" /> */}

        <NewsList
          items={newsBoldened?.length ? newsBoldened : articlesToShowFully}
          searchTerm={searchTerm}
        />

        {!newsBoldened?.length && searchTerm.trim() ? (
          <div className="bg-light rounded-2 border text-center p-3">No results</div>
        ) : null}

        {/* {response?.news?.length ? (
            <Pagination
              currentPage={page}
              onChangePage={handlePageChange}
              totalPages={Math.ceil(response.total! / NEWS_PER_PAGE)}
              className="mt-6"
            />
          ) : null} */}
      </div>
    </section>
  );
};

export default NewsPage;
