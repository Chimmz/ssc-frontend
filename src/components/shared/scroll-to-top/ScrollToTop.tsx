import { Icon } from '@iconify/react';
import styles from './ScrollToTop.module.scss';
import cls from 'classnames';

const ScrollToTopButton = () => {
  return (
    <button className={cls(styles.button)}>
      <Icon icon="ep:top" />
    </button>
  );
};

export default ScrollToTopButton;
