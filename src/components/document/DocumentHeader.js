import React, { Component } from 'react';
import {
  Row, Container, Col, Label, Button
} from 'reactstrap';
import { connect } from 'react-redux';
import { Field, reduxForm, Form } from 'redux-form';
import GoToQuestionBaseButton from 'components/buttons/GoToQuestionBaseButton';
import documentLogo from 'assets/img/home/coruja-avatar.png';

class DocumentHeader extends Component {
  fileSelectedHandler= () => {
  }

  render() {
    const { handleSubmit } = this.props;

    return (
      <Container>
        <Row className="c-document__main-buttons">
          <div className="auto-margin-left-element">
            <GoToQuestionBaseButton
              customClass="btn-success"
              nameButton="Adicionar questões"
            />
          </div>
        </Row>
        <Container className="c-document__header">
          Nome:
          <Form onSubmit={handleSubmit}>
            <Field placeholder="Nome da prova" className="form-control" name="name" component="input" type="text" />
            <br />
            Cabeçalho:
            <Row>
              <Col md="2" xs="12" className="text-center c-document__logo">
                <Label for="upload-logo" className="upload-logo">
                  <span className="hidden">
                    <i className="fa fa-picture-o" />
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
                  <i className="fa fa-save btn__icon" />
                  <span>
                    Salvar
                  </span>
                </Button>
              </Col>
            </Row>
          </Form>
        </Container>
      </Container>
    );
  }
}

function mapStateToProps(state, ownProps) {
  return {
    initialValues: ownProps.data,
  };
}

export default connect(mapStateToProps)(reduxForm({
  form: 'update_document',
  enableReinitialize: true, 
})(DocumentHeader));
