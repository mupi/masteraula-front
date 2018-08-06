import React from 'react';
import { ListGroup, ListGroupItem } from 'reactstrap';
import { Link } from 'react-router-dom';
import QuestionBasePage from 'pages/QuestionBase/QuestionBasePage';
import UserProfilePage from 'pages/UserProfile/UserProfilePage';
import { Row, Col, Button } from 'reactstrap';

import logoMasterAula from 'assets/img/home/masteraula-300x60.png';
import logoMasterAulaVerde from 'assets/img/home/logo_masteraula-fd-verde.png';

import FilterContainer from 'containers/FilterContainer';
import DocumentInfoSidebar from './DocumentInfoSidebar';


const Sidebar = (props) => {
  const { showFilters } = props;
  const showDocumentInfoSidebar= true;
  const docName = props.docName ? props.docName : 'Novo Documento';
  const docNumberQuestions = props.docNumberQuestions ? props.docName : 0;

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
                { showDocumentInfoSidebar && <DocumentInfoSidebar />}

                <ListGroup className="sidebar-main-options">
                  <ListGroupItem color="secondary">
                    <Link to="">
                      <i className="fa fa-plus-circle btn__icon" />
                      Novo documento
                    </Link>
                  </ListGroupItem>
                  <ListGroupItem color="secondary">
                    <Link to="/documents">
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
                { showFilters && <FilterContainer />}
              </div>
            </Col>
          </Row>
        </div>
      </div>
    </div>

  );
};

export default Sidebar;
