import { connect } from 'react-redux';
import {
  reduxForm, SubmissionError,
} from 'redux-form';
import CreateLearningObjectPage from 'pages/LearningObject/CreateLearningObjectPage';
import { createLearningObject } from 'actions/learningObjectAction';

// state.<reducer's name>.<property>
const mapStateToProps = state => ({
  user: state.session.session,
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
  onSubmit: (values, d, props) => {
    const errors = [];
    const newObject = {
      text: values.text.trim() !== '<p></p>' ? values.text : "",
      source: values.source,
      image: values.image,
      object_types: [],
      tags: values.tags ? values.tags.split(',').map(tag => tag.trim()) : [],
    };


    const overMaxSize = values.image && values.image instanceof FileList && values.image.length > 0 && values.image[0].size > 2097152;
    if (overMaxSize) {
      errors.image = 'Insira um arquivo PNG, JPG, JPEG de máx. 2mb';
    }

    const typeFile = values.image && values.image instanceof FileList && values.image.length > 0 && !values.image[0].type.includes('image');
    if (typeFile) {
      errors.image = 'Insira um arquivo PNG, JPG, JPEG';
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
