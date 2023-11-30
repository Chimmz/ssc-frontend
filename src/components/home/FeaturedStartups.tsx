'use client';
import { useState, useEffect, useCallback, useMemo, useRef } from 'react';
import cls from 'classnames';
import SectionTitle from '../section-title/SectionTitle';
import { genPublicImgSrc } from '../../utils/url-utils';
import { Icon } from '@iconify/react';
import StartupsList from '../shared/startups/StartupsList';
import api from '../../library/api';
import useRequest from '../../hooks/useRequest';
import styles from './OurStartups.module.scss';
import HorizontalScroll from '../ui/HorizontalScroll';
import Link from 'next/link';

const TOTAL_STARTUPS_TO_SHOW = 4;
const FETCH_DURATION = 10000;

const FeaturedStartups = () => {
  const [startups, setStartups] = useState<StartupCardProps[]>();
  const startupsListRef = useRef<HTMLUListElement | null>(null);

  const genRandomStartups = () => {
    const req = api.getRandomStartups(TOTAL_STARTUPS_TO_SHOW);

    req.then((res: { status: string; startups?: StartupCardProps[] }) => {
      if (res.status !== 'SUCCESS') return;
      setStartups(res.startups);
    });
  };

  useEffect(() => {
    console.log({ startupsListRef });
    genRandomStartups();
    const intervalId = setInterval(genRandomStartups, FETCH_DURATION);
    return () => clearInterval(intervalId);
  }, []);

  return (
    <>
      <section className="section-pad mb-5">
        <div className="container app-container d-flex flex-column text-center p-5">
          <SectionTitle
            title="Featured Startups"
            layout="end"
            responsive
            options={
              <Link
                href="/startups"
                className="d-flex btn-text-pry align-items-center fs-5 family-raleway gap-2"
              >
                See all
                <span className="circular circular--sm border-pry">
                  <Icon icon="grommet-icons:form-next" color="#7600ff" />
                </span>
              </Link>
            }
          />

          {startups ? (
            <StartupsList
              items={startups}
              className={styles.startups}
              ref={startupsListRef}
            />
          ) : null}

          <HorizontalScroll
            containerRef={startupsListRef}
            itemsTotal={TOTAL_STARTUPS_TO_SHOW}
            itemsLoaded={!!startups?.length}
            className={styles.horizontalScrollMenu}
          />
        </div>
      </section>
    </>
  );
};

export default FeaturedStartups;
