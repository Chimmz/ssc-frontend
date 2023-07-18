import { create } from 'domain';
import React, {
  useState,
  useEffect,
  createContext,
  ReactNode,
  useContext,
  SetStateAction,
  Dispatch
} from 'react';
import { UserPublicProfile } from '../types';

interface AuthContextData {
  data?: { user: UserPublicProfile; accessToken: string } | undefined;
  setCurrentUser?: Dispatch<
    SetStateAction<{ user: UserPublicProfile; accessToken: string } | undefined>
  >;
}

const authContext = createContext<AuthContextData | undefined>(undefined);

export const AuthContextProvider = (props: { children: ReactNode }) => {
  const [currentUser, setCurrentUser] = useState<{
    user: UserPublicProfile;
    accessToken: string;
  }>();

  useEffect(() => {
    try {
      const savedUser = localStorage.getItem('ssc_u');
      if (savedUser) setCurrentUser(JSON.parse(savedUser));
    } catch (err) {}
  }, []);

  const getInitials = () => {
    return;
  };

  return (
    <authContext.Provider
      value={{
        data: { ...currentUser! },
        setCurrentUser
      }}
    >
      {props.children}
    </authContext.Provider>
  );
};

export const useAuthContext = () => useContext(authContext);
