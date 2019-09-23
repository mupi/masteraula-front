import ClonePublicDocumentPage from 'pages/ClonePublicDocument/ClonePublicDocumentPage';
import {
  fetchPublicDocument,
} from 'actions/documentAction';
import { connect } from 'react-redux';

const mapStateToProps = state => ({
  isLoggedIn: !!state.session.session,
  activePublicDocument: state.document.activePublicDocument,
  isFetchingPublicDocument: state.document.isFetchingPublicDocument,

});

const mapDispatchToProps = dispatch => ({
  fetchPublicDocument: props => dispatch(fetchPublicDocument(props)),
});

const ClonePublicDocumentPageContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(ClonePublicDocumentPage);

export default ClonePublicDocumentPageContainer;
