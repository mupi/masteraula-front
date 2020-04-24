import { connect } from 'react-redux';
import StudentOnlineTestPage from 'pages/OnlineTest/StudentOnlineTestPage';
import { verifyOnlineTest, fetchStudentOnlineTest, sendAnswersOnlineTest } from 'actions/onlineTestAction';
import { showModal, hideModal } from 'actions/modalAction';

const mapStateToProps = state => ({
  basicOnlineTest: state.onlineTest.basicStudentOnlineTest,
  isFetchingBasicStudentOnlineTest: state.onlineTest.isFetchingBasicStudentOnlineTest,
  fullOnlineTest: state.onlineTest.fullStudentOnlineTest,
  isFetchingFullStudentOnlineTest: state.onlineTest.isFetchingFullStudentOnlineTest,
  answersSent: state.onlineTest.answersSent,
  isLoggedIn: !!state.session.session,
  userId: state.session.session ? state.session.session.user.id : null,
});


const mapDispatchToProps = (dispatch) => {
  const confirmModalProps = (onlineTest, studentAnwers) => {
    const quantity = `${studentAnwers.student_answer.length}/${onlineTest.questions_document.length}`;
    const message = `Você respondeu ${quantity}. Tem certeza que deseja enviar suas respostas?`;
    return ({
      modalProps: {
        open: true,
        title: 'Enviar respostas',
        message,
        onlineTest,
        studentAnwers,
        confirmAction: () => {
          dispatch(sendAnswersOnlineTest(onlineTest, studentAnwers));
        },
        closeModal: () => dispatch(hideModal()),
      },
      modalType: 'confirm',
    });
  };


  return ({
    verifyOnlineTest: id => dispatch(verifyOnlineTest(id)),
    fetchStudentOnlineTest: id => dispatch(fetchStudentOnlineTest(id)),
    onSubmit: (values, d, props) => {
      const answersText = values.student_questions.map((value) => {
        if ((typeof (value.answer_text) !== 'undefined') && value.answer_text.trim().length > 0) {
          return {
            student_question: value.student_question,
            answer_text: value.answer_text,
          };
        }
        return {};
      }).filter(value => Object.keys(value).length !== 0);
      const objsName = Object.getOwnPropertyNames(values).filter(item => item.includes('selectedIndex'));
      const answers = objsName.map(answer => ({
        answer_alternative: values[answer],
        student_question: parseInt(answer.replace('selectedIndex', ''), 10),
      }));

      const studentAnwers = {
        student_name: values.student_name,
        student_levels: values.student_levels,
        start: null,
        student_answer: [...answersText, ...answers],
      };

      dispatch(showModal(confirmModalProps(props.fullOnlineTest, studentAnwers)));
    },
  });
};

const StudentOnlineTestPageContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(StudentOnlineTestPage);

export default StudentOnlineTestPageContainer;
