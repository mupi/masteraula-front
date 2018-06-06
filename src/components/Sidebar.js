import React, { Component } from "react";
import { Row, Col, ListGroup, ListGroupItem, Input, InputGroup, InputGroupAddon, Button, NavLink } from 'reactstrap';
import {
  Route,
  BrowserRouter,
  Switch
} from "react-router-dom";
import BancoQuestoesPage from "./BancoQuestoesPage.js";
import UserProfilePage from "./UserProfilePage.js";


class Sidebar extends Component {
  render() {
    let border = {'border': 'black solid 2px'}
    return (
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
            </ListGroup>
      )
  }
}

export default Sidebar;
