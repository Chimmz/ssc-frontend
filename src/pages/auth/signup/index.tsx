import { Link, useLocation } from 'react-router-dom';
import useInput from '../../../hooks/useInput';
import { isEmail, isRequired } from '../../../utils/validators/inputValidators';
import { useGoogleLogin } from '@react-oauth/google';
import { useState } from 'react';
import { Icon } from '@iconify/react';
import TextField from '../../../components/ui/text-field/TextField';
import { simulateRequest } from '../../../utils/async-utils';
import useRequest from '../../../hooks/useRequest';
import SignupSuccess from './success';
import LoadingButton from '../../../components/ui/LoadingButton';
import classNames from 'classnames';

const Signup = function () {
  const { send: sendSignupReq, loading: isSigningUp } = useRequest();
  const [hasSignedUp, setHasSignedUp] = useState(false);

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
    runValidators: runEmailValidators
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
    runValidators: runPasswordValidators
  } = useInput({ init: '', validators: [{ fn: isRequired, params: [] }] });

  const handleSubmit: React.FormEventHandler = async ev => {
    ev.preventDefault();

    const validations = [
      runFullnameValidators(),
      runPasswordValidators(),
      runEmailValidators()
    ];
    if (validations.some(v => v.errorExists)) return;
    const req = await simulateRequest(sendSignupReq, 5);
    setHasSignedUp(true);
  };

  const googleSignIn = useGoogleLogin({
    onSuccess: async response => {
      console.log('Google response: ', response);
      const { access_token } = response;
    },
    onError: errorResponse => console.log('Google response: ', errorResponse)
  });

  if (hasSignedUp) return <SignupSuccess email={'the email field of the signup response'} />;

  return (
    <form className="d-flex flex-column" onSubmit={handleSubmit}>
      <h2 className="color-pry fw-bold text-center mb-5">Sign up</h2>

      <button
        className="btn btn-outline mt-3 mb-5"
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
        label={<label className="fw-bold fs-4">Full name</label>}
        className="mt-3 mb-4"
        inputClassName="textfield-sm border"
      />

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
      <LoadingButton
        className="btn btn-pry"
        loading={isSigningUp}
        withSpinner
        loadingMsg="Loading..."
      >
        Sign up
      </LoadingButton>

      <small className="d-flex justify-content-center fs-5 fw-bold text-center mt-3">
        Already have an account?
        <Link to="/auth/login" className="color-pry ms-2">
          Log in
        </Link>
      </small>
    </form>
  );
};

export default Signup;
