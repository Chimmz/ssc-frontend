'use client';
import { useMemo } from 'react';
import { useAuthContext } from '../contexts/AuthContext';

const useSignedInUser = () => {
  const context = useAuthContext();

  return {
    isSignedIn: !!context?.data?.accessToken?.length,
    user: context?.data?.user,
    accessToken: context?.data?.accessToken,
    modifyUserObject: (user: UserPublicProfile) =>
      context?.setCurrentUser?.(state => ({ ...state!, user }))
  };
};

export default useSignedInUser;
