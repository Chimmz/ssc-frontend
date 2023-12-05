'use client';
import { SessionProvider, getSession, useSession } from 'next-auth/react';
import { ReactNode } from 'react';

export default (props: { children: ReactNode }) => {
  return <SessionProvider>{props.children}</SessionProvider>;
};
