import { connect } from 'react-redux';
import DeleteQuestionButton from 'components/buttons/DeleteQuestionButton';
import {
  deleteQuestion,
} from 'actions/questionAction';
import { showModal, hideModal } from 'actions/modalAction';

const mapStateToProps = state => ({
  userId: state.session.session.user.id,
  activeQuestion: state.question.activeQuestion,
});

const mapDispatchToProps = (dispatch) => {
  /* Options for Delete question */
  /*
    documents_quantity
    users_quantity
    - A questão está sendo usada por <#> outros usuários
- A questão está sendo usada por <#> de provas (todas as provas ativadas incluindo as do próprio usuário)

  */
  const deleteModalProps = (idQuestion, name, activeQuestion) => ({
    modalProps: {
      open: true,
      title: 'Apagar questão',
      message: 'Você tem certeza que deseja apagar a questão N°',
      name,
      id: idQuestion,
      resources: [
        {
          quantity: activeQuestion.users_quantity,
          message: `A questão está sendo usada por outros ${activeQuestion.users_quantity} usuário(s)`,
        },

        {
          quantity: activeQuestion.documents_quantity,
          message: `A questão está sendo usada por outros ${activeQuestion.documents_quantity} prova(s)`,
        },
      ].filter(r => (r.quantity > 0)),
      deleteAction: () => {
        dispatch(deleteQuestion(idQuestion));
      },
      closeModal: () => dispatch(hideModal()),
    },
    modalType: 'delete',
  });


  return ({
    // Question
    // showDeleteModal: (idQuestion, name) => dispatch(showModal(deleteModalProps(idQuestion, name))),

    showDeleteModal: (idQuestion, name) => {
      dispatch((_dispatch, getState) => {
        _dispatch(showModal(deleteModalProps(idQuestion, name, getState().question.activeQuestion)));
      });
    },
  });
};

const DeleteQuestionButtonContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(DeleteQuestionButton);

export default DeleteQuestionButtonContainer;
