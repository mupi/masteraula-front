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
  clearSelectedFilters, clearSearch, addMyQuestionsFilter,
} from 'actions/filterAction';

import {
  selectClassPlanType,
  resetClassPlanType,
} from 'actions/classPlanAction';


const mapStateToProps = state => ({
  isFetchingMyDashboard: state.dashboard.isFetchingMyDashboard,
  myDashboard: state.dashboard.myDashboard,
  user: state.session.session.user,
  quantityDocxDownloaded: state.document.numberDocxDownloaded ? state.document.numberDocxDownloaded.total_downloads : 0,
  isFetchingMyLastDocuments: state.document.isFetchingMyLastDocuments,
  myLastDocumentsList: state.document.myLastDocumentsList && state.document.myLastDocumentsList.results
    ? state.document.myLastDocumentsList.results.slice(0, 5) : null,

  /* Class plan */
  selectedClassPlanType: state.classPlan.selectedClassPlanType,
});

const mapDispatchToProps = (dispatch) => {
  const createDocumentModalProps = {
    modalProps: {
      open: true,
      closeModal: () => dispatch(hideModal()),
    },
    modalType: 'createDocument',
  };

  const createClassPlanModalProps = selectedClassPlanType => ({
    modalProps: {
      open: true,
      title: 'Criar plano de aula',
      nameAction: 'Criar',
      selectClassPlanType: type => dispatch(selectClassPlanType(type)),
      closeModal: () => { dispatch(hideModal()); dispatch(resetClassPlanType()); },
      selectedClassPlanType,
    },
    modalType: 'createClassPlanModal',
  });

  return ({
    addMyQuestionsFilter: (author, value) => dispatch(addMyQuestionsFilter(author, value)),
    fetchMyDashboard: () => dispatch(fetchMyDashboard()),
    switchActiveDocument: doc => dispatch(switchActiveDocument(doc, true)),
    showCreateDocumentModal: () => dispatch(showModal(createDocumentModalProps)),
    listMyLastDocuments: (page, orderField, order) => dispatch(listMyLastDocuments(page, orderField, order)),
    cleanAllSearch: () => {
      dispatch({
        type: '@@redux-form/CHANGE',
        payload: null,
        meta: { form: 'questionSearch', field: 'searchText' },
      });
      dispatch(clearSearch());
      dispatch(clearSelectedFilters());
    },
    // Open Modal for selection class plan's type
    showCreateClassPlanModal: selectedClassPlanType => dispatch(showModal(createClassPlanModalProps(selectedClassPlanType))),

  });
};

const MyDashboardPageContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(MyDashboardPage);

export default MyDashboardPageContainer;
