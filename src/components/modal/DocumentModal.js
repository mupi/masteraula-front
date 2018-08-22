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
        <Col xs="12" sm="2" className="c-document-modal__header-logo">
          <Label for="upload-avatar" className="upload-avatar">
            <div className="thumbnail">
              <img src={document && document.logo ? document.logo : 'http://via.placeholder.com/100x100'} alt="logo-documento" />
            </div>
          </Label>
        </Col>
        <Col xs="12"  sm="10">
          <Label>
            {document && document.institution_name ? ( <span className="c-document-modal__header-label">Nome da instituição:{' '}<span  className="c-document-modal__header-label--info">{document.institution_name}</span></span>) : <span className="c-document-modal__header-label">Nome da instituição</span>}
          </Label>
          <br />
          <Label>
            {document && document.discipline_name ?  ( <span className="c-document-modal__header-label">Curso/Disciplina:{' '}<span  className="c-document-modal__header-label--info">{document.discipline_name}</span></span>) : <span className="c-document-modal__header-label">Curso/Disciplina</span>}
          </Label>
          <br />
          <Label>
            {document && document.professor_name ?  ( <span className="c-document-modal__header-label">Professor(a):{' '}<span  className="c-document-modal__header-label--info">{document.professor_name}</span></span>) : <span className="c-document-modal__header-label">Professor(a)</span>}
          </Label>
          <p className="c-document-modal__header-label">
                Mostrar os seguintes campos em branco:
          </p>
          {document && document.student_indicator ? <span className="c-document-modal__header-label--check"><i className="fa fa-check"></i> Nome Aluno </span> : ''}
          {document && document.class_indicator ? <span className="c-document-modal__header-label--check"><i className="fa fa-check"></i> Turma </span> : ''}
          {document && document.date_indicator ? <span className="c-document-modal__header-label--check"><i className="fa fa-check"></i> Data </span> : ''}
          {document && document.score_indicator ? <span className="c-document-modal__header-label--check"><i className="fa fa-check"></i> Nota </span> : ''}

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
