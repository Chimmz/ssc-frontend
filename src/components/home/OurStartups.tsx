import cls from 'classnames';
import SectionTitle from '../section-title/SectionTitle';
import styles from './OurStartups.module.scss';
import { genPublicImgSrc } from '../../utils/url-utils';
import { Link } from 'react-router-dom';
import { Icon } from '@iconify/react';
import StartupsList from '../shared/startups/StartupsList';
import { dummyStartups } from '../../data/dummy-startups';

const OurStartups = () => {
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

          <StartupsList items={dummyStartups} className={styles.startups} />
        </div>
      </section>
    </>
  );
};

export default OurStartups;
