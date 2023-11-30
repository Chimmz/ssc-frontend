import cls from 'classnames';
import styles from './ThreeDotsSpinner.module.scss';

interface Props {
  show?: boolean;
  size?: 'sm' | 'md' | 'lg';
  text?: string;
  className?: string;
}

const ThreeDotsSpinner: React.FC<Props> = props => {
  const { show = true, text, size = 'lg', className } = props;
  if (!show) return null;
  return (
    <div
      className={cls(
        'd-flex flex-column align-items-center gap-4 family-raleway',
        className,
        styles[size]
      )}
    >
      <div style={{ display: !show ? 'none' : '' }} className={styles.dotFlashing}></div>
      {text}
    </div>
  );
};

export default ThreeDotsSpinner;
