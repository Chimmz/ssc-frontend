import api from '@/library/api';
import NextAuth, { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import GoogleProvider from 'next-auth/providers/google';

const CredentialsLoginProvider = CredentialsProvider({
  id: 'login',
  authorize: async (credentials, req) => {
    console.log({ credentials });

    const res = await api.login(credentials as { email: string; password: string });
    console.log('Response login: ', res);

    const { status, ...data } = res;
    if (res.status === 'LOGIN_SUCCESS') return data;
    else throw new Error(JSON.stringify(res));
  },
  type: 'credentials',
  credentials: {},
  name: ''
});

const CredentialsSignupProvider = CredentialsProvider({
  id: 'signup',
  authorize: async (credentials, req) => {
    console.log('In signup: ', { credentials });
    const res = await api.signup(
      credentials as { fullname: string; email: string; password: string }
    );
    const { status, ...data } = res;
    if (res.status === 'LOGIN_SUCCESS') return data;
    else throw new Error(JSON.stringify(res));
  },
  type: 'credentials',
  credentials: {},
  name: ''
});

const CustomGoogleProvider = CredentialsProvider({
  id: 'custom-google',
  credentials: {},
  name: '',
  authorize: async (credentials, req) => {
    console.log({ credentials });
    const { access_token } = credentials as { access_token: string };

    const res = await api.googleSignIn(access_token);

    console.log('In custom google: ', { credentials, res });
    const { status, ...data } = res;

    if (['LOGIN_SUCCESS', 'USER_CREATED'].includes(res.status)) return data;
    else throw new Error(JSON.stringify(res));
  }
});

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsLoginProvider,
    CredentialsSignupProvider,
    CustomGoogleProvider
    // GoogleProvider({
    //   id: 'google',
    //   clientId: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID!,
    //   clientSecret: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_SECRET!
    // })
  ],

  callbacks: {
    async jwt({ token, user, session }) {
      console.log('In jwt(): ', { token, user, session });
      // If user just signed in, 'token' will be undefined while 'user' will be populated
      // @ts-ignore
      if (user) token = user;
      return token;
      // console.log('In jwt(): ', { token, user, session });
    },

    async session({ session, token, user }) {
      console.log('In session(): ', { token, user, session });
      // Populate session with the populated token
      // @ts-ignore
      // if (token)  session = token;
      if (token) {
        // @ts-ignore
        session.user = token.user;
        // @ts-ignore
        session.token = token.accessToken;
      }
      return session;
    }
  }
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
