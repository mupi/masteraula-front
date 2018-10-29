import React from 'react';
import {
  Row, Col, ListGroup, ListGroupItem,
} from 'reactstrap';
import { Link } from 'react-router-dom';

import logoMasterAulaVerde from 'assets/img/home/logo_masteraula-fd-verde.png';

import CreateDocumentModalContainer from 'containers/CreateDocumentModalContainer';
import FilterContainer from 'containers/FilterContainer';
// import DocumentInfoSidebar from './DocumentInfoSidebar';


const Sidebar = (props) => {
  const { showFilters, activeDocument } = props;

  return (
    <div id="sidebar">
      <div className="logo-top-sidebar">
        <img className="logo-sidebar" src={logoMasterAulaVerde} alt="logo" />
      </div>
      <div id="sidebar-container">
        <div className="container-fluid">
          <Row>
            <Col xs="12">
              <ListGroup className="sidebar-main-options">
                <ListGroupItem color="light">
                  <CreateDocumentModalContainer activeDocument={activeDocument} />
                </ListGroupItem>
              </ListGroup>
              <div className="sidebar-nav-container">
                <ListGroup className="sidebar-main-options">
                  <ListGroupItem color="light">
                    <Link to="/question-base/1">
                      <i className="fa fa-search btn__icon" />
                      Banco de questões
                    </Link>
                  </ListGroupItem>
                  <ListGroupItem color="light">
                    <Link to="/documents/1">
                      <i className="fa fa-folder-open btn__icon" />
                      Gerenciar minhas provas
                    </Link>
                  </ListGroupItem>
                  <ListGroupItem color="light">
                    <Link to="#">
                      <i className="fa fa-folder-open btn__icon" />
                      Gerenciar meus cabeçalhos
                    </Link>
                  </ListGroupItem>
                </ListGroup>
                {showFilters && <FilterContainer />}
              </div>
            </Col>
          </Row>
        </div>
      </div>
    </div>

  );
};

export default Sidebar;
