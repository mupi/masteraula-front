import { connect } from 'react-redux';
import Sidebar from 'components/sidebar/Sidebar';
import { logout } from 'actions/loginAction';
import { toggleMenu, openSidebar } from 'actions/menuAction';
import { clearSelectedFilters, clearSearch } from 'actions/filterAction';
import { showModal, hideModal } from 'actions/modalAction';
import { setQuestionIdToNewDocument } from 'actions/documentAction';
import { listMyQuestionLabels } from 'actions/labelAction';


// state.<reducer's name>.<property>
const mapStateToProps = state => ({
  isOpen: state.menu.isOpen,
  user: state.session.session.user,
  activeDocument: state.document.activeDocument,
  isOpenSidebar: state.menu.isOpenSidebar,
  isFetchingQuestions: state.question.isFetching,
  quantityDocxDownloaded: state.document.numberDocxDownloaded ? state.document.numberDocxDownloaded.count : 0,

  /* Labels */
  myQuestionLabels: state.label.myQuestionLabels,
  isFetchingMyQuestionLabels: state.label.isFetchingMyQuestionLabels,
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
    toggleMenu: isOpen => dispatch(toggleMenu(isOpen)),
    openSidebar: isOpenSidebar => dispatch(openSidebar(isOpenSidebar)),
    logout: () => dispatch(logout()),
    cleanAllSearch: () => {
      dispatch({
        type: '@@redux-form/CHANGE',
        payload: null,
        meta: { form: 'questionSearch', field: 'searchText' },
      });
      dispatch(clearSearch());
      dispatch(clearSelectedFilters());
    },
    // new way to handle modals
    showCreateDocumentModal: () => dispatch(showModal(createDocumentModalProps)),
    setQuestionIdToNewDocument: () => dispatch(setQuestionIdToNewDocument()),

    // Labels
    listMyQuestionLabels: () => dispatch(listMyQuestionLabels()),
  });
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Sidebar);
