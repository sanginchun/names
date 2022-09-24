import type { PropsWithChildren } from 'react';
import React from 'react';
import { Container } from 'semantic-ui-react';
import Nav from './Nav';
import Footer from './Footer';

const Layout = ({ children }: PropsWithChildren) => {
  return (
    <>
      <Nav />
      <Container
        as="main"
        style={{
          minHeight: '100vh',
          paddingTop: '60px',
          paddingBottom: '20px',
        }}
      >
        {children}
      </Container>
      <Footer />
    </>
  );
};

export default Layout;
