import React, { Component } from 'react';
import {
  Row, Col, Label, Button, Input,
} from 'reactstrap';
import { connect } from 'react-redux';
import { Field, reduxForm, Form } from 'redux-form';
import documentLogo from 'assets/img/home/coruja-avatar.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const renderField = ({
  input,
  label,
  type,
  meta: { touched, error, warning },
}) => (
  <div>
    <Input
      {...input}
      placeholder={label}
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

class DocumentHeader extends Component {
  fileSelectedHandler= () => {
  }

  render() {
    const { handleSubmit } = this.props;

    return (
      <div className="c-document__header">
        <Form onSubmit={handleSubmit}>
          Nome:
          <Field
            component={renderField}
            type="text"
            name="name"
            id="name"
            label="Nome do cabeçalho"
          />
          <br />
          <Row>
            <Col md="2" xs="12" className="text-center c-document__logo">
              <Label for="upload-logo" className="upload-logo">
                <span className="hidden">
                  <FontAwesomeIcon
                    className="btn__icon"
                    icon="image"
                  />
                Enviar logo
                </span>
                <div className="thumbnail">
                  <img src={documentLogo} alt="logo-prova" />
                </div>
              </Label>
              <div className="small-text hidden">
                Tamanho máximo 1 MB. JPG, GIF ou PNG
              </div>
            </Col>
            <Col>
              <Field
                placeholder="Nome da instituição"
                id="schoolName"
                name="institution_name"
                className="form-control form-group"
                component="input"
              />
              <Field
                placeholder="Curso/Disciplina"
                id="course"
                className="form-control form-group"
                component="input"
                type="text"
                name="discipline_name"
              />
              <Field
                placeholder="Professor(a)"
                id="teacherName"
                name="professor_name"
                className="form-control"
                component="input"
                type="text"
              />
              <br />
                Mostrar os seguintes campos em branco:
              <br />
              <Row>
                <Col>
                  <Field addon="true" type="checkbox" id="studentName" name="student_indicator" component="input" />
                  {' '}
                  Aluno
                  <br />
                  <Field addon="true" type="checkbox" id="class" name="class_indicator" component="input" />
                  {' '}
                  Turma
                  <br />
                </Col>
                <Col>
                  <Field addon="true" type="checkbox" id="grade" name="score_indicator" component="input" />
                  {' '}
                  Nota da avaliação
                  <br />
                  <Field addon="true" type="checkbox" id="date" name="date_indicator" component="input" />
                  {' '}
                   Data
                </Col>
              </Row>
            </Col>
          </Row>
          <Row className="c-document__main-buttons text-center">
            <Col>
              <Button type="submit" title="Salvar cabeçalho" className="btn-secondary btn-margin-right">
                <FontAwesomeIcon
                  className="btn__icon"
                  icon="save"
                />
                <span>
                  Salvar
                </span>
              </Button>
            </Col>
          </Row>
        </Form>
      </div>
    );
  }
}

function mapStateToProps(state, ownProps) {
  return {
    initialValues: ownProps.data,
  };
}

export default connect(mapStateToProps)(reduxForm({
  form: 'header_form',
  enableReinitialize: true,
})(DocumentHeader));
