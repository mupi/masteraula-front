import React from 'react';
import { Container } from 'reactstrap';

const HomeUserNotLoggedPage = (props) => {
  const { children } = props;
  return (
    <div className="c-public-home l-site-masteraula__public-home">
      <Container className="c-public-home__main-cointainer">
        {children}
      </Container>
    </div>
  );
};
export default HomeUserNotLoggedPage;
