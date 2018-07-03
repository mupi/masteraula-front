import React from "react";
import { ListGroup, ListGroupItem } from 'reactstrap';
import { Link } from "react-router-dom";
import QuestionBasePage from "pages/QuestionBase/QuestionBasePage";
import UserProfilePage from "pages/UserProfile/UserProfilePage";
import { Row, Col, Button} from 'reactstrap';

import 'assets/css/Navigation.css';
import 'font-awesome/css/font-awesome.min.css';
import logoMasterAula from "assets/img/home/masteraula-300x60.png";

import SidebarFilters from "./SidebarFilters"


const Sidebar = props => {
  const { showFilters } = props
  const docName = props.docName ? props.docName : "Novo Documento"
  const docNumberQuestions = props.docNumberQuestions ? props.docName : 0
  
    return (
          <div id="sidebar">
            <div id="sidebar-container">
              <div className="container-fluid">
                <Row>
                  <Col xs="12">
                    <div className="logo-sidebar">
                      <img src={logoMasterAula}/>
                    </div>
                  </Col>
                  <Col xs="12">
                      <div className="sidebar-nav-container">

                          <h5>Documento Atual</h5>
                          <h6><i className="fa fa-file"></i> {docName} ({docNumberQuestions})</h6>
                          <div className="container-export-button">
                            <Button color="secondary"><i className="fa fa-download"></i> Exportar</Button>
                          </div>
                        <ListGroup className="sidebar-main-options">
                          <ListGroupItem color='secondary' >
                            <Link to="/new-document">  Novo documento </Link>
                          </ListGroupItem>
                          <ListGroupItem color='secondary'  >
                            <Link to="/my-documents">  Meus documentos </Link>
                          </ListGroupItem>
                          <ListGroupItem color='secondary'>
                            <Link to="/home">  Banco de questões </Link>
                          </ListGroupItem>
                        </ListGroup>
                        { showFilters &&  <SidebarFilters/>}
                      </div>
                  </Col>
                </Row>
              </div>
            </div>
          </div>

      )
}

export default Sidebar;
