import { useState, useEffect, memo } from 'react';
import ThreeDotsSpinner from '../../../components/ui/loader/ThreeDotsSpinner';
import SuccessFeedback from '../../../components/ui/success/SuccessFeedback';
import useRequest from '../../../hooks/useRequest';
import { Link, Navigate, useSearchParams, useParams } from 'react-router-dom';
import api from '../../../library/api';
import EmailVerifyFailure from './fail';
import SignupSuccess from '../signup/success';

const EmailVerify = () => {
  const verifId = useParams().vid;
  const [searchParams] = useSearchParams();

  const {
    send: sendVerifyReq,
    loading: isVerifying,
    response
  } = useRequest<
    | { status: 'EMAIL_VERIFIED' | 'EMAIL_PREVIOUSLY_VERIFIED' }
    | { status: 'fail'; msg: string }
  >();

  useEffect(() => {
    if (response || isVerifying) return;
    sendVerifyReq(api.verifyEmail(verifId!, searchParams.get('email')));
  }, [response]);

  if (isVerifying)
    return <ThreeDotsSpinner text="Please wait while we verify your email..." />;

  switch (response?.status) {
    case 'fail':
      if (response.msg.toLowerCase().includes('expired'))
        return <SignupSuccess signedUpEmail={searchParams.get('email')!} />;

      const title = response.msg.toLowerCase().includes('invalid') ? 'Invalid' : 'Error';

      return (
        <EmailVerifyFailure
          summary={title}
          msg={response.msg}
          invalid={response.msg.toLowerCase().includes('invalid')}
          expired={response.msg.toLowerCase().includes('expired')}
        />
      );

    case 'EMAIL_PREVIOUSLY_VERIFIED':
      return <Navigate to="/auth/login" />;

    case 'EMAIL_VERIFIED':
      return (
        <div className="text-center p-5" style={{ transform: 'translateY(-2rem)' }}>
          <h1 className="family-raleway mb-5 ">Hurray!</h1>
          <SuccessFeedback />
          <p className="parag family-raleway" style={{ maxWidth: '50ch' }}>
            Your email has been verified.
          </p>
          <Link to="/auth/login" className="color-pry family-raleway fw-bold mt-2">
            Log in
          </Link>
        </div>
      );
  }
  return <></>;
};

export default memo(EmailVerify);
