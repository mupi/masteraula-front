import { connect } from 'react-redux';
import SearchLearningObjectModal from 'components/modal/SearchLearningObjectModal';
import { listLearningObjectModal } from 'actions/learningObjectAction';
import { setSearchTextObjectModal } from 'actions/filterObjectAction';

const mapStateToProps = state => ({
  isFetching: state.learningObject.isFetching,
  objectPage: state.learningObject.objectPageModal,
  modal: state.document.modal,
  filterObject: state.filterObject,
  currentPage: state.learningObject.currentPageModal, 
});

const setDispatchSearchText = (searchText) => {
  // history.replace('/object-base/1');
  return setSearchTextObjectModal(searchText);
};


const mapDispatchToProps = dispatch => ({
  listObjects: (page, filterObject) => dispatch(listLearningObjectModal(page, filterObject)),
  clearSearch: () => {
    dispatch({
      type: '@@redux-form/CHANGE',
      payload: null,
      meta: { form: 'learningObjectSearchModal', field: 'searchTextObject' },
    });
    dispatch(setDispatchSearchText());
  }
});

const SearchLearningObjectModalContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(SearchLearningObjectModal);

export default SearchLearningObjectModalContainer;
