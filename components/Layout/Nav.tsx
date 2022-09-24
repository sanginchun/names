import React from 'react';
import Link from 'next/link';
import { Menu, Container } from 'semantic-ui-react';

const Nav = () => {
  return (
    <Menu as="header" borderless fixed="top" inverted size="huge" color="teal">
      <Container as="nav">
        <Link href="/">
          <a className="header item">인기 이름</a>
        </Link>
        <Link href="/search">
          <a className="header item">이름 검색</a>
        </Link>
      </Container>
    </Menu>
  );
};

export default Nav;
