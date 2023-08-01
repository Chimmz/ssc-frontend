import { StartupIndustries, StartupStages } from '../data/constants';

export interface UserPublicProfile {
  _id: string;
  firstName: string;
  lastName?: string;
  email: string;
  isEmailVerified: boolean;
  createdAt: string;
}

export interface StripePrice {
  id: string;
  object: string;
  active: boolean;
  billing_scheme: string;
  created: number;
  currency: string;
  custom_unit_amount: string | null;
  livemode: boolean;
  lookup_key: string | null;
  metadata: {};
  nickname: string;
  product: string;
  recurring: {
    aggregate_usage: any;
    interval: string;
    interval_count: number;
    trial_period_days: number | null;
    usage_type: string;
  };
  tax_behavior: string;
  tiers_mode: null;
  transform_quantity: null;
  type: string;
  unit_amount: number;
  unit_amount_decimal: string;
}

export type StartupIndustry =
  | StartupIndustries.HEALTHCARE
  | StartupIndustries.BLOCK_CHAIN
  | StartupIndustries.E_COMMERCE
  | StartupIndustries.FINANCIAL
  | StartupIndustries.GAMING;

export type StartupStage =
  | StartupStages.SEED_STAGE
  | StartupStages.GROWTH_STAGE
  | StartupStages.IDEA_AND_CONCEPTUALIZATION
  | StartupStages.EARLY_TRACTION
  | StartupStages.PROOF_OF_CONCEPT
  | StartupStages.EXPANSION_AND_MATURITY;

export interface StartupProps {
  _id: string;
  name: string;
  industries: StartupIndustry[];
  stage: StartupStage | string;
  logoUrl: string;
  website: string;
  description: String;
}

export interface NewsObj {
  _id: string;
  headline: string | (string | JSX.Element)[];
  story: string | (string | JSX.Element)[];
  // postedBy: UserPublicProfile;
  isApprovedByAdmin: boolean;
  createdAt: string;
  updatedAt: string;
}
