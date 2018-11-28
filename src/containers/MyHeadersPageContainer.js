import { connect } from 'react-redux';
import MyHeadersPage from 'pages/MyHeaders/MyHeadersPage';

import { showModal, hideModal } from 'actions/modalAction';
import {
  listMyHeaders, deleteHeader, updateHeader, fetchHeader,
} from 'actions/headerAction';

// state.<reducer's name>.<property>
const mapStateToProps = state => ({
  isFetchingMyHeaders: state.header.isFetchingMyHeaders,
  myHeadersList: state.header.myHeadersList,
  currentPage: state.header.currentPage,
  activeHeader: state.header.activeHeader,
  error: state.header.error,
  isDeleted: state.header.isDeleted,
  orderField: state.header.orderField,
  order: state.header.order,
});

const mapDispatchToProps = dispatch => ({
  listMyHeaders: (page, orderField, order) => dispatch(listMyHeaders(page, orderField, order)),
  hideModal: () => dispatch(hideModal()),
  showModal: (modalProps, modalType) => {
    dispatch(showModal({ modalProps, modalType }));
  },
  deleteHeader: idHeader => dispatch(deleteHeader(idHeader)),
  fetchHeader: idHeader => dispatch(fetchHeader(idHeader)),
  updateHeader: props => dispatch(updateHeader(props)),
});

const MyHeadersPageContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(MyHeadersPage);

export default MyHeadersPageContainer;
