import ClonePublicDocumentPage from 'pages/ClonePublicDocument/ClonePublicDocumentPage';
import {
  fetchPublicDocument, copyDocument,
} from 'actions/documentAction';
import { showModal, hideModal } from 'actions/modalAction';

import { connect } from 'react-redux';

const mapStateToProps = state => ({
  isLoggedIn: !!state.session.session,
  activePublicDocument: state.document.activePublicDocument,
  isFetchingPublicDocument: state.document.isFetchingPublicDocument,
  errorFetchingPublicDocument: state.document.errorFetchingPublicDocument,
});

const mapDispatchToProps = dispatch => ({
  fetchPublicDocument: props => dispatch(fetchPublicDocument(props)),
  // isRedirect to edit-document = true
  copyDocument: doc => dispatch(copyDocument(doc, true)),
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
