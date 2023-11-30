import React, { FormEventHandler, useEffect, useState } from 'react';

import useInput from '../../../hooks/useInput';

import { isEmail, isRequired, isValidPhone } from '../../../utils/validators/inputValidators';

import { Form } from 'react-bootstrap';
// import PhoneInput from 'react-phone-number-input';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';

import TextField from '../../ui/text-field/TextField';
import PhoneConfirmation from './PhoneConfirmation';
import cls from 'classnames';
import styles from './styles.module.scss';
import { usePostSignupQuestionnaireContext } from '../../../contexts/PostSignupQuestionnaireContext';
import PhoneVerificationResult from './PhoneVerificationResult';
import useRequest from '../../../hooks/useRequest';
import api from '../../../library/api';
import useSignedInUser from '../../../hooks/useSignedInUser';
import LoadingButton from '../../ui/LoadingButton';
import { Icon } from '@iconify/react';

// import 'react-phone-number-input/style.css';

const ContactInfo = () => {
  const { user, accessToken } = useSignedInUser();
  const [phoneVerified, setPhoneVerified] = useState(user?.phone.isVerified);
  const [phoneConfirmationModalShown, setShowPhoneConfirmationModal] = useState(false);
  const [phoneVerificationResultModalShown, setShowPhoneVerificationResultModal] =
    useState(false);

  const { overlayShown, setOverlayShown } = usePostSignupQuestionnaireContext();
  const {
    sendReq: sendSMSReq,
    loading: isSendingSMS,
    response: responseSMS,
    setResponse: setResponseSMS
  } = useRequest<{ status: 'SMS_SENT' | 'fail' | 'error'; phone?: string; msg?: string }>();

  const {
    sendReq: sendVerifReq,
    loading: isSendingVerifReq,
    response: verifResponse
  } = useRequest<{ status: 'PHONE_VERIFIED' | 'fail' | 'error'; msg: string }>();

  const {
    inputValue: email,
    onChange: handleChangeEmail,
    validationErrors: emailValidationErrors,
    runValidators: runEmailValidators,
    pushValidationError: pushEmailValidationError
  } = useInput({
    init: user?.email || '',
    validators: [
      { fn: isRequired, params: [] },
      { fn: isEmail, params: [] }
    ]
  });

  const {
    inputValue: phone,
    setInputValue: setPhone,
    onChange: handleChangePhone,
    validationErrors: phoneValidationErrors,
    runValidators: runPhoneValidators,
    pushValidationError: pushPhoneValidationError,
    clearValidationErrors: clearPhoneValidationErrors
  } = useInput({
    init: user?.phone.phoneNumber || '',
    validators: [{ fn: isValidPhone, params: [] }]
  });

  const sendVerificationCode = async () => {
    if (runPhoneValidators().errorExists) return;
    const req = api.sendVerificationCodeSMS(phone, accessToken!);
    sendSMSReq(req);
  };
  useEffect(() => {
    if (!responseSMS) return;
    if (responseSMS.status === 'SMS_SENT') setShowPhoneConfirmationModal(true);
    else pushPhoneValidationError(responseSMS.msg!);
  }, [responseSMS]);

  const handleOnEnterCode = (code: string) => {
    setShowPhoneConfirmationModal(false);
    const req = api.verifyPhoneVerificationCode(code, accessToken!);
    sendVerifReq(req);
  };
  useEffect(() => {
    if (verifResponse) {
      setShowPhoneVerificationResultModal(true);
      setPhoneVerified(verifResponse.status === 'PHONE_VERIFIED');
    }
  }, [verifResponse]);

  const handleResendSMS = () => {
    setShowPhoneVerificationResultModal(false);
    setShowPhoneVerificationResultModal(false);
    sendVerificationCode();
  };

  useEffect(() => {
    // Show overlay when either confirmation modal or verification result modal is shown
    setOverlayShown?.(phoneConfirmationModalShown || phoneVerificationResultModalShown);
  }, [phoneConfirmationModalShown, phoneVerificationResultModalShown]);

  useEffect(() => {
    return () => {
      api.updateUser({ phone }, accessToken!);
    };
  }, []);

  return (
    <>
      <h3
        className="fs-1 family-raleway fw-bold mb-5 text-center"
        style={{ maxWidth: '30ch' }}
      >
        Contact Information
      </h3>

      <form
        className="d-flex flex-column align-items-center gap-4 shadow rounded-3 p-6"
        style={{ minWidth: '450px', maxWidth: '450px' }}
      >
        <TextField
          value={email}
          label="Email Address"
          placeholder="abcd@gmail.com"
          className="w-100"
          validationErrors={emailValidationErrors}
          inputClassName="textfield-sm border"
          readOnly
        />

        {/* Phone */}
        <div className="w-100">
          <Form.Label className="fw-bold" htmlFor="phone">
            Phone Number
          </Form.Label>

          <PhoneInput
            inputProps={{ id: 'phone' }}
            containerClass="mb-2"
            inputClass={cls(
              'textfield border w-100 form-control',
              phoneValidationErrors.length && 'is-invalid'
            )}
            value={phone}
            onChange={(val, _, ev) => setPhone('+'.concat(val))}
            country="kr" // Default country as S.Korea
            excludeCountries={['kp']} // Exclude North Korea!
            autoFormat
            enableSearch
            searchPlaceholder="Search Country"
          />
          {phoneValidationErrors?.length ? (
            <Form.Control.Feedback type="invalid" className="d-block">
              {phoneValidationErrors?.[0]?.msg}
            </Form.Control.Feedback>
          ) : null}

          {phoneVerified ? (
            <div className="d-flex align-items-center gap-1 family-raleway fw-bold">
              <Icon icon="ep:success-filled" color="#00ae00" width={20} />{' '}
              <small style={{ color: '#00ae00' }}>Phone number confirmed</small>
            </div>
          ) : null}

          {!phoneVerified ? (
            <LoadingButton
              type="button"
              loading={isSendingSMS || isSendingVerifReq}
              loadingMsg={isSendingSMS ? 'Loading...' : 'Verifying'}
              withSpinner
              className="btn btn-pry btn--sm ms-auto"
              disabled={!phone.length}
              onClick={sendVerificationCode}
            >
              Confirm via SMS
            </LoadingButton>
          ) : null}
        </div>
      </form>

      <PhoneConfirmation
        show={phoneConfirmationModalShown}
        // show
        msg={responseSMS?.msg}
        phone={phone}
        onResend={handleResendSMS}
        onEnterCode={handleOnEnterCode}
        close={setShowPhoneConfirmationModal.bind(null, false)}
      />

      <PhoneVerificationResult
        show={phoneVerificationResultModalShown}
        // show
        msg={verifResponse?.msg}
        success={verifResponse?.status === 'PHONE_VERIFIED'}
        onResendSMS={handleResendSMS}
        close={setShowPhoneVerificationResultModal.bind(null, false)}
      />
    </>
  );
};

export default ContactInfo;
