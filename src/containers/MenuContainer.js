import { connect } from 'react-redux';
import { logout } from 'actions/loginAction';
import { toggleMenu, openSidebar } from 'actions/menuAction';
import {
  listMyDocuments, switchActiveDocument,
} from 'actions/documentAction';
import Menu from 'components/menu/Menu';

const mapStateToProps = state => ({
  isOpen: state.menu.isOpen,
  isOpenSidebar: state.menu.isOpenSidebar,
  isLoggedIn: state.session.session,
  activeDocument: state.document.activeDocument,

});

const mapDispatchToProps = dispatch => ({
  toggleMenu: isOpen => dispatch(toggleMenu(isOpen)),
  openSidebar: isOpenSidebar => dispatch(openSidebar(isOpenSidebar)),
  logout: () => dispatch(logout()),
  listMyDocuments: (page, orderField, order) => dispatch(listMyDocuments(page, orderField, order)),
  switchActiveDocument: doc => dispatch(switchActiveDocument(doc)),
});

const MenuContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(Menu); 

export default MenuContainer;
