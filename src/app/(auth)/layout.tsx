'use client';
import React from 'react';
import cls from 'classnames';
import styles from './Auth.module.scss';

import { Icon } from '@iconify/react';
import { GoogleOAuthProvider } from '@react-oauth/google';
import fonts from '../fonts';
import AuthProvider from '@/providers/AuthProvider';

export interface LayoutProps {
  children: React.ReactNode;
}

const AuthLayout = ({ children }: LayoutProps) => {
  return (
    // <AuthProvider>
    //   <html lang="en" className={fonts.lato}>
    //     <body>
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
        <img src="/img/slant-logo.png" width={200} />
      </aside>

      <GoogleOAuthProvider clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID!}>
        <section className="position-relative">{children}</section>
      </GoogleOAuthProvider>
    </div>
    //     </body>
    //   </html>
    // </AuthProvider>
  );
};

export default AuthLayout;
