import React from 'react';
import Link from 'next/link';
import { Menu, Container } from 'semantic-ui-react';
import { CURRENT_YEAR } from '../../configs';

const Nav = () => {
  return (
    <Menu as="header" borderless fixed="top" inverted size="huge" color="teal">
      <Container as="nav">
        <Link href="/">
          <a className="header item">홈</a>
        </Link>
        <Link href={`/years?year=${CURRENT_YEAR}&gender=M`}>
          <a className="header item">연도별 인기 이름</a>
        </Link>
        <Link href="/search">
          <a className="header item">이름 검색</a>
        </Link>
      </Container>
    </Menu>
  );
};

export default Nav;
