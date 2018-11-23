import { connect } from 'react-redux';
import EditHeaderPage from 'pages/EditHeader/EditHeaderPage';

import { showModal, hideModal } from 'actions/modalAction';

// state.<reducer's name>.<property>
const mapStateToProps = state => ({
  activeHeader: state.header.activeHeader,
  isUpdated: state.header.isUpdated,
  error: state.header.error,
});

const mapDispatchToProps = dispatch => ({
  hideModal: () => dispatch(hideModal()),
  showModal: (modalProps, modalType) => {
    dispatch(showModal({ modalProps, modalType }));
  },
});

const EditHeaderPageContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(EditHeaderPage);

export default EditHeaderPageContainer;
