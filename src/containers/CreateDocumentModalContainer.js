import { connect } from 'react-redux';
import CreateDocumentModal from 'components/document/CreateDocumentModal';
import {
  toggleModal, createDocument,
} from 'actions/documentAction';
import { openSidebar } from 'actions/menuAction';

// state.<reducer's name>.<property>
const mapStateToProps = state => ({
  modal: state.document.modal,
  willAddQuestion: state.document.willAddQuestion,
  isOpenSidebar: state.menu.isOpenSidebar,

});

const mapDispatchToProps = dispatch => ({
  toggleModal: modal => dispatch(toggleModal(modal)),
  submit: (formData, modal) => {
    dispatch(createDocument(formData));
    dispatch(toggleModal(modal));
  },
  openSidebar: isOpenSidebar => dispatch(openSidebar(isOpenSidebar)),
});

const CreateDocumentModalContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(CreateDocumentModal);

export default CreateDocumentModalContainer;
