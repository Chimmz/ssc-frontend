import { Button } from 'react-bootstrap';
import * as imgUtils from '../../utils/url-utils';
import { Link } from 'react-router-dom';
import { Icon } from '@iconify/react';

interface Props {
  style?: React.CSSProperties;
}

const Nav = function (props: Props) {
  return (
    <nav className="nav p-0 d-block" style={props.style}>
      <div className="container app-container d-flex align-items-center gap-4 p-0 px-3">
        <Link to="/" className="nav-logo d-block me-auto">
          <img src={imgUtils.genPublicImgSrc('/img/ssc-logo.png')} width={200} height={85} />
        </Link>
        <button className="btn btn--KR">KR</button>
        <button className="nav-breadcrumb">
          <Icon
            icon="fluent-mdl2:breadcrumb"
            color="#7600ff"
            width={27}
            className="cursor-pointer"
          />
        </button>
        <div className="nav-auth d-flex gap-4">
          <Link to="/auth/login" className="btn btn-outline-pry">
            Log in
          </Link>
          <Link to="/auth/signup" className="btn btn-pry">
            Sign up
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Nav;
