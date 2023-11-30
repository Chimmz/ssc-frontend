'use client';
import useInput from '../../../hooks/useInput';
import {
  isEmail,
  isRequired,
  isStrongPassword
} from '../../../utils/validators/inputValidators';
import { useGoogleLogin } from '@react-oauth/google';
import { useEffect, useState } from 'react';
import { Icon } from '@iconify/react';
import TextField from '../../../components/ui/text-field/TextField';
import { simulateRequest } from '../../../utils/async-utils';
import useRequest from '../../../hooks/useRequest';
// import SignupSuccess from './welcome';
import LoadingButton from '../../../components/ui/LoadingButton';
import classNames from 'classnames';
import api from '../../../library/api';
import Link from 'next/link';

const Signup = function () {
  const {
    sendReq: sendSignupReq,
    loading: isSigningUp,
    response: signupResponse
  } = useRequest<
    | { status?: 'fail'; msg: string; errors?: { field: string; msg: string }[] }
    | { status: 'USER_CREATED'; user: UserPublicProfile }
  >();

  const {
    inputValue: fullname,
    onChange: handleChangeFullname,
    validationErrors: fullnameValidationErrors,
    runValidators: runFullnameValidators
  } = useInput({ init: '', validators: [{ fn: isRequired, params: [] }] });

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
      { fn: isStrongPassword, params: ['Password does not fulfill all requirements'] }
    ]
  });

  const handleSubmit: React.FormEventHandler = async ev => {
    ev.preventDefault();
    const validations = [
      runFullnameValidators(),
      runPasswordValidators(),
      runEmailValidators()
    ];
    if (validations.some(v => v.errorExists)) return;
    const req = api.signup({ fullname, email, password });
    sendSignupReq(req);
  };

  useEffect(() => {
    if (signupResponse?.status !== 'fail') return;
    const errorPushers = {
      email: pushEmailValidationError,
      password: pushPasswordValidationError
    };
    signupResponse.errors?.forEach(e => {
      errorPushers[e.field as keyof typeof errorPushers]?.(e.msg);
    });
  }, [signupResponse]);

  const googleSignIn = useGoogleLogin({
    onSuccess: async response => {
      console.log('Google response: ', response);
      const { access_token } = response;
      await sendSignupReq(api.googleSignIn(access_token));
    },
    onError: errorResponse => console.log('Google response: ', errorResponse)
  });

  // if (signupResponse?.status === 'USER_CREATED')
  //   return <SignupSuccess signedUpEmail={signupResponse.user.email} />;

  return (
    <form className="d-flex flex-column" onSubmit={handleSubmit}>
      <div className="d-flex align-items-center justify-content-center gap-5">
        <h2 className="color-pry fw-bold text-center mb-5">Sign up</h2>
        <Link
          href="/auth/login"
          className="fs-2 text-hover-dark opacity-25 fw-bold text-center mb-5 "
        >
          Log in
        </Link>
      </div>

      <button
        className="btn btn-outline mt-3 mb-5 gap-3 fs-4 font-bold"
        type="button"
        onClick={() => googleSignIn()}
      >
        <Icon icon="devicon:google" />
        Sign up with Google
      </button>

      <small className="d-block text-center mt-4 mb-5" data-content="or"></small>

      <TextField
        value={fullname}
        onChange={handleChangeFullname}
        validationErrors={fullnameValidationErrors}
        label="Full name"
        className="mt-3 mb-4"
        inputClassName="textfield-sm border"
      />

      <TextField
        value={email}
        onChange={handleChangeEmail}
        validationErrors={emailValidationErrors}
        label="Email"
        className="mb-4"
        inputClassName="textfield-sm border"
      />

      <div className="mb-5">
        <TextField
          value={password}
          onChange={handleChangePassword}
          type="password"
          validationErrors={passwordValidationErrors}
          label="Password"
          className="mb-2"
          inputClassName="textfield-sm border"
        />
        <small className="parag fs-5">
          Minimum of 16 characters, with upper and lowercase and a number, or a symbol.
        </small>
      </div>

      <LoadingButton
        type="submit"
        className="btn btn-pry"
        loading={isSigningUp}
        withSpinner
        loadingMsg="Loading..."
      >
        Sign up
      </LoadingButton>

      <small className="d-flex justify-content-center fs-5 fw-bold text-center mt-3">
        Already have an account?
        <Link href="/auth/login" className="color-pry ms-2">
          Log in
        </Link>
      </small>
    </form>
  );
};

export default Signup;
