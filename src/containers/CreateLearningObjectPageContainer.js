import { connect } from 'react-redux';
import {
  reduxForm, SubmissionError,
} from 'redux-form';
import CreateLearningObjectPage from 'pages/LearningObject/CreateLearningObjectPage';
import { createLearningObject } from 'actions/learningObjectAction';

// state.<reducer's name>.<property>
const mapStateToProps = state => ({
  user: state.session.session,
  errors: state.form['create-object'] ? state.form['create-object'].submitErrors : null,
});

/*
owner: 26
source: teste fonte
image: (binary)
folder_name:
text: teste text
object_types: T,I
tags: testetag

*/
const mapDispatchToProps = dispatch => ({

  // create new object
  onSubmit: (values) => {
    const errors = [];
    const textObject = (values.text && values.text.trim() !== '<p></p>') ? values.text : '';
    const newObject = {
      text: textObject,
      source: values.source,
      image: values.image,
      object_types: [],
      tags: values.tags ? values.tags.split(',').map(tag => tag.trim()) : [],
    };


    const overMaxSize = values.image && values.image instanceof FileList && values.image.length > 0 && values.image[0].size > 1048576;
    if (overMaxSize) {
      errors.image = 'Insira um arquivo PNG, JPG, JPEG de máx. 1mb';
    }

    const typeFile = values.image && values.image instanceof FileList && values.image.length > 0 && !values.image[0].type.includes('image');
    if (typeFile) {
      errors.image = 'Insira um arquivo PNG, JPG, JPEG';
    }

    const hasObject = values.image || textObject.length > 0;
    if (!hasObject) {
      errors.general_errors = 'Insira um texto/URL vídeo ou uma imagem';
    }

    if (Object.keys(errors).length !== 0) throw new SubmissionError(errors);

    return dispatch(createLearningObject(newObject));
  },
});

const CreateLearningObjectPageContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(reduxForm({
  form: 'create-object',
})(CreateLearningObjectPage));

export default CreateLearningObjectPageContainer;
