import { connect } from 'react-redux';
import DeleteQuestionButton from 'components/buttons/DeleteQuestionButton';
import {
  deleteQuestion,
} from 'actions/questionAction';

const mapStateToProps = state => ({
});

const mapDispatchToProps = dispatch => ({
  deleteQuestion: (idQuestion) => {
    dispatch(deleteQuestion(idQuestion));
  },
});

const DeleteQuestionButtonContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(DeleteQuestionButton);

export default DeleteQuestionButtonContainer;
