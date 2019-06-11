import { connect } from 'react-redux';
import ViewLearningObjectPage from 'pages/LearningObject/ViewLearningObjectPage';

import { fetchLearningObject } from 'actions/learningObjectAction';

// state.<reducer's name>.<property>
const mapStateToProps = state => ({
  activeLearningObject: state.learningObject.activeLearningObject,
  error: state.learningObject.error,
});

const mapDispatchToProps = dispatch => ({
  fetchLearningObject: id => dispatch(fetchLearningObject(id)),
});

const ViewLearningObjectPageContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(ViewLearningObjectPage);

export default ViewLearningObjectPageContainer;
