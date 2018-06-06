import React, { Component } from "react";
import { Row, Col, ListGroup, ListGroupItem, Input, InputGroup, InputGroupAddon, Button, NavLink } from 'reactstrap';
import {
  Route,
  BrowserRouter,
  Switch
} from "react-router-dom";
import BancoQuestoesPage from "./BancoQuestoesPage.js";
import UserProfilePage from "./UserProfilePage.js";


class UserHomePage extends Component {
  render() {
    let border = {'border': 'black solid 2px'}
    return (
        <Row style={{'margin-top':'50px'}}>
          <Col xs="3">
            <ListGroup >
              <ListGroupItem style={border} tag="button" action>
                Novo Documento
              </ListGroupItem>
              <ListGroupItem style={border} tag="button" action>
                Meus Documentos
              </ListGroupItem>
              <ListGroupItem style={border} tag="button" action>
                Banco de questões
              </ListGroupItem>
              <ListGroupItem style={border} tag="button" action>
                <NavLink href="/user-profile">Meu profile</NavLink>
              </ListGroupItem>
            </ListGroup>
          </Col>
          <Col>
              <BancoQuestoesPage />
          </Col>
        </Row>
      )
  }
}

export default UserHomePage;
