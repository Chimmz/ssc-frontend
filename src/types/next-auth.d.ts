import NextAuth from 'next-auth';

declare module 'next-auth' {
  interface Session {
    user?: {
      _id: string;
      firstName: string;
      lastName?: string;
      email: string;
      isEmailVerified: boolean;
      createdAt: string;
      role?: { kind: string; roles: string[] };
      goals?: string[];
      personalInfo?: {
        dateOfBirth: Date;
        originCountry: string;
        countryOfResidence: string;
        cityOfResidence: string;
        stateOfResidence: string;
        occupation: string;
      };
      phone?: {
        phoneNumber: string;
        isVerified: Boolean;
        isValid: Boolean;
        countryCode: string;
        countryISO: string;
      };
      startupIdea?: { name: string; industries: string[] };
      startup?: { name: string; stage: string };
    };
    token?: string;
    expires: string;
  }
}
