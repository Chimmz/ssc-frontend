'use client';
import React, { useEffect } from 'react';
import TextField from '../../../components/ui/text-field/TextField';
import useInput from '../../../hooks/useInput';
import {
  isEmail,
  isRequired,
  isStrongPassword,
  minLength,
  mustBeSameAs
} from '../../../utils/validators/inputValidators';
import useRequest from '../../../hooks/useRequest';
import api from '../../../library/api';
import SSCLoader from '../../../components/ui/loader/SSCLoader';
import TokenFailure from './fail';
import LoadingButton from '../../../components/ui/LoadingButton';
import PasswordResetSuccess from './success';
import { useSearchParams } from 'next/navigation';

const ChangePasswordPage = function () {
  const searchParams = useSearchParams();
  const resetToken = searchParams.get('token') as string;

  const {
    sendReq: sendTokenValidationReq,
    loading: isValidatingToken,
    response: tokenValidationResponse,
    loaded: tokenValidationResponseLoaded
  } = useRequest<{ status: 'TOKEN_VALID' | 'fail' | 'error'; msg?: string }>();

  const {
    sendReq: sendPasswordResetReq,
    loading: isResettingPassword,
    response: passwordResetResponse
  } = useRequest<{ status: 'PASSWORD_UPDATED' | 'fail' | 'error'; msg: string }>();

  const {
    inputValue: email,
    onChange: handleChangeEmail,
    validationErrors: emailValidationErrors,
    runValidators: runEmailValidators,
    pushValidationError: pushEmailValidationError
  } = useInput({
    init: '',
    validators: [
      { fn: isRequired, params: [] },
      { fn: isEmail, params: [] }
    ]
  });

  const {
    inputValue: password,
    onChange: handleChangePassword,
    validationErrors: passwordValidationErrors,
    runValidators: runPasswordValidators,
    pushValidationError: pushPasswordValidationError
  } = useInput({
    init: '',
    validators: [
      { fn: isRequired, params: [] },
      { fn: minLength, params: [6, 'Your new password must be at least 6 characters'] },
      { fn: isStrongPassword, params: [] }
    ]
  });

  const {
    inputValue: passwordConfirm,
    onChange: handleChangePasswordConfirm,
    validationErrors: passwordConfirmValidationErrors,
    runValidators: runPasswordConfirmValidators,
    pushValidationError: pushPasswordConfirmValidationError
  } = useInput({
    init: '',
    validators: [
      { fn: isRequired, params: [] },
      { fn: mustBeSameAs, params: [password, 'Passwords do not match'] }
    ]
  });

  const validateToken = () => {
    sendTokenValidationReq(api.validatePasswordResetToken(resetToken));
  };

  useEffect(() => {
    validateToken();
  }, []);

  const resetPassword = () => {
    sendPasswordResetReq(api.resetPassword(password, resetToken));
  };

  useEffect(() => {
    if (!passwordResetResponse) return;
    if (['fail', 'error'].includes(passwordResetResponse.status))
      pushPasswordConfirmValidationError(
        passwordResetResponse.msg || 'Sorry, something wrong has happened'
      );
  }, [passwordResetResponse]);

  const handleSubmit: React.FormEventHandler = async ev => {
    ev.preventDefault();
    const validations = [runPasswordValidators(), runPasswordConfirmValidators()];
    if (validations.some(v => v.errorExists)) return;
    // console.log('Yes, ready!');
    resetPassword();
  };

  if (!tokenValidationResponse || isValidatingToken)
    return <SSCLoader msg="Please wait while we process your request" />;

  if (tokenValidationResponse?.status === 'fail')
    return <TokenFailure title="Invalid" msg={tokenValidationResponse.msg!} />;

  if (passwordResetResponse?.status === 'PASSWORD_UPDATED') return <PasswordResetSuccess />;

  return (
    <form className="d-flex flex-column align-items-center" onSubmit={handleSubmit}>
      <h2 className="fs-1 color-pry fw-bold text-center family-raleway mb-3">
        Reset Password
      </h2>
      <p className="parag text-center mb-5">
        Your new password must be different from the previously used password
      </p>

      <TextField
        type="password"
        value={password}
        onChange={handleChangePassword}
        validationErrors={passwordValidationErrors}
        label="New Password"
        className="w-100 mb-3"
        inputClassName="textfield-sm border"
      />

      <TextField
        type="password"
        value={passwordConfirm}
        label="Confirm Password"
        onChange={handleChangePasswordConfirm}
        validationErrors={passwordConfirmValidationErrors}
        className="w-100 mb-5"
        inputClassName="textfield-sm border"
      />
      <LoadingButton
        className="btn btn-pry w-100"
        loading={isResettingPassword}
        loadingMsg="Please wait..."
        withSpinner
      >
        Change password
      </LoadingButton>
    </form>
  );
};

export default ChangePasswordPage;
