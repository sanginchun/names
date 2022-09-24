import React from 'react';
import { Container, Segment, Grid } from 'semantic-ui-react';

const Footer = () => {
  return (
    <Segment
      as="footer"
      style={{ padding: '24px 0' }}
      vertical
      inverted
      color="grey"
    >
      <Container textAlign="center">
        <Grid columns={1}>
          <Grid.Column>
            대법원 전자가족관계등록시스템의 통계 데이터를 사용합니다
          </Grid.Column>
          <Grid.Column>문의: sanginchun91@gmail.com</Grid.Column>
        </Grid>
      </Container>
    </Segment>
  );
};

export default Footer;
