import PublicDocumentPage from 'pages/PublicDocument/PublicDocumentPage';
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

const mapDispatchToProps = (dispatch) => {
  const loginModalProps = redirect => ({
    modalProps: {
      redirect,
      open: true,
      closeModal: () => dispatch(hideModal()),
      optionalMessage: 'Você precisa estar logado no sistema',
    },
    modalType: 'login2',
  });

  return {
    fetchPublicDocument: props => dispatch(fetchPublicDocument(props)),
    // isRedirect to edit-document = true
    copyDocument: doc => dispatch(copyDocument(doc, true)),
    // new way to handle modals
    showLoginModal: redirect => dispatch(showModal(loginModalProps(redirect))),
  };
};

const PublicDocumentPageContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(PublicDocumentPage);

export default PublicDocumentPageContainer;
