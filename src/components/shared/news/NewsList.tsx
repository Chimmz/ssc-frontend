import { Icon } from '@iconify/react';
import NewsItem from './NewsItem';

const NewsList = () => {
  return (
    <div className="">
      <ul className="d-flex flex-column gap-5 list-style-none my-5">
        <NewsItem />
        <NewsItem />
        <NewsItem />
      </ul>

      <div className="d-flex align-items-center justify-content-end text-end">
        <Icon icon="grommet-icons:form-previous" color="#7600ff" width={18} />
        <span>1 of 10</span>
        <Icon icon="grommet-icons:form-next" color="#7600ff" width={18} />
      </div>
    </div>
  );
};

export default NewsList;
