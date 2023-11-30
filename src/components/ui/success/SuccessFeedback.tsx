import { Icon } from '@iconify/react';
import cls from 'classnames';
import React from 'react';
import styles from './SuccessFeedback.module.scss';

interface Props {
  title?: string | number;
  description?: string;
  className?: string;
  showIcon?: boolean;
}

function SuccessFeedback({ className, showIcon = true, title, description }: Props) {
  return (
    <div className={cls(styles.success, className)}>
      {showIcon ? (
        <div className={cls(styles.successIcon, 'bg-pry mb-4')}>
          <Icon icon="mdi:success" color="#fff" width="50" height="50" />
        </div>
      ) : null}
      <h1 className="mb-4">{title}</h1>
      <small className="text-center mx-auto fs-4">{description}</small>
    </div>
  );
}

export default SuccessFeedback;
