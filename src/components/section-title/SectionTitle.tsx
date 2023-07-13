import cls from 'classnames';
import { FC, ReactNode } from 'react';

interface Props {
  title: string;
  options?: ReactNode;
  line?: boolean;
  className?: string;
  layout?: 'start' | 'between' | 'center' | 'end';
}

const SectionTitle: FC<Props> = props => {
  const { line = true, className, layout = 'between' } = props;

  return (
    <div className={cls('d-flex flex-column text-center', className)}>
      <h2 className="h-2 mb-5">{props.title}</h2>
      <div
        className={cls(
          'd-flex align-items-center color-pry fs-5 fw-bold',
          'justify-content-'.concat(layout),
          props.options && 'pb-3'
        )}
        style={{ borderBottom: line ? '2px solid #7600ff' : '' }}
      >
        {props.options}
      </div>
    </div>
  );
};
export default SectionTitle;
