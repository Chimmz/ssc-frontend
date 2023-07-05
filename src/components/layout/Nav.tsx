import { Button } from 'react-bootstrap';
import * as imgUtils from '../../utils/url-utils';
import { Link } from 'react-router-dom';

interface Props {
  style?: React.CSSProperties;
}

const Nav = function (props: Props) {
  return (
    <nav className="nav p-0 d-block" style={props.style}>
      <div className="container app-container d-flex align-items-center gap-4 p-0 px-3">
        <Link to="/" className="d-block me-auto">
          <img src={imgUtils.genPublicImgSrc('/img/ssc-logo.png')} width={200} height={85} />
        </Link>
        <button className="btn btn--KR">KR</button>
        <div className="d-flex gap-4">
          <Link to="/auth" state={{ authType: 'login' }} className="btn btn-outline-pry">
            Log in
          </Link>
          <Link to="/auth" state={{ authType: 'signup' }} className="btn btn-pry">
            Sign up
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Nav;
