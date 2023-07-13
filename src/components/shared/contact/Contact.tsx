import { useRef, FormEventHandler } from 'react';
// Hooks
import useRequest from '../../../hooks/useRequest';
import useInput from '../../../hooks/useInput';
// Utils
import cls from 'classnames';
import emailjs, { EmailJSResponseStatus } from '@emailjs/browser';
import { isEmail, isRequired } from '../../../utils/validators/inputValidators';
import { genPublicImgSrc } from '../../../utils/url-utils';

import ThreeDotsSpinner from '../../ui/loader/ThreeDotsSpinner';
import TextField from '../../ui/text-field/TextField';
import styles from './Contact.module.scss';

interface Props {
  className?: string;
}

const ContactSection = (props: Props) => {
  const contactFormRef = useRef<HTMLFormElement | null>(null);

  const {
    send: sendContactEmailReq,
    loading: isSendingContactEmail,
    response: emailResponse
  } = useRequest<EmailJSResponseStatus | undefined>();

  const {
    inputValue: emailSubscribe,
    onChange: handleChangeEmailSubscribe,
    validationErrors: emailSubscribeValidationErrors,
    runValidators: runEmailSubscribeValidators
  } = useInput({
    init: '',
    validators: [
      { fn: isRequired, params: [] },
      { fn: isEmail, params: [] }
    ]
  });

  const {
    inputValue: fullname,
    onChange: handleChangeFullname,
    validationErrors: fullnameValidationErrors,
    runValidators: runNameValidators,
    clearInput: clearFullname
  } = useInput({ init: '', validators: [{ fn: isRequired, params: [] }] });

  const {
    inputValue: email,
    onChange: handleChangeEmail,
    validationErrors: emailValidationErrors,
    runValidators: runEmailValidators,
    clearInput: clearEmail
  } = useInput({
    init: '',
    validators: [
      { fn: isRequired, params: [] },
      { fn: isEmail, params: [] }
    ]
  });

  const {
    inputValue: subject,
    onChange: handleChangeSubject,
    validationErrors: subjectValidationErrors,
    runValidators: runSubjectValidators,
    clearInput: clearSubject
  } = useInput({ init: '', validators: [{ fn: isRequired, params: [] }] });

  const {
    inputValue: message,
    onChange: handleChangeMessage,
    validationErrors: messageValidationErrors,
    runValidators: runMsgValidators,
    clearInput: clearMessage
  } = useInput({ init: '', validators: [{ fn: isRequired, params: [] }] });

  const handleSubscribe: FormEventHandler = ev => {
    ev.preventDefault();
    if (runEmailSubscribeValidators().errorExists) return;
    console.log(emailSubscribe);
  };

  const handleSubmitContactForn: FormEventHandler = async ev => {
    ev.preventDefault();

    const validations = [
      runNameValidators(),
      runEmailValidators(),
      runSubjectValidators(),
      runMsgValidators()
    ];
    if (validations.some(v => v.errorExists)) return;

    const req = emailjs.sendForm(
      process.env.REACT_APP_EMAILJS_GMAIL_SERVICE_ID!,
      process.env.REACT_APP_EMAILJS_CONTACT_FORM_TEMPLATE_ID!,
      contactFormRef.current!,
      process.env.REACT_APP_EMAILJS_PUBLIC_KEY!
    );

    sendContactEmailReq(req).then(() => {
      clearFullname();
      clearEmail();
      clearSubject();
      clearMessage();
    });
    // console.log({ result });
  };

  return (
    <section className="section-pad-top section-pad-bottom-lg bg-pry-lightest">
      <div className={cls(styles.container, 'container app-container gap-5')}>
        <div className={cls(styles.subscribe, 'd-flex flex-column')}>
          <h3 className="h-3 fs-2 fw-bold color-pry-dark mb-3">
            Subscribe to our Newsletter
          </h3>
          <p className="parag fs-4 text-black mb-5">
            Stay informed about South Korea's startup ecosystem, Oasis Startup Visa Courses,
            and more by subscribing to SSC's Newsletter.
            <br /> Subscribe today!
          </p>

          <form
            className={cls(
              'd-flex gap-3 mb-5',
              `align-items-${emailSubscribeValidationErrors.length ? 'start' : 'center'}`
            )}
            aria-label="subscribe"
            onSubmit={handleSubscribe}
          >
            <TextField
              value={emailSubscribe}
              onChange={handleChangeEmailSubscribe}
              validationErrors={emailSubscribeValidationErrors}
              placeholder="Email address"
              className="flex-grow-1"
              inputClassName="bg-white textfield-sm"
            />
            <button className="btn btn-pry" type="submit">
              Subscribe
            </button>
          </form>
          <figure className="mx-auto">
            <img src={genPublicImgSrc('/img/contact-img.png')} width={280} />
          </figure>
        </div>

        <form
          className={cls(styles.getInTouch, 'ps-5')}
          ref={contactFormRef}
          onSubmit={handleSubmitContactForn}
          aria-label="get-in-touch"
        >
          <h3 className="h-3 fs-2 fw-bold color-pry-dark mb-5">Get in touch</h3>
          <TextField
            name="from_name"
            value={fullname}
            onChange={handleChangeFullname}
            label="Full name"
            validationErrors={fullnameValidationErrors}
            className="mb-4"
            inputClassName="bg-white textfield-sm"
          />
          <TextField
            name="from_email"
            value={email}
            onChange={handleChangeEmail}
            label="Email Address"
            validationErrors={emailValidationErrors}
            className="mb-4"
            inputClassName="bg-white textfield-sm"
          />
          <TextField
            name="from_subjectline"
            value={subject}
            onChange={handleChangeSubject}
            label="Subject"
            validationErrors={subjectValidationErrors}
            className="mb-4"
            inputClassName="bg-white textfield-sm"
          />
          <TextField
            as="textarea"
            name="from_message"
            value={message}
            onChange={handleChangeMessage}
            label="Message"
            validationErrors={messageValidationErrors}
            className="mb-4"
            inputClassName="bg-white textfield-sm"
          />

          <div className="d-flex align-items-center justify-content-between fw-bold fs-3 text-black gap-4">
            <small className="color-pry-dark family-raleway fs-5">
              or email{' '}
              <a
                href="mailto:info@seoulstartupsclub.com"
                className="color-pry ms-2 text-decoration-underline"
              >
                info@seoulstartupsclub.com
              </a>
            </small>
            <div className="d-flex align-items-center gap-3">
              <button className="btn btn-pry" disabled={isSendingContactEmail}>
                Send
              </button>
              {emailResponse?.status === 200 ? (
                <small className="fw-normal color-pry">Success!</small>
              ) : (
                <ThreeDotsSpinner show={isSendingContactEmail} />
              )}
            </div>
          </div>
        </form>
      </div>
    </section>
  );
};

export default ContactSection;
