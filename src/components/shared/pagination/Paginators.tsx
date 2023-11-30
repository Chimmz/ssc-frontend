import { Icon } from '@iconify/react';
import ReactPaginate from 'react-paginate';
import styles from './Paginators.module.scss';

interface Props {
  pageCount: number;
  onPageChange(n: number): any;
  currentPage: number;
  className?: string;
}

const Paginators = function (props: Props) {
  const { pageCount, onPageChange, currentPage } = props;

  const showPreviousLabel = currentPage > 1;
  const showNextLabel = currentPage < pageCount;

  // console.log({ showPreviousLabel, showNextLabel });

  return (
    <ReactPaginate
      breakLabel="..."
      onPageChange={({ selected: pgIndex }) => onPageChange(pgIndex + 1)}
      // pageRangeDisplayed={10}
      pageCount={pageCount}
      previousLabel={
        <Icon
          icon="material-symbols:chevron-left-rounded"
          width={22}
          color="gray"
          // style={{ opacity: showPreviousLabel ? 1 : '0.2' }}
        />
      }
      nextLabel={
        <Icon
          icon="material-symbols:chevron-right-rounded"
          color="gray"
          width={22}
          // style={{ opacity: showNextLabel ? 1 : '0.2' }}
        />
      }
      renderOnZeroPageCount={() => {}}
      className={styles.paginators + ' ' + props.className}
      pageLinkClassName={styles.pageLink}
      activeLinkClassName={styles.activePagelink}
      nextLinkClassName={styles.pageLink}
      previousLinkClassName={styles.pageLink}
    />
  );
};

export default Paginators;
