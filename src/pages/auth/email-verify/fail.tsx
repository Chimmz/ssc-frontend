import { Icon } from '@iconify/react';
import { Link } from 'react-router-dom';

interface Props {
  summary: string;
  msg: string;
  promptLogin?: boolean;
  // type?: 'invalid' | 'expired'
  invalid?: boolean;
  expired?: boolean;
}

const EmailVerifyFailure = (props: Props) => {
  return (
    <div className="text-center p-5" style={{ transform: 'translateY(-3rem)' }}>
      <h1 className="family-raleway mb-5">
        {props.invalid ? 'Invalid Link' : props.expired ? 'Expired Link' : 'Error'}!
      </h1>
      <Icon icon="ic:round-cancel" width={100} color="#7600ff" className="mb-5" />
      <p className="parag" style={{ maxWidth: '50ch' }}>
        {/* {props.msg} */}
        {props.invalid ? (
          <>
            <p>
              The link is no longer valid. Please use a valid link or
              <br />
              <Link to="/auth/login" className="color-pry family-raleway fw-bold mt-2">
                Log in{' '}
              </Link>
              to your account
            </p>
          </>
        ) : null}
        {props.promptLogin ? (
          <>
            {' '}
            Or{' '}
            <Link className="color-pry" to="/auth/login">
              log into your account
            </Link>
          </>
        ) : (
          ''
        )}
      </p>
    </div>
  );
};

export default EmailVerifyFailure;
