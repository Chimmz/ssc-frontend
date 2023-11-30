'use client';
import { useMemo } from 'react';

import { Button, Spinner } from 'react-bootstrap';
import * as imgUtils from '../../utils/url-utils';
import { Icon } from '@iconify/react';
import useSignedInUser from '../../hooks/useSignedInUser';
// import { useAuthContext } from '../../contexts/AuthContext';
import useRequest from '../../hooks/useRequest';
import NavDropdown from 'react-bootstrap/NavDropdown';
import useToggle from '../../hooks/useToggle';
import MobileSidebar from './MobileSidebar';
import cls from 'classnames';
import Link from 'next/link';
import AppContainer from '../shared/AppContainer';

interface Props {
  style?: React.CSSProperties;
  theme?: 'pry-light';
}

const Nav = function (props: Props) {
  const { state: sidebarOpened, setOn: openSidebar, setOff: closeSidebar } = useToggle(false);
  const { isSignedIn, user } = useSignedInUser();
  // const authContext = useAuthContext();
  const { sendReq: sendLogoutReq, loading: isLoggingOut } = useRequest();

  const userInitials = useMemo(() => {
    return isSignedIn ? user?.firstName![0] + (user?.lastName?.[0] || '') : '';
  }, [isSignedIn]);

  const logoOut = () => {
    return new Promise(resolve => {
      localStorage.setItem('ssc_u', JSON.stringify({}));
      // authContext!.setCurrentUser!(undefined);
      // navigate('/'); // Come back here
      resolve(null);
    });
  };

  return (
    <>
      <nav className={cls('nav p-0 d-block', `nav--${props.theme}`)} style={props.style}>
        <AppContainer className="d-flex align-items-center gap-4 p-0 px-3">
          <Link href="/" className="nav-logo d-block me-auto">
            <img src="/img/ssc-logo.png" width={200} height={85} />
          </Link>
          {isSignedIn ? (
            <>
              <span className="circular circular--3 fs-5 bg-pry-dark color-white family-raleway">
                {userInitials}
              </span>

              <NavDropdown
                className=""
                color="white"
                align="end"
                title={
                  <div className="d-flex align-items-center gap-5">
                    <span className="family-raleway fw-bold text-black me-2">
                      Hi {user!.firstName}!
                    </span>
                    <div className="nine-dots ">
                      <span className="three-dots "></span>
                      <span className="three-dots "></span>
                      <span className="three-dots "></span>
                    </div>
                  </div>
                }
              >
                {/* <NavDropdown.Item>Text</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item>Text</NavDropdown.Item>
                <NavDropdown.Divider /> */}
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
              <Link href="/auth/login" className="btn btn-outline-pry">
                Log in
              </Link>
              <Link href="/auth/signup" className="btn btn-pry">
                Sign up
              </Link>
            </div>
          )}
          <button
            className="nav-breadcrumb btn-pry flex-column align-items-center justify-content-center rounded-3"
            onClick={openSidebar}
          >
            <span className="d-block position-relative"></span>
            <span className="d-block position-relative"></span>
            <span className="d-block position-relative"></span>
          </button>
        </AppContainer>
      </nav>
      <MobileSidebar opened={sidebarOpened} handleClose={closeSidebar} />
    </>
  );
};

export default Nav;
