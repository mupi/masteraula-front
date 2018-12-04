import { connect } from 'react-redux';
import EditHeaderPage from 'pages/EditHeader/EditHeaderPage';

import { showModal, hideModal } from 'actions/modalAction';
import {
  fetchHeader, resetNewHeader, createHeader, updateHeader,
} from 'actions/headerAction';
import { history } from 'helpers/history';

// state.<reducer's name>.<property>
const mapStateToProps = state => ({
  activeHeader: state.header.activeHeader,
  isUpdated: state.header.isUpdated,
  error: state.header.error,
});

const mapDispatchToProps = dispatch => ({
  fetchHeader: id => dispatch(fetchHeader(id)),
  resetNewHeader: () => dispatch(resetNewHeader()),
  hideModal: () => dispatch(hideModal()),
  showModal: (modalProps, modalType) => {
    dispatch(showModal({ modalProps, modalType }));
  },
  createHeader: (formData) => {
    dispatch(createHeader(formData));
    history.push('/my-headers/1');
  },
  updateHeader: (props) => {
    dispatch(updateHeader(props));
    history.push('/my-headers/1');
  },
});

const EditHeaderPageContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(EditHeaderPage);

export default EditHeaderPageContainer;
