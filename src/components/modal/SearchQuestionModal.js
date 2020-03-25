import React from 'react';
import {
  Button, Row, Col, Alert,
} from 'reactstrap';
import PropTypes from 'prop-types';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import CustomPaginationModal from 'components/pagination/CustomPaginationModal';
// import QuestionCardSimple from 'components/question/QuestionCardSimple';
// import RemoveButton from '../buttons/RemoveButton';


/* const QuestionCardSimpleList = (props) => {
  const {
    documents, sm, selectedDocumentList,
    addSelectedDocument, removeSelectedDocument,
  } = props;
  const isDocumentAdded = (id) => {
    if (selectedDocumentList) {
      const documentAdded = selectedDocumentList.filter(item => (item.id === id || item.document_ids === id));
      return (documentAdded.length > 0);
    }
    return false;
  };

  const CardButton = document => (
    !isDocumentAdded(document.id) ? (
      <Button className="object-card__btn" onClick={() => addSelectedDocument(document)}>
        <FontAwesomeIcon icon="plus" className="btn__icon" />
        {' '}
        Adicionar
        {' '}
      </Button>
    ) : (
      <RemoveButton id={document.id} removeSelectedDocument={removeSelectedDocument} />
    )
  );
  return (
    <Row>
      {documents && documents.map(document => (
        <Col sm={sm} lg="3" xs="12" key={document.id} className="object-card">
          <QuestionCardSimple
            document={document}
            button={CardButton(document)}
            {...props}
          />
        </Col>
      ))}
    </Row>
  );
};

*/
class SearchQuestionModal extends React.Component {
  componentDidMount() {
    /* const {
      listObjects, clearSearch,
    } = this.props;
    listObjects(parseInt(1, 10), null);
    clearSearch(); */
  }

  /* componentDidUpdate(prevProps) {
    const {
      currentPageModal, filterObject, listObjects,
    } = this.props;
    if (currentPageModal !== prevProps.currentPageModal || filterObject !== prevProps.filterObject) {
      listObjects(parseInt(currentPageModal, 10), filterObject);
    }
  }
*/
  render() {
    const {
      questionPage, isFetching, closeModal, titlePart, setCurrentPageModal,
      /* addSelectedQuestion, removeSelectedQuestion,
      selectedQuestionList, */
      singleSelection = false,
      /* stations,
      stationIndex, */
    } = this.props;

    return (
      <div className="modal-content modal__content modal-fixed__content">
        <div className="modal-header modal__header">
          <h5
            className="modal-title"
          >
            {`Adicionar questão ${titlePart}`}
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
              <CustomPaginationModal {...this.props} {...questionPage} itensPerPage={16} disabled={isFetching} />
            </Row>
            <Row>
              <Col sm="12" className="c-object-base__total-results">
                {'Questões encontradas:'}
                {questionPage ? questionPage.count : 0}
              </Col>
              { !singleSelection && (
              <Col sm="12" className="c-object-base-modal__selected-number">
                {`Questões associadas ${titlePart}`}
                {' '}
              </Col>
              )
            }
            </Row>
            <div className="c-question-base__results modal-fixed__body-section-scroll">
              { isFetching ? (
                <Alert className="c-question-base__alert--warning" color="warning" fade={false}>
                   Carregando  ...
                </Alert>
              ) : (
                /* <QuestionCardSimpleList
                  addSelectedQuestion={addSelectedQuestion}
                  removeSelectedQuestion={removeSelectedQuestion}
                  sm="4"
                  {...this.props}
                  questions={questionPage ? questionPage.results : null}
                  selectedQuestionList={!singleSelection ? selectedQuestionList : [stations[stationIndex]]}
                  showSelectedDocuments
                  singleSelection={singleSelection}
                /> */
                <Alert className="c-question-base__alert--warning" color="warning" fade={false}>
                   Em desenvolvimento
                </Alert>
              )
            }
            </div>
            <Row className="pagination-questions modal-fixed__pagination-bottom" style={{ marginLeft: '80%' }}>
              <CustomPaginationModal
                {...this.props}
                {...questionPage}
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

SearchQuestionModal.propTypes = {
  closeModal: PropTypes.func,
  title: PropTypes.string,
  message: PropTypes.string,
};

SearchQuestionModal.defaultProps = {
  closeModal: f => f,
  title: '',
  message: '',
};

export default SearchQuestionModal;
