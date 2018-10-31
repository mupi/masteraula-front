import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import DocumentQuestionItem from 'components/document/DocumentQuestionItem';
import ExportDocumentButtonContainer from 'containers/ExportDocumentButtonContainer';
import documentLogo from 'assets/img/home/coruja-avatar.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import {
  Row, Col, Button, Label, Alert,
}
  from 'reactstrap';

const DocumentModal = ({
  document, closeModal, editDocument, isFetchingPreviewDocument,
}) => {
  if (isFetchingPreviewDocument) {
    return (
      <div className="modal__content modal-content">
        <Alert className="alert--warning" color="warning">
              Carregando ...
        </Alert>
      </div>
    );
  }

  return (
    <div className="modal__content modal-content">
      <div className="modal__header modal-header">
        <h5
          className="modal-title"
        >
          {document && document.name}
        </h5>
        <button type="button" className="close" aria-label="Close" onClick={closeModal}>
          <span aria-hidden="true">
            &times;
          </span>
        </button>
      </div>
      <div className="c-document-modal__body modal-body">
        <Row>
          <div className="auto-margin-left-element btn-margin-right">
            <ExportDocumentButtonContainer
              color="success"
              text="Exportar"
              documentId={document.id}
              documentName={document.name}
              documentTotalQuestions={document.questions.length}
            />
          </div>
          <div>
            <Button title="Editar prova" className="btn-success" onClick={() => editDocument(document)}>
              <FontAwesomeIcon  icon="pencil-alt" className="btn__icon"/>
              <span className="button-text">
                Editar
              </span>
            </Button>
          </div>
        </Row>
        <Row className="c-document-modal__header-info">
          <Col xs="12" sm="2" className="c-document-modal__header-logo">
            <Label for="upload-avatar" className="upload-avatar">
              <div className="thumbnail">
                <img src={documentLogo} alt="logo-prova" />
              </div>
            </Label>
          </Col>
          <Col xs="12" sm="10">
            <Label>
              {document && document.institution_name ? (
                <span className="c-document-modal__header-label">
                  Nome da instituição:
                  {' '}
                  <span className="c-document-modal__header-label--info">
                    {document.institution_name}
                  </span>
                </span>) : (
                  <span className="c-document-modal__header-label">
                      Nome da instituição
                  </span>)
              }
            </Label>
            <br />
            <Label>
              {document && document.discipline_name ? (
                <span className="c-document-modal__header-label">
                  Curso/Disciplina:
                  {' '}
                  <span className="c-document-modal__header-label--info">
                    {document.discipline_name}
                  </span>
                </span>) : (
                  <span className="c-document-modal__header-label">
                  Curso/Disciplina
                  </span>)
              }
            </Label>
            <br />
            <Label>
              {document && document.professor_name ? (
                <span className="c-document-modal__header-label">
                  Professor(a):
                  {' '}
                  <span className="c-document-modal__header-label--info">
                    {document.professor_name}
                  </span>
                </span>) : (
                  <span className="c-document-modal__header-label">
                  Professor(a)
                  </span>)
                }
            </Label>
            <p className="c-document-modal__header-label">
                  Mostrar os seguintes campos em branco:
            </p>
            {document && document.student_indicator
              ? (
                <span className="c-document-modal__header-label--check btn__icon">
                  <FontAwesomeIcon  icon="check"/>
                  Nome Aluno
                  {' '}
                </span>) : ''}
            {document && document.class_indicator
              ? (
                <span className="c-document-modal__header-label--check btn__icon">
                  <FontAwesomeIcon  icon="check"/>
                  Turma
                  {' '}
                </span>) : ''}
            {document && document.date_indicator
              ? (
                <span className="c-document-modal__header-label--check btn__icon">
                  <FontAwesomeIcon  icon="check"/>
                  Data
                  {' '}
                </span>) : ''}
            {document && document.score_indicator
              ? (
                <span className="c-document-modal__header-label--check btn__icon">
                  <FontAwesomeIcon  icon="check"/>
                  Nota
                  {' '}
                </span>) : ''}
          </Col>
        </Row>
        {document && document.questions.map(questionOrder => (
          <DocumentQuestionItem key={questionOrder.question.id} question={questionOrder.question} readOnly />
        ))}
        <div className="modal__footer modal-footer">
          <button type="button" className="btn btn-secondary" onClick={closeModal}>
            <FontAwesomeIcon icon="sign-out-alt" className="btn__icon" />
            Fechar
          </button>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = state => ({
  document: state.document.previewDocument,
  isFetchingPreviewDocument: state.document.isFetchingPreviewDocument,
});

DocumentModal.propTypes = {
  closeModal: PropTypes.func,
};

DocumentModal.defaultProps = {
  closeModal: f => f,
};

export default connect(mapStateToProps, null)(DocumentModal);
