import { useEffect, useState } from 'react';

type PageData<T> = { [page: number]: T | undefined };

// interface Params<T> {
//   init?: T;
// }

const FIRST_PAGE = 1;

const usePagination = <T>(init?: T) => {
  const [page, setPage] = useState(FIRST_PAGE);

  const [allData, setAllData] = useState<PageData<T>>(() => {
    if (init) return { [FIRST_PAGE]: init };
    return {};
  });

  const setPageData = (pg: number, data: T) => {
    setAllData(obj => ({ ...obj, [pg]: data }));
  };

  const getPageData = (pg: keyof PageData<T>) => allData[pg];

  const doesPageHaveData = (pg: number, checkFn?: (pgData: T | undefined) => boolean) => {
    if (!checkFn) return !!getPageData(pg);
    return checkFn(getPageData(pg));
  };

  return {
    page,
    pageData: allData[page],
    setPage,
    getPageData,
    setPageData,
    doesPageHaveData,
    resetAllPages: setAllData.bind(null, {})
  };
};

export default usePagination;
