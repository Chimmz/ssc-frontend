import { Link } from 'react-router-dom';
import { genPublicImgSrc } from '../../../utils/url-utils';
import useRequest from '../../../hooks/useRequest';
import { simulateRequest } from '../../../utils/async-utils';
import ThreeDotsSpinner from '../../../components/ui/loader/ThreeDotsSpinner';
import api from '../../../library/api';

interface Props {
  signedUpEmail: string;
}

const SignupSuccess: React.FC<Props> = props => {
  const {
    send: sendResendEmailReq,
    loading: isResending,
    response
  } = useRequest<{
    status: 'EMAIL_SENT' | 'NOT_SENT';
  }>();

  const resendVerificationLink = async () => {
    const req = api.resendVerificationEmail(props.signedUpEmail);
    sendResendEmailReq(req);
  };

  if (isResending) return <ThreeDotsSpinner text="Sending email..." />;

  if (response?.status === 'NOT_SENT') {
    return (
      <div className="text-center p-5" style={{ transform: 'translateY(-3rem)' }}>
        <h1 className="family-raleway mb-5">Couldn't Send!</h1>
        <p className="parag" style={{ maxWidth: '50ch' }}>
          Sorry, something wrong has happened. Please try again.
        </p>
      </div>
    );
  }

  return (
    <div className="text-center p-5" style={{ transform: 'translateY(-3rem)' }}>
      <h1 className="family-raleway mb-5">Welcome aboard!</h1>
      <p className="parag" style={{ maxWidth: '50ch' }}>
        We're excited to have you as part of our community.
        <br />
        Keep an eye on your inbox for a verification email from us!
        <br />
        <br />
        Haven’t received the email?
        <button className="bg-none btn-text-pry ms-2" onClick={resendVerificationLink}>
          Resend
        </button>
      </p>
    </div>
  );
};

export default SignupSuccess;
