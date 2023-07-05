import cls from 'classnames';
import useInput from '../../hooks/useInput';
import styles from './Contact.module.scss';
import { genPublicImgSrc } from '../../utils/url-utils';
import TextField from '../ui/text-field/TextField';
import { FormEventHandler } from 'react';
import { isEmail, isRequired } from '../../utils/validators/inputValidators';

interface Props {
  className?: string;
}

const Contact = (props: Props) => {
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
    runValidators: runNameValidators
  } = useInput({ init: '', validators: [{ fn: isRequired, params: [] }] });

  const {
    inputValue: email,
    onChange: handleChangeEmail,
    validationErrors: emailValidationErrors,
    runValidators: runEmailValidators
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
    runValidators: runSubjectValidators
  } = useInput({ init: '', validators: [{ fn: isRequired, params: [] }] });

  const {
    inputValue: message,
    onChange: handleChangeMessage,
    validationErrors: messageValidationErrors,
    runValidators: runMsgValidators
  } = useInput({ init: '', validators: [{ fn: isRequired, params: [] }] });

  const handleSubscribe: FormEventHandler = ev => {
    ev.preventDefault();
    if (runEmailSubscribeValidators().errorExists) return;
    console.log(emailSubscribe);
  };

  const handleSubmitGetInTouchForn: FormEventHandler = ev => {
    ev.preventDefault();

    const validations = [
      runNameValidators(),
      runEmailValidators(),
      runSubjectValidators(),
      runMsgValidators()
    ];
    if (validations.some(v => v.errorExists)) return;
    console.log({ fullname, email, subject, message });
  };

  return (
    <section className={cls(styles.section, props.className, 'bg-pry-lightest')}>
      <div className={cls(styles.container, 'container app-container gap-5')}>
        <div className="subscribe">
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

        <form className={cls(styles.getInTouch, 'ps-5')}>
          <h3 className="h-3 fs-2 fw-bold color-pry-dark mb-5">Get in touch</h3>
          <TextField
            value={fullname}
            onChange={handleChangeFullname}
            label={<label className="fw-bold fs-4 text-black">Full name</label>}
            validationErrors={fullnameValidationErrors}
            className="mb-4"
            inputClassName="bg-white textfield-sm"
          />
          <TextField
            value={email}
            onChange={handleChangeEmail}
            label={<label className="fw-bold fs-4 text-black">Email Address</label>}
            validationErrors={emailValidationErrors}
            className="mb-4"
            inputClassName="bg-white textfield-sm"
          />
          <TextField
            value={subject}
            onChange={handleChangeSubject}
            label={<label className="fw-bold fs-4 text-black">Subject</label>}
            validationErrors={subjectValidationErrors}
            className="mb-4"
            inputClassName="bg-white textfield-sm"
          />
          <TextField
            as="textarea"
            value={message}
            onChange={handleChangeMessage}
            label={<label className="fw-bold fs-4 text-black">Message</label>}
            validationErrors={messageValidationErrors}
            className="mb-5"
            inputClassName="bg-white textfield-sm"
          />

          <div className="d-flex align-items-center justify-content-between fw-bold fs-3 text-black flex-wrap gap-4">
            <small className="color-pry-dark family-raleway fs-4">
              or email{' '}
              <a
                href="mailto:info@seoulstartupsclub.com"
                className="color-pry ms-2 text-decoration-underline"
              >
                info@seoulstartupsclub.com
              </a>
            </small>
            <button
              className="btn btn-pry"
              type="button"
              onClick={handleSubmitGetInTouchForn}
            >
              Send
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default Contact;
