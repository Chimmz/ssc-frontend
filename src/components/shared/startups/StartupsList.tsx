import { useState } from 'react';
import { StartupProps } from '../../../types';
import { genPublicImgSrc } from '../../../utils/url-utils';
import StartupCard from './StartupCard';
import Modal from 'react-bootstrap/Modal';
import cls from 'classnames';
import styles from './StartupsList.module.scss';

interface Props {
  items: StartupProps[] | undefined;
  className?: string;
}

const StartupsList = ({ items, className }: Props) => {
  const [activeStartup, setActiveStartup] = useState<StartupProps | null>(null);

  return (
    <>
      <ul className={cls(styles.startups, className, 'list-style-none mt-5')}>
        {items?.map(st => (
          <StartupCard startup={st} key={st._id} onClick={setActiveStartup} />
        ))}
      </ul>

      {/* To show full details of clicked startup card */}
      <Modal
        aria-labelledby="contained-modal-title-vcenter"
        show={!!activeStartup}
        onHide={() => setActiveStartup(null)}
      >
        <Modal.Body className="p-4 rounded-5" style={{ backgroundColor: '#f5f5f5' }}>
          <img
            // src={genPublicImgSrc(`/logos/${activeStartup?.logoUrl}`)}
            src={activeStartup?.logoUrl}
            className="w-100 bg-white object-fit-contain"
            height={200}
            alt=""
          />
          <h5 className="fs-3 fw-bold mt-5 mb-3">{activeStartup?.name}</h5>

          {activeStartup?.industries.map((ind, i, arr) => (
            <h6
              className="d-inline-block text-light family-raleway text-uppercase fs-5 mb-3"
              key={ind}
            >
              {ind}
              {i !== arr.length - 1 ? (
                <span className="d-inline-block mx-2 fw-bold">·</span>
              ) : (
                ''
              )}
            </h6>
          ))}
          <span
            className="d-block w-max-content border rounded mb-4 p-1 px-2 fs-5 bg-pry-lightest font-italic"
            style={{ fontStyle: 'italic' }}
          >
            {activeStartup?.stage}
          </span>
          <small className="d-block text-black fs-5 mb-4">{activeStartup?.description}</small>
          <a
            href={activeStartup?.website}
            target="_blank"
            className="fs-4 fw-bold text-black text-decoration-underline cursor-pointer"
          >
            {activeStartup?.website}
          </a>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default StartupsList;

// Startups showing randomly
// Bolden searched term in search results of news page
// Should bolden multiple words of search term in search results
// Search in startups page should search in startup name and text description
// Filter in startup page
// Put checkboxes in startups page. Add the clear-all button
