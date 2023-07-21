import { Icon } from '@iconify/react';
import NewsItem from './NewsItem';
import Pagination from '../pagination/Pagination';
import { NewsObj } from '../../../types';

interface Props {
  items: NewsObj[] | undefined;
}

const NewsList: React.FC<Props> = ({ items }) => {
  return (
    <div className="">
      <ul className="d-flex flex-column gap-5 list-style-none mt-5 mb-8">
        {items?.map(item => (
          <NewsItem {...item} key={item._id} />
        ))}
      </ul>
    </div>
  );
};

export default NewsList;
