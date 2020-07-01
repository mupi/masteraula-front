import { connect } from 'react-redux';
import ManageOnlineTestsPage from 'pages/OnlineTest/ManageOnlineTestsPage';
import { fetchBaseDocument, deleteOnlineTest, listMyOnlineTests, copyOnlineTest } from 'actions/onlineTestAction';
import { showModal, hideModal } from 'actions/modalAction';

const mapStateToProps = state => ({
  onlineTestsList: state.onlineTest.onlineTestsList,
  isFetchingOnlineTests: state.onlineTest.isFetchingOnlineTests,
  isDeleted: state.onlineTest.isDeleted,
  baseDocument: state.onlineTest.baseDocument,
  isFetchingBaseDocument: state.onlineTest.isFetchingBaseDocument,
  orderField: state.onlineTest.orderField,
  order: state.onlineTest.order,
  currentPage: state.onlineTest.currentPage,
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
        dispatch(deleteOnlineTest(idOnlineTest, true, idBaseDocument));
      },
      closeModal: () => dispatch(hideModal()),
    },
    modalType: 'delete',
  });
  return ({
    copyOnlineTest: idDocumentOnline => dispatch(copyOnlineTest(idDocumentOnline)),
    fetchBaseDocument: id => dispatch(fetchBaseDocument(id)),
    showDeleteModal: (idOnlineTest, name, idBaseDocument) => dispatch(showModal(deleteModalProps(idOnlineTest, name, idBaseDocument))),
    listMyOnlineTests: (idDocBase, page, orderField, order) => {
      dispatch(listMyOnlineTests(idDocBase, page, orderField, order));
    },
  });
};


const ManageOnlineTestsPageContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(ManageOnlineTestsPage);

export default ManageOnlineTestsPageContainer;
