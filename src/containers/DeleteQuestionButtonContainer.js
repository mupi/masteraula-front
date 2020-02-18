import { connect } from 'react-redux';
import DeleteQuestionButton from 'components/buttons/DeleteQuestionButton';
import {
  deleteQuestion,
} from 'actions/questionAction';
import { showModal, hideModal } from 'actions/modalAction';

const mapStateToProps = state => ({
  userId: state.session.session.user.id,
});

const mapDispatchToProps = (dispatch) => {
  /* Options for Delete question */
  const deleteModalProps = (idQuestion, name) => ({
    modalProps: {
      open: true,
      title: 'Apagar questão',
      message: 'Você tem certeza que deseja apagar a questão N°',
      name,
      idQuestion,
      deleteAction: () => {
        dispatch(deleteQuestion(idQuestion));
      },
      closeModal: () => dispatch(hideModal()),
    },
    modalType: 'delete',
  });


  return ({
    // Question
    showDeleteModal: (idQuestion, name) => dispatch(showModal(deleteModalProps(idQuestion, name))),
  });
};

const DeleteQuestionButtonContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(DeleteQuestionButton);

export default DeleteQuestionButtonContainer;
