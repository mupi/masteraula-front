import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import DocumentQuestionItem from 'components/document/DocumentQuestionItem';
import ExportDocumentButtonContainer from 'containers/ExportDocumentButtonContainer';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import {
  Row, Button, Alert,
}
  from 'reactstrap';


// Document's item options available for Public Document
const options = {
  showViewButton: false,
  removeOption: false,
  showTags: false,
};

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
        <h6
          className="modal-title"
        >
          {document && document.name}
        </h6>
        <button type="button" className="close" aria-label="Close" onClick={closeModal}>
          <span aria-hidden="true">
            &times;
          </span>
        </button>
      </div>
      <div className="c-document-modal__body modal-body">
        { document && document.questions.length > 0 ? (
          <div>
            <Row className="c-document-modal__main-options">
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
                  <FontAwesomeIcon icon="pencil-alt" className="btn__icon" />
                  <span className="button-text">
                    Editar
                  </span>
                </Button>
              </div>
            </Row>
          </div>
        )
          : (
            <div>
              <Row className="c-document-modal__main-options">
                <div className="auto-margin-left-element">
                  <Button title="Editar prova" className="btn-success" onClick={() => editDocument(document)}>
                    <FontAwesomeIcon icon="pencil-alt" className="btn__icon" />
                    <span className="button-text">
                      Editar
                    </span>
                  </Button>
                </div>
              </Row>
              <p className="text-center">
                A prova não tem questões. Para adicionar questões, entre na opção
                <strong> Editar</strong>
              </p>
            </div>
          )
        }
        {document && document.questions.map(questionOrder => (
          <DocumentQuestionItem key={questionOrder.question.id} question={questionOrder.question} options={options} />
        ))}
        <div className="modal__footer modal-footer">
          <button type="button" className="btn btn-secondary" onClick={closeModal}>
            Cancelar
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
