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
    const textObject = (values.text && values.text.trim() !== '<p></p>') ? values.text : '';

    const isValidFile = values.image && values.image instanceof FileList && values.image.length > 0;

    const updatedObject = {
      id: props.activeLearningObject.id,
      text: values.text.trim() !== '<p></p>' ? values.text : '',
      source: values.source,
      image: (values.image && isValidFile) ? values.image : null,

      object_types: [],
      tags: values.tags ? values.tags.split(',').map(tag => tag.trim()) : [],
    };


    const overMaxSize = values.image && values.image instanceof FileList && values.image.length > 0 && values.image[0].size > 2097152;
    if (overMaxSize) {
      errors.image = 'Insira um arquivo PNG, JPG, JPEG de máx. 1mb';
    }

    const typeFile = values.image && values.image instanceof FileList && values.image.length > 0 && !values.image[0].type.includes('image');
    if (typeFile) {
      errors.image = 'Insira um arquivo PNG, JPG, JPEG';
    }

    const hasObject = values.image || textObject.length > 0;
    if (!hasObject) {
      errors.general_errors = 'Insira ou um texto/URL vídeo ou uma imagem';
    }

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
