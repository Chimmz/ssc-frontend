import { v4 as uuidv4 } from 'uuid';
import { StartupProps } from '../types';
import { genPublicImgSrc } from '../utils/url-utils';
import { StartupIndustries, StartupStages } from './constants';

export const dummyStartups = [
  {
    _id: uuidv4(),
    name: 'Mongdragon',
    industry: 'Financial',
    stage: StartupStages.GROWTH_STAGE,
    logo: genPublicImgSrc('/img/mondragon.png'),
    website: 'https://www.google.com'
  },
  {
    _id: uuidv4(),
    name: 'Kakao',
    industry: 'Technology',
    stage: StartupStages.GROWTH_STAGE,
    logo: genPublicImgSrc('/img/kakao.png'),
    website: 'https://www.google.com'
  },
  {
    _id: uuidv4(),
    name: 'Netflix',
    industry: 'E-commerce',
    stage: 'Expansion and Maturity',
    logo: genPublicImgSrc('/img/netflix.png'),
    website: 'https://www.netflix.com'
  },
  {
    _id: uuidv4(),
    name: 'Airbnb',
    industry: 'Technology',
    stage: 'Seed stage',
    logo: genPublicImgSrc('/img/airbnb.png'),
    website: 'https://www.airbnb.com'
  },
  {
    _id: uuidv4(),
    name: 'MUI Designs',
    industry: 'Technology',
    stage: StartupStages.GROWTH_STAGE,
    logo: genPublicImgSrc('/img/mondragon.png'),
    website: 'https://www.mui.com'
  },
  {
    _id: uuidv4(),
    name: 'Kolatunes',
    industry: 'Technology',
    stage: StartupStages.EARLY_TRACTION,
    logo: genPublicImgSrc('/img/kakao.png'),
    website: 'https://www.airbnb.com'
  },
  {
    _id: uuidv4(),
    name: 'Samsung',
    industry: 'Technology',
    stage: StartupStages.EXPANSION_AND_MATURITY,
    logo: genPublicImgSrc('/img/mondragon.png'),
    website: 'https://www.samsung.com'
  },
  {
    _id: uuidv4(),
    name: 'Nokia',
    industry: 'Technology',
    stage: StartupStages.GROWTH_STAGE,
    logo: genPublicImgSrc('/img/mondragon.png'),
    website: 'https://www.nokia.com'
  }
];
