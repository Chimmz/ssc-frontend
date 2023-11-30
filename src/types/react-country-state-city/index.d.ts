declare module 'react-country-state-city' {
  export interface Country {
    capital: string;
    currency: string;
    currency_name: string;
    currency_symbol: string;
    emoji: string;
    id: number;
    iso2: string;
    iso3: string;
    latitude: string;
    longitude: string;
    name: string;
    native: string;
    numeric_code: string;
    phone_code: number;
    region: string;
    subregion: string;
    tld: string;
  }
  export interface State {
    id: number;
    name: string;
    state_code: string;
  }
  export interface City {
    id: number;
    latitude: string;
    longitude: string;
    name: string;
  }

  export interface CountrySelectProps {
    defaultValue?: Partial<Country>;
    containerClassName?: string;
    inputClassName?: string;
    placeHolder?: string;
    showFlag?: boolean;
    onChange?: (country: Country) => void;
    onTextChange?: (country: Country) => void;
  }
  const CountrySelect: (props: CountrySelectProps) => JSX.Element;

  export interface StateSelectProps {
    countryid: number | undefined;
    placeHolder?: string;
    containerClassName?: string;
    inputClassName?: string;
    onChange?: (state: State) => void;
  }
  const StateSelect: (props: StateSelectProps) => JSX.Element;

  export interface CitySelectProps {
    countryid: number | undefined;
    stateid: number | undefined;
    placeHolder?: string;
    containerClassName?: string;
    inputClassName?: string;
    onChange?: (city: Country) => void;
  }
  const CitySelect: (props: CitySelectProps) => JSX.Element;
}
