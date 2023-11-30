import cls from 'classnames';
import { FC } from 'react';

interface Props {
  label: string;
  active: boolean;
  className?: string;
  onRemove?: () => void;
}

const CheckboxTag: FC<Props> = props => {
  return (
    <span
      className={cls(
        'checkbox-tag fs-4 cursor-pointer d-flex align-items-center gap-2 border rounded-5 w-max-content p-2 px-3',
        props.active && 'bg-pry-dark color-white',
        props.className
      )}
    >
      {props.label}
      {props.onRemove ? (
        <button className="btn-close fs-5" onClick={props.onRemove}></button>
      ) : null}
    </span>
  );
};

export default CheckboxTag;
