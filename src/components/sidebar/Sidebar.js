import React, { Component } from "react";
import { ListGroup, ListGroupItem } from 'reactstrap';
import {
  Route,
  BrowserRouter,
  Switch
} from "react-router-dom";
import QuestionBasePage from "../../pages/QuestionBase/QuestionBasePage";
import UserProfilePage from "../../pages/UserProfile/UserProfilePage";
import { Row, Col, Container } from 'reactstrap';

const Sidebar = ({docName="Novo documento", docNumberQuestions="0"})=> {
    let border = {'border': 'white solid 1px'}
    return (
          <div className="side-bar">
            <div>
              <h4>Documento Atual</h4>
              <h5>{docName} ({docNumberQuestions})</h5>
            </div>
            <ListGroup>
              <ListGroupItem color='secondary' style={border} tag="a" action href='/new-document'>
                Novo Documento
              </ListGroupItem>
              <ListGroupItem color='secondary' style={border} tag="a" action href='/documents'>
                Meus Documentos
              </ListGroupItem>
              <ListGroupItem color='secondary' style={border} tag="a" action href='/home'>
                Banco de questões
              </ListGroupItem>
            </ListGroup>
         </div>
      )
}

export default Sidebar;
