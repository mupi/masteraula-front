import React from 'react';
import {
  Form, Row, Col, FormGroup, Label, Input, Button,
} from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const StudentOnlineTestForm = (props) => {
  const { handleSubmit } = props;

  return (
    <Form onSubmit={handleSubmit}>
      <Row form>
        <Col md={6}>
          <FormGroup>
            <Label for="name">Nome completo</Label>
            <Input type="text" name="name" id="name" placeholder="Insira seu nome completo" />
          </FormGroup>
        </Col>
        <Col md={6}>
          <FormGroup>
            <Label for="grade">Série</Label>
            <Input type="text" name="grade" id="grade" placeholder="Insira sua série/turma" />
          </FormGroup>
        </Col>
      </Row>
      <Row>
        <Col sm="12" className="text-center">
          <Button color="success">
            {'Começar '}
            <FontAwesomeIcon icon="arrow-circle-right" />
          </Button>
        </Col>
      </Row>
    </Form>
  );
};

export default StudentOnlineTestForm;
