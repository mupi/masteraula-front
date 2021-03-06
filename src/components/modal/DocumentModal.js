import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import DocumentQuestionItem from 'components/document/DocumentQuestionItem';
import ExportDocumentButtonContainer from 'containers/ExportDocumentButtonContainer';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { hideModal } from 'actions/modalAction';
import {
  switchActiveDocument,
} from 'actions/documentAction';

import {
  Row, Button, Alert, Col,
}
  from 'reactstrap';


// Document's item options available for Public Document
const options = {
  showViewButton: false,
  removeOption: false,
  showTags: false,
  showLoginModal: false,
};

const AlertDocumentNotAvailable = ({ document }) => (
  document.disabled ? (
    <Row>
      <Col className="c-question__col-full-section-details">
        <Alert color="danger" className="c-question-edit__warning-message">
          A prova
          {' '}
          N°
          <strong>{document.id}</strong>
          {' '}
          foi removida pelo autor(a) e não está mais disponível
        </Alert>
      </Col>
    </Row>
  ) : ''
);

const DocumentModalOptions = ({ document, editDocument, user }) => (
  <>
    <Row className="c-document-modal__main-options">
      { document.owner === user && (
        <div className="auto-margin-left-element">
          <ExportDocumentButtonContainer
            color="success"
            text="Exportar"
            documentId={document.id}
            documentName={document.name}
            documentTotalQuestions={document && document.questions ? document.questions.length : 0}
          />
        </div>
      )}
      { document && !document.disabled && document.owner === user && (
        <div className="ml-1">
          <Button title="Editar prova" className="btn-success" onClick={() => editDocument(document)}>
            <FontAwesomeIcon icon="pencil-alt" className="btn__icon" />
            <span className="button-text">
            Editar
            </span>
          </Button>
        </div>
      )
    }
    </Row>
    <AlertDocumentNotAvailable document={document} />
  </>
);

const DocumentModal = ({
  document, closeModal, editDocument, isFetchingPreviewDocument, user,
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
        { document && document.questions && document.questions.length > 0 ? (
          <div>
            <DocumentModalOptions document={document} editDocument={editDocument} user={user} />
          </div>
        )
          : (
            <div>
              <Row className="c-document-modal__main-options">
                { !document.disabled && document.owner === user && (
                <div className="auto-margin-left-element">
                  <Button title="Editar prova" className="btn-success" onClick={() => editDocument(document)}>
                    <FontAwesomeIcon icon="pencil-alt" className="btn__icon" />
                    <span className="button-text">
                      Editar
                    </span>
                  </Button>
                </div>
                )}
              </Row>
              <AlertDocumentNotAvailable document={document} />
              <p className="text-center">
                A prova não tem questões.
                { !document.disabled && (
                <span>
                  Para adicionar questões, entre na opção
                  {' '}
                  <strong> Editar</strong>
                </span>
                )}
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
  user: state.session.session.user.id,
});

const mapDispatchToProps = dispatch => ({
  editDocument: () => dispatch((_dispatch, getState) => {
    _dispatch(switchActiveDocument(getState().document.previewDocument, true));
    _dispatch(hideModal());
  }),
  closeModal: () => dispatch(hideModal()),
});

DocumentModal.propTypes = {
  closeModal: PropTypes.func,
};

DocumentModal.defaultProps = {
  closeModal: f => f,
};

export default connect(mapStateToProps, mapDispatchToProps)(DocumentModal);
