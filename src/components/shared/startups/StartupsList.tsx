import { useState } from 'react';
import { StartupProps } from '../../../types';
import { genPublicImgSrc } from '../../../utils/url-utils';
import StartupCard from './StartupCard';
import Modal from 'react-bootstrap/Modal';
import cls from 'classnames';
import styles from './StartupsList.module.scss';
import { Icon } from '@iconify/react';

interface Props {
  items: StartupProps[] | undefined;
  className?: string;
}

const StartupsList = (props: Props) => {
  const [activeStartup, setActiveStartup] = useState<StartupProps | null>(null);

  return (
    <>
      <ul className={cls(props.className, styles.startups, 'list-style-none mt-5')}>
        {props.items?.map(st => (
          <StartupCard startup={st} key={st._id} onClick={setActiveStartup} />
        ))}
      </ul>

      {/* To show full details of clicked startup card */}
      <Modal
        aria-labelledby="contained-modal-title-vcenter"
        show={!!activeStartup}
        onHide={setActiveStartup.bind(null, null)}
      >
        <Modal.Header
          className="align-items-start border-none"
          style={{ padding: '2.2rem', paddingBottom: 0, borderBottom: 'none' }}
          closeButton
        >
          <img
            src={activeStartup?.logoUrl}
            className="d-block w-100 justify-self-center mx-auto bg-white object-fit-contain mb-5"
            height={180}
            alt=""
          />
        </Modal.Header>
        <Modal.Body className="rounded-5" style={{ padding: '2.2rem', paddingTop: 0 }}>
          <a
            href={`mailto:${activeStartup?.email}`}
            target="_blank"
            className={cls(
              !activeStartup?.email && 'd-none',
              'btn rounded-5 w-max-content color-pry-dark btn-light align-self-end justify-self-end'
            )}
          >
            <Icon icon="gg:website" />{' '}
            <small className="border-none border-pry-dark border-bottom">
              {activeStartup?.email}
            </small>
          </a>
          <div className="d-flex align-items-center justify-content-between mt-3 border-top pt-4">
            <h5 className="fs-3 fw-bold">{activeStartup?.name}</h5>
            <a
              href={activeStartup?.websiteUrl}
              target="_blank"
              className={cls(
                !activeStartup?.websiteUrl && 'd-none',
                'btn btn-pry-dark rounded-5'
              )}
            >
              <Icon icon="gg:website" />
              Visit website
            </a>
          </div>

          <span className="d-block w-max-content border rounded mb-4 p-1 px-2 fs-5 bg-pry-lightest font-italic">
            {activeStartup?.stage}
          </span>

          <article className="d-block fs-5 mb-4">{activeStartup?.description}</article>

          <div className="d-flex align-items-center flex-wrap gap-2 flex-grow-1">
            {activeStartup?.industries.sort().map(ind => (
              <h6
                className="fs-5 color-pry-dark border border-pry-dark rounded-5 p-2 px-3"
                key={ind}
              >
                {ind}
              </h6>
            ))}
          </div>
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
