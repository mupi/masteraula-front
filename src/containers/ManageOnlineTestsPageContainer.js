import { connect } from 'react-redux';
import ManageOnlineTestsPage from 'pages/OnlineTest/ManageOnlineTestsPage';
import { deleteOnlineTest } from 'actions/onlineTestAction';
import { showModal, hideModal } from 'actions/modalAction';

const mapStateToProps = () => ({

});


const mapDispatchToProps = (dispatch) => {
  const deleteModalProps = (idOnlineTest, name, idBaseDocument) => ({
    modalProps: {
      open: true,
      title: 'Apagar prova online',
      message: 'Você tem certeza que deseja apagar a prova online',
      name,
      id: idOnlineTest,
      deleteAction: () => {
        dispatch(deleteOnlineTest(idOnlineTest, false, idBaseDocument));
      },
      closeModal: () => dispatch(hideModal()),
    },
    modalType: 'delete',
  });
  return ({
    showDeleteModal: (idOnlineTest, name, idBaseDocument) => dispatch(showModal(deleteModalProps(idOnlineTest, name, idBaseDocument))),
  });
};


const ManageOnlineTestsPageContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(ManageOnlineTestsPage);

export default ManageOnlineTestsPageContainer;
