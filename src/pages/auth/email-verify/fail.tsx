import { Link } from 'react-router-dom';

interface Props {
  summary: string;
  msg: string;
}

const EmailVerifyFailure = (props: Props) => {
  return (
    <div className="text-center p-5" style={{ transform: 'translateY(-3rem)' }}>
      <h1 className="family-raleway mb-5">{props.summary}!</h1>
      <p className="parag" style={{ maxWidth: '50ch' }}>
        {props.msg}
        or{' '}
        <Link className="color-pry" to="/auth/login">
          log into your account
        </Link>
      </p>
    </div>
  );
};

export default EmailVerifyFailure;
