import React from 'react';
import { connect } from 'react-redux';
import {
  Button, Form, FormGroup, Input, Label, UncontrolledAlert, Alert,
  Container, Row, Col,
} from 'reactstrap';
import { Field, reduxForm, formValueSelector } from 'redux-form';
import 'bootstrap/dist/css/bootstrap.css';
import userPhoto from 'assets/img/home/coruja-avatar.png';

const callGetCities = (e, getCitiesList, stateSelected, stateSelectedOwn ) => {
  e.preventDefault()
  console.log("Llamando a callGetCities");
  getCitiesList(stateSelected);
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
    handleSubmit, submitSucceeded, error, stateList, getCitiesList, cityList, stateSelected,
  } = props;

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

                  <Field component="select" className="form-control" name="userState" onBlur={(e, stateSelectedOwn) => callGetCities(e, getCitiesList, stateSelected, stateSelectedOwn )}>
                    <option>
                      Selecione o estado
                    </option>
                    {stateList && stateList.map(state => (
                      <option key={state.uf} value={state.uf} className="c-user-profile__state-city-dropdown-item">
                        {state.name}
                      </option>
                    ))}
                  </Field>
                </FormGroup>
              </Col>
              <Col sm="8">
                <FormGroup>
                  <Field component="select" className="form-control" name="userCity">
                    <option>
                      Selecione a cidade
                    </option>
                    {cityList && cityList.map(city => (
                      <option key={city.id} value={city.id} className="c-user-profile__state-city-dropdown-item">
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

const selector = formValueSelector('profile');// <-- same as form name

const mapStateToProps = (state) => {
  const { user } = state.session.session;
  const stateSelected = selector(state, 'userState');
  const citySelected = selector(state, 'userCity');
  const cityList = state.profileEdit.cityList;

  return ({
    initialValues: {
      name: user.name,
      about: user.about,
      userState: user.city,
      userCity: user.city,
    },
    citySelected,
    user,
    cityList,
    stateSelected,
  });
};

export default connect(
  mapStateToProps,
)(reduxForm({
  form: 'profile',
  validate,
})(UserProfile));
