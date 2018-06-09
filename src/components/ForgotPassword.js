import React, { Component } from 'react';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import { Container, Row, Col } from 'reactstrap';


const ForgotPassword = () =>
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


export default ForgotPassword;
