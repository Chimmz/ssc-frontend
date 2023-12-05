import { Modal } from 'react-bootstrap';
import WelcomeIcon from './WelcomeIcon.svg';
import { FC } from 'react';
import Link from 'next/link';
import cls from 'classnames';
import fonts from '@/app/fonts';

interface Props {
  show: boolean;
}

const WelcomeModal: FC<Props> = props => {
  return (
    <Modal size="lg" centered show={props.show} style={{ zIndex: '2000' }} backdrop="static">
      <Modal.Body className="d-flex flex-column flex-center p-5 tw-py-12 text-center">
        <img src={WelcomeIcon} alt="" width={150} className="mb-4" />
        <h4 className={cls(fonts.raleway, 'fs-1 color-pry fw-bold mb-4')}>Welcome!</h4>
        <p className="parag mb-5">
          Welcome to the Seoul Startups Club. where aspiring entrepreneurs and startup
          enthusiasts gather to network.
        </p>
        <Link href="/" className="btn btn-pry btn--lg w-50 mt-2" replace>
          Continue
        </Link>
      </Modal.Body>
    </Modal>
  );
};

export default WelcomeModal;
