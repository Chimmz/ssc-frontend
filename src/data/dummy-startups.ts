import { v4 as uuidv4 } from 'uuid';
import { StartupProps } from '../types';
import { genPublicImgSrc } from '../utils/url-utils';
import { StartupIndustries, StartupStages } from './constants';

export const dummyStartups: StartupProps[] = [
  {
    _id: uuidv4(),
    name: 'Mongdragon',
    industry: 'Technology',
    stage: StartupStages.GROWTH_STAGE,
    logoUrl: genPublicImgSrc('/img/mondragon.png'),
    website: 'https://www.google.com'
  },
  {
    _id: uuidv4(),
    name: 'Kakao',
    industry: 'Brewery',
    stage: StartupStages.GROWTH_STAGE,
    logoUrl: genPublicImgSrc('/img/kakao.png'),
    website: 'https://www.google.com'
  },
  {
    _id: uuidv4(),
    name: 'Netflix',
    industry: 'Technology',
    stage: 'Expansion and Maturity',
    logoUrl: genPublicImgSrc('/img/netflix.png'),
    website: 'https://www.netflix.com'
  },
  {
    _id: uuidv4(),
    name: 'Airbnb',
    industry: 'Technology',
    stage: 'Seed stage',
    logoUrl: genPublicImgSrc('/img/airbnb.png'),
    website: 'https://www.airbnb.com'
  }
];
