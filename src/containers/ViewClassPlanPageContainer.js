import { connect } from 'react-redux';
import ViewClassPlanPage from 'pages/ClassPlan/ViewClassPlanPage';

import { fetchClassPlan, deleteClassPlan } from 'actions/classPlanAction';
import { showModal, hideModal } from 'actions/modalAction';
import {
  switchActiveDocument, fetchPreviewDocument,
} from 'actions/documentAction';

// state.<reducer's name>.<property>
const mapStateToProps = state => ({
  error: state.classPlan.error,
  activeClassPlan: state.classPlan.activeClassPlan,
  isFetching: state.classPlan.isFetching,
  userId: state.session.session.user.id,
  user: state.session.session.user,
});

const mapDispatchToProps = (dispatch) => {
  const deleteModalProps = (idClassPlan, name) => ({
    modalProps: {
      open: true,
      title: 'Apagar plano de aula',
      message: 'Você tem certeza que deseja apagar o plano de aula',
      name,
      id: idClassPlan,
      deleteAction: () => {
        dispatch(deleteClassPlan(idClassPlan, true));
      },
      closeModal: () => dispatch(hideModal()),
    },
    modalType: 'delete',
  });

  const documentModalProps = document => ({
    modalProps: {
      open: true,
      document,
      editDocument: () => {
        dispatch(switchActiveDocument(document));
        dispatch(hideModal());
      },
      closeModal: () => dispatch(hideModal()),
    },
    modalType: 'document',
  });

  return ({
    fetchClassPlan: id => dispatch(fetchClassPlan(id)),
    showDeleteModal: (idClassPlan, name) => dispatch(showModal(deleteModalProps(idClassPlan, name))),

    showDocumentModal: (id) => {
      dispatch(fetchPreviewDocument(parseInt(id, 10)));
      dispatch((_dispatch, getState) => {
        _dispatch(showModal(documentModalProps(getState().document.previewDocument)));
      });
    },
  });
};

const ViewClassPlanPageContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(ViewClassPlanPage);

export default ViewClassPlanPageContainer;
