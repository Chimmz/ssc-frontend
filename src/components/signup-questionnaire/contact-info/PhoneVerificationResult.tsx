import React, { FC, useMemo } from 'react';
import { Modal } from 'react-bootstrap';
import LoadingButton from '../../ui/LoadingButton';
import { usePostSignupQuestionnaireContext } from '../../../contexts/PostSignupQuestionnaireContext';
import VerifySuccessIcon from './VerifySuccessIcon.svg';
import VerifyFailureIcon from './VerifyFailureIcon.svg';
import Image from 'next/image';

interface Props {
  show: boolean;
  success: boolean | undefined;
  msg: string | undefined;
  onResendSMS: () => void;
  close: () => void;
}

const PhoneVerificationResult: FC<Props> = props => {
  const btnClickHandler = useMemo(() => {
    return props.success ? props.close : props.onResendSMS;
  }, [props.success, props.onResendSMS, props.close]);

  return (
    <Modal show={props.show} centered onHide={props.close}>
      <Modal.Body className="p-6">
        <form className="d-flex flex-column align-items-center text-center">
          <Image
            src={props.success ? '/svg/VerifySuccessIcon.svg' : '/svg/VerifyFailureIcon.svg'}
            alt="Success Icon"
            width={80}
            height={80}
            className="mb-4"
          />
          <h3 className="fs-1 family-raleway fw-bold color-pry mb-3">
            {props.success ? 'Phone Verified!' : 'Phone Verification Failed'}
          </h3>
          <small className="parag fw-bold d-block mb-5" style={{ maxWidth: '50ch' }}>
            {props.msg}
          </small>

          <button type="button" className="btn btn-pry w-100" onClick={btnClickHandler}>
            {props.success ? 'Ok' : 'Resend SMS'}
          </button>
        </form>
      </Modal.Body>
    </Modal>
  );
};

export default PhoneVerificationResult;
