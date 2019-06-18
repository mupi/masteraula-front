import { connect } from 'react-redux';
import ObjectBasePage from 'pages/ObjectBase/ObjectBasePage';
import { listLearningObject } from 'actions/learningObjectAction';
// import { showModal, hideModal } from 'actions/modalAction';

const mapStateToProps = state => ({
  isFetching: state.learningObject.isFetching,
  objectPage: state.learningObject.objectPage,
  filterObject: state.filterObject,
  modal: state.document.modal,
  currentPage: state.learningObject.currentPage,

});

const mapDispatchToProps = dispatch => ({
  listObjects: (page, filterObject) => dispatch(listLearningObject(page, filterObject)),
});

const ObjectBasePageContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(ObjectBasePage);


export default ObjectBasePageContainer;
