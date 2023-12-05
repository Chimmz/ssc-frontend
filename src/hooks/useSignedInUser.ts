import { UseSessionOptions, useSession } from 'next-auth/react';

const useSignedInUser = function (options?: UseSessionOptions<boolean>) {
  const { data: session, status } = useSession(options);

  return {
    ...session?.user,
    token: session?.token,
    isSignedIn: status === 'authenticated',
    authStatus: status
  };
};

export default useSignedInUser;
