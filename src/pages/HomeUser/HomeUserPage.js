import React, { Component } from 'react';
import { Link, Route } from 'react-router-dom'
import Sidebar from 'components/sidebar/Sidebar'
import { Row, Col, Container } from 'reactstrap'
import 'assets/css/HomeUser.css';

const HomeUserPage = ({children}) =>
    <div className="page">
          <Sidebar />
          <div id="body">
            <div className="container-fluid">
                <Row>
                  <Col xs="12">
                      <div className="container home-user-container">
                          {children}
                      </div>
                  </Col>
                </Row>
            </div>
          </div>
    </div>
export default HomeUserPage;
