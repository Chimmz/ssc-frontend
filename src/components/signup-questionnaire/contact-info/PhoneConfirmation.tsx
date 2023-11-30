import React, { useState, useEffect, FC, FormEventHandler } from 'react';
import { Icon } from '@iconify/react';
import { Modal } from 'react-bootstrap';
import OtpInput from 'react-otp-input';
import LoadingButton from '../../ui/LoadingButton';
import useRequest from '../../../hooks/useRequest';

interface Props {
  show: boolean;
  msg: string | undefined;
  phone: string | undefined;
  onEnterCode(code: string): void;
  onResend(): void;
  close: () => void;
}

const CODE_LENGTH = 4;

const PhoneConfirmation: FC<Props> = props => {
  const [code, setCode] = useState('');
  const { sendReq: sendVerifCodeReq, loading: isSendingCode } = useRequest();

  useEffect(() => {
    if (code.length === CODE_LENGTH) props.onEnterCode(code);
  }, [code]);

  const handleSubmit: FormEventHandler = ev => {
    ev.preventDefault();
    if (!code) return;
    props.onEnterCode(code);
  };

  return (
    <Modal
      show={props.show}
      centered
      onHide={props.close}
      onEnter={setCode.bind(null, '')}
      backdrop="static"
    >
      <Modal.Body className="p-6">
        <form
          className="d-flex flex-column align-items-center text-center"
          onSubmit={handleSubmit}
        >
          <h3 className="fs-2 fw-bold family-raleway color-pry mb-3">
            Confirm your phone number
          </h3>
          <small className="parag fw-bold" style={{ maxWidth: '40ch' }}>
            {props.msg}
            {/* A text message with a verification code has been sent to the number{' '}
            <span className="color-pry border-bottom border-pry"> (201) 555-0123</span> */}
          </small>

          <div className="py-5">
            <OtpInput
              value={code}
              onChange={setCode}
              numInputs={4}
              renderInput={props => (
                <input
                  {...props}
                  className="bg-pry-lighter rounded me-3 border-transparent fw-bold fs-2 text-center"
                  style={{ width: '1.4em' }}
                />
              )}
            />
          </div>

          <LoadingButton
            type="submit"
            loading={isSendingCode}
            loadingMsg="Please wait..."
            withSpinner
            className="btn btn-pry btn--lg w-100"
            disabled={code?.length !== CODE_LENGTH}
          >
            Confirm code
          </LoadingButton>

          <button
            type="button"
            className="btn px-0 color-pry me-auto fs-5 fw-bold"
            onClick={props.onResend}
          >
            <Icon icon="bytesize:reload" className="mb-1" width={15} />
            Resend Code
          </button>
        </form>
      </Modal.Body>
    </Modal>
  );
};

export default PhoneConfirmation;
