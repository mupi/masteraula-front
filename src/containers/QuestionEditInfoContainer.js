import { connect } from 'react-redux';
import { reduxForm } from 'redux-form';
import QuestionEditInfo from 'components/question/QuestionEditInfo';

const mapStateToProps = (state) => {
  return ({
    initialValues: {
      difficulty: state.question.activeQuestion.difficulty,
    },
  });
};

const mapDispatchToProps = dispatch => ({
  
});

const QuestionEditInfoContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(reduxForm({
  form: 'question-info-edit',
})(QuestionEditInfo));

export default QuestionEditInfoContainer;
