import { FunctionComponent } from 'react';

import Footer from './Footer';
import Nav from './Nav';

interface Props {
  children: React.ReactNode;
  navStyles?: React.CSSProperties;
}

const Layout: FunctionComponent<Props> = props => {
  return (
    <>
      <Nav style={props.navStyles} />
      <main className="flex-grow-1">{props.children}</main>
      <Footer />
    </>
  );
};

export default Layout;
