import cls from 'classnames';
import SectionTitle from '../section-title/SectionTitle';
import styles from './OurStartups.module.scss';
import { genPublicImgSrc } from '../../utils/url-utils';
import { Link } from 'react-router-dom';
import { Icon } from '@iconify/react';

const OurStartups = () => {
  return (
    <section className={styles.section}>
      <div className="container app-container d-flex flex-column text-center p-5">
        {/* <SectionTitle title="Our Startups" /> */}
        <SectionTitle
          title="Our Startups"
          link={
            <Link to="/startups" className="d-flex align-items-center gap-2">
              See all{' '}
              <button
                className="btn btn-circle border-pry"
                style={{ width: '2rem', height: '2rem', borderColor: '#7600ff' }}
              >
                <Icon icon="grommet-icons:form-next" color="#7600ff" />
              </button>
            </Link>
          }
        />

        <div className={cls(styles.startups, 'list-style-none mt-5')}>
          <div
            className={cls(styles.startup, 'd-flex flex-column align-items-center rounded')}
          >
            <figure className="border rounded mb-4">
              <img src={genPublicImgSrc('/img/mondragon.png')} alt="" />
            </figure>
            <h4 className="fw-bold mb-3 fs-3 mt-1">Mongdragon</h4>
            <button
              className="btn btn-outline-pry btn-curved btn--sm mb-3"
              style={{ borderWidth: '1px' }}
            >
              Company industry
            </button>
            <small className="fs-5 d-block mb-3">iabc@gmail.com</small>
          </div>

          <div
            className={cls(styles.startup, 'd-flex flex-column align-items-center rounded')}
          >
            <figure className="border rounded mb-4">
              <img src={genPublicImgSrc('/img/airbnb.png')} alt="" />
            </figure>
            <h4 className="fw-bold mb-3 fs-3 mt-1">Airbnb</h4>
            <button
              className="btn btn-outline-pry btn-curved btn--sm mb-3"
              style={{ borderWidth: '1px' }}
            >
              Company industry
            </button>
            <small className="fs-5 d-block mb-3">iabc@gmail.com</small>
          </div>

          <div
            className={cls(styles.startup, 'd-flex flex-column align-items-center rounded')}
          >
            <figure className="border rounded mb-4">
              <img src={genPublicImgSrc('/img/kakao.png')} alt="" />
            </figure>
            <h4 className="fw-bold mb-3 fs-3 mt-1">Kakao</h4>
            <button
              className="btn btn-outline-pry btn-curved btn--sm mb-3"
              style={{ borderWidth: '1px' }}
            >
              Company industry
            </button>
            <small className="fs-5 d-block mb-3">iabc@gmail.com</small>
          </div>

          <div
            className={cls(styles.startup, 'd-flex flex-column align-items-center rounded')}
          >
            <figure className="border rounded mb-4">
              <img src={genPublicImgSrc('/img/netflix.png')} alt="" />
            </figure>
            <h4 className="fw-bold mb-3 fs-3 mt-1">Netflix</h4>
            <button
              className="btn btn-outline-pry btn-curved btn--sm mb-3"
              style={{ borderWidth: '1px' }}
            >
              Company industry
            </button>
            <small className="fs-5 d-block mb-3">iabc@gmail.com</small>
          </div>
        </div>
      </div>
    </section>
  );
};

export default OurStartups;
