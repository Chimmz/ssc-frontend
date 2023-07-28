import { Link, useLocation, useNavigate } from 'react-router-dom';
import useInput from '../../hooks/useInput';
import { isEmail, isRequired } from '../../utils/validators/inputValidators';
import { useState, useEffect } from 'react';
import { Icon } from '@iconify/react';
import TextField from '../../components/ui/text-field/TextField';
import { useGoogleLogin } from '@react-oauth/google';
import cls from 'classnames';
import useRequest from '../../hooks/useRequest';
import api from '../../library/api';
import LoadingButton from '../../components/ui/LoadingButton';
import { UserPublicProfile } from '../../types';
import { useAuthContext } from '../../contexts/AuthContext';
import useSignedInUser from '../../hooks/useSignedInUser';

const Login = function () {
  const navigate = useNavigate();

  const {
    send: sendLoginReq,
    loading: isLoggingIn,
    response
  } = useRequest<
    | { status?: 'fail' | 'error'; msg: string; errors?: { field: string; msg: string }[] }
    | { status: 'LOGIN_SUCCESS'; user: UserPublicProfile; accessToken: string }
  >();

  const { isSignedIn } = useSignedInUser();
  const authContext = useAuthContext();

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
  } = useInput({ init: '', validators: [{ fn: isRequired, params: [] }] });

  const {
    send: sendGoogleSignInRequest,
    loading: googleSignInRequestLoading,
    startLoading: startGoogleAuthLoader,
    stopLoading: stopGoogleAuthLoader
  } = useRequest();

  useEffect(() => {
    switch (response?.status) {
      case 'fail':
        const errorPushers = {
          email: pushEmailValidationError,
          password: pushPasswordValidationError
        };
        response.errors?.forEach(e => {
          errorPushers[e.field as keyof typeof errorPushers]?.(e.msg);
        });
        break;

      case 'LOGIN_SUCCESS':
        delete (response as { status?: string }).status;
        localStorage.setItem('ssc_u', JSON.stringify(response));
        authContext!.setCurrentUser!({
          user: response.user,
          accessToken: response.accessToken
        });
        navigate('/');
    }
  }, [response]);

  useEffect(() => {
    if (isSignedIn) navigate('/');
  }, [isSignedIn]);

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
      <h2 className="color-pry fw-bold text-center mb-5">Log in</h2>

      <button
        className="btn btn-outline mt-3 mb-5"
        type="button"
        onClick={() => googleSignIn()}
      >
        <Icon icon="devicon:google" />
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
        className="mb-4"
        inputClassName="textfield-sm border"
      />
      <TextField
        value={password}
        type="password"
        onChange={handleChangePassword}
        validationErrors={passwordValidationErrors}
        label="Password"
        className="mb-5"
        inputClassName="textfield-sm border"
      />
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
        <Link to="/auth/signup" className="color-pry ms-2">
          Sign up
        </Link>
      </small>
    </form>
  );
};

export default Login;
