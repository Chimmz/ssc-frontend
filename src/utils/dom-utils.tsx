import { v4 as uuidv4 } from 'uuid';

export const scrollToElement = (query: string | HTMLElement) => {
  (typeof query === 'string' ? document.querySelector(query) : query)?.scrollIntoView({
    behavior: 'smooth'
  });
};

export const renderMultiLineText = (text: string[]) => {
  return text.map(parag => {
    if (parag === '') return <br key={uuidv4()} style={{ lineHeight: '20px' }} />;
    return (
      <p key={uuidv4()} className="w-max-content">
        {parag}
      </p>
    );
  });
};

export const boldenPatternsInText = (text: string, pattern: string) => {
  const words = text.split(' ');

  const transformedWords = words.map((w, i) => {
    const indexFound = w.toLowerCase().indexOf(pattern.toLowerCase());
    const isLastWord = i === words.length - 1;
    console.log(`Finding ${pattern.toLowerCase()} in ${w.toLowerCase()}: `, indexFound);

    if (indexFound === -1) {
      if (isLastWord) return w;
      return w + ' ';
    }

    const nonMatchingPrefix = w.slice(0, indexFound);
    const matchingPart = w.slice(indexFound, w.length);
    const nonMatchingSuffix = w.slice(indexFound + w.length);

    console.log({ nonMatchingPrefix, matchingPart, nonMatchingSuffix });
    return (
      <>
        {nonMatchingPrefix}
        <span className="fw-bold">{matchingPart}</span>
        {nonMatchingSuffix}
        {isLastWord ? '' : ' '}
      </>
    );
  });
  return transformedWords;
};
