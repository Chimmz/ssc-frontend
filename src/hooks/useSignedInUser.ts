import { useMemo } from 'react';
import { useAuthContext } from '../contexts/AuthContext';

const useSignedInUser = () => {
  const context = useAuthContext();
  console.log({ context });

  return {
    isSignedIn: !!context?.data?.accessToken?.length,
    firstName: context?.data?.user?.firstName,
    lastName: context?.data?.user?.lastName,
    accessToken: context?.data?.accessToken
  };
};

export default useSignedInUser;
