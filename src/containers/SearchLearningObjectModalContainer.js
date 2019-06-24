import { connect } from 'react-redux';
import SearchLearningObjectModal from 'components/modal/SearchLearningObjectModal';
import { listLearningObject } from 'actions/learningObjectAction';


const mapStateToProps = state => ({
  isFetching: state.learningObject.isFetching,
  objectPage: state.learningObject.objectPage,
  modal: state.document.modal,
  filterObject: state.filterObject,
  currentPage: state.learningObject.currentPage,
});

const mapDispatchToProps = dispatch => ({
  listObjects: (page, filterObject) => dispatch(listLearningObject(page, filterObject)),
});

const SearchLearningObjectModalContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(SearchLearningObjectModal);


export default SearchLearningObjectModalContainer;
