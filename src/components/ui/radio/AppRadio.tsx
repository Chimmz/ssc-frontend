import React, { FC } from 'react';
import cls from 'classnames';

interface Props {
  label: string | number;
  active?: boolean;
}

const AppRadio: FC<Props> = props => {
  return (
    <div
      className={cls('app-radio d-flex align-items-center gap-2', props.active && 'active')}
    >
      <span className="d-inline-block bg-pry"></span>
      <span>{props.label}</span>
    </div>
  );
};

export default AppRadio;
