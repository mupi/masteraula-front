import React, { Component } from "react";
import { Row, Col, ListGroup, ListGroupItem, Input, InputGroup, InputGroupAddon, Button } from 'reactstrap';


class UserHomePage extends Component {
  render() {
    let border = {'border': 'black solid 2px'}
    return (
        <Row>
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
            </ListGroup>
          </Col>
          <Col>
            Digite o termo e encontre soluções relacionadas
            <InputGroup>
              <Input />
              <InputGroupAddon addonType="prepend"><Button>Pesquisar</Button></InputGroupAddon>
            </InputGroup>
          </Col>
        </Row>
      )
  }
}

export default UserHomePage;
