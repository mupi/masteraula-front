import { connect } from 'react-redux';
import OpenLastDocumentList from 'components/document/OpenLastDocumentList';
import { switchActiveDocument } from 'actions/documentAction';
import { showModal, hideModal } from 'actions/modalAction';

const mapStateToProps = () => ({
});

const mapDispatchToProps = (dispatch) => {
  const last5DocumentsModalProps = myLastDocumentsList => ({
    modalProps: {
      open: true,
      title: 'Trocar prova',
      message: 'Selecione a prova a ser editada',
      myLastDocumentsList,
      switchActiveDocument: doc => dispatch(switchActiveDocument(doc)),
      closeModal: () => dispatch(hideModal()),
    },
    modalType: 'last5Documents',
  });

  return ({
    showlast5DocumentsModal: myLastDocumentsList => dispatch(showModal(last5DocumentsModalProps(myLastDocumentsList))),
  });
};

const OpenLastDocumentListContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(OpenLastDocumentList);

export default OpenLastDocumentListContainer;
