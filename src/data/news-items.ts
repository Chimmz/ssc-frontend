import { getJSDocPublicTag } from 'typescript';
import { NewsObj } from '../types';
import { genPublicImgSrc } from '../utils/url-utils';

export const NEWS_ITEMS: NewsObj[] = [
  {
    _id: 'hanseek',
    headline: 'How we maximize your Korean food experience',
    isApprovedByAdmin: true,
    story:
      'From our experiences of introducing Korean food to our foreign friends, they had the most enjoyable time when 1) the menu was something they liked, 2) there were some explanation on how to eat the food and 3) when it was with a good company :)',
    createdAt: new Date(1691449200000).toString(),
    imgUrl: genPublicImgSrc('/img/hanseek-article-first-img.webp'),
    updatedAt: ''
  },
  {
    _id: 'innovobloc',
    headline:
      'InnovoBloc Secures Groundbreaking e-Prescription Patent, Poised to Revolutionize Healthcare Sector',
    isApprovedByAdmin: true,
    story:
      'InnovoBloc, a visionary startup at the forefront of innovation, has achieved a remarkable milestone by obtaining a utility patent for its groundbreaking electronic prescription (e- prescription) technology in South Korea',
    createdAt: new Date(1691449200000).toString(),
    imgUrl: genPublicImgSrc('/img/innovobloc-founder-img.jpg'),
    updatedAt: ''
  },
  {
    _id: 'flair',
    headline: 'How to keep track of global startup programs as a founder',
    isApprovedByAdmin: true,
    story:
      'Are you an ambitious, early-stage startup founder on the hunt for accelerators, incubators, competitions, or corporate innovation programs? Look no further, because we have a game-changing solution for you: Flair by Founders Lair!      ',
    createdAt: new Date(1691449200000).toString(),
    imgUrl: genPublicImgSrc('/img/flair-and-products.png'),
    updatedAt: ''
  },
  {
    _id: 'intelliwebi',
    headline: 'We conducted brief interview with Joshua Chung, CEO of Intelliwebi',
    isApprovedByAdmin: true,
    story:
      'Intelliwebi is a software application that helps startups create and deliver more effective pitches. They typically offer a variety of features, such as Templates for creating pitch decks, Tools for visualizing data, Practice with chatbot mode',
    createdAt: new Date(1691449200000).toString(),
    imgUrl: genPublicImgSrc('/img/intelliwebi-logo-no-text.jpg'),
    updatedAt: ''
  }
];
