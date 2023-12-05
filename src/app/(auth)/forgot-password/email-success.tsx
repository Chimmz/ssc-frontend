import React from 'react';
import Image from 'next/image';
import LoadingButton from '@/components/ui/LoadingButton';
import { useTimer } from 'react-timer-hook';
import cls from 'classnames';

interface Props {
  email: string;
  isSendingEmail: boolean;
  onResend: (cb?: () => void) => void;
}

const TIMER_DURATION = 60 * 1000;

const getSecondsFromNow = (n = TIMER_DURATION) => {
  return new Date(new Date().getTime() + n);
};

const EmailSuccess = function (props: Props) {
  const {
    start,
    minutes,
    seconds,
    restart: restartTimer,
    isRunning: isTimerRunning
  } = useTimer({ autoStart: true, expiryTimestamp: getSecondsFromNow(TIMER_DURATION) });

  const handleClickResend = () => {
    props.onResend(restartTimer.bind(null, getSecondsFromNow(TIMER_DURATION), true));
  };

  return (
    <div className="tw-flex tw-flex-col tw-items-center tw-text-center">
      <Image src="/svg/open-envelope.svg" className="mb-4" width={70} height={70} alt="" />
      <h3 className="fs-1 color-pry fw-bold family-raleway mb-3"> Reset Instructions Sent</h3>

      <p className="parag fw-bold mb-5" style={{ maxWidth: '50ch' }}>
        Password reset email sent to
        <span className="fs-5 border-bottom border-pry fw-bold color-pry mx-2">
          {props.email}.
        </span>
        <br />
        Check your Inbox or Spam folder for the Password Reset email.
      </p>

      <div className="tw-flex tw-gap-2">
        <span className="fs-5 fw-bold">
          {minutes.toString().padStart(2, '0')}:{seconds.toString().padStart(2, '0')}
        </span>
        <LoadingButton
          loading={props.isSendingEmail}
          withSpinner
          className={cls(
            isTimerRunning && 'tw-cursor',
            'fs-5 d-inline-block fw-bold bg-none btn-text-pry ms-2'
          )}
          onClick={handleClickResend}
          disabled={isTimerRunning}
        >
          Send the email again
        </LoadingButton>
      </div>
    </div>
  );
};

export default EmailSuccess;
