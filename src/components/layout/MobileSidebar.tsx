import React, { useState, useMemo } from 'react';
import Button from 'react-bootstrap/Button';
import Offcanvas from 'react-bootstrap/Offcanvas';
import { genPublicImgSrc } from '../../utils/url-utils';
import { Link } from 'react-router-dom';
import { Icon } from '@iconify/react';

interface Props {
  opened: boolean;
  handleClose: () => void;
}

const NAV_LINKS = [
  { path: '/', label: 'Home' },
  { path: '/startups', label: 'Startups' },
  { path: '/news', label: 'News' }
  // { path: '/community', label: 'Community' }
];

const MobileSidebar: React.FC<Props> = props => {
  const { opened, handleClose } = props;

  return (
    <Offcanvas show={opened} onHide={handleClose} placement="end" className="sidebar">
      <Offcanvas.Header className="px-5" closeButton={false}>
        <Offcanvas.Title>
          <Link to="/" className="d-flex align-items-center gap-2">
            <img src={genPublicImgSrc('/img/slant-logo-purple.png')} width={50} />
            <h2 className="mt-3">SSC</h2>
          </Link>
        </Offcanvas.Title>
        <button className="close-btn cursor-pointer" onClick={handleClose}>
          &times;
        </button>
      </Offcanvas.Header>

      <Offcanvas.Body
        className="d-flex align-items-center"
        style={{ marginInline: '1.2rem' }}
      >
        <ul className="list-style-none d-flex flex-column gap-5 m-0 p-0 w-100">
          {NAV_LINKS.map(({ label, path }) => (
            <li key={path} onClick={handleClose}>
              <Link
                to={path}
                className="d-flex align-items-center justify-content-between w-100"
              >
                {label} <Icon icon="ooui:next-ltr" width={11} />
              </Link>
            </li>
          ))}
        </ul>
      </Offcanvas.Body>

      <div className="sidebar-footer pb-4" style={{ marginInline: '2rem' }}>
        {/* <Link
          to="/auth/login"
          className="btn btn-outline-white btn--lg w-100 mb-3"
          style={{ borderWidth: '2px' }}
        >
          Log in
        </Link>
        <Link to="/auth/signup" className="btn btn-pry btn--lg w-100">
          Sign up
        </Link> */}
        <button
          className="btn btn-outline-white btn--lg w-100 mb-3"
          disabled
          style={{ borderWidth: '2px' }}
        >
          Log in
        </button>
        <button className="btn btn-pry btn--lg w-100" disabled>
          Sign up
        </button>
      </div>
    </Offcanvas>
  );
};

export default MobileSidebar;
