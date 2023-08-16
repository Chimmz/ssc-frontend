import cls from 'classnames';
import { FC, ReactNode } from 'react';
import styles from './SectionTitle.module.scss';

interface Props {
  title: string;
  options?: ReactNode;
  line?: boolean;
  className?: string;
  layout?: 'start' | 'between' | 'center' | 'end';
  responsive?: boolean;
}

const SectionTitle: FC<Props> = props => {
  const { line = true, className, layout = 'between', responsive = false } = props;

  return (
    <div
      className={cls(
        styles.parent,
        responsive && styles.responsive,
        'd-flex flex-column text-center',
        className
      )}
    >
      <h2 className="h-2 mb-5">{props.title}</h2>
      <div
        className={cls(
          styles.optionsContainer,
          'd-flex align-items-center color-pry fs-5 fw-bold',
          'justify-content-'.concat(layout),
          props.options && 'pb-3'
        )}
        style={{ borderBottom: line ? '2px solid #7600ff' : '' }}
      >
        <h2 className="h-3 d-none">{props.title}</h2>
        {props.options}
      </div>
    </div>
  );
};
export default SectionTitle;
