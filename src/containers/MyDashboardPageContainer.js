import { connect } from 'react-redux';
import MyDashboardPage from 'pages/MyDashboard/MyDashboardPage';
import { showModal, hideModal } from 'actions/modalAction';
import {
  fetchMyDashboard,
} from 'actions/dashboardAction';
import {
  switchActiveDocument, listMyLastDocuments,
} from 'actions/documentAction';
import {
  addMyQuestionsFilter,
} from 'actions/filterAction';

const mapStateToProps = state => ({
  isFetchingMyDashboard: state.dashboard.isFetchingMyDashboard,
  myDashboard: state.dashboard.myDashboard,
  user: state.session.session.user,
  quantityDocxDownloaded: state.document.numberDocxDownloaded ? state.document.numberDocxDownloaded.total_downloads : 0,
  isFetchingMyLastDocuments: state.document.isFetchingMyLastDocuments,
  myLastDocumentsList: state.document.myLastDocumentsList && state.document.myLastDocumentsList.results
    ? state.document.myLastDocumentsList.results.slice(0, 5) : null,
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
    addMyQuestionsFilter: (author, value) => dispatch(addMyQuestionsFilter(author, value)),
    fetchMyDashboard: () => dispatch(fetchMyDashboard()),
    switchActiveDocument: doc => dispatch(switchActiveDocument(doc, true)),
    showCreateDocumentModal: () => dispatch(showModal(createDocumentModalProps)),
    listMyLastDocuments: (page, orderField, order) => dispatch(listMyLastDocuments(page, orderField, order)),
  });
};

const MyDashboardPageContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(MyDashboardPage);

export default MyDashboardPageContainer;
