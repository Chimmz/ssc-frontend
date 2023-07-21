import { useState, useEffect } from 'react';
import ThreeDotsSpinner from '../../../components/ui/loader/ThreeDotsSpinner';
import SuccessFeedback from '../../../components/ui/success/SuccessFeedback';
import useRequest from '../../../hooks/useRequest';
import { simulateRequest } from '../../../utils/async-utils';
import { Link, useParams } from 'react-router-dom';
import api from '../../../library/api';
import EmailVerifyFailure from './fail';

const EmailVerify = () => {
  const {
    send: sendVerifyReq,
    loading: isVerifying,
    response
  } = useRequest<{ status: 'EMAIL_VERIFIED' } | { status: 'fail'; msg: string }>();
  const verifId = useParams().vid;

  useEffect(() => {
    sendVerifyReq(api.verifyEmail(verifId!));
  }, []);

  if (isVerifying)
    return <ThreeDotsSpinner text="Please wait while we verify your email..." />;

  switch (response?.status) {
    case 'fail':
      const title = response.msg.toLowerCase().includes('expired')
        ? 'Expired'
        : response.msg.toLowerCase().includes('invalid')
        ? 'Invalid'
        : 'Error';
      return (
        <EmailVerifyFailure
          msg={response.msg}
          summary={title}
          promptLogin={response.msg.toLowerCase().includes('expired')}
        />
      );

    case 'EMAIL_VERIFIED':
      return (
        <div className="text-center p-5" style={{ transform: 'translateY(-2rem)' }}>
          <h1 className="family-raleway mb-5 ">Hurray!</h1>
          <SuccessFeedback />
          <p className="parag family-raleway" style={{ maxWidth: '50ch' }}>
            Your email has been verified.
          </p>
          <Link to="/auth/login" className="color-pry family-raleway fw-bold mt-2">
            Click here to log in
          </Link>
        </div>
      );
  }
  return <></>;
};

export default EmailVerify;
