import { Icon } from '@iconify/react';
import React from 'react';
import LoadingButton from '../../../components/ui/LoadingButton';

interface Props {
  title: string;
  msg: string;
  loading?: boolean;
  onTryAgain?: () => void;
}

const Failure = (props: Props) => {
  const { title, msg, loading, onTryAgain } = props;
  return (
    <div className="d-flex flex-column align-items-center gap-4">
      <Icon icon="ic:round-cancel" color="#f05d6a" width={50} className="mb-2" />
      <h4 className="fs-1 color-pry family-raleway fw-bold">
        {title}
        {/* Password update unsuccessful! */}
      </h4>
      <p className="parag mb-5 fw-bold">
        {msg}
        {/* Please ensure your new password meets the minimum length requirement */}
      </p>

      {onTryAgain && loading ? (
        <LoadingButton className="btn btn-pry w-100" loading={loading} onClick={onTryAgain}>
          Try again
        </LoadingButton>
      ) : null}
    </div>
  );
};

export default Failure;
