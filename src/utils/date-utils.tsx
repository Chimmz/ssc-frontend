import { monthsOfTheYear } from '../data/constants';

type DateFormatOptions = Intl.DateTimeFormatOptions;

const DEFAULT_DATE_FORMAT: DateFormatOptions = {
  month: 'long',
  day: '2-digit',
  year: 'numeric'
};

const formatDate = (
  rawDate: string | undefined,
  options: DateFormatOptions = DEFAULT_DATE_FORMAT
) => {
  if (rawDate) return new Intl.DateTimeFormat('en-US', options).format(new Date(rawDate));
  return '';
};

export default formatDate;

export const getPast12MonthsWithYear = (): string[] => {
  const pastMonths = [];
  const now = new Date();

  for (var i = 0; i > -12; i--) {
    var future = new Date(now.getFullYear(), now.getMonth() + i, 1);
    var month = monthsOfTheYear[future.getMonth()];
    var year = future.getFullYear();
    pastMonths.push([month, year].join(' '));
  }
  return pastMonths;
};
