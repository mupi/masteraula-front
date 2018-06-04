import React, { Component } from 'react';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';


class ForgotPassword extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="row justify-content-center">
        <div className="col-10 col-sm-7 col-md-5 col-lg-4">
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
        </div>
    </div>



    );
  }
}

export default ForgotPassword;
