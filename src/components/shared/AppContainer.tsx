import cls from 'classnames';
import React from 'react';

interface Props {
  children: React.ReactNode;
  className?: string;
}

const AppContainer = (props: Props) => {
  return (
    <div className={cls('container app-container', props.className)}>{props.children}</div>
  );
};

export default AppContainer;
