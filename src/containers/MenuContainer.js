import { connect } from 'react-redux';
import { logout } from 'actions/loginAction';
import { toggleMenu, openSidebar } from 'actions/menuAction';
import { showModal, hideModal } from 'actions/modalAction';
import { getNumberDocxDownloaded } from 'actions/documentAction';

import Menu from 'components/menu/Menu';

// state.<reducer's name>.<property>

const mapStateToProps = state => ({
  isOpen: state.menu.isOpen,
  isOpenSidebar: state.menu.isOpenSidebar,
  isLoggedIn: state.session.session,
  activeDocument: state.document.activeDocument,
  user: state.session.session ? state.session.session.user : null,
  quantityDocxDownloaded: state.document.numberDocxDownloaded ? state.document.numberDocxDownloaded.count : 0,
});

const mapDispatchToProps = (dispatch) => {
  const registerModalProps = {
    modalProps: {
      open: true,
      closeModal: () => dispatch(hideModal()),
    },
    modalType: 'register2',
  };
  const loginModalProps = {
    modalProps: {
      open: true,
      closeModal: () => dispatch(hideModal()),
    },
    modalType: 'login2',
  };

  return {
    toggleMenu: isOpen => dispatch(toggleMenu(isOpen)),
    openSidebar: isOpenSidebar => dispatch(openSidebar(isOpenSidebar)),
    logout: () => dispatch(logout()),

    showRegisterModal: () => dispatch(showModal(registerModalProps)),
    showLoginModal: () => dispatch(showModal(loginModalProps)),
    getNumberDocxDownloaded: () => dispatch(getNumberDocxDownloaded()),
  };
};

const MenuContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(Menu);

export default MenuContainer;
