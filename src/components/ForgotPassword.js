import React, { Component } from 'react';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import { Container, Row, Col } from 'reactstrap';


class ForgotPassword extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="row justify-content-center">
        <Col sm="12" xs="12">
          <Form>
            <FormGroup>
              <Input
                type="email"
                name="email"
                id="exampleEmail"
                placeholder="Ingrese seu email"
              />
            </FormGroup>
            <Button>Enviar email</Button>
          </Form>
        </Col>
    </div>



    );
  }
}

export default ForgotPassword;
