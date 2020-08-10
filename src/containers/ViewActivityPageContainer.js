import { connect } from 'react-redux';
import ViewActivityPage from 'pages/Activity/ViewActivityPage';

import { fetchActivity, deleteActivity } from 'actions/activityAction';
import {
  addSelectedActivityToClassPlan, setActivityIdToNewClassPlan, selectClassPlanType, resetClassPlanType,
} from 'actions/classPlanAction';
import { showModal, hideModal } from 'actions/modalAction';


// state.<reducer's name>.<property>
const mapStateToProps = state => ({
  error: state.classPlan.error,
  activeActivity: state.activity.activeActivity,
  isFetching: state.activity.isFetching,
  userId: state.session.session.user.id,
  user: state.session.session.user,
  /* Class plan */
  selectedClassPlanType: state.classPlan.selectedClassPlanType,
  isLoggedIn: !!state.session.session,
});

const mapDispatchToProps = (dispatch) => {
  const deleteModalProps = idActivity => ({
    modalProps: {
      open: true,
      title: 'Apagar atividade',
      message: 'Você tem certeza que deseja apagar a atividade',
      id: idActivity,
      deleteAction: () => {
        dispatch(deleteActivity(idActivity, true));
      },
      closeModal: () => dispatch(hideModal()),
    },
    modalType: 'delete',
  });

  const createClassPlanModalProps = selectedClassPlanType => ({
    modalProps: {
      open: true,
      title: 'Criar plano de aula',
      nameAction: 'Criar',
      selectClassPlanType: type => dispatch(selectClassPlanType(type)),
      closeModal: () => { dispatch(hideModal()); dispatch(resetClassPlanType()); },
      selectedClassPlanType,
    },
    modalType: 'createClassPlanModal',
  });


  const warningObjectModalProps = () => ({
    modalProps: {
      open: true,
      closeModal: () => dispatch(hideModal()),
    },
    modalType: 'document',
  });

  return ({
    fetchActivity: id => dispatch(fetchActivity(id)),
    showDeleteModal: idActivity => dispatch(showModal(deleteModalProps(idActivity))),

    showWarningObjectModal: () => {
      dispatch(showModal(warningObjectModalProps()));
    },
    setActivityIdToNewClassPlan: id => dispatch(setActivityIdToNewClassPlan(id)),
    addSelectedActivityToClassPlan: activity => dispatch(addSelectedActivityToClassPlan(activity)),
    // Open Modal for selection class plan's type
    showCreateClassPlanModal: (selectedClassPlanType, activity) => {
      dispatch(showModal(createClassPlanModalProps(selectedClassPlanType, activity)));
      dispatch(setActivityIdToNewClassPlan(activity.id));
      dispatch(addSelectedActivityToClassPlan(activity));
    },

  });
};

const ViewActivityPageContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(ViewActivityPage);

export default ViewActivityPageContainer;
