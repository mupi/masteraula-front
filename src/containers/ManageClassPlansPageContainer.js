import { connect } from 'react-redux';
import ManageClassPlansPage from 'pages/ClassPlan/ManageClassPlansPage';
import {
  listMyClassPlans, deleteClassPlan, copyClassPlan,
} from 'actions/classPlanAction';
import { showModal, hideModal } from 'actions/modalAction';

// state.<reducer's name>.<property>

const mapStateToProps = state => ({
  isFetchingClassPlans: state.classPlan.isFetchingClassPlans,
  myClassPlansList: state.classPlan.classPlans,
  currentPage: state.classPlan.currentPage,
  previewClassPlan: state.classPlan.previewClassPlan,
  isFetchingPreviewClassPlan: state.classPlan.isFetchingPreviewClassPlan,
  error: state.classPlan.error,
  isDeleted: state.classPlan.isDeleted,
  orderField: state.classPlan.orderField,
  order: state.classPlan.order,
});

const mapDispatchToProps = (dispatch) => {
  const deleteModalProps = (idClassPlan, name) => ({
    modalProps: {
      open: true,
      title: 'Apagar plano de aula',
      message: 'Você tem certeza que deseja apagar o plano de aula',
      name,
      idClassPlan,
      deleteAction: () => {
        dispatch(deleteClassPlan(idClassPlan));
        // dispatch(hideModal());
      },
      closeModal: () => dispatch(hideModal()),
    },
    modalType: 'delete',
  });
  return ({
    listMyClassPlans: (page, orderField, order) => dispatch(listMyClassPlans(page, orderField, order)),
    showDeleteModal: (idClassPlan, name) => dispatch(showModal(deleteModalProps(idClassPlan, name))),
    copyClassPlan: classPlan => dispatch(copyClassPlan(classPlan)),
  });
};

const ManageClassPlansPageContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(ManageClassPlansPage);

export default ManageClassPlansPageContainer;
