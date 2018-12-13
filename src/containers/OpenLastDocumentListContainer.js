import { connect } from 'react-redux';
import OpenLastDocumentList from 'components/document/OpenLastDocumentList';
import { switchActiveDocument } from 'actions/documentAction';  
import { showModal, hideModal } from 'actions/modalAction';

const mapStateToProps = state => ({
});

const mapDispatchToProps = dispatch => ({
  hideModal: () => dispatch(hideModal()),
  showModal: (modalProps, modalType) => {
    dispatch(showModal({ modalProps, modalType }));
  },
  switchActiveDocument: doc => dispatch(switchActiveDocument(doc)),
});

const OpenLastDocumentListContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(OpenLastDocumentList);

export default OpenLastDocumentListContainer;
