import React from "react";
import { ListGroup, ListGroupItem } from 'reactstrap';
import {
  Route,
  BrowserRouter,
  Switch,
  Link
} from "react-router-dom";
import QuestionBasePage from "pages/QuestionBase/QuestionBasePage";
import UserProfilePage from "pages/UserProfile/UserProfilePage";
import { Row, Col, Container } from 'reactstrap';
import { UncontrolledCollapse } from 'reactstrap';

import 'assets/css/Navigation.css';
import 'font-awesome/css/font-awesome.min.css';

const filters= {
  "disciplines": [
    { "name": "Química" },
    { "name": "Física" },
    { "name": "Matemática" },
    { "name": "Português" }
  ],
  "teachingLevel":[
    { "name": "Ensino Fundamental"},
    { "name": "Ensino Fundamental II"},
    { "name": "Ensino Médio I"},
    { "name": "Ensino Médio II"},
  ],
  "difficulty":[
    { "name": "Fácil"},
    { "name": "Médio"},
    { "name": "Dificil"}
  ]
}

const Sidebar = ({docName="Novo documento", docNumberQuestions="0"})=> {
    let border = {'border': 'white solid 1px'}
    return (
          <div id="sidebar">
            <div id="sidebar-container">
              <div className="container-fluid">
                <Row>
                  <Col xs="12">
                      <div className="sidebar-nav-container">

                          <h5>Documento Atual</h5>
                          <h6><i className="fa fa-file"></i> {docName} ({docNumberQuestions})</h6>
                        <ListGroup>
                          <ListGroupItem color='secondary' >
                            <Link to="/new-document">  Novo documento </Link>
                          </ListGroupItem>
                          <ListGroupItem color='secondary'  >
                            <Link to="/my-documents">  Meus documentos </Link>
                          </ListGroupItem>
                          <ListGroupItem color='secondary'>
                            <Link to="/home">  Banco de questões </Link>
                            <ListGroup>
                              <span><i class="fa fa-filter"></i> Filtros </span>
                                <ListGroupItem>Disciplinas</ListGroupItem>
                                <ListGroupItem>Grau de dificuldade</ListGroupItem>
                                <ListGroupItem>Nível de ensino</ListGroupItem>
                            </ListGroup>
                          </ListGroupItem>

                        </ListGroup>
                      </div>
                  </Col>
                </Row>
              </div>
            </div>
          </div>

      )
}

export default Sidebar;
