import { connect } from 'react-redux';
import ResultsOnlineTestPage from 'pages/OnlineTest/ResultsOnlineTestPage';
import { fetchOnlineTest } from 'actions/onlineTestAction';
import { showModal, hideModal } from 'actions/modalAction';

const mapStateToProps = state => ({
  activeOnlineTest: state.onlineTest.activeOnlineTest,
  isFetchingOnlineTest: state.onlineTest.isFetchingOnlineTest,
  userId: state.session.session.user.id,
  user: state.session.session.user,
});


const mapDispatchToProps = (dispatch) => {
  const studentModalProps = () => ({
    modalProps: {
      open: true,
      closeModal: () => {
        dispatch(hideModal());
      },
    },
    modalType: 'studentResults',
  });

  return ({
    fetchOnlineTest: id => dispatch(fetchOnlineTest(id)),
    showStudentModal: () => dispatch(showModal(studentModalProps())),
  });
};

const ResultsOnlineTestPageContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(ResultsOnlineTestPage);

export default ResultsOnlineTestPageContainer;
