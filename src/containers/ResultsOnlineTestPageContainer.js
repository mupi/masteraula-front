import { connect } from 'react-redux';
import ResultsOnlineTestPage from 'pages/OnlineTest/ResultsOnlineTestPage';
import { fetchOnlineTest } from 'actions/onlineTestAction';
import { showModal, hideModal } from 'actions/modalAction';
import { fetchQuestion } from 'actions/questionAction';


const mapStateToProps = (state) => {
  const questions = state.onlineTest.activeOnlineTest ? state.onlineTest.activeOnlineTest.questions_document : null;

  // Máximo valor da prova online
  const totalScore = questions ? questions.map(q => q.score).filter(item => item).reduce((a, b) => parseInt(a, 10) + parseInt(b, 10), 0) : 0;
  return ({
    activeOnlineTest: state.onlineTest.activeOnlineTest,
    isFetchingOnlineTest: state.onlineTest.isFetchingOnlineTest,
    userId: state.session.session.user.id,
    user: state.session.session.user,
    totalScore,
  });
};

const mapDispatchToProps = (dispatch) => {
  const studentModalProps = student => ({
    modalProps: {
      open: true,
      student,
      closeModal: () => {
        dispatch(hideModal());
      },
    },
    modalType: 'studentResults',
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
    showStudentModal: student => dispatch(showModal(studentModalProps(student))),
    showQuestionModal: idQuestion => dispatch(showModal(questionModalProps(idQuestion))),
  });
};

const ResultsOnlineTestPageContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(ResultsOnlineTestPage);

export default ResultsOnlineTestPageContainer;
