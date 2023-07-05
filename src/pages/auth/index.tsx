import cls from 'classnames';
import styles from './Auth.module.scss';
import { genPublicImgSrc } from '../../utils/url-utils';
import useInput from '../../hooks/useInput';
import { Icon } from '@iconify/react';
import { useMemo, useState } from 'react';
import { useLocation } from 'react-router-dom';
import TextField from '../../components/ui/text-field/TextField';
import { isEmail, isRequired } from '../../utils/validators/inputValidators';

const Auth = () => {
  const routeState = useLocation().state as { authType: 'login' | 'signup' };
  const [authMode, setAuthMode] = useState<'login' | 'signup'>(routeState.authType);

  const {
    inputValue: fullname,
    onChange: handleChangeFullname,
    validationErrors: fullnameValidationErrors,
    runValidators: runFullnameValidators
  } = useInput({ init: '', validators: [{ fn: isRequired, params: [] }] });

  const {
    inputValue: password,
    onChange: handleChangePassword,
    validationErrors: passwordValidationErrors,
    runValidators: runPasswordValidators
  } = useInput({ init: '' });

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

    const validations = [
      runFullnameValidators(),
      runPasswordValidators(),
      runEmailValidators()
    ];
    if (validations.some(v => v.errorExists)) return;
  };

  const isSignUpMode = useMemo(() => authMode == 'signup', [authMode]);

  return (
    <div className={styles.auth}>
      <aside className="bg-pry text-white p-5">
        <div className={cls(styles.content, 'd-flex flex-column')}>
          <div className="d-flex gap-4">
            <button className="btn btn-circle border-none fs-5">KR</button>
            <button className="btn btn-circle bg-white color-pry border-none">
              <Icon icon="material-symbols:home-outline" width={20} color="#7600ff" />
            </button>
          </div>
          <div className={cls(styles.textbox, 'my-auto')}>
            <h1 className="h-1--main text-white mb-4">Seoul Startups Club</h1>
            <p className="parag fs-5 text-white">
              Welcome to the Seoul Startups Club. where aspiring entrepreneurs and startup
              enthusiasts gather to network.
            </p>
          </div>
        </div>
        <img src={genPublicImgSrc('/img/slant-logo.png')} width={200} />
      </aside>

      <section>
        <form className="d-flex flex-column" onSubmit={handleSubmit}>
          <h2 className="color-pry fw-bold text-center mb-5">
            {isSignUpMode ? 'Sign up' : 'Log in'}
          </h2>

          <button className="btn btn-outline mt-3 mb-5" type="button">
            <Icon icon="devicon:google" />
            {isSignUpMode ? 'Sign up' : 'Log in'} with Google
          </button>
          <small className="d-block text-center mt-4 mb-5" data-content="or">
            {/* Or */}
          </small>

          {isSignUpMode ? (
            <TextField
              value={fullname}
              onChange={handleChangeFullname}
              validationErrors={fullnameValidationErrors}
              label={<label className="fw-bold fs-4">Full name</label>}
              className="mt-3 mb-4"
              inputClassName="textfield-sm border"
            />
          ) : null}

          <TextField
            value={password}
            onChange={handleChangePassword}
            validationErrors={passwordValidationErrors}
            label={<label className="fw-bold fs-4">Password</label>}
            className="mb-4"
            inputClassName="textfield-sm border"
          />

          <TextField
            value={email}
            onChange={handleChangeEmail}
            validationErrors={emailValidationErrors}
            label={<label className="fw-bold fs-4">Email</label>}
            className="mb-5"
            inputClassName="textfield-sm border"
          />
          <button className="btn btn-pry">{isSignUpMode ? 'Sign up' : 'Log in'}</button>

          <small
            className={cls(
              !isSignUpMode && 'd-none',
              'd-flex justify-content-center fs-5 fw-bold text-center mt-3'
            )}
          >
            Already have an account?{' '}
            <button
              className="btn btn--sm btn-text-pry ms-2"
              type="button"
              onClick={setAuthMode.bind(null, 'login')}
            >
              Log in
            </button>
          </small>
        </form>
      </section>
    </div>
  );
};

export default Auth;
