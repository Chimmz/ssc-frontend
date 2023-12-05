'use client';
import React, { useEffect } from 'react';
import TextField from '../../../components/ui/text-field/TextField';
import useInput from '../../../hooks/useInput';
import { isEmail, isRequired } from '../../../utils/validators/inputValidators';
import { Icon } from '@iconify/react';
import EmailSuccess from './email-success';
import useRequest from '../../../hooks/useRequest';
import api from '../../../library/api';
import LoadingButton from '../../../components/ui/LoadingButton';
import { useRouter } from 'next/navigation';

const ForgotPasswordPage = function () {
  const router = useRouter();

  const {
    sendReq: sendPasswordRequest,
    loading,
    response
  } = useRequest<{ status: 'EMAIL_SENT' | 'fail' | 'error'; msg: string }>();

  const {
    inputValue: email,
    onChange: handleChangeEmail,
    validationErrors,
    runValidators,
    pushValidationError: pushEmailValidationError
  } = useInput({
    init: '',
    validators: [
      { fn: isRequired, params: ['Please enter an email'] },
      { fn: isEmail, params: ['You entered an invalid email'] }
    ]
  });

  useEffect(() => {
    if (response && ['fail', 'error'].includes(response.status))
      pushEmailValidationError(response.msg);
  }, [response]);

  const sendResetRequest = async (cb?: () => void) => {
    await sendPasswordRequest(api.requestPasswordReset(email));
    cb?.();
  };

  const handleSubmit: React.FormEventHandler = ev => {
    ev.preventDefault();
    if (runValidators().errorExists) return;
    sendResetRequest();
  };

  return (
    <>
      <button
        className="btn position-absolute"
        style={{ right: '50px', top: '30px' }}
        onClick={router.back}
      >
        <Icon icon="formkit:arrowleft" />
        Back
      </button>

      {response?.status === 'EMAIL_SENT' ? (
        <EmailSuccess email={email} onResend={sendResetRequest} isSendingEmail={loading} />
      ) : (
        <form className="d-flex flex-column align-items-center" onSubmit={handleSubmit}>
          <h3 className="fs-1 color-pry fw-bold family-raleway mb-4">Reset Password</h3>
          <p className="parag text-center mb-5">
            Don&apos;t worry we can help you out! Please write your email to receive a
            confirmation code to set a new password
          </p>

          <TextField
            value={email}
            onChange={handleChangeEmail}
            validationErrors={validationErrors}
            label="Email address"
            placeholder="abcd@gmail.com"
            className="w-100 mb-4"
            inputClassName="textfield-sm border"
          />
          <LoadingButton
            className="btn btn-pry w-100"
            loading={loading}
            loadingMsg="Loading..."
            withSpinner
          >
            Reset My Password
          </LoadingButton>
        </form>
      )}
    </>
  );
};

export default ForgotPasswordPage;
