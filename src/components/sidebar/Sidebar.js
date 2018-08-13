import React from 'react';
import {
  Row, Col, ListGroup, ListGroupItem,
} from 'reactstrap';
import { Link } from 'react-router-dom';

import logoMasterAulaVerde from 'assets/img/home/logo_masteraula-fd-verde.png';

import CreateDocumentModalContainer from 'containers/CreateDocumentModalContainer';
import FilterContainer from 'containers/FilterContainer';
import DocumentInfoSidebar from './DocumentInfoSidebar';


const Sidebar = (props) => {
  const { showFilters, activeDocument } = props;

  return (
    <div id="sidebar">
      <div className="logo-top-sidebar">
        <img className="logo-sidebar" src={logoMasterAulaVerde} />
      </div>
      <div id="sidebar-container">
        <div className="container-fluid">
          <Row>
            <Col xs="12">
              <div className="sidebar-nav-container">
                {activeDocument && (
                  <DocumentInfoSidebar
                    documentName={activeDocument.name}
                    documentTotalQuestions={activeDocument.questionsNumber}
                  />
                )}

                <ListGroup className="sidebar-main-options">
                  <ListGroupItem color="secondary">
                    <CreateDocumentModalContainer activeDocument={activeDocument} />
                  </ListGroupItem>
                  <ListGroupItem color="secondary">
                    <Link to="/documents/1">
                      <i className="fa fa-folder-open btn__icon" />
                      Meus documentos
                    </Link>
                  </ListGroupItem>
                  <ListGroupItem color="secondary">
                    <Link to="/question-base/1">
                      <i className="fa fa-search btn__icon" />
                      Banco de questões
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
