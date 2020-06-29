import { connect } from 'react-redux';
import ViewOnlineTestPage from 'pages/OnlineTest/ViewOnlineTestPage';
import { fetchOnlineTest, deleteOnlineTest } from 'actions/onlineTestAction';
import { showModal, hideModal } from 'actions/modalAction';
import { fetchQuestion } from 'actions/questionAction';

const mapStateToProps = state => ({
  activeOnlineTest: state.onlineTest.activeOnlineTest,
  isFetchingOnlineTest: state.onlineTest.isFetchingOnlineTest,
  userId: state.session.session.user.id,
  user: state.session.session.user,
});


const mapDispatchToProps = (dispatch) => {
  const deleteModalProps = (idOnlineTest, name, idBaseDocument) => ({
    modalProps: {
      open: true,
      title: 'Apagar prova online',
      message: 'Você tem certeza que deseja apagar a prova online',
      name,
      id: idOnlineTest,
      deleteAction: () => {
        dispatch(deleteOnlineTest(idOnlineTest, true, idBaseDocument));
      },
      closeModal: () => dispatch(hideModal()),
    },
    modalType: 'delete',
  });

  const questionModalProps = idQuestion => ({
    modalProps: {
      open: true,
      idQuestion,
      fetchQuestion: () => {
        dispatch(fetchQuestion(idQuestion));
      },
      closeModal: () => {
        dispatch(hideModal());
      },
    },
    modalType: 'question',
  });


  return ({
    fetchOnlineTest: id => dispatch(fetchOnlineTest(id)),
    showDeleteModal: (idOnlineTest, name, idBaseDocument) => dispatch(showModal(deleteModalProps(idOnlineTest, name, idBaseDocument))),
    showQuestionModal: idQuestion => dispatch(showModal(questionModalProps(idQuestion))),
  });
};

const ViewOnlineTestPageContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(ViewOnlineTestPage);

export default ViewOnlineTestPageContainer;
