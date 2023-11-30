import { FC } from 'react';
import { roleTypes } from './utils';
import cls from 'classnames';

interface Props {
  isSelected: boolean;
  option: (typeof roleTypes)[0];
}

const RoleTypeOption: FC<Props> = props => {
  const { option } = props;
  return (
    <div
      className={cls(
        props.isSelected && 'shadow',
        'w-100 h-100 d-flex flex-column align-items-center text-center rounded-2 overflow-hidden cursor-pointer'
      )}
      onMouseEnter={ev => (ev.currentTarget as HTMLElement).classList.add('shadow')}
      onMouseLeave={ev => (ev.currentTarget as HTMLElement).classList.remove('shadow')}
    >
      <figure style={{ height: '12rem' }} className="pt-2">
        <img src={option.img} alt="" className="object-fit-contain" height={120} />
      </figure>
      <h6
        style={{ maxWidth: '25ch' }}
        className={cls(
          'fs-4 flex-grow-1 color-white mb-0 d-flex flex-center py-2 px-5',
          props.isSelected ? 'bg-pry' : 'bg-pry-light'
        )}
      >
        {option.value}
      </h6>
    </div>
  );
};

export default RoleTypeOption;
