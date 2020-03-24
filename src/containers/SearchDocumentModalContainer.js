import { connect } from 'react-redux';
import SearchDocumentModal from 'components/modal/SearchDocumentModal';
import { listLearningObjectModal, setCurrentPageModal } from 'actions/learningObjectAction';

const mapStateToProps = state => ({
  isFetching: state.document.isFetching,
  documentPage: state.document.documentPageModal,
  modal: state.document.modal,
  currentPageModal: state.document.currentPageModal,
  selectedDocumentList: state.classPlan.selectedDocumentList,
  stations: state.classPlan.stations,
});

const mapDispatchToProps = dispatch => ({
  listObjects: (page, filterObject) => dispatch(listLearningObjectModal(page, filterObject)),
  setCurrentPageModal: page => dispatch(setCurrentPageModal(page)),
});

const SearchDocumentModalContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(SearchDocumentModal);

export default SearchDocumentModalContainer;
