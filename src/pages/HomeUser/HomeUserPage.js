import React, { Component } from 'react';
import { Link, Route } from 'react-router-dom'
import Sidebar from '../../components/sidebar/Sidebar'
import { Row, Col, Container } from 'reactstrap'
import '../../assets/css/HomeUser.css';

const HomeUserPage = ({children}) =>
    <div className="page">
      <Row>
        <Col sm="2">
          <Sidebar />
        </Col>
        <Col sm="10" md="10" xs="12">
          <div className="container home-user-container">
              {children}
          </div>
        </Col>
      </Row>
    </div>
export default HomeUserPage;
