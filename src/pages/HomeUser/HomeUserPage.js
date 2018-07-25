import React from 'react';
import Sidebar from 'components/sidebar/Sidebar'
import { Row, Col } from 'reactstrap'

const HomeUserPage = props => {

    const { showFilters } = props
    const { children } = props

    return (
        <div className="l-site-masteraula__user-home">
            <Sidebar showFilters={showFilters}/>
            <div id="body">
                <div className="container-fluid">
                    <Row>
                    <Col xs="12">
                        <div className="container c-home-user">
                            {children}
                        </div>
                    </Col>
                    </Row>
                </div>
            </div>
        </div>
    )
}
export default HomeUserPage;
