import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import { Row, Col, ListGroup, ListGroupItem, Input, InputGroup, InputGroupAddon, Button, NavLink } from 'reactstrap';
import RegisterPage from "./RegisterPage.js";

class BancoQuestoesPage extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
            <div className="middle-box loginscreen  animated fadeInDown">
              Digite o termo e encontre soluções relacionadas
              <InputGroup>
                <Input />
                <InputGroupAddon addonType="prepend"><Button>Pesquisar</Button></InputGroupAddon>
              </InputGroup>

            </div>
    );
  }
}

export default BancoQuestoesPage;
