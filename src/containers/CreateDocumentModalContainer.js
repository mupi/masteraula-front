import { connect } from 'react-redux';
import CreateDocumentModal from 'components/document/CreateDocumentModal';
import {
  toggleModal, createDocument
} from 'actions/documentAction';

// state.<reducer's name>.<property>
const mapStateToProps = state => ({
  modal: state.document.modal,
  willAddQuestion: state.document.willAddQuestion,
});

const mapDispatchToProps = dispatch => ({
  toggleModal: modal => dispatch(toggleModal(modal)),
  submit: (formData, modal) => {
    dispatch(createDocument(formData)),
  	dispatch(toggleModal(modal));
  },
});

const CreateDocumentModalContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(CreateDocumentModal);

export default CreateDocumentModalContainer; 
