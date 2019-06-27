import { connect } from 'react-redux';
import ObjectBasePage from 'pages/ObjectBase/ObjectBasePage';
import { listLearningObject } from 'actions/learningObjectAction';
import { history } from 'helpers/history';

import {
  addSelectedObjectTypeFilter,
} from 'actions/filterObjectAction';

const mapStateToProps = state => ({
  isFetching: state.learningObject.isFetching,
  objectPage: state.learningObject.objectPage,
  filterObject: state.filterObject,
  modal: state.document.modal,
  currentPage: state.learningObject.currentPage,
});

const mapDispatchToProps = dispatch => ({
  addSelectedObjectTypeFilter: (objectType) => { history.replace('/object-base/1'); dispatch(addSelectedObjectTypeFilter(objectType)); },
  listObjects: (page, filterObject) => dispatch(listLearningObject(page, filterObject)),
});

const ObjectBasePageContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(ObjectBasePage);


export default ObjectBasePageContainer;
