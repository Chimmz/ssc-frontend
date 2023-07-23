import { Icon } from '@iconify/react';
import NewsItem from './NewsItem';
import Pagination from '../pagination/Pagination';
import { NewsObj } from '../../../types';
import cls from 'classnames';

interface Props {
  items: NewsObj[] | undefined;
  searchTerm?: string;
  className?: string;
}

const NewsList: React.FC<Props> = ({ items, searchTerm, className }) => {
  return (
    <div className={className} id="news">
      <ul className="d-flex flex-column gap-5 list-style-none mt-5 mb-8">
        {items?.map(item => (
          <NewsItem item={item} searchTerm={searchTerm} key={item._id} />
        ))}
      </ul>
    </div>
  );
};

export default NewsList;
