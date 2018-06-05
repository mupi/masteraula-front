import React, { Component } from 'react';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import { Container, Row, Col } from 'reactstrap';


class Register extends Component {
  constructor(props){
    super(props);
    this.state={
      first_name:'',
      last_name:'',
      email:'',
      password:''
    }
  }
  render() {
    return (
      <Container>
          <Row>
            <Col><Label>Nome Completo</Label></Col>
            <Col><Input placeholder="Ingresse seu nome completo"/></Col>
          </Row>

            <div className="col-sm-12">
                <div className="col-sm-6">
                  <Label>Email</Label>
                </div>
                <div className="col-sm-6">
                  <Input
                    placeholder="Ingresse seu email"
                    />
                </div>
            </div>
            <div className="col-sm-12">
                <div className="col-sm-6">
                  <Label>Senha</Label>
                </div>
                <div className="col-sm-6">
                  <Input
                    placeholder="Uma senha muito forte"
                    />
                </div>
            </div>
            <div className="col-sm-12">
                <div className="col-sm-6">
                  <Input
                    placeholder="Confirme sua senha"
                    />
                </div>
            </div>
            <div className="row">
              <div className="col-sm-12">
                <Button color="primary">Enviar</Button>{' '}
              </div>
            </div>
        </Container>
    );
  }
}
const style = {
  margin: 15,
};
export default Register;
