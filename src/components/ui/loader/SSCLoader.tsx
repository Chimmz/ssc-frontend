import React from 'react';
import styles from './SSCLoader.module.scss';

const DEFAULT_TEXT = 'Please wait while we process your request';

interface Props {
  msg?: string;
}

const SSCLoader = (props: Props) => {
  return (
    <div className="d-flex flex-column align-items-center gap-3">
      <img src="/svg/rocket-loader.svg" width={150} />
      <p
        className="fs-2 family-raleway text-center fw-bold color-pry"
        style={{ maxWidth: '25ch' }}
      >
        {props.msg || DEFAULT_TEXT}.
      </p>
      <div className={styles.loadingBar}></div>
    </div>
  );
};

export default SSCLoader;
