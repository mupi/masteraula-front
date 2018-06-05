import React, { Component } from 'react';
import { Button, Form, FormGroup, Input, Label} from 'reactstrap';
import { Container, Row, Col } from 'reactstrap';
import { FontAwesome} from 'react-fontawesome';
import 'bootstrap/dist/css/bootstrap.css';


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
      <div className="row justify-content-center">
        <div className="col-10 col-sm-7 col-md-5 col-lg-4">
          <Form>
            <FormGroup>
              <Input
                type="text"
                name="nome-completo"
                id="nome-completo"
                placeholder="Ingrese seu nome completo"
              />
              <span className="has-icon">


              </span>
            </FormGroup>
            <FormGroup>
              <Input
                type="email"
                name="email"
                id="email"
                placeholder="Ingrese seu email"
              />
            </FormGroup>
            <FormGroup>
              <Input
                type="password"
                name="password"
                id="password"
                placeholder="Ingrese sua senha"
              />
            </FormGroup>
            <FormGroup>
              <Input
                type="password"
                name="confirm-password"
                id="confirm-password"
                placeholder="Confirme sua senha"
              />
            </FormGroup>
            <FormGroup check>
                <Label check>
                  <Input type="checkbox" />{' '}
                  Eu concordo com os termos de uso
                </Label>
            </FormGroup>
            <FormGroup check>
                
            </FormGroup>
            <Button>Entrar</Button>
          </Form>
        </div>
    </div>
    );
  }
}
const style = {
  margin: 15,
};
export default Register;
