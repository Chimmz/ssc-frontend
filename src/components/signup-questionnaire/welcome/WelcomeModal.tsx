import { Modal } from 'react-bootstrap';
import WelcomeIcon from './WelcomeIcon.svg';
import { Link } from 'react-router-dom';
import { FC } from 'react';

interface Props {
  show: boolean;
}

const WelcomeModal: FC<Props> = props => {
  return (
    <Modal size="lg" centered show={props.show} style={{ zIndex: '2000' }} backdrop="static">
      <Modal.Body className="d-flex flex-column flex-center p-5 py-8 text-center">
        <img src={WelcomeIcon} alt="" width={150} className="mb-4" />
        <h4 className="fs-1 family-raleway color-pry fw-bold">Welcome!</h4>
        <p className="parag mb-4">
          Welcome to the Seoul Startups Club. where aspiring entrepreneurs and startup
          enthusiasts gather to network.
        </p>
        <Link to="/" className="btn btn-pry btn--lg w-50 mt-2" replace>
          Continue
        </Link>
      </Modal.Body>
    </Modal>
  );
};

export default WelcomeModal;
