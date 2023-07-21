export interface UserPublicProfile {
  _id: string;
  firstName: string;
  lastName?: string;
  email: string;
  isEmailVerified: boolean;
  createdAt: string;
}

export interface StartupProps {
  _id: string;
  name: string;
  logoUrl: string;
  website: string;
  industry: string;
  stage: string;
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

export interface NewsObj {
  _id: string;
  headline: string;
  story: string;
  // postedBy: UserPublicProfile;
  isApprovedByAdmin: boolean;
  createdAt: string;
  updatedAt: string;
}
