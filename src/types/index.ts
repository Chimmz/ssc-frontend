export type Readonly = { readonly: true };
export type Changable = { readonly: false };

export type Size = 'sm' | 'md' | 'lg' | 'xlg';

export interface UserPublicProfile {
  _id: string;
  firstName: string;
  lastName: string;
  imgUrl: string;
}

// Text Message
export interface PrivateMessage {
  text: string;
  from: Pick<UserPublicProfile, '_id' | 'firstName' | 'lastName'>;
  to: string;
  seen: boolean;
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
