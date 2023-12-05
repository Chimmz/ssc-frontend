import { Icon } from '@iconify/react';
import Link from 'next/link';

const PasswordResetSuccess = () => {
  return (
    <div className="d-flex flex-column align-items-center">
      <Icon icon="ep:success-filled" color="#7ad001" width={50} className="mb-2" />
      <h4 className="fs-2 color-pry family-raleway fw-bold mb-3">Password Updated!</h4>
      <p className="parag mb-5 fw-bold">You can now log in with your new password</p>
      <Link href="/login" className="btn btn-pry w-100">
        Log in to account
      </Link>
    </div>
  );
};

export default PasswordResetSuccess;
