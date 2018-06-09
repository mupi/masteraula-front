import React, { Component } from "react";
import { ListGroup, ListGroupItem } from 'reactstrap';
import {
  Route,
  BrowserRouter,
  Switch
} from "react-router-dom";
import BancoQuestoesPage from "./BancoQuestoesPage.js";
import UserProfilePage from "./UserProfilePage.js";




class Sidebar extends Component {
  render() {
    let border = {'border': 'white solid 1px'}
    return (
            <ListGroup >
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
      )
  }
}

export default Sidebar;
