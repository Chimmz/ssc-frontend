import { Link, useLocation } from 'react-router-dom';
import useInput from '../../hooks/useInput';
import { isEmail, isRequired } from '../../utils/validators/inputValidators';
import { useState } from 'react';
import { Icon } from '@iconify/react';
import TextField from '../../components/ui/text-field/TextField';
import { useGoogleLogin } from '@react-oauth/google';
import cls from 'classnames';
import useRequest from '../../hooks/useRequest';

const Login = function () {
  const {
    send: sendGoogleSignInRequest,
    loading: googleSignInRequestLoading,
    startLoading: startGoogleAuthLoader,
    stopLoading: stopGoogleAuthLoader
  } = useRequest();

  const {
    inputValue: password,
    onChange: handleChangePassword,
    validationErrors: passwordValidationErrors,
    runValidators: runPasswordValidators
  } = useInput({ init: '', validators: [{ fn: isRequired, params: [] }] });

  const {
    inputValue: email,
    onChange: handleChangeEmail,
    validationErrors: emailValidationErrors,
    runValidators: runEmailValidators
  } = useInput({
    init: '',
    validators: [
      { fn: isRequired, params: [] },
      { fn: isEmail, params: [] }
    ]
  });

  const handleSubmit: React.FormEventHandler = ev => {
    ev.preventDefault();

    const validations = [runEmailValidators(), runPasswordValidators()];
    if (validations.some(v => v.errorExists)) return;
  };

  const googleSignIn = useGoogleLogin({
    onSuccess: async response => {
      console.log('Google response: ', response);
      const { access_token } = response;
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
        label={<label className="fw-bold fs-4">Email</label>}
        className="mb-4"
        inputClassName="textfield-sm border"
      />
      <TextField
        value={password}
        onChange={handleChangePassword}
        validationErrors={passwordValidationErrors}
        label={<label className="fw-bold fs-4">Password</label>}
        className="mb-5"
        inputClassName="textfield-sm border"
      />
      <button className="btn btn-pry">Log in</button>

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
