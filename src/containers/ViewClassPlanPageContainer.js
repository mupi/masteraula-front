import { connect } from 'react-redux';
import ViewClassPlanPage from 'pages/ClassPlan/ViewClassPlanPage';

import { fetchClassPlan, deleteClassPlan } from 'actions/classPlanAction';
import { showModal, hideModal } from 'actions/modalAction';

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
      idClassPlan,
      deleteAction: () => {
        dispatch(deleteClassPlan(idClassPlan, true));
      },
      closeModal: () => dispatch(hideModal()),
    },
    modalType: 'delete',
  });
  return ({
    fetchClassPlan: id => dispatch(fetchClassPlan(id)),
    showDeleteModal: (idClassPlan, name) => dispatch(showModal(deleteModalProps(idClassPlan, name))),

  });
};

const ViewClassPlanPageContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(ViewClassPlanPage);

export default ViewClassPlanPageContainer;