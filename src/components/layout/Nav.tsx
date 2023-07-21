import { useMemo } from 'react';

import { Button, Spinner } from 'react-bootstrap';
import * as imgUtils from '../../utils/url-utils';
import { Link, useNavigate } from 'react-router-dom';
import { Icon } from '@iconify/react';
import useSignedInUser from '../../hooks/useSignedInUser';
import { useAuthContext } from '../../contexts/AuthContext';
import useRequest from '../../hooks/useRequest';
import LoadingButton from '../ui/LoadingButton';
import NavDropdown from 'react-bootstrap/NavDropdown';

interface Props {
  style?: React.CSSProperties;
}

// 한국어
// info@seoulstartupsclub.com
// http://localhost:5000/api/v1/auth/callback/google
// https://developers.google.com/gmail/api/guides/sending
// Check what Google API service is appropriate
// Google API key: AIzaSyDcrQ4ECxg8sInYJUmTRpMmF2w2sBPjQZ8
// A fixed scroll-to-top button

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
            <span className="circle circle--3 fs-5 bg-pry-dark color-white family-raleway">
              {userInitials}
            </span>

            <NavDropdown
              className=""
              color="white"
              align="end"
              title={
                <div className="d-flex align-items-center gap-5">
                  <span className="family-raleway fw-bold text-black me-2">
                    Hi {firstName}!
                  </span>
                  <div className="nine-dots ">
                    <span className="three-dots "></span>
                    <span className="three-dots "></span>
                    <span className="three-dots "></span>
                  </div>
                </div>
              }
            >
              <NavDropdown.Item>Text</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item>Text</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item>한국어</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item onClick={() => sendLogoutReq(logoOut())}>
                {isLoggingOut && <Spinner animation="border" size="sm" />}
                {isLoggingOut ? 'Logging out...' : 'Log out'}
              </NavDropdown.Item>
            </NavDropdown>
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
