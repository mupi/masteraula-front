import React from 'react';
import {
  Button, Row, Col, Alert,
} from 'reactstrap';
import PropTypes from 'prop-types';

import CustomPaginationModal from 'components/pagination/CustomPaginationModal';
import DocumentCardList from 'components/document/DocumentCardList';


class SearchDocumentModal extends React.Component {
  componentDidMount() {
    const {
      listMyDocumentsModal,
    } = this.props;
    listMyDocumentsModal(1, 'date', 'desc');
  }

  componentDidUpdate(prevProps) {
    const {
      currentPageModal, listMyDocumentsModal,
    } = this.props;
    if (currentPageModal !== prevProps.currentPageModal) {
      listMyDocumentsModal(parseInt(currentPageModal, 10), 'date', 'desc');
    }
  }


  render() {
    const {
      documentPage, isFetching, closeModal, titlePart, setCurrentPageModal,
      addSelectedDocument, removeSelectedDocument,
      selectedDocumentList,
    } = this.props;

    return (
      <div className="modal-content modal__content modal-fixed__content">
        <div className="modal-header modal__header">
          <h5
            className="modal-title"
          >
            {`Adicionar prova e/o lista de exercícios ${titlePart}`}
          </h5>
          <button type="button" className="close" aria-label="Close" onClick={closeModal}>
            <span aria-hidden="true">
            &times;
            </span>
          </button>
        </div>
        <div className="modal-basic-operation__body modal-body modal-fixed__body">

          <div className="c-object-base modal-fixed__body-all">
            <Row className="pagination-questions modal-fixed__pagination-top" style={{ marginLeft: '80%' }}>
              <CustomPaginationModal {...this.props} {...documentPage} itensPerPage={16} disabled={isFetching} />
            </Row>
            <Row>
              <Col sm="12" className="c-object-base__total-results">
                {'Provas e/o listas de exercícios encontrados:'}
                {documentPage ? documentPage.count : 0}
              </Col>
              <Col sm="12" className="c-object-base-modal__selected-number">
                {`Provas e/o listas de exercícios associados ${titlePart}:`}
                {' '}
                {selectedDocumentList.length}
              </Col>
            </Row>
            <div className="c-question-base__results modal-fixed__body-section-scroll">
              { isFetching ? (
                <Alert className="c-question-base__alert--warning" color="warning" fade={false}>
                   Carregando  ...
                </Alert>
              ) : (
                <DocumentCardList
                  addSelectedDocument={addSelectedDocument}
                  removeSelectedDocument={removeSelectedDocument}
                  sm="4"
                  {...this.props}
                  documents={documentPage ? documentPage.results : null}
                  count={documentPage ? documentPage.count : 0}
                  selectedDocumentList={selectedDocumentList}
                  showSelectedDocuments
                />
              )
            }
            </div>
            <Row className="pagination-questions modal-fixed__pagination-bottom" style={{ marginLeft: '80%' }}>
              <CustomPaginationModal
                {...this.props}
                {...documentPage}
                itensPerPage={16}
                disabled={isFetching}
                setCurrentPageModal={setCurrentPageModal}
              />
            </Row>
          </div>


        </div>
        <div className="modal-footer modal__footer c-object-base-modal__footer modal-fixed__footer">
          <Button color="secondary" onClick={closeModal}>
            Fechar
          </Button>
        </div>
      </div>
    );
  }
}

SearchDocumentModal.propTypes = {
  closeModal: PropTypes.func,
  title: PropTypes.string,
  message: PropTypes.string,
};

SearchDocumentModal.defaultProps = {
  closeModal: f => f,
  title: '',
  message: '',
};

export default SearchDocumentModal;
