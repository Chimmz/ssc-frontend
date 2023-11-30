'use client';
import { useRouter } from 'next/navigation';

const AuthPage = () => {
  const router = useRouter();
  router.push('/auth/login');

  return <></>;
};

export default AuthPage;
