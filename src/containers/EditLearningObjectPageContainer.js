import { connect } from 'react-redux';
import {
  reduxForm, SubmissionError,
} from 'redux-form';
import EditLearningObjectPage from 'pages/LearningObject/EditLearningObjectPage';
import { fetchLearningObject, updateLearningObject } from 'actions/learningObjectAction';


/*
owner: 26
source: teste fonte
image: (binary)
folder_name:
text: teste text
object_types: T,I
tags: testetag

*/
const mapStateToProps = (state) => {
  const { user } = state.session.session;
  return ({
    errors: state.form['edit-object'] ? state.form['edit-object'].submitErrors : null,
    topicSuggestions: state.suggestion.topicSuggestions,
    userId: user.id,
    isFetching: state.learningObject.isFetchingLearningObject,
    activeLearningObject: state.learningObject.activeLearningObject,
  });
};

const mapDispatchToProps = dispatch => ({

  fetchLearningObject: id => dispatch(fetchLearningObject(id)),
  onSubmit: (values, d, props) => {
    /*
        owner: 26
        source: teste fonte
        image: (binary)
        folder_name:
        text: teste text
        object_types: T,I
        tags: testetag
    */
    const errors = [];
    const updatedObject = {
      id: props.activeActivity.id,
    };

    if (Object.keys(errors).length !== 0) throw new SubmissionError(errors);
    return dispatch(updateLearningObject(updatedObject));
  },
});

const EditLearningObjectPageContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(reduxForm({
  form: 'edit-object',
})(EditLearningObjectPage));

export default EditLearningObjectPageContainer;
