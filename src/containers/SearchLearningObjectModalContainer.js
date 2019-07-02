import { connect } from 'react-redux';
import SearchLearningObjectModal from 'components/modal/SearchLearningObjectModal';
import { listLearningObjectModal, setCurrentPageModal } from 'actions/learningObjectAction';
import { setSearchTextObjectModal } from 'actions/filterObjectAction';
import { addSelectedObjectToQuestion, removeSelectedObjectToQuestion } from 'actions/questionAction';

const mapStateToProps = state => ({
  isFetching: state.learningObject.isFetching,
  objectPage: state.learningObject.objectPageModal,
  modal: state.document.modal,
  filterObject: state.filterObject,
  currentPageModal: state.learningObject.currentPageModal,
  selectedObjectList: state.question.selectedObjectList,
});

// history.replace('/object-base/1');
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
  addSelectedObjectToQuestion: object => dispatch(addSelectedObjectToQuestion(object)),
  removeSelectedObjectToQuestion: idObject => dispatch(removeSelectedObjectToQuestion(idObject)),
  setCurrentPageModal: page => dispatch(setCurrentPageModal(page)),
});

const SearchLearningObjectModalContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(SearchLearningObjectModal);

export default SearchLearningObjectModalContainer;
