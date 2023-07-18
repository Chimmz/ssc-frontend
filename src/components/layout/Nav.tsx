import { useMemo } from 'react';

import { Button } from 'react-bootstrap';
import * as imgUtils from '../../utils/url-utils';
import { Link, useNavigate } from 'react-router-dom';
import { Icon } from '@iconify/react';
import useSignedInUser from '../../hooks/useSignedInUser';
import { useAuthContext } from '../../contexts/AuthContext';
import useRequest from '../../hooks/useRequest';
import LoadingButton from '../ui/LoadingButton';

interface Props {
  style?: React.CSSProperties;
}

const Nav = function (props: Props) {
  const { isSignedIn, firstName, lastName } = useSignedInUser();
  const authContext = useAuthContext();
  const navigate = useNavigate();
  const { send: sendLogoutReq, loading: isLoggingOut } = useRequest();

  const userInitials = useMemo(() => {
    return isSignedIn ? firstName![0] + (lastName?.[0] || '') : '';
  }, [isSignedIn]);

  const logoOut = () => {
    return new Promise(resolve => {
      localStorage.setItem('ssc_u', JSON.stringify({}));
      authContext!.setCurrentUser!(undefined);
      navigate('/');
      resolve(null);
    });
  };

  return (
    <nav className="nav p-0 d-block" style={props.style}>
      <div className="container app-container d-flex align-items-center gap-4 p-0 px-3">
        <Link to="/" className="nav-logo d-block me-auto">
          <img src={imgUtils.genPublicImgSrc('/img/ssc-logo.png')} width={200} height={85} />
        </Link>
        {isSignedIn ? (
          <>
            <button className="btn btn--KR">{userInitials}</button>
            <span className="family-raleway me-4">{firstName}</span>
            <LoadingButton
              loading={isLoggingOut}
              className="btn btn-danger-outline"
              style={{ color: '#dd0808' }}
              onClick={() => sendLogoutReq(logoOut())}
              loadingMsg="Logging out..."
              withSpinner
            >
              Log out <Icon icon="charm:sign-out" />
            </LoadingButton>
          </>
        ) : (
          <div className="nav-auth d-flex gap-4">
            <Link to="/auth/login" className="btn btn-outline-pry">
              Log in
            </Link>
            <Link to="/auth/signup" className="btn btn-pry">
              Sign up
            </Link>
          </div>
        )}
        <button className="nav-breadcrumb">
          <Icon
            icon="fluent-mdl2:breadcrumb"
            color="#7600ff"
            width={33}
            className="cursor-pointer"
          />
        </button>
      </div>
    </nav>
  );
};

export default Nav;
