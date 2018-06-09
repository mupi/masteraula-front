import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import { Row, Col, ListGroup, ListGroupItem, Input, InputGroup, InputGroupAddon, Button} from 'reactstrap';
import QuestionCard from "./QuestionCard"
class BancoQuestoesPage extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
            <Row>
              <Col xs='6'>
              Digite o termo e encontre soluções relacionadas
              <InputGroup>
                <Input />
                <InputGroupAddon addonType="prepend"><Button>Pesquisar</Button></InputGroupAddon>
              </InputGroup>
              <Row style={{'margin-top':'10px'}}>
              <Col>
                <QuestionCard />
                </Col>
                <Col>
                <QuestionCard />
                </Col>
                <Col>
                <QuestionCard />
                </Col>
              </Row>
               </Col>
            </Row>
    );
  }
}

export default BancoQuestoesPage;
