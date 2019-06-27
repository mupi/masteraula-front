import React from 'react';
import SidebarContainer from 'containers/SidebarContainer';
import { Row, Col } from 'reactstrap';

const HomeUserPage = (props) => {
  const { showFilters, showFiltersForObjectBase = false } = props;
  const { children } = props;
  return (
    <div className="l-site-masteraula__user-home">
      <SidebarContainer showFilters={showFilters} showFiltersForObjectBase={showFiltersForObjectBase} />
      <div id="body">
        <div className="container-fluid">
          <Row>
            <Col xs="12" className="l-home-user">
              <div className="container c-home-user">
                {children}
              </div>
            </Col>
          </Row>
        </div>
      </div>
    </div>
  );
};
export default HomeUserPage;
