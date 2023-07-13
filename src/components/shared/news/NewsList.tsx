import { Icon } from '@iconify/react';
import NewsItem from './NewsItem';
import Pagination from '../pagination/Pagination';

const NewsList = () => {
  return (
    <div className="">
      <ul className="d-flex flex-column gap-5 list-style-none mt-5 mb-8">
        <NewsItem />
        <NewsItem />
        <NewsItem />
      </ul>
      <Pagination currentPage={2} totalPages={10} className="mt-6" />
    </div>
  );
};

export default NewsList;
