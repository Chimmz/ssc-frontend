import cls from 'classnames';
import styles from './ThreeDotsSpinner.module.scss';

interface Props {
  show?: boolean;
  size?: 'sm' | 'md' | 'lg';
  text?: string;
}

const ThreeDotsSpinner: React.FC<Props> = ({ show = true, text, size = 'lg' }) => {
  return (
    <div
      className={cls(
        'd-flex flex-column align-items-center gap-4 family-raleway',
        styles[size]
      )}
    >
      <div style={{ display: !show ? 'none' : '' }} className={styles.dotFlashing}></div>
      {text}
    </div>
  );
};

export default ThreeDotsSpinner;
