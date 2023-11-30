import { Icon } from '@iconify/react';
import cls from 'classnames';

interface Props {
  currentPage: number;
  totalPages: number;
  onChangePage?: (pg: number) => any;
  className?: string;
  // goNext(): any;
  // goPrev(): any;
}

const Pagination = (props: Props) => {
  const { currentPage, totalPages, className } = props;

  return (
    <div
      className={cls(
        className,
        'd-flex align-items-center justify-content-center gap-2 mt-5'
      )}
    >
      <Icon
        icon="grommet-icons:form-previous"
        className="cursor-pointer"
        color="#7600ff"
        width={18}
        onClick={props.onChangePage?.bind(null, currentPage - 1)}
      />
      <span>
        {currentPage} of {totalPages}
      </span>
      <Icon
        icon="grommet-icons:form-next"
        className="cursor-pointer"
        color="#7600ff"
        width={18}
        onClick={props.onChangePage?.bind(null, currentPage + 1)}
      />
    </div>
  );
};

export default Pagination;
