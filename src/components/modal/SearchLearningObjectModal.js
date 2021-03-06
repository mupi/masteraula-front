import React from 'react';
import {
  Button, Row, Col, Alert,
} from 'reactstrap';
import PropTypes from 'prop-types';

import CustomPaginationModal from 'components/pagination/CustomPaginationModal';
import LearningObjectSearchFormModalContainer from 'containers/LearningObjectSearchFormModalContainer';
import SimpleLObjectCardList from 'components/learningObject/SimpleLObjectCardList';


class SearchLearningObjectModal extends React.Component {
  componentDidMount() {
    const {
      listObjects, clearSearch,
    } = this.props;
    listObjects(parseInt(1, 10), null);
    clearSearch();
  }

  componentDidUpdate(prevProps) {
    const {
      currentPageModal, filterObject, listObjects,
    } = this.props;
    if (currentPageModal !== prevProps.currentPageModal || filterObject !== prevProps.filterObject) {
      listObjects(parseInt(currentPageModal, 10), filterObject);
    }
  }

  render() {
    const {
      objectPage, isFetching, closeModal, titlePart, setCurrentPageModal,
      addSelectedObject, removeSelectedObject, callFrom,
      selectedObjectListQuestion,
      selectedObjectListClassPlan,
      selectedObjectListActivity,
      singleSelection = false,
      stations,
      stationIndex,
      searchText,
    } = this.props;

    let selectedObjectList = [];
    switch (callFrom) {
      case 'Q': selectedObjectList = selectedObjectListQuestion; break;
      case 'C': selectedObjectList = selectedObjectListClassPlan; break;
      case 'A': selectedObjectList = selectedObjectListActivity; break;
      default: selectedObjectList = [];
    }

    return (
      <div className="modal-content modal__content modal-fixed__content">
        <div className="modal-header modal__header">
          <h5
            className="modal-title"
          >
            {`Adicionar objeto ${titlePart}`}
          </h5>
          <button type="button" className="close" aria-label="Close" onClick={closeModal}>
            <span aria-hidden="true">
            &times;
            </span>
          </button>
        </div>
        <div className="modal-basic-operation__body modal-body modal-fixed__body">

          <div className="c-object-base modal-fixed__body-all">
            <LearningObjectSearchFormModalContainer />
            <Row className="pagination-questions modal-fixed__pagination-top" style={{ marginLeft: '80%' }}>
              <CustomPaginationModal {...this.props} {...objectPage} itensPerPage={16} disabled={isFetching} />
            </Row>
            <Row>
              <Col sm="12" className="c-object-base__total-results">
                {'Objetos de aprendizagem encontrados: '}
                {objectPage ? objectPage.count : 0}
                {searchText
                  ? (
                    <>
                      {' para '}
                      <span className="c-question-base__search-term">
                        {searchText}
                      </span>
                    </>
                  ) : ''
                }
              </Col>
              { !singleSelection && (
              <Col sm="12" className="c-object-base-modal__selected-number">
                {`Objetos associados ${titlePart}`}
                {' '}
                {selectedObjectList.length}
              </Col>
              )
            }
            </Row>
            <div className="c-object-base__results modal-fixed__body-section-scroll mt-3">
              { isFetching ? (
                <Alert className="c-question-base__alert--warning" color="warning" fade={false}>
                   Carregando  ...
                </Alert>
              ) : (
                <SimpleLObjectCardList
                  addSelectedObject={addSelectedObject}
                  removeSelectedObject={removeSelectedObject}
                  sm="4"
                  {...this.props}
                  objects={objectPage ? objectPage.results : null}
                  count={objectPage ? objectPage.count : 0}
                  selectedObjectList={!singleSelection ? selectedObjectList : [stations[stationIndex]]}
                  singleSelection={singleSelection}
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
          <Button color="secondary" onClick={closeModal}>
            Salvar
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
