import React from 'react';
import {
  Button, Row, Col, Alert,
} from 'reactstrap';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import CustomPaginationModal from 'components/pagination/CustomPaginationModal';
import { listActivitiesModal, setCurrentPageModal } from 'actions/activityAction';
import ActivityList from 'components/activity/ActivityList';
import { listTopicSuggestions } from 'actions/suggestionAction';
import {
  reduxForm, change,
} from 'redux-form';

import {
  setSearchTextActivityModal, addMyActivitiesFilterModal,
} from 'actions/filterActivityAction';
import ActivitySearchByFilters from 'components/activity/ActivitySearchByFilters';

export const BUTTON_TYPE = {
  ACTIVITYCARD_BASE: 1,
  ACTIVITYCARD_MODAL_VIEW: 2,
  ACTIVITYCARD_MODAL_SELECT: 3,
};

class SearchActivityModal extends React.Component {
  componentDidMount() {
    const {
      listActivities, clearSearch,
    } = this.props;
    listActivities(parseInt(1, 10), null);
    clearSearch();
  }

  componentDidUpdate(prevProps) {
    const {
      currentPageModal, listActivities, filter,
    } = this.props;
    if (currentPageModal !== prevProps.currentPageModal
      || (filter && filter.searchTextModal !== prevProps.filter.searchTextModal)
      || (filter.onlyMyActivitiesModal !== prevProps.filter.onlyMyActivitiesModal)) {
      listActivities(parseInt(currentPageModal, 10), filter);
    }
  }

  render() {
    const {
      activityPage, isFetching, closeModal, titlePart, setCurrentPageModalProp,
      addSelectedActivity, removeSelectedActivity,
      selectedActivityList,
      singleSelection = false,
      stations,
      stationIndex,
      searchText,
    } = this.props;

    return (
      <div className="modal-content modal__content modal-fixed__content">
        <div className="modal-header modal__header">
          <h5
            className="modal-title"
          >
            {`Adicionar atividade ${titlePart}`}
          </h5>
          <button type="button" className="close" aria-label="Close" onClick={closeModal}>
            <span aria-hidden="true">
            &times;
            </span>
          </button>
        </div>
        <div className="modal-basic-operation__body modal-body modal-fixed__body">
          <ActivitySearchByFilters {...this.props} onlyTerms />

          <div className="c-object-base modal-fixed__body-all">
            <Row className="pagination-questions modal-fixed__pagination-top" style={{ marginLeft: '80%' }}>
              <CustomPaginationModal
                {...this.props}
                {...activityPage}
                setCurrentPageModal={setCurrentPageModalProp}
                itensPerPage={16}
                disabled={isFetching}
              />
            </Row>
            <Row>
              <Col sm="12" className="c-object-base__total-results">
                {'Atividades encontradas: '}
                {activityPage ? activityPage.count : 0}
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
                {`Atividades associadas ${titlePart}`}
                {' '}
                {selectedActivityList.length}
                {' '}
              </Col>
              )
            }
            </Row>
            <div className="c-question-base__results modal-fixed__body-section-questions-scroll">
              { isFetching ? (
                <Alert className="c-question-base__alert--warning" color="warning" fade={false}>
                   Carregando  ...
                </Alert>
              ) : (
                <ActivityList
                  addSelectedActivity={addSelectedActivity}
                  removeSelectedDocument={removeSelectedActivity}
                  sm="4"
                  {...this.props}
                  activities={activityPage ? activityPage.results : null}
                  selectedActivityList={!singleSelection ? selectedActivityList : [stations[stationIndex]]}
                  singleSelection={singleSelection}
                  withFilters={false}
                  buttonType={BUTTON_TYPE.ACTIVITYCARD_MODAL_SELECT}
                  showQuantity={false}
                />
              )
            }
            </div>
            <Row className="pagination-questions modal-fixed__pagination-bottom" style={{ marginLeft: '80%' }}>
              <CustomPaginationModal
                {...this.props}
                {...activityPage}
                itensPerPage={16}
                disabled={isFetching}
                setCurrentPageModal={setCurrentPageModalProp}
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

SearchActivityModal.propTypes = {
  closeModal: PropTypes.func,
  title: PropTypes.string,
  message: PropTypes.string,
};

SearchActivityModal.defaultProps = {
  closeModal: f => f,
  title: '',
  message: '',
};

const mapStateToProps = state => ({
  stations: state.classPlan.stations,
  activityPage: state.activity.activityPageModal,
  isFetching: state.activity.isFetching,
  currentPageModal: state.activity.currentPageModal,
  filter: state.filterActivity,
  searchText: state.filterActivity.searchTextModal,
  selectedActivityList: state.classPlan.selectedActivityList,
  topicsList: state.topic.topics,
  topicSuggestions: state.suggestion.topicSuggestions,

  author: state.session.session.user.id,
  user: state.session.session.user,
  onlyMyActivities: state.filterActivity.onlyMyActivitiesModal,
});

const setDispatchSearchText = searchText => setSearchTextActivityModal(searchText);

const mapDispatchToProps = dispatch => ({
  listActivities: (page, filter) => dispatch(listActivitiesModal(page, filter)),
  listTopicSuggestions: param => dispatch(listTopicSuggestions(param)),
  setCurrentPageModalProp: page => dispatch(setCurrentPageModal(page)),
  search: (searchText) => {
    dispatch(setDispatchSearchText(searchText));
  },
  clearSearch: () => {
    dispatch({
      type: '@@redux-form/CHANGE',
      payload: null,
      meta: { form: 'activitySearchModal', field: 'searchText' },
    });
    dispatch(setDispatchSearchText(''));
  },
  clearSearchText: () => {
    dispatch(change('activitySearchModal', 'searchText', ''));
    dispatch((_dispatch, getState) => {
      const { searchTextModal } = getState().filterActivity;
      if (searchTextModal) {
        dispatch(setDispatchSearchText());
      }
    });
  },
  /* filters */
  onSubmit: (values) => {
    dispatch(setCurrentPageModal(1));
    dispatch(setDispatchSearchText(values.searchText));
  },
  addMyMaterialFilter: (author, value) => {
    dispatch(addMyActivitiesFilterModal(author, value));
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(reduxForm({
  form: 'activitySearchModal',
})(SearchActivityModal));
