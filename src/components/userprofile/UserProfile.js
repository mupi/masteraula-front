import React from 'react';
import { Component } from 'react';
import { connect } from 'react-redux'
import { Button, Form, FormGroup, Input, Label, UncontrolledAlert} from 'reactstrap';
import { Container, Row, Col } from 'reactstrap';
import { Field, reduxForm } from 'redux-form'
import 'bootstrap/dist/css/bootstrap.css';
import userPhoto from "assets/img/home/person-female.png";

const renderField = ({
  input,
  placeholder,
  type,
  meta: { touched, error, warning }
}) => (
  <div>
    <Input {...input}
      placeholder={placeholder}
      type={type}
    />
    { touched &&
      ((error && <span>{error}</span>) ||
      (warning && <span> {warning} </span>))
    }
  </div>
);

const UserProfile = props => {
  const { handleSubmit, user, submitSucceeded } = props

    return (
      <div className="row justify-content-center">
        <div className="col-sm-8 col-md-8 col-lg-12 col-xs-12">
          <Form onSubmit={ handleSubmit }>
            <Container>
              <Row className="section-user-title">
                <FormGroup>
                  <h4>Dados básicos</h4>
                </FormGroup>
              </Row>
              <Row>
                <Col sm="4" xs="12" className="text-center">
                  <Label for="upload-avatar" className="upload-avatar">
                    <span><i className="fa fa-picture-o"></i>Enviar foto</span>
                    <div className="thumbnail">
                      <img src={ userPhoto }/>
                    </div>
                  </Label>
                  <div className="small-text">Tamano máximo 1 MB. JPG, GIF ou PNG</div>
                  <Field
                    component="input"
                    type="file"
                    name="picture"
                    id="upload-avatar"
                    className="hidden"
                  />

                </Col>
                <Col sm="8" xs="12">
                  <FormGroup>
                    <Label>Nome completo</Label>
                    <Field
                      component="input"
                      type="text"
                      name="name"
                      id="name"
                      placeholder="Ingrese seu nome completo"
                      className="form-control"
                    />
                  </FormGroup>
                  <FormGroup>
                    <Label>Sobre mim</Label>
                    <Field
                      component="textarea"
                      name="about_me"
                      id="about_me"
                      placeholder=""
                      className="form-control"
                    />
                  </FormGroup>

                </Col>
              </Row>
              <Row className="section-user-title">
                <Col className="text-center">
                  <Button>Salvar</Button>
                </Col>
              </Row>
            </Container>
          </Form>

          <Form>
          <Container>
              <Row  className="section-user-title">
                <h4>Minha Conta</h4>
              </Row>
              <Row>
                <Col sm="4">
                  Email
                </Col>
                <Col sm="4">
                  <Label>{user.email}</Label>
                </Col>
              </Row>
              <Row className="sub-section-user-title">
                <h5>Trocar senha</h5>
              </Row>
              <Row>
                <Col sm="4" xs="12">
                  <Field
                    component={renderField}
                    type="password"
                    name="old_password"
                    id="old_password"
                    placeholder="Senha Atual"
                    className="form-control"
                  />
                </Col>
                <Col sm="4">
                  <Field
                    component={renderField}
                    type="password"
                    name="new_password"
                    id="new_password"
                    placeholder="Nova senha"
                    className="form-control"
                  />
                </Col>
                <Col sm="4">
                  <Field
                    component={renderField}
                    type="password"
                    name="password_confirmation"
                    id="password_confirmation"
                    placeholder="Confirme nova senha"
                    className="form-control"
                  />
                </Col>
              </Row>
              <Row className="section-user-title">
                <Col className="text-center">
                  <Button>Redefinir senha</Button>
                </Col>
              </Row>
              <div>
                  { submitSucceeded && <UncontrolledAlert color="success">
                    Usuário alterado com sucesso
                    </UncontrolledAlert> }
              </div>
            </Container>
          </Form>
        </div>
    </div>
  )
}

const validate = values => {
  const errors = {}

  if (values.new_password) {
    if (values.new_password.length < 8){
      errors.new_password = 'A nova senha deve conter no mínimo 8 dígitos'
    } else if (!isNaN(values.new_password)){
      errors.new_password = 'A nova senha não deve conter apenas números'
    }
  }

  if (values.new_password && values.password_confirmation && values.new_password !== values.password_confirmation){
    errors.password_confirmation = 'Senha e confirmação não coincidem'
  }

  return errors
}

const mapStateToProps = state => {
  const { user } = state.session.session
  return ({
    initialValues : {
      name : user.name
    },
    user
  })
}

export default connect(
  mapStateToProps
)
  (reduxForm({
  form : "profile",
  validate
})(UserProfile));
