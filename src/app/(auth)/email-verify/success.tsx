import SuccessFeedback from '../../../components/ui/success/SuccessFeedback';
import useRequest from '../../../hooks/useRequest';
import { useEffect } from 'react';
import api from '../../../library/api';
import { simulateRequest } from '../../../utils/async-utils';
import SSCLoader from '../../../components/ui/loader/SSCLoader';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import cls from 'classnames';
import fonts from '@/app/fonts';

const EmailVerifySuccess = () => {
  const { sendReq, loading } = useRequest();
  const router = useRouter();

  // const redirect = async () => {
  //   await simulateRequest(sendReq, 5);
  //   router.replace('/questionnaire');
  // };

  // if (loading) return <SSCLoader msg="Please wait while we redirect you" />;

  return (
    <div
      className="text-center d-flex flex-column align-items-center gap-4 p-5"
      style={{ transform: 'translateY(-2rem)' }}
    >
      <Image src="/svg/email-success.svg" alt="Success Icon" width={80} height={80} />
      <h1 className={cls(fonts.raleway, 'fs-1 fw-bold color-pry')}>Email Verified</h1>

      <p className="parag family-raleway" style={{ maxWidth: '50ch' }}>
        We have successfully verified your email.
      </p>
      <Link href="/login" className={cls('btn btn-pry w-100 mt-2', fonts.raleway)}>
        Log in
      </Link>
    </div>
  );
};

export default EmailVerifySuccess;
