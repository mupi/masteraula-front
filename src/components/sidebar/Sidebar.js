import React, { Component } from "react";
import { ListGroup, ListGroupItem } from 'reactstrap';
import {
  Route,
  BrowserRouter,
  Switch,
  Link
} from "react-router-dom";
import QuestionBasePage from "../../pages/QuestionBase/QuestionBasePage";
import UserProfilePage from "../../pages/UserProfile/UserProfilePage";
import { Row, Col, Container } from 'reactstrap';
import '../../assets/css/Navigation.css';
import 'font-awesome/css/font-awesome.min.css';


const Sidebar = ({docName="Novo documento", docNumberQuestions="0"})=> {
    let border = {'border': 'white solid 1px'}
    return (
          <div id="sidebar">
            <Row>
              <h5>Documento Atual</h5>
            </Row>
            <Row>
              <h6><i className="fa fa-file"></i> {docName} ({docNumberQuestions})</h6>
            </Row>
            <Row>
              <ListGroup>
                <ListGroupItem color='secondary' style={border} tag="a" action href='/new-document'>
                  Novo Documento
                </ListGroupItem>
                <ListGroupItem color='secondary' style={border} tag="a" action href='/documents'>
                  Meus Documentos
                </ListGroupItem>
                <ListGroupItem color='secondary'>
                  <Link to="/home">  Banco de questões </Link>
                </ListGroupItem>
              </ListGroup>
            </Row>
         </div>
      )
}

export default Sidebar;
