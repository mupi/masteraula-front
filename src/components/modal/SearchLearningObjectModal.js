import React from 'react';
import { Button, Row, Col, Alert } from 'reactstrap';
import PropTypes from 'prop-types';

import CustomPaginationModal from 'components/pagination/CustomPaginationModal';
import SimpleLObjectSearchFormContainer from 'containers/SimpleLObjectSearchFormContainer';
import SimpleLObjectCardList from 'components/learningObject/SimpleLObjectCardList';


class SearchLearningObjectModal extends React.Component {
  constructor(props) {
    super(props);
    this.handleCloseModal = this.handleCloseModal.bind(this);
  }

  componentDidMount() {
    const {
      filterObject, listObjects,
    } = this.props;
    listObjects(parseInt(1, 10), filterObject);
  }

  componentDidUpdate(prevProps) {
    const {
      currentPageModal, filterObject, listObjects,
    } = this.props;
    if (currentPageModal !== prevProps.currentPageModal || filterObject !== prevProps.filterObject) {
      listObjects(parseInt(currentPageModal, 10), filterObject);
    }
  }

  handleCloseModal(closeModal) {
    const { clearSearch } = this.props;
    clearSearch();
    closeModal();
  }


  render() {
    const {
      objectPage, isFetching, closeModal, title, addSelectedObjectToQuestion, selectedObjectList, setCurrentPageModal,
    } = this.props;
    return (
      <div className="modal-content modal__content modal-fixed__content">
        <div className="modal-header modal__header">
          <h5
            className="modal-title"
          >
            {title}
          </h5>
          <button type="button" className="close" aria-label="Close" onClick={() => this.handleCloseModal(closeModal)}>
            <span aria-hidden="true">
            &times;
            </span>
          </button>
        </div>
        <div className="modal-basic-operation__body modal-body modal-fixed__body">

          <div className="c-object-base modal-fixed__body-all">
            <SimpleLObjectSearchFormContainer />
            <Row className="pagination-questions modal-fixed__pagination-top" style={{ marginLeft: '80%' }}>
              <CustomPaginationModal {...this.props} {...objectPage} itensPerPage={16} disabled={isFetching} />
            </Row>
            <Row>
      <Col sm="12" className="c-object-base__total-results">
        {`Objetos de aprendizagem encontrados:`}
        {objectPage ? objectPage.count : 0}
      </Col>
        <Col sm="12" className="c-object-base-modal__selected-number">
          Objetos associados à questão:
          {' '}
          {selectedObjectList.length}
        </Col>
      </Row>
            <div className="c-question-base__results modal-fixed__body-section-scroll">
              { isFetching ? (
                <Alert className="c-question-base__alert--warning" color="warning" fade={false}>
                   Carregando  ...
                </Alert>
              ) : (
                <SimpleLObjectCardList
                  addSelectedObjectToQuestion={addSelectedObjectToQuestion}
                  sm="4"
                  {...this.props}
                  objects={objectPage ? objectPage.results : null}
                  count={objectPage ? objectPage.count : 0}
                  selectedObjectList={selectedObjectList}
                  showSelectedObjects
                />
              )
            }
            </div>
            <Row className="pagination-questions modal-fixed__pagination-bottom" style={{ marginLeft: '80%' }}>
              <CustomPaginationModal
                {...this.props}
                {...objectPage}
                itensPerPage={16}
                disabled={isFetching}
                setCurrentPageModal={setCurrentPageModal}
              />
            </Row>
          </div>


        </div>
        <div className="modal-footer modal__footer c-object-base-modal__footer modal-fixed__footer">
          <Button color="secondary" onClick={() => this.handleCloseModal(closeModal)}>
            Fechar
          </Button>
        </div>
      </div>
    );
  }
}

SearchLearningObjectModal.propTypes = {
  closeModal: PropTypes.func,
  title: PropTypes.string,
  message: PropTypes.string,
};

SearchLearningObjectModal.defaultProps = {
  closeModal: f => f,
  title: '',
  message: '',
};

export default SearchLearningObjectModal;
