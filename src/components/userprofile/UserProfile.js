import React from 'react';
import { connect } from 'react-redux';
import {
  Button, Form, FormGroup, Input, Label, UncontrolledAlert, Alert,
  Container, Row, Col,
} from 'reactstrap';
import { Field, reduxForm } from 'redux-form';
import 'bootstrap/dist/css/bootstrap.css';
import userPhoto from 'assets/img/home/person-female.png';

const renderField = ({
  input,
  placeholder,
  type,
  meta: { touched, error, warning },
}) => (
  <div>
    <Input
      {...input}
      placeholder={placeholder}
      type={type}
    />
    { touched
      && ((error && (
      <span className="error-message-text">
        {error}
      </span>
      ))
      || (warning && (
      <span>
        {' '}
        {warning}
        {' '}
      </span>
      )))
    }
  </div>
);

const UserProfile = (props) => {
  const {
    handleSubmit, submitSucceeded, error,
  } = props;

  return (
    <Form onSubmit={handleSubmit}>
      <Container>
        <Row className="section-user-title">
          <FormGroup>
            <h4>
              Dados básicos
            </h4>
          </FormGroup>
        </Row>
        <Row>
          <Col sm="4" xs="12" className="text-center">
            <Label for="upload-avatar" className="upload-avatar">
              <span>
                <i className="fa fa-picture-o" />
                Enviar foto
              </span>
              <div className="thumbnail">
                <img src={userPhoto} alt="foto-usuario" />
              </div>
            </Label>
            <div className="small-text">
              Tamanho máximo 1 MB. (JPG, GIF ou PNG)
            </div>
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
              <Label>
                Nome completo
              </Label>
              <Field
                component={renderField}
                type="text"
                name="name"
                id="name"
                placeholder="Insira seu nome completo"
                className="form-control"
              />
            </FormGroup>
            <FormGroup>
              <Label>
                Sobre mim
              </Label>
              <Field
                component="textarea"
                name="about"
                id="about"
                placeholder="Conte um pouco sobre o que gosta de fazer"
                className="form-control"
              />
            </FormGroup>

          </Col>
        </Row>
        <Row className="section-user-title">
          <Col className="text-center">
            <Button type="submit">
              Salvar
            </Button>
          </Col>
        </Row>
        <div>
          { submitSucceeded && (
            <UncontrolledAlert color="success">

                    Usuário alterado com sucesso
            </UncontrolledAlert>
          ) }
          { error
            ? (
              <Alert color="danger">

                    Ocorreu um erro com sua solicitação, tente novamente mais tarde.
              </Alert>
            )
            : '' }
        </div>
      </Container>
    </Form>
  );
};

const validate = (values) => {
  const errors = {};
  if (!values.name || values.name.length < 2) {
    errors.name = 'Insira um nome';
  }
  return errors;
};

const mapStateToProps = (state) => {
  const { user } = state.session.session;
  return ({
    initialValues: {
      name: user.name,
      about: user.about,
    },
    user,
  });
};

export default connect(
  mapStateToProps,
)(reduxForm({
  form: 'profile',
  validate,
})(UserProfile));
