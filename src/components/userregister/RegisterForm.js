import React from 'react';
import { Button, Form, FormGroup, Input, Label, Col} from 'reactstrap';
import { Field, reduxForm } from 'redux-form'
import { NavLink } from "react-router-dom";

import { FontAwesome} from 'react-fontawesome';
import 'bootstrap/dist/css/bootstrap.css';


const renderField = ({
  input,
  label,
  type,
  meta: { touched, error, warning }
}) => (
  <div>
    <Input {...input}
      placeholder={label}
      type={type}
    />
    { touched &&
      ((error && <span>{error}</span>) ||
      (warning && <span> {warning} </span>))
    }
  </div>
);

const RegisterForm = props => {
  const { handleSubmit, error } = props

  return(
      <div className="row justify-content-center">
        <Col sm="12" xs="12">
          <Form onSubmit={ handleSubmit }>
            <FormGroup>

              <Field
                component={renderField}
                type="text"
                name="name"
                id="name"
                label="Insira seu nome completo"
              />
              <span className="has-icon">


              </span>
            </FormGroup>
            <FormGroup>
              <Field
                component={renderField}
                type="email"
                name="email"
                id="email"
                label="Insira seu email"
              />
            </FormGroup>
            <FormGroup>
              <Field
                component={renderField}
                type="password"
                name="password"
                id="password"
                label="Insira sua senha"
              />
            </FormGroup>
            <FormGroup>
              <Field
                component={renderField}
                type="password"
                name="confirm_password"
                id="confirm_password"
                label="Confirme sua senha"
              />
            </FormGroup>
            <div className="text-center">
                <FormGroup check className="form-group">
                    <Label check>
                      <Field name="accept_terms" id="accept_terms" type="checkbox"
                        component= { accept_terms =>
                          <div>
                            <input type={accept_terms.type} {...accept_terms.input}/>
                            Eu concordo com os <NavLink className="use-terms" to="/terms-use">Termos de Uso</NavLink>
                            { accept_terms.meta.touched && accept_terms.meta.error && <span><br/>{accept_terms.meta.error}</span> }
                          </div>
                        }/>{' '}
                    </Label>
                </FormGroup>
                <FormGroup check>
                  {error && <div className="errorMessage">{error}</div>}
                </FormGroup>
                <Button>Enviar</Button>
            </div>
          </Form>
        </Col>
    </div>
  );
}

const validate = values => {
  const errors = {}
  if (!values.name) {
    errors.name = 'Insira um nome'
  }
  if (!values.email) {
    errors.email = 'Insira um email'
  }

  if (!values.password) {
    errors.password = 'Insira uma senha'
  } else if (values.password.length < 8){
    errors.password = 'A senha deve conter no mínimo 8 dígitos'
  } else if (!isNaN(values.password)){
    errors.password = 'A senha não deve conter apenas números'
  }

  if (!values.confirm_password) {
    errors.confirm_password = 'Insira uma confirmação de senha'
  }
  if (values.password && values.confirm_password && values.password !== values.confirm_password){
    errors.confirm_password = 'Senha e confirmação não coincidem'
  }

  return errors
}

export default reduxForm({
    form : 'register',
    validate
})(RegisterForm);
