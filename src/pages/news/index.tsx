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
import { genPublicImgSrc } from '../../utils/url-utils';

const NEWS_PER_PAGE = 4;

const items: NewsObj[] = [
  {
    _id: '1',
    headline: 'How we maximize your Korean food experience',
    isApprovedByAdmin: true,
    story:
      'From our experiences of introducing Korean food to our foreign friends, they had the most enjoyable time when 1) the menu was something they liked, 2) there were some explanation on how to eat the food and 3) when it was with a good company :)',
    createdAt: new Date(1691449200000).toString(),
    imgUrl: genPublicImgSrc('/img/hanseek-article-pie-chart.webp'),
    updatedAt: ''
  },
  {
    _id: '2',
    headline: 'How to keep track of global startup programs as a founder',
    isApprovedByAdmin: true,
    story:
      'Are you an ambitious, early-stage startup founder on the hunt for accelerators, incubators, competitions, or corporate innovation programs? Look no further, because we have a game-changing solution for you: Flair by Founders Lair!      ',
    createdAt: new Date(1691449200000).toString(),
    imgUrl: genPublicImgSrc('/img/flair-and-products.png'),
    updatedAt: ''
  },
  {
    _id: '3',
    headline: 'We conducted brief interview with Joshua Chung, CEO of Intelliwebi',
    isApprovedByAdmin: true,
    story:
      'Intelliwebi is a software application that helps startups create and deliver more effective pitches. They typically offer a variety of features, such as Templates for creating pitch decks, Tools for visualizing data, Practice with chatbot mode',
    createdAt: new Date(1691449200000).toString(),
    imgUrl:
      'https://res.cloudinary.com/devletwwd/image/upload/v1691873616/startup-logos/cqrkk2lkr4cpahfts1yd.png',
    updatedAt: ''
  }
];

const NewsPage: FC = () => {
  const [news, setNews] = useState<NewsObj[] | undefined>(items);

  const { inputValue: searchTerm, onChange: handleChangeSearchTerm } = useInput({ init: '' });
  const { page, goPrevPage, goNextPage, setPage, setPageData } = usePagination<NewsObj>();
  const handleInputKeyUp = useDelayedActionOnTextInput(() => search());

  useScrollToTop();

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
      if (page !== 1) scrollToElement('#news');
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
        headline: boldenPatternsInText(item.headline as string, searchTerm.trim()),
        story: boldenPatternsInText(item.story as string, searchTerm.trim())
      }));
  }, [response]);

  const handlePageChange = (pg: number) => pg !== 0 && setPage(pg);

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
