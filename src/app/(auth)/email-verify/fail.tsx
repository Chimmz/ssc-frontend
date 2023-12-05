import fonts from '@/app/fonts';
import LoadingButton from '@/components/ui/LoadingButton';
import useRequest from '@/hooks/useRequest';
import api from '@/library/api';
import cls from 'classnames';
import Image from 'next/image';
import Link from 'next/link';
import { ReactNode } from 'react';
import SignupWelcome from '../signup/welcome';

interface Props {
  summary: string;
  msg: ReactNode;
  promptLogin?: boolean;
  promptResendVerification?: boolean;
  userEmail?: string;
}

const EmailVerifyFailure = (props: Props) => {
  const {
    sendReq: sendResendEmailReq,
    loading: isResending,
    response: emailResponse
  } = useRequest<{ status: 'EMAIL_RESENT' | 'COULDNT_SEND_EMAIL' | 'fail'; msg?: string }>();

  const resendVerificationEmail = async () => {
    if (props.userEmail) sendResendEmailReq(api.resendVerificationEmail(props.userEmail));
  };

  if (emailResponse?.status === 'EMAIL_RESENT')
    return <SignupWelcome signedUpEmail={props.userEmail!} />;

  return (
    <div
      className="tw-flex tw-flex-col tw-items-center text-center p-5"
      style={{ transform: 'translateY(-3rem)' }}
    >
      <Image
        src="/svg/email-failure.svg"
        alt="email failure icon"
        width={80}
        height={80}
        className="mb-5"
      />
      <h1 className={cls('fs-1 fw-bold color-pry mb-4', fonts.raleway)}>
        {props.summary || 'Error'}
      </h1>

      <p className="parag" style={{ maxWidth: '50ch' }}>
        {props.msg}
      </p>
      {props.promptLogin ? (
        <Link href="/login" className="block btn btn-pry w-100 mt-4">
          Log into your account
        </Link>
      ) : (
        ''
      )}
      {props.promptResendVerification ? (
        <LoadingButton
          loading={isResending}
          withSpinner
          loadingMsg="Resending"
          className="block btn btn-pry w-100 mt-4"
          onClick={resendVerificationEmail}
        >
          Resend Email
        </LoadingButton>
      ) : null}
    </div>
  );
};

export default EmailVerifyFailure;
