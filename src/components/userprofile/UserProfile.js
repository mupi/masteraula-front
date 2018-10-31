import React from 'react';
import {
  Button, Form, FormGroup, Input, Label, Container, Row, Col,
} from 'reactstrap';
import { Field } from 'redux-form';
import 'bootstrap/dist/css/bootstrap.css';
import userPhoto from 'assets/img/home/coruja-avatar.png';
import { userNameValidator } from 'helpers/validators';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

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

const renderSelectField = ({
  input, label, meta: { touched, error }, children, optionDefault,
}) => (
  <div>
    <div>
      <select {...input} className="form-control">
        <option value={optionDefault}>
          {label}
        </option>
        {children}
      </select>
      {touched && error && (
        <span className="error-message-text">
          {error}
        </span>
      )}
    </div>
  </div>
);

class UserProfile extends React.Component {
  componentDidMount() {
    const { getCitiesList, user } = this.props;
    if (user.city) {
      getCitiesList(user.city.uf, true);
    }
  }

  callGetCities = (e, newValue) => {
    const {
      getCitiesList,
    } = this.props;

    getCitiesList(newValue, false);
  }

  render() {
    const {
      handleSubmit, stateList, cityList,
    } = this.props;

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
                  <FontAwesomeIcon
                        className="btn__icon"
                        icon="image"
                  />
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
                      validate={userNameValidator}
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
                    <Field
                      name="userState"
                      type="text"
                      component={renderSelectField}
                      className="form-control"
                      onChange={this.callGetCities}
                      label="Selecione o estado"
                      optionDefault="NaN"
                    >
                      { stateList && stateList.map(state => (
                        <option className="c-user-profile__state-city-dropdown-item" key={state.uf} value={state.uf}>
                          {state.name}
                        </option>
                      )) }
                    </Field>
                  </FormGroup>

                </Col>
                <Col sm="8">
                  <FormGroup>
                    <Field
                      name="userCity"
                      type="text"
                      component={renderSelectField}
                      className="form-control"
                      label="Selecione a cidade"
                      optionDefault="0"
                    >
                      { cityList && cityList.map(city => (
                        <option className="c-user-profile__state-city-dropdown-item" key={city.id} value={city.id}>
                          {city.name}
                        </option>
                      )) }
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
        </Container>
      </Form>
    );
  }
}

export default UserProfile;
