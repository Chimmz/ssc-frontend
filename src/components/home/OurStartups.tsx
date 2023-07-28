import { useState, useEffect, useCallback, useMemo } from 'react';
import cls from 'classnames';
import SectionTitle from '../section-title/SectionTitle';
import styles from './OurStartups.module.scss';
import { genPublicImgSrc } from '../../utils/url-utils';
import { Link } from 'react-router-dom';
import { Icon } from '@iconify/react';
import StartupsList from '../shared/startups/StartupsList';
import api from '../../library/api';
import { StartupProps } from '../../types';
import useRequest from '../../hooks/useRequest';

const TOTAL_STARTUPS_TO_SHOW = 4;

const OurStartups = () => {
  const [startups, setStartups] = useState<StartupProps[]>();

  const genRandomStartups = () => {
    const req = api.getRandomStartups(TOTAL_STARTUPS_TO_SHOW);

    req.then((res: { status: string; startups?: StartupProps[] }) => {
      if (res.status !== 'SUCCESS') return;
      setStartups(res.startups);
    });
  };

  useEffect(() => {
    genRandomStartups();
    const intervalId = setInterval(genRandomStartups, 10000);
    return () => clearInterval(intervalId);
  }, []);

  return (
    <>
      <section className="section-pad-top section-pad-bottom-lg">
        <div className="container app-container d-flex flex-column text-center p-5">
          <SectionTitle
            title="Our Startups"
            layout="end"
            options={
              <Link
                to="/startups"
                className="d-flex btn-text-pry align-items-center fs-5 family-raleway gap-2"
              >
                See all
                <button
                  className="btn btn-circle border-pry"
                  style={{ width: '1.7rem', height: '1.7rem', borderColor: '#7600ff' }}
                >
                  <Icon icon="grommet-icons:form-next" color="#7600ff" />
                </button>
              </Link>
            }
          />

          {startups ? (
            <StartupsList items={startups as StartupProps[]} className={styles.startups} />
          ) : null}
        </div>
      </section>
    </>
  );
};

export default OurStartups;
