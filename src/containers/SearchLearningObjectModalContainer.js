import { connect } from 'react-redux';
import SearchLearningObjectModal from 'components/modal/SearchLearningObjectModal';
import { listLearningObjectModal, setCurrentPageModal } from 'actions/learningObjectAction';
import { setSearchTextObjectModal } from 'actions/filterObjectAction';

const mapStateToProps = state => ({
  isFetching: state.learningObject.isFetching,
  objectPage: state.learningObject.objectPageModal,
  modal: state.document.modal,
  filterObject: state.filterObject,
  currentPageModal: state.learningObject.currentPageModal,
  selectedObjectListQuestion: state.question.selectedObjectList,
  selectedObjectListClassPlan: state.classPlan.selectedObjectList,
});

const setDispatchSearchText = searchText => setSearchTextObjectModal(searchText);
const mapDispatchToProps = dispatch => ({

  listObjects: (page, filterObject) => dispatch(listLearningObjectModal(page, filterObject)),
  clearSearch: () => {
    dispatch({
      type: '@@redux-form/CHANGE',
      payload: null,
      meta: { form: 'learningObjectSearchModal', field: 'searchTextObject' },
    });
    dispatch(setDispatchSearchText());
  },
  setCurrentPageModal: page => dispatch(setCurrentPageModal(page)),
});

const SearchLearningObjectModalContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(SearchLearningObjectModal);

export default SearchLearningObjectModalContainer;
