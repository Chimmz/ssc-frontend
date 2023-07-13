import cls from 'classnames';
import styles from './Auth.module.scss';
import { genPublicImgSrc } from '../../utils/url-utils';

import { GoogleOAuthProvider } from '@react-oauth/google';

import { Route, Routes, useLocation } from 'react-router-dom';
import Login from './login';
import Signup from './signup';
import { Icon } from '@iconify/react';
import SignupSuccess from './signup/success';
import EmailVerify from './email-verify';
import EmailVerifyExpired from './email-verify/expired';

const Auth = () => {
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
            <h1 className="h-1--main text-white mb-4" style={{ fontSize: '5rem' }}>
              Seoul Startups Club
            </h1>
            <p className="parag fs-5 family-raleway text-white">
              Welcome to the Seoul Startups Club. where aspiring entrepreneurs and startup
              enthusiasts gather to network.
            </p>
          </div>
        </div>
        <img src={genPublicImgSrc('/img/slant-logo.png')} width={200} />
      </aside>

      <section>
        <Routes>
          <Route
            path="login"
            element={
              <GoogleOAuthProvider clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID!}>
                <Login />
              </GoogleOAuthProvider>
            }
          />

          <Route
            path="signup"
            element={
              <GoogleOAuthProvider clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID!}>
                <Signup />
              </GoogleOAuthProvider>
            }
          />

          {/* <Route path="signup/success" element={<SignupSuccess />} /> */}
          <Route path="email-verify" element={<EmailVerify />} />
          <Route path="email-verify/expired" element={<EmailVerifyExpired />} />
        </Routes>
      </section>
    </div>
  );
};

export default Auth;
