import { Icon } from '@iconify/react';
import NewsItem from './NewsItem';
import Pagination from '../pagination/Pagination';
import cls from 'classnames';

interface Props {
  items: NewsObj[] | undefined;
  searchTerm?: string;
  className?: string;
}

const NewsList: React.FC<Props> = ({ items, searchTerm, className }) => {
  if (!items?.length) return <></>;
  return (
    <div className={className} id="news">
      <ul className="d-flex flex-column gap-5 list-style-none mt-5">
        {items?.map(item => (
          <NewsItem item={item} searchTerm={searchTerm} key={item._id} />
        ))}
      </ul>
    </div>
  );
};

export default NewsList;
