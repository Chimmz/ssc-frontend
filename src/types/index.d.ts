interface UserPublicProfile {
  _id: string;
  firstName: string;
  lastName?: string;
  email: string;
  isEmailVerified: boolean;

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
  phone: {
    phoneNumber: string;
    isVerified: Boolean;
    isValid: Boolean;
    countryCode: string;
    countryISO: string;
  };
  startupIdea?: { name: string; industries: string[] };
  startup?: { name: string; stage: string };

  createdAt: string;
}

interface StartupCardProps {
  _id: string;
  name: string;
  industries: StartupIndustry[];
  stage: StartupStage | string;
  logoUrl: string;
  websiteUrl: string;
  description: String;
  email?: string;
}

interface NewsObj {
  _id: string;
  headline: string | (string | JSX.Element)[];
  story: string | (string | JSX.Element)[];
  isApprovedByAdmin: boolean;
  createdAt: string;
  updatedAt: string;
  imgUrl: string;
  // postedBy: UserPublicProfile;
}
