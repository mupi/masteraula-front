import ClonePublicDocumentPage from 'pages/ClonePublicDocument/ClonePublicDocumentPage';
import {
  fetchPublicDocument,
} from 'actions/documentAction';
import { showModal, hideModal } from 'actions/modalAction';

import { connect } from 'react-redux';

const mapStateToProps = state => ({
  isLoggedIn: !!state.session.session,
  activePublicDocument: state.document.activePublicDocument,
  isFetchingPublicDocument: state.document.isFetchingPublicDocument,

});

const mapDispatchToProps = dispatch => ({
  fetchPublicDocument: props => dispatch(fetchPublicDocument(props)),
  // new way to handle modals
  hideModal: () => dispatch(hideModal()),
  showModal: (modalProps, modalType) => {
    dispatch(showModal({ modalProps, modalType }));
  },
});

const ClonePublicDocumentPageContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(ClonePublicDocumentPage);

export default ClonePublicDocumentPageContainer;
