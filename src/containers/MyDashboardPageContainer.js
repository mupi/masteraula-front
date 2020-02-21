import { connect } from 'react-redux';
import MyDashboardPage from 'pages/MyDashboard/MyDashboardPage';
import { showModal, hideModal } from 'actions/modalAction';
import {
  fetchMyDashboard,
} from 'actions/dashboardAction';
import {
  switchActiveDocument,
} from 'actions/documentAction';

const mapStateToProps = state => ({
  isFetchingMyDashboard: state.dashboard.isFetchingMyDashboard,
  myDashboard: state.dashboard.myDashboard,
  user: state.session.session.user,
  isFetchingMyLastDocuments: state.document.isFetchingMyLastDocuments,
  myLastDocumentsList: state.document.myLastDocumentsList,
});

const mapDispatchToProps = (dispatch) => {
  const createDocumentModalProps = {
    modalProps: {
      open: true,
      closeModal: () => dispatch(hideModal()),
    },
    modalType: 'createDocument',
  };

  return ({
    fetchMyDashboard: () => dispatch(fetchMyDashboard()),
    switchActiveDocument: doc => dispatch(switchActiveDocument(doc, true)),
    showCreateDocumentModal: () => dispatch(showModal(createDocumentModalProps)),
  });
};

const MyDashboardPageContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(MyDashboardPage);

export default MyDashboardPageContainer;
