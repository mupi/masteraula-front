import React from 'react';
import {
  Button, Row, Col, Alert,
} from 'reactstrap';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { setCurrentPageModal } from 'actions/onlineTestAction';

import CustomPaginationModal from 'components/pagination/CustomPaginationModal';
import OnlineTestCardList from 'components/onlineTest/OnlineTestCardList';


class SearchOnlineTestModal extends React.Component {
  componentDidMount() {
    const {
      listAllMyOnlineTestsModal,
    } = this.props;
    listAllMyOnlineTestsModal(1, 'date', 'desc');
  }

  componentDidUpdate(prevProps) {
    const {
      currentPageModal, listAllMyOnlineTestsModal,
    } = this.props;
    if (currentPageModal !== prevProps.currentPageModal) {
      listAllMyOnlineTestsModal(parseInt(currentPageModal, 10), 'date', 'desc');
    }
  }


  render() {
    const {
      onlineTestPage, isFetching, closeModal, titlePart,
      addSelectedOnlineTest, removeSelectedOnlineTest,
      selectedOnlineTestList, singleSelection = false,
      stations,
      stationIndex,
    } = this.props;

    return (
      <div className="modal-content modal__content modal-fixed__content">
        <div className="modal-header modal__header">
          <h5
            className="modal-title"
          >
            {`Adicionar prova online ${titlePart}`}
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
              <CustomPaginationModal {...this.props} {...onlineTestPage} itensPerPage={16} disabled={isFetching} />
            </Row>
            <Row>
              <Col sm="12" className="c-object-base__total-results">
                {'Provas online encontradas: '}
                {onlineTestPage ? onlineTestPage.count : 0}
              </Col>
              { !singleSelection && (
              <Col sm="12" className="c-object-base-modal__selected-number">
                {`Provas online associadas ${titlePart}:`}
                {' '}
                {selectedOnlineTestList.length}
              </Col>
              )
            }
            </Row>
            <div className="c-question-base__results modal-fixed__body-section-scroll search-document-modal__body-section-scroll">
              { isFetching ? (
                <Alert className="c-question-base__alert--warning" color="warning" fade={false}>
                   Carregando  ...
                </Alert>
              ) : (
                <OnlineTestCardList
                  addSelectedOnlineTest={addSelectedOnlineTest}
                  removeSelectedDocument={removeSelectedOnlineTest}
                  sm="4"
                  {...this.props}
                  onlineTests={onlineTestPage ? onlineTestPage.results : null}
                  selectedDocumentList={!singleSelection ? selectedOnlineTestList : [stations[stationIndex]]}
                  singleSelection={singleSelection}
                />
              )
            }
            </div>
            <Row className="pagination-questions modal-fixed__pagination-bottom" style={{ marginLeft: '80%' }}>
              <CustomPaginationModal
                {...this.props}
                {...onlineTestPage}
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

const mapStateToProps = state => ({
  isFetching: state.onlineTest.isFetching,
  onlineTestPage: state.onlineTest.onlineTestPageModal,
  currentPageModal: state.onlineTest.currentPageModal,
  selectedOnlineTestList: state.classPlan.selectedOnlineTestList,
  stations: state.classPlan.stations,
});

const mapDispatchToProps = dispatch => ({
  setCurrentPageModal: page => dispatch(setCurrentPageModal(page)),
});

SearchOnlineTestModal.propTypes = {
  closeModal: PropTypes.func,
};

SearchOnlineTestModal.defaultProps = {
  closeModal: f => f,
};

export default connect(mapStateToProps, mapDispatchToProps)(SearchOnlineTestModal);
