import { Link } from 'react-router-dom';
import { genPublicImgSrc } from '../../../utils/url-utils';
import useRequest from '../../../hooks/useRequest';
import { simulateRequest } from '../../../utils/async-utils';
import ThreeDotsSpinner from '../../../components/ui/loader/ThreeDotsSpinner';

const SignupSuccess = (props: { email: string }) => {
  const { send: sendVerifReq, loading: isSendingReq } = useRequest();

  const sendVerificationLink = async () => {
    const req = await simulateRequest(sendVerifReq, 5);
  };

  if (isSendingReq) return <ThreeDotsSpinner text="Please wait..." />;
  return (
    <div className="text-center p-5" style={{ transform: 'translateY(-3rem)' }}>
      <h1 className="family-raleway mb-5">Welcome aboard!</h1>
      <p className="parag" style={{ maxWidth: '50ch' }}>
        We're excited to have you as part of our community. Keep an eye on your inbox for a
        verification email from us!” Haven’t received the email?
        <button className="bg-none btn-text-pry ms-2" onClick={sendVerificationLink}>
          Resend
        </button>
      </p>
    </div>
  );
};

export default SignupSuccess;
