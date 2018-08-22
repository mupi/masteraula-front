import React from 'react';
import { connect } from 'react-redux'
import PropTypes from 'prop-types';
import DocumentQuestionItem from 'components/document/DocumentQuestionItem';
import ExportDocumentButton from 'components/buttons/ExportDocumentButton';

import {
  Row, Col, Button, Label, Alert
}
  from 'reactstrap';

const DocumentModal = ({
  document, closeModal, editDocument, isFetchingPreviewDocument
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
        <span aria-hidden="true">&times;</span>
      </button>
    </div>
    <div className="c-document-modal__body modal-body">
      <Row>
        <div className="auto-margin-left-element btn-margin-right">
          <ExportDocumentButton color="success" />
        </div>
        <div>
          <Button title="Editar documento" className="btn-success" onClick={()=>editDocument(document)}>
            <i className="fa fa-pencil btn__icon" />
            <span className="button-text">
              Editar
            </span>
          </Button>
        </div>
      </Row>
      <Row className="c-document-modal__header-info">
        <Col xs="2">
          <Label for="upload-avatar" className="upload-avatar">
            <div className="thumbnail">
              <img src={document && document.logo ? document.logo : 'http://via.placeholder.com/100x100'} alt="logo-documento" />
            </div>
          </Label>
        </Col>
        <Col>
          <Label>
            {document && document.institution_name ? document.institution_name : 'Nome da instituição'}
          </Label>
          <br />
          <Label>
            {document && document.discipline_name ? document.discipline_name : 'Curso/Disciplina'}
          </Label>
          {' | '}
          <Label>
            {document && document.professor_name
              ? document.professor_name : 'Professor(a)'}
          </Label>
          <br />
          {document && document.student_indicator ? (
            <p>
              Nome:
            </p>
          ) : ''}
          {document && document.class_indicator ? 'Turma: _________  ' : ''}
          {document && document.date_indicator ? 'Data: ___/___/___  ' : ''}
          {document && document.score_indicator ? 'Nota: _______  ' : ''}
        </Col>
      </Row>
      {document && document.questions.map((questionOrder, i) => (
        <DocumentQuestionItem key={i} question={questionOrder.question} readOnly={true} />
      ))}
      <div className="modal__footer modal-footer">
        <button type="button" className="btn btn-secondary" onClick={closeModal}><i className="fa fa-sign-out btn__icon" />
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
