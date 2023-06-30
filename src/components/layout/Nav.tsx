import { Button } from 'react-bootstrap';
import * as imgUtils from '../../utils/url-utils';

const Nav = function () {
  return (
    <nav className="nav p-0 d-block">
      <div className="container homepage-container d-flex align-items-center p-0 px-3">
        <img
          src={imgUtils.genPublicImgSrc('/img/ssc-logo.png')}
          className="d-block me-auto"
          width={200}
          height={85}
        />
        <div className="d-flex gap-4">
          <Button className="btn btn-outline-pry">Log in</Button>
          <Button className="btn btn-pry">Sign up</Button>
        </div>
      </div>
    </nav>
  );
};

export default Nav;
