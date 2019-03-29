import { connect } from 'react-redux';
import Sidebar from 'components/sidebar/Sidebar';
import { logout } from 'actions/loginAction';
import { toggleMenu, openSidebar } from 'actions/menuAction';
import { clearSelectedFilters, clearSearch } from 'actions/filterAction';
import { showModal, hideModal } from 'actions/modalAction';
import { setQuestionIdToNewDocument } from 'actions/documentAction';

// state.<reducer's name>.<property>
const mapStateToProps = state => ({
  isOpen: state.menu.isOpen,
  user: state.session.session.user,
  activeDocument: state.document.activeDocument,
  isOpenSidebar: state.menu.isOpenSidebar,
  isFetchingQuestions: state.question.isFetching,
});

const mapDispatchToProps = dispatch => ({
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
  hideModal: () => dispatch(hideModal()),
  showModal: (modalProps, modalType) => {
    dispatch(showModal({ modalProps, modalType }));
  },
  setQuestionIdToNewDocument: () => dispatch(setQuestionIdToNewDocument()),

});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Sidebar);
