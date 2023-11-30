'use client';
import { useEffect, useRef } from 'react';
import { Icon } from '@iconify/react';
import { GoogleOAuthProvider, useGoogleLogin } from '@react-oauth/google';
import cls from 'classnames';
import { Form } from 'react-bootstrap';
import useRequest from '@/hooks/useRequest';
import useSignedInUser from '@/hooks/useSignedInUser';
import { isEmail, isRequired } from '@/utils/validators/inputValidators';
import useInput from '@/hooks/useInput';
import * as browserUtils from '@/utils/browser-utils';
import api from '@/library/api';
import Link from 'next/link';
import TextField from '@/components/ui/text-field/TextField';
import LoadingButton from '@/components/ui/LoadingButton';

const Login = function () {
  const rememberMeRef = useRef<HTMLInputElement | null>(null);
  const { isSignedIn } = useSignedInUser();

  const {
    sendReq: sendLoginReq,
    loading: isLoggingIn,
    response: loginResponse
  } = useRequest<{
    status?: 'LOGIN_SUCCESS' | 'fail' | 'error';
    user?: UserPublicProfile;
    accessToken?: string;
    msg?: string;
    errors?: { field: string; msg: string }[];
  }>();

  const {
    sendReq: sendStageReq,
    loading: isGettingStage,
    response: stageResponse
  } = useRequest<{ stage: number | null | undefined }>();

  const {
    inputValue: email,
    onChange: handleChangeEmail,
    validationErrors: emailValidationErrors,
    runValidators: runEmailValidators,
    pushValidationError: pushEmailValidationError
  } = useInput<string>({
    init: '',
    validators: [
      { fn: isRequired, params: [] },
      { fn: isEmail, params: [] }
    ]
  });

  const {
    inputValue: password,
    onChange: handleChangePassword,
    setInputValue: setPassword,
    validationErrors: passwordValidationErrors,
    runValidators: runPasswordValidators,
    pushValidationError: pushPasswordValidationError
  } = useInput<string>({
    init: '',
    validators: [{ fn: isRequired, params: [] }]
  });

  const {
    sendReq: sendGoogleSignInRequest,
    loading: googleSignInRequestLoading,
    startLoading: startGoogleAuthLoader,
    stopLoading: stopGoogleAuthLoader
  } = useRequest();

  useEffect(() => {
    setPassword(
      browserUtils.getCookie(process.env.NEXT_PUBLIC_USER_PASSWORD_COOKIE_KEY!) || ''
    );
  }, []);

  useEffect(() => {
    switch (loginResponse?.status) {
      case 'fail':
      case 'error':
        const errorPushers = {
          email: pushEmailValidationError,
          password: pushPasswordValidationError
        };
        loginResponse.errors?.forEach(e => {
          errorPushers[e.field as keyof typeof errorPushers]?.(e.msg);
        });
        break;

      case 'LOGIN_SUCCESS':
        delete (loginResponse as { status?: string }).status;
        localStorage.setItem(
          process.env.NEXT_PUBLIC_LOCALSTORAGE_USER!,
          JSON.stringify(loginResponse)
        );
        //* authContext!.setCurrentUser!({
        //   user: loginResponse.user!,
        //   accessToken: loginResponse.accessToken!
        // });
        if (rememberMeRef.current?.checked)
          browserUtils.setCookie(
            process.env.NEXT_PUBLIC_USER_PASSWORD_COOKIE_KEY!,
            password,
            30
          );
        sendStageReq(api.getPostSignupQuestionnaireStage(loginResponse.accessToken!));
    }
  }, [loginResponse]);

  useEffect(() => {
    if (!stageResponse?.stage) return;
    //* navigate('/questionnaire', { state: { step: stageResponse!.stage } });
  }, [stageResponse]);

  const handleSubmit: React.FormEventHandler = async ev => {
    ev.preventDefault();
    const validations = [runEmailValidators(), runPasswordValidators()];
    const existingErrors = [emailValidationErrors, passwordValidationErrors];

    if (existingErrors.flat().length || validations.some(v => v.errorExists)) return;
    const req = api.login({ email, password });
    await sendLoginReq(req);
  };

  const googleSignIn = useGoogleLogin({
    onSuccess: async response => {
      console.log('Google response: ', response);
      const { access_token } = response;
      await sendLoginReq(api.googleSignIn(access_token));
    },
    onError: errorResponse => console.log('Google response: ', errorResponse)
  });

  return (
    <form className="d-flex flex-column" onSubmit={handleSubmit}>
      <div className="d-flex align-items-center justify-content-center gap-5">
        <h2 className="color-pry fw-bold text-center mb-5">Log in</h2>
        <Link
          href="/auth/signup"
          className="fs-2 opacity-25 fw-bold text-center mb-5 text-hover-dark"
        >
          Sign up
        </Link>
      </div>
      <button
        className="btn btn-outline mt-3 mb-5 gap-3 fs-4 font-bold"
        type="button"
        onClick={() => googleSignIn()}
      >
        <Icon icon="devicon:google" width={20} />
        Log in with Google
      </button>
      <small className="d-block text-center mt-4 mb-5" data-content="or">
        {/* Or */}
      </small>

      <TextField
        value={email}
        onChange={handleChangeEmail}
        validationErrors={emailValidationErrors}
        label="Email"
        className="mb-5"
        inputClassName="textfield-sm border"
      />

      <TextField
        value={password}
        type="password"
        onChange={handleChangePassword}
        validationErrors={passwordValidationErrors}
        label="Password"
        className="mb-3"
        inputClassName="textfield-sm border"
      />
      <div className="mb-5 d-flex justify-content-between align-items-center">
        <Link
          href="/auth/forgot-password"
          className="fs-5 border-bottom border-pry fw-bold color-pry ms-2"
        >
          Forgot your password?
        </Link>
        <Form.Check
          ref={rememberMeRef}
          label="Remember me"
          id="Remember me"
          className="cursor-pointer"
        />
      </div>

      <LoadingButton
        type="submit"
        className="btn btn-pry"
        loading={isLoggingIn}
        withSpinner
        loadingMsg="Loading..."
      >
        Log in
      </LoadingButton>

      <small className={cls('d-flex justify-content-center fs-5 fw-bold text-center mt-3')}>
        Don't have an account?
        <Link href="/auth/signup" className="color-pry ms-2">
          Sign up
        </Link>
      </small>
    </form>
  );
};

export default Login;
