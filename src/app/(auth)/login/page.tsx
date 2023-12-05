'use client';
import { useCallback, useEffect, useRef } from 'react';
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
import { SignInResponse, signIn, useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import EmailVerifyFailure from '../email-verify/fail';

const Login = function () {
  const rememberMeRef = useRef<HTMLInputElement | null>(null);
  const currentUser = useSignedInUser();
  const router = useRouter();

  const {
    sendReq: sendLoginReq,
    loading: isLoggingIn,
    response: loginResponse,
    stopLoading: stopLoginLoader
  } = useRequest<SignInResponse>({ autoStopLoading: false });

  const {
    inputValue: email,
    onChange: handleChangeEmail,
    setInputValue: setEmail,
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

  const handleLoginSuccess = () => {
    if (rememberMeRef.current?.checked) {
      browserUtils.setCookie(process.env.NEXT_PUBLIC_USER_EMAIL_COOKIE_KEY!, email, 30);
      browserUtils.setCookie(process.env.NEXT_PUBLIC_USER_PASSWORD_COOKIE_KEY!, password, 30);
    }
    if (!currentUser.isEmailVerified) return;
    router.push('/questionnaire');
  };

  const handleLoginFailure = () => {
    stopLoginLoader();
    const errorPushers = {
      email: pushEmailValidationError,
      password: pushPasswordValidationError
    };
    const apiRes: { errors?: { field: string; msg: string }[] } = JSON.parse(
      loginResponse!.error!
    );
    apiRes.errors?.forEach(e => errorPushers[e.field as keyof typeof errorPushers]?.(e.msg));
  };

  useEffect(() => {
    if (loginResponse?.error) handleLoginFailure();
  }, [loginResponse]);

  useEffect(() => {
    if (currentUser.isSignedIn) handleLoginSuccess();
  }, [currentUser]);

  const handleSubmit: React.FormEventHandler = async ev => {
    ev.preventDefault();
    const existingErrors = [emailValidationErrors, passwordValidationErrors];
    const validations = [runEmailValidators(), runPasswordValidators()];

    if (existingErrors.flat().length || validations.some(v => v.errorExists)) return;
    sendLoginReq(signIn('login', { email, password, redirect: false }));
  };

  const googleSignIn = useGoogleLogin({
    onError: errorResponse => console.log('Google response: ', errorResponse),
    onSuccess: async response => {
      console.log('Google response: ', response);
      const { access_token } = response;

      const result = await sendLoginReq(
        signIn('custom-google', { access_token, redirect: false })
      );
      console.log(result);
    }
  });

  useEffect(() => {
    setPassword(
      browserUtils.getCookie(process.env.NEXT_PUBLIC_USER_PASSWORD_COOKIE_KEY!) || ''
    );
    setEmail(browserUtils.getCookie(process.env.NEXT_PUBLIC_USER_EMAIL_COOKIE_KEY!) || '');
  }, [setPassword, setEmail]);

  if (currentUser.isSignedIn && !currentUser.isEmailVerified)
    return (
      <EmailVerifyFailure
        summary="Email Verification Pending"
        msg="Check your inbox or spam folder for the verification email or:"
        promptResendVerification
        userEmail={currentUser.email}
      />
    );
  return (
    <form className="d-flex flex-column" onSubmit={handleSubmit}>
      <div className="d-flex align-items-center justify-content-center gap-5">
        <h2 className="fs-2 color-pry fw-bold text-center mb-5">Log in</h2>
        <Link
          href="/signup"
          className="fs-2 opacity-25 fw-bold text-center mb-5 text-hover-dark"
        >
          Sign up
        </Link>
      </div>
      <button
        className="btn btn-outline mt-3 mb-5 gap-3 fs-4 font-bold"
        type="button"
        onClick={() => googleSignIn()}
        // onClick={() => sendLoginReq(signIn('google', { redirect: false, callbackUrl: '/' }))}
      >
        <Icon icon="devicon:google" width={20} />
        Log in with Google
      </button>
      <small className="d-block text-center mt-4 mb-5" data-content="or"></small>

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
          href="/forgot-password"
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
        <Link href="/signup" className="color-pry ms-2">
          Sign up
        </Link>
      </small>
    </form>
  );
};

export default Login;
