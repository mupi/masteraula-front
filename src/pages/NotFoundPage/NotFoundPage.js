import React from "react";
import logo from "assets/img/home/logo_masteraula.png";
import { Container, Row, Col } from 'reactstrap';

const NotFoundPage = ()=>
      <div className="l-site-masteraula__public-home">
        <Row>
          <Col md="12" className="c-public-home__banner">
            <h2>A página que você tentou acessar não existe ou está indisponível</h2>
          </Col>
        </Row>
        <div className="c-public-home__features">
              <div style={{'textAlign':'center', 'fontWeight':'bold'}}>
                <h4>Caso acredite que isto é um erro, entre contato com a administração em contato@mupi.me</h4>
              </div>
              <div style={{'padding':'100px 0'}}>
                <img src={logo} style={{  'display': 'block', 'marginLeft': 'auto', 'marginRight': 'auto', 'width':'40%'}} alt="masteraula"/>
              </div>
        </div>
      </div>


export default NotFoundPage;
