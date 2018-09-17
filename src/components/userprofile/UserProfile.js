import React from 'react';
import { connect } from 'react-redux';
import {
  Button, Form, FormGroup, Input, Label, UncontrolledAlert, Alert,
  Container, Row, Col,
} from 'reactstrap';
import { Field, reduxForm } from 'redux-form';
import 'bootstrap/dist/css/bootstrap.css';
import userPhoto from 'assets/img/home/coruja-avatar.png';

const imprimir = (e) => {
  e.preventDefault();
  console.log('hola pamelita');
};

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

  const states = [
    {
      id: 1,
      name: 'MG',
    },
    {
      id: 2,
      name: 'SP',
    },
    {
      id: 3,
      name: 'RJ',
    },
  ];

  const cities = [
    {
      id: 1,
      name: 'Campinas',
    },
    {
      id: 2,
      name: 'Limeira',
    },
    {
      id: 3,
      name: 'Piracicaba',
    },
  ];

  return (
    <Form onSubmit={handleSubmit}>
      <Container>
        <Row className="section-user-title">
          <h4>
              Dados básicos
          </h4>
        </Row>
        <Row className="c-user-profile__basic-info">
          <Col sm="4" xs="12" className="text-center c-user-profile__avatar">
            <Label for="upload-avatar" className="upload-avatar">
              <span className="hidden">
                <i className="fa fa-picture-o" />
                Enviar foto
              </span>
              <div className="thumbnail">
                <img src={userPhoto} alt="foto-usuario" />
              </div>
            </Label>
            <div className="small-text hidden">
              Tamanho máximo 1 MB. (JPG, GIF ou PNG)
            </div>
          </Col>
          <Col sm="8" xs="12">
            <Row>
              <Col>
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
              </Col>
            </Row>

            <Row>
              <Col>
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

            <Row>
              <Col sm="12">
                <Label>
                  Lugar de residência
                </Label>
              </Col>
              <Col sm="4">

                <FormGroup>
                  <Field component="select" className="form-control" onChange={e => imprimir(e)} name="user_state">
                    <option>
                      Selecione o estado
                    </option>
                    {states.map(state => (
                      <option key={state.id} className="c-user-profile__state-city-dropdown-item">
                        {state.name}
                      </option>
                    ))}
                  </Field>
                </FormGroup>
              </Col>
              <Col sm="8">

                <FormGroup>
                  <Field component="select" className="form-control" name="user_city">
                    <option>
                      Selecione a cidade
                    </option>
                    {cities.map(city => (
                      <option key={city.id} className="c-user-profile__state-city-dropdown-item">
                        {city.name}
                      </option>
                    ))}
                  </Field>
                </FormGroup>
              </Col>
            </Row>
          </Col>
        </Row>
        <Row className="c-user-profile__button-section">
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
