import { connect } from 'react-redux';
import {
  reduxForm,
} from 'redux-form';
import CreateLearningObjectPage from 'pages/LearningObject/CreateLearningObjectPage';
import { createLearningObject } from 'actions/learningObjectAction';

// state.<reducer's name>.<property>
const mapStateToProps = state => ({
  user: state.session.session,
});

const mapDispatchToProps = dispatch => ({

  // create new object
  onSubmit: (values, d, props) => {
    const newObject = {
      a: values.values,
    };
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
