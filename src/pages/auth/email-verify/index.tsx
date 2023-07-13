import { useState, useEffect } from 'react';
import ThreeDotsSpinner from '../../../components/ui/loader/ThreeDotsSpinner';
import SuccessFeedback from '../../../components/ui/success/SuccessFeedback';
import useRequest from '../../../hooks/useRequest';
import { simulateRequest } from '../../../utils/async-utils';
import { Link } from 'react-router-dom';

const EmailVerifySuccess = () => {
  const [isVerified, setVerified] = useState(false);
  const { send: sendVerifyReq, loading: isVerifying } = useRequest();

  useEffect(() => {
    simulateRequest(sendVerifyReq, 1).then(setVerified.bind(null, true));
  }, []);

  if (isVerifying)
    return <ThreeDotsSpinner text="Please wait while we verify your email..." />;

  if (isVerified)
    return (
      <div className="text-center p-5" style={{ transform: 'translateY(-2rem)' }}>
        <h1 className="family-raleway mb-5 ">Hurray!</h1>
        <SuccessFeedback />
        <p className="parag family-raleway" style={{ maxWidth: '50ch' }}>
          Your email has been verified.
        </p>
        <Link to="/auth/login" className="btn btn-outline-pry mt-8">
          Log in
        </Link>
      </div>
    );

  return <></>;
};

export default EmailVerifySuccess;
