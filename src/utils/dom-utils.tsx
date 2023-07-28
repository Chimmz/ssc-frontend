import { v4 as uuidv4 } from 'uuid';
import { knuthMorrisPatternMatch } from '../library/algos';

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
  const occurrences = knuthMorrisPatternMatch(text, pattern);
  console.log({ occurrences });
  if (!occurrences.length) return text;

  const html = occurrences.map((occur, i) => {
    let substrBeforeOccurence;
    const isFirstOccurence = i === 0;

    const jsx = [];

    if (isFirstOccurence) {
      substrBeforeOccurence = text.slice(0, occur);
    } else {
      const prevOccurence = occurrences[i - 1];
      substrBeforeOccurence = text.slice(prevOccurence + pattern.length, occur);
    }
    jsx.push(substrBeforeOccurence);

    const matchingSubstring = text.slice(occur, occur + pattern.length);
    console.log(
      `occur: ${occur}, strBeforeOccurence="${substrBeforeOccurence}", matchingSubstring="${matchingSubstring}"`
    );

    jsx.push(<span className="fw-bold text-black">{matchingSubstring}</span>);

    const isLastOccurrence = i === occurrences.length - 1;

    if (isLastOccurrence) {
      console.log(`Remaining string: `, text.slice(occur + pattern.length));
      jsx.push(text.slice(occur + pattern.length));
    }

    return jsx;
  });
  return html.flat();
};
