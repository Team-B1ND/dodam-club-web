import { Container, Wrap } from './style';
import React from 'react';

interface Props {
  authHideChildren?: React.ReactNode;
  children: React.ReactNode;
}

const Layout = ({ authHideChildren, children }: Props) => {
  const pathname = window.location.pathname;
  return (
    <>
      <Container>
        {pathname !== '/login' && pathname.substring(0, 5) !== '/sign' && authHideChildren}
        <Wrap isSign={pathname === '/sign' ? false : true}>{children}</Wrap>
      </Container>
    </>
  );
};

export default Layout;
