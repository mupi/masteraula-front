import React from 'react';
import {
  Row, Col, ListGroup, ListGroupItem,
} from 'reactstrap';
import { Link } from 'react-router-dom';

import logoMasterAulaVerde from 'assets/img/home/logo_masteraula-fd-verde.png';

import CreateDocumentModalContainer from 'containers/CreateDocumentModalContainer';
import FilterContainer from 'containers/FilterContainer';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';


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
                      <FontAwesomeIcon
                        className="btn__icon"
                        icon="search"
                      />
                      Banco de questões
                    </Link>
                  </ListGroupItem>
                  <ListGroupItem color="light">
                    <Link to="/documents/1">
                      <FontAwesomeIcon
                        className="btn__icon"
                        icon="folder"
                      />
                      Gerenciar minhas provas
                    </Link>
                  </ListGroupItem>
                  <ListGroupItem color="light">
                    <Link to="#">
                      <FontAwesomeIcon
                        className="btn__icon"
                        icon="folder"
                      />
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
