import cls from 'classnames';
import React from 'react';
import Spinner from 'react-bootstrap/Spinner';
import ThreeDotsSpinner from './loader/ThreeDotsSpinner';

interface ButtonProps {
  [key: string]: any;
  className?: string;
  loadingMsg?: React.ReactNode;
  children?: React.ReactNode;
  loading: boolean;
  disabled?: boolean;
  withSpinner?: boolean;
}

const LoadingButton = (props: ButtonProps) => {
  const { loading, disabled, withSpinner, loadingMsg, children, ...otherProps } = props;

  return (
    <button
      {...otherProps}
      className={cls(
        props.className,
        'btn d-flex align-items-center justify-content-center gap-3'
      )}
      disabled={disabled || loading}
    >
      {loading ? (
        <>
          {loadingMsg ? (
            <span
              className={cls('d-flex align-items-center gap-2', withSpinner && 'mx-auto')}
            >
              {loadingMsg}
            </span>
          ) : null}
          {withSpinner ? (
            <Spinner
              animation="border"
              size="sm"
              style={{ borderWidth: '1px', width: '1.2em', height: '1.2em' }}
            />
          ) : null}
        </>
      ) : (
        children
      )}
    </button>
  );
};

export default LoadingButton;
