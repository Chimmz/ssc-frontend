import { useMemo, useState } from 'react';
import useRequest from '../../../hooks/useRequest';
// Utils
import { simulateRequest } from '../../../utils/async-utils';
import api from '../../../library/api';
import fonts from '@/app/fonts';
import cls from 'classnames';
// Compons
import LoadingButton from '@/components/ui/LoadingButton';
import Image from 'next/image';
import ThreeDotsSpinner from '../../../components/ui/loader/ThreeDotsSpinner';

interface Props {
  signedUpEmail: string;
}

const SignupWelcome: React.FC<Props> = props => {
  const {
    sendReq: sendResendEmailReq,
    loading: isResending,
    response
  } = useRequest<{ status: 'EMAIL_RESENT' | 'COULDNT_SEND_EMAIL' | 'fail'; msg?: string }>();

  const resendEmail = async () => {
    sendResendEmailReq(api.resendVerificationEmail(props.signedUpEmail));
  };

  const wasResent = useMemo(() => response?.status === 'EMAIL_RESENT', [response]);

  switch (response?.status) {
    case 'fail':
      return (
        <div
          className={cls(fonts.lato, 'tw-flex tw-flex-col tw-items-center text-center p-5')}
          style={{ transform: 'translateY(-3rem)' }}
        >
          <Image
            src="/svg/email-failure.svg"
            alt="email failure"
            className="mb-5"
            width={80}
            height={80}
          />
          <h1 className={cls('fs-1 fw-bold color-pry mb-4', fonts.raleway)}>Failed</h1>
          <p className="parag" style={{ maxWidth: '50ch' }}>
            {response.msg || 'Sorry, something wrong has happened. Please try again.'}
          </p>
        </div>
      );

    default:
      return (
        <div
          className={cls(fonts.lato, 'tw-flex tw-flex-col tw-items-center text-center p-5')}
          style={{ transform: 'translateY(-3rem)' }}
        >
          <Image
            src="/svg/new-email.svg"
            alt="New sent email icon"
            className="mb-5"
            width={80}
            height={80}
          />
          <h1 className={cls('fs-1 fw-bold color-pry mb-4', fonts.raleway)}>
            Email Verification
          </h1>
          <p className="parag" style={{ maxWidth: '50ch' }}>
            Verification email {wasResent ? 'resent' : 'sent'} to{' '}
            <span className="text-underline color-pry fw-bold">{props.signedUpEmail}</span>.
            <br />
            {wasResent
              ? 'Check your Inbox or Spam folder  for the verification email.'
              : 'Please follow the email instructions to complete registration.'}
            <hr className="tw-border-gray-500 tw-my-5" />
          </p>

          <div className="tw-flex tw-items-center">
            Didn&apos;t receive the email?
            <LoadingButton
              loading={isResending}
              withSpinner
              className="bg-none p-0 fw-bold fs-4 btn-text-pry"
              onClick={resendEmail}
            >
              Resend
            </LoadingButton>
          </div>
        </div>
      );
  }
};

export default SignupWelcome;
