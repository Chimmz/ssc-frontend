'use client';
import { useState, useEffect, memo } from 'react';
import ThreeDotsSpinner from '../../../components/ui/loader/ThreeDotsSpinner';
import SuccessFeedback from '../../../components/ui/success/SuccessFeedback';
import useRequest from '../../../hooks/useRequest';
import api from '../../../library/api';
import EmailVerifyFailure from './fail';
import SignupSuccess from '../signup/welcome';
import EmailVerifySuccess from './success';
import { useSearchParams, useRouter } from 'next/navigation';
import SSCLoader from '@/components/ui/loader/SSCLoader';

const EmailVerify = () => {
  const searchParams = useSearchParams();
  const router = useRouter();

  const token = searchParams.get('token');

  const {
    sendReq: sendVerifyReq,
    loading: isVerifying,
    response
  } = useRequest<{
    status: 'EMAIL_VERIFIED' | 'EMAIL_PREVIOUSLY_VERIFIED' | 'fail';
    msg?: string;
    email?: string;
  }>();

  useEffect(() => {
    if (response || isVerifying) return;
    sendVerifyReq(api.verifyEmail(token!));
  }, [response, isVerifying]);

  if (isVerifying) return <SSCLoader msg="Please wait..." />;

  switch (response?.status) {
    case 'fail':
      const isInvalid = response.msg!.toLowerCase().includes('invalid');
      return (
        <EmailVerifyFailure summary={isInvalid ? 'Invalid' : 'Error'} msg={response.msg!} />
      );

    case 'EMAIL_PREVIOUSLY_VERIFIED':
      return (
        <EmailVerifyFailure
          summary="Email Registered"
          promptLogin
          msg={
            <span>
              <span className="color-pry fw-bold">{response.email!}</span> is already verified
            </span>
          }
        />
      );

    case 'EMAIL_VERIFIED':
      return <EmailVerifySuccess />;
  }
};

export default memo(EmailVerify);
