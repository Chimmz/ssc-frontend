import { Link } from 'react-router-dom';

const EmailVerifyExpired = () => {
  return (
    <div className="text-center p-5" style={{ transform: 'translateY(-3rem)' }}>
      <h1 className="family-raleway mb-5">Expired!</h1>
      <p className="parag" style={{ maxWidth: '50ch' }}>
        The link you used has expired. If you think this was done by error, please contact
        support or{' '}
        <Link className="color-pry" to="/auth/login">
          log into your account
        </Link>
      </p>
    </div>
  );
};

export default EmailVerifyExpired;
