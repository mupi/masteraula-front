import React from 'react';
import {
  Button, Form, FormGroup, Input, Label, Container, Row, Col,
} from 'reactstrap';
import { Field } from 'redux-form';
import Multiselect from 'react-widgets/lib/Multiselect';
import 'bootstrap/dist/css/bootstrap.css';

import { userNameValidator } from 'helpers/validators';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import userPhoto from 'assets/img/home/avataruser3.png';

const messages = {
  emptyList: 'Não existem resultados',
  emptyFilter: 'Não existem resultados que coincidam',
};

const renderMultiselect = ({
  input, data, placeholder, valueField, textField,
}) => (
  <Multiselect
    {...input}
    onBlur={() => input.onBlur()}
    value={input.value || []}
    data={data}
    valueField={valueField}
    textField={textField}
    placeholder={placeholder}
    messages={messages}
  />
);

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

export const fieldFile = ({ input, type }) => {
  const newInput = input;
  delete newInput.value;

  return (
    <div>
      <label htmlFor={input.name}>
        <input {...newInput} type={type} placeholder="Carregar imagem" />
      </label>
    </div>
  );
};

class UserProfile extends React.Component {
  componentDidMount() {
    const { getCitiesList, user, listDisciplineFilters } = this.props;
    listDisciplineFilters();
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
      handleSubmit, stateList, cityList, user, disciplineFilters,
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
                <div className="thumbnail">
                  { user.profile_pic
                    ? <img src={user.profile_pic} alt="foto-usuario" id="profile_pic" />
                    : <img src={userPhoto} alt="foto-usuario" />
                  }
                </div>
                <FontAwesomeIcon
                  className="btn__icon"
                  icon="image"
                />
                  Enviar foto
              </Label>
              <div className="small-text ">
                Tamanho máximo 1 MB. (JPG, GIF ou PNG)
              </div>
              <Field
                component={fieldFile}
                type="file"
                name="profile_pic"
                id="profile_pic"
                className="form-control"
              />
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
              <Row>
                <Col>
                  <FormGroup>
                    <Label>
                      Informações sobre sua atuação como Professor(a)
                    </Label>
                    <Field
                      name="disciplines"
                      className="form-control"
                      component={renderMultiselect}
                      placeholder="Insira as disciplinas que você leciona"
                      data={disciplineFilters}
                      valueField="id"
                      textField="name"
                    />
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
