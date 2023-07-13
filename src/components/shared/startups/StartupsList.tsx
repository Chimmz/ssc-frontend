import { useState } from 'react';
import { StartupProps } from '../../../types';
import { genPublicImgSrc } from '../../../utils/url-utils';
import StartupCard from './StartupCard';
import Modal from 'react-bootstrap/Modal';
import cls from 'classnames';
import styles from './StartupsList.module.scss';

interface Props {
  items: StartupProps[];
  className?: string;
}

const StartupsList = ({ items, className }: Props) => {
  const [activeStartup, setActiveStartup] = useState<StartupProps | null>(null);

  return (
    <>
      <ul className={cls(styles.startups, className, 'list-style-none mt-5')}>
        {items.map(st => (
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
            src={activeStartup?.logoUrl}
            className="w-100 bg-white object-fit-contain"
            height={200}
            alt=""
          />
          <h5 className="fs-3 fw-bold color-pry mt-5 mb-3">{activeStartup?.name}</h5>
          <button
            className="btn color-pry-dark btn-outline btn-rounded btn--sm mb-4"
            style={{ borderWidth: '1px' }}
          >
            {activeStartup?.industry}
          </button>
          <small className="d-block text-black fs-5 mb-7">
            Cras mattis consectetur purus sit amet fermentum. Cras justo odio, dapibus ac
            facilisis in, egestas eget quam. Morbi leo risus, porta ac consectetur ac,
            vestibulum at eros. Cras mattis consectetur purus sit amet fermentum. Cras justo
            odio, dapibus ac facilisis in, egestas eget quam. Morbi leo risus, porta ac
            consectetur ac, vestibulum at eros. Cras mattis consectetur purus sit amet
            fermentum. Cras justo odio, dapibus ac facilisis in, egestas eget quam. Morbi leo
            risus, porta ac consectetur ac, vestibulum at eros. Cras mattis consectetur purus
            sit amet fermentum. Cras justo odio, dapibus ac facilisis in, egestas eget quam.
            Morbi leo risus, porta ac consectetur ac, vestibulum at eros.
          </small>
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
