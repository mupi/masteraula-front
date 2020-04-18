import { connect } from 'react-redux';
import ManageOnlineTestsPage from 'pages/OnlineTest/ManageOnlineTestsPage';
import { deleteOnlineTest, listMyOnlineTests } from 'actions/onlineTestAction';
import { showModal, hideModal } from 'actions/modalAction';

const mapStateToProps = state => ({
  onlineTestsList: state.onlineTest.onlineTestsList,
  isFetchingOnlineTests: state.onlineTest.isFetchingOnlineTests,
  isDeleted: state.onlineTest.isDeleted,
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
    listMyOnlineTests: (idDocBase, page) => {
      dispatch(listMyOnlineTests(idDocBase, page));
    },
  });
};


const ManageOnlineTestsPageContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(ManageOnlineTestsPage);

export default ManageOnlineTestsPageContainer;
