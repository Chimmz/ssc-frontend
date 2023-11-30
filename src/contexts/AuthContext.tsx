'use client';

import {
  useState,
  useEffect,
  createContext,
  ReactNode,
  useContext,
  SetStateAction,
  Dispatch
} from 'react';

interface AuthContextData {
  data?: { user: UserPublicProfile; accessToken: string } | undefined;
  setCurrentUser?: Dispatch<
    SetStateAction<{ user: UserPublicProfile; accessToken: string } | undefined>
  >;
  // modifyUser
}

const authContext = createContext<AuthContextData | undefined>(undefined);

export const AuthContextProvider = (props: { children: ReactNode }) => {
  const [currentUser, setCurrentUser] = useState<{
    user: UserPublicProfile;
    accessToken: string;
  }>();

  useEffect(() => {
    try {
      const savedUser = localStorage.getItem(process.env.NEXT_PUBLIC_LOCALSTORAGE_USER!);
      if (savedUser) setCurrentUser(JSON.parse(savedUser));
    } catch (err) {
      console.log({ err });
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(
      process.env.NEXT_PUBLIC_LOCALSTORAGE_USER!,
      JSON.stringify(currentUser || {})
    );
  }, [currentUser]);

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
